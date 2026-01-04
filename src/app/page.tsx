import { headers } from "next/headers";
import Content from "../features/home/layout/Content";
import Navbar from "../features/home/layout/Navbar";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";



export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/Dashboard")
  }

  return (
    <div className="dark:text-dark-white dark:bg-dark-black">
      <Navbar />
      <Content session={session} />
    </div>
  );
}
