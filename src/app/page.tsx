"use client"
import Content from "../features/home/layout/Content";
import Navbar from "../features/home/layout/Navbar";
import Image from "next/image";

export default function Home() {

  return (
    <div className="dark:text-dark-white dark:bg-dark-black flex flex-col">
      <Navbar />
      <Content />
    </div>

  );
}
