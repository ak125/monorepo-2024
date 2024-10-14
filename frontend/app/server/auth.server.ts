import { redirect, type AppLoadContext } from "@remix-run/node";
import { z } from 'zod';

const authenticatedUserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
});

export const getOptionalUser = async ({context}: {context: AppLoadContext}) => {
  const user = authenticatedUserSchema.safeParse(context.User); // Utilise `safeParse` pour une validation plus flexible
  if (!user.success || !user.data) {
    return null;
  }

  return await context.remixService.getUser({
    userId: user.data.id, // Utilise `user.data.id` car `safeParse` retourne un résultat structuré
  });
}

export const reqireUser = async ({context}: {context: AppLoadContext}) => {
  const user = await getOptionalUser({context});
  if (!user) {
    throw redirect('/login'); // Redirection vers /login si aucun utilisateur trouvé
  }
  return user;
}
