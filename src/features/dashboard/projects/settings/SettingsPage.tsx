"use client"
import useFetch from "@/hooks/useFetch";
import { useSession } from "@/lib/auth-client";
import ButtonLoader from "@/ui/loaders/ButtonLoader";
import { useRouter } from "next/navigation";
import { useState } from "react";

function SettingsPage({ projectId, refetch }: { projectId: string | undefined, refetch: Function }) {
  const { data: session } = useSession();
  const [isloading, setisloading] = useState<boolean>(false);
  const router = useRouter();

  const { fetchdata: handledelete } = useFetch("/api/delete-project", "DELETE", { projectId, userId: session?.user?.id })

  const handleproject = async () => {
    setisloading(true);
    await handledelete();
    router.replace("/Dashboard/Projects");
  }

  return (
    <div className='p-5 border m-5  md:w-[90%] border-red-500/30 bg-dark-surface/30 rounded-md flex flex-col gap-5'>
      <h1 className="text-sm font-extrabold">Delete this repositary</h1>
      <p className="text-[10px] text-gray-500 itallic">Once you delete a repositary all the data will get deleted.</p>
      <button onClick={handleproject} className="text-xs text-red-500 font-bold cursor-pointer bg-red-500/20 h-12 rounded-xs hover:bg-red-500/30 transition-all duration-300">{isloading ? <><ButtonLoader /></> : <>Delete this repositary</>}</button>
    </div>
  )
}

export default SettingsPage;
