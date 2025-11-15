"use client"
import { useSession } from '@/lib/auth-client'
import ButtonLoader from '@/ui/loaders/ButtonLoader'
import { ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'


function ProjectContent() {
  const [link, setlink] = useState<string>("")
  const [Error, setError] = useState<string>("")
  const [Owner, setOwner] = useState("")
  const [Repo, setRepo] = useState("")
  const [projectdata, setprojectdata] = useState("")
  const { data: session } = useSession();
  const [mostused, setmostused] = useState("")
  const [isloading, setisloading] = useState(false)

  useEffect(() => {
    if (link.includes("https://github.com/")) {
      const urls = link.split("/");
      const owner = urls[urls.length - 2]
      const repo = urls[urls.length - 1]
      if (owner.includes("github.com") || !owner) {
        setError("Invalid Link")
      } else if (repo.includes("github.com") || !repo) {
        setError("Invalid Link")
      } else {
        setError("")
        setOwner(owner);
        setRepo(repo);
      }
    } else {
      if (link.length > 0) {
        setError("Invalid Link")
      }
    }
  }, [link])

  const getgithubdata = async (owner: string, repo: string) => {
    setisloading(true);

    try {
      const res = await fetch("/api/fetch-repo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          owner,
          repo,
          userId: session?.user.id
        })
      })

      const data = await res.json()

      if (!res.ok) {
        toast.error(data.message || "Failed to fetch data");
        return;
      }

      setprojectdata(data.RepoContent)
      setmostused(data.mostused)

    } catch (err) {
      toast.error("Something went wrong")
    } finally {
      setisloading(false);
    }
  }


  return (
    <div className='m-7 h-screen gap-8 flex flex-col items-center'>
      <div className='flex flex-col gap-4 items-center'>
        <input type="text" value={link} onChange={(e) => setlink(e.target.value)} className='bg-light-gray border dark:bg-dark-inputfield border-light-activeborder/20 p-3 w-104 rounded-md focus:outline-none text-sm placeholder:text-sm' placeholder='Paste the Github Repo Link here' />
        {Error && <div className='text-sm text-red-500'>{Error}</div>}
        {isloading ? <button className='w-[110px] bg-light-black text-light-white dark:bg-dark-white   cursor-pointer p-2 rounded-md flex justify-center'><ButtonLoader invert /></button> : <input type='submit' value={isloading ? "Loading..." : "Add Project"} className='text-sm bg-light-black hover:bg-light-hoverblack text-light-white dark:bg-dark-white dark:text-dark-black hover:dark:bg-dark-hoverwhite cursor-pointer p-2 rounded-md' disabled={Error.length > 0 || link === ""} onClick={() => getgithubdata(Owner, Repo)} />}
      </div>
      <div className='bg-light-gray/40 dark:bg-dark-gray xss:w-100 md:w-110 lg:w-190'>
        <div className='border p-5 rounded-t-md font-extrabold border-light-activeborder/20'>
          Your Projects
        </div>
        <div className='p-8 cursor-pointer border rounded-b-md border-light-activeborder/20 hover:bg-light-activeborder/10 transition-all duration-300 border-t-0'>
          <div className='flex justify-between'>
            <h1>Ecommerce Application</h1>
            <ChevronRight strokeWidth={1} />
          </div>
        </div>
      </div>
      <div>
      </div>
    </div>
  )
}

export default ProjectContent
