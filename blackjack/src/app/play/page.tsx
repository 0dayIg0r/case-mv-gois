import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import PlayClientPage from "../components/pages/play-client";

export default async function PlayPage() {
  const session = await auth(); // server component
  if (!session?.user) redirect("/"); // redireciona se não logado
  return (
    // renderiza o componente de cliente
    <PlayClientPage />
  );
}
