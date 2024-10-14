import { json, type LinksFunction, type LoaderFunctionArgs } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteLoaderData
} from '@remix-run/react';
import { type RemixService } from '@fafa/backend';
import { Footer } from './components/ui/Footer';
import { Navbar } from './components/ui/Navbar';
import logo from './routes/_assets/logo-automecanik.png';
import { getOptionalUser } from "./server/auth.server";

// Importez global.css depuis `app`
import globalStylesUrl from './global.css'; // Import depuis `app`

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: globalStylesUrl }, // Utilisation dans links()
];

export const loader = async ({ request, context }: LoaderFunctionArgs) => {
  const user = await getOptionalUser({ context });
  return json({
    user
  });
};

export const useOptionalUser = () => {
  const data = useRouteLoaderData<typeof loader>("root");
  if (!data) {
    return null;
  }
  return data.user;
}

declare module '@remix-run/node' {
  interface AppLoadContext {
    remixService: RemixService;
    user: unknown;
  }
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className='h-full'>
    <head>
      <meta charSet='utf-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <Meta />
      <Links /> {/* Inclut les feuilles de style ici */}
    </head>
    <body className='min-h-screen flex flex-col'>
    <Navbar logo={logo} />
    {children}
    <Footer />
    <ScrollRestoration />
    <Scripts />
    </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
