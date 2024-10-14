import { Button } from '~/components/ui/button';

export default function Index() {
  return (
    <div className="flex flex-col gap-3">
      <h1>Welcome to AK2025</h1>
      <Button variant={"primary"}>Crée un compte</Button>
      <Button variant="secondary">Crée un compte</Button>
      <Button variant="danger">Crée un compte</Button>
      <Button variant="warning">Crée un compte</Button>
      <Button variant="success">Crée un compte</Button>
      <Button variant="info">Crée un compte</Button>
      <Button variant="oauth">Crée un compte</Button>
    </div>
  );
}
