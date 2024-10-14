import { All, Controller, Next, Req, Res } from '@nestjs/common';
import { createRequestHandler } from '@remix-run/express';
import { Request, Response, NextFunction } from 'express';
import { RemixService } from './remix.service';
import { getServerBuild } from '@fafa/frontend';

@Controller()
export class RemixController {
  constructor(private remixService: RemixService) {}

  @All('*')
  async handler(
    @Req() request: Request,
    @Res() response: Response,
    @Next() next: NextFunction,
  ) {
    try {
      // Récupère le build Remix pour le mode développement
      const build = await getServerBuild();

      // Assurez-vous que le build a bien été chargé
      if (!build) {
        throw new Error('Failed to load Remix build');
      }

      // Crée un handler pour gérer les requêtes Remix
      return createRequestHandler({
        build, // Utilisation du build récupéré
        getLoadContext: () => ({
          user: request.user,       // Ajoutez votre logique utilisateur
          remixService: this.remixService, // Ajout du service Remix
        }),
      })(request, response, next);
    } catch (error) {
      console.error('Error in RemixController:', error);
      response.status(500).send('Internal Server Error');
    }
  }
}
