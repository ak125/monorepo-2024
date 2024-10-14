import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller'; // Import the AuthController class
import { AuthModule } from './auth/auth.module';
import { PrismaServices } from './prisma/prisma.services';
import { RemixController } from './remix/remix.controller';
import { RemixService } from './remix/remix.service';

@Module({
  imports: [AuthModule],
  controllers: [AuthController, RemixController],
  providers: [PrismaServices, RemixService],
})
export class AppModule {}
