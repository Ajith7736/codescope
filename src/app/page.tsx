"use client"
import { useSession } from "@/lib/auth-client";
import Content from "../features/home/layout/Content";
import Navbar from "../features/home/layout/Navbar";
import Image from "next/image";
import Loading from "./loading";

export default function Home() {
  const { data: session, isPending } = useSession()

  if (isPending) return <Loading />
  return (
    <div className="dark:text-dark-white dark:bg-dark-black flex flex-col">
      <Navbar />
      <Content session={session} />
    </div>

  );
}
