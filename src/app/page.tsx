"use client"
import { useSession } from "@/lib/auth-client";
import Content from "../features/home/layout/Content";
import Navbar from "../features/home/layout/Navbar";
import Loading from "./loading";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { data: session, isPending } = useSession()

  useEffect(() => {
    if(session){
      redirect("/Dashboard")
    }
  }, [session])
  

  if (isPending) return <Loading />
  return (
    <div className="dark:text-dark-white dark:bg-dark-black flex flex-col">
      <Navbar />
      <Content session={session} />
    </div>

  );
}
