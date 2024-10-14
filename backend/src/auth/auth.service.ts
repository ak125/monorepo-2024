import { Injectable } from '@nestjs/common';
import { PrismaServices } from '../prisma/prisma.services';

interface UserExistenceParams {
    email: string;
    withPassword: boolean;
    password: string;
}

const USER_SELECT_FIELDS = {
    id: true,
    name: true,
    email: true,
    password: true,
};

@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaServices) {}

    public readonly doesUserExist = async ({
                                               email,
                                               withPassword,
                                               password,
                                           }: UserExistenceParams) => {
        const existingUser = await this.prisma.user.findUnique({
            where: { email },
            select: USER_SELECT_FIELDS,
        });

        if (!existingUser) {
            return this.generateErrorResponse("L'email est invalide");
        }

        if (withPassword) {
            return this.validatePassword(password);
        }

        return {
            message: 'Cet email est déjà utilisé.',
            error: false,
        };
    };

    private generateErrorResponse(message: string) {
        return {
            message,
            error: true,
        };
    }

    private validatePassword(password: string) {
        // Placeholder password validation logic
        const isValidPassword = false; // Replace with real password validation 

        if (!isValidPassword) {
            return this.generateErrorResponse('Le mot de passe est invalide');
        }

        return {
            message: 'Le mot de passe est valide',
            error: false,
        };
    }

    public readonly createUser = async ({
                                            email,
                                            name,
                                            password,
                                        }: {
        email: string;
        name: string;
        password: string;
    }) => {
        const hashedPassword = 'hashedPasswordPlaceholder'; // Placeholder hashed password for development
        return await this.prisma.user.create({
            data: {
                email: email.toLowerCase(),
                password: hashedPassword,
                name,
            },
            select: {
                id: true,
                name: true,
                email: true,
            },
        });
    };

    public readonly authenticateUser = async ({ email }: { email: string }) => {
        return await this.prisma.session.create({
            data: {
                user: {
                    connect: {
                        email,
                    },
                },
                sessionToken: 'sessionTokenPlaceholder', // Placeholder session token for development
            },
            select: {
                sessionToken: true,
            },
        });
    };
}