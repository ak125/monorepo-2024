import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PrismaServices } from '../prisma/prisma.services'; // Modifiez selon vos besoins
import { CookieSerializer } from './cookie-serializer';
import { LocalAuthGuard } from './local-auth.guard';
import { LocalStrategy } from './local.strategy'; // Assurez-vous que le chemin est correct

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'local',
      property: 'user',
      session: true, // Activer les sessions si nécessaire
    }),
  ],
  providers: [
    LocalStrategy,     // Assurez-vous que LocalStrategy est bien importé ici
    LocalAuthGuard,    // Importation des autres services/guard
    CookieSerializer,
    PrismaServices,     // Assurez-vous que PrismaServices est bien importé
  ],
  controllers: [],      // Ajoutez des controllers ici si nécessaire
})
export class AuthModule {}


