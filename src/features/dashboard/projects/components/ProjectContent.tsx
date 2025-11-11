"use client"
import Button from '@/ui/Buttons/Button'
import { ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'


function ProjectContent() {
  const [link, setlink] = useState<string>("")
  const [Error, setError] = useState<string>("")
  const [Owner, setOwner] = useState("")
  const [Repo, setRepo] = useState("")
  const [projectdata, setprojectdata] = useState("")
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
    await setisloading(true)
    try {
      const res = await fetch("/api/fetch-repo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ owner, repo })
      })

      const data = await res.json();

      setprojectdata(data.mostused)

    } catch (err) {
      console.error("Something went wrong")
    }
    await setisloading(false)
  }


  return (
    <div className='m-7 h-screen gap-3 flex flex-col items-center'>
      <div className='flex flex-col gap-3 items-center'>
        <input type="text" value={link} onChange={(e) => setlink(e.target.value)} className='bg-light-gray border dark:bg-dark-inputfield border-light-activeborder/20 p-3 w-104 rounded-md focus:outline-none text-sm placeholder:text-sm' placeholder='Paste the Github Repo Link here' />
        {Error && <div className='text-sm text-red-500'>{Error}</div>}
        <input type='submit' value={isloading ? "Loading..." : "Add Project"} className='text-sm bg-light-black hover:bg-light-hoverblack text-light-white dark:bg-dark-white dark:text-dark-black hover:dark:bg-dark-hoverwhite cursor-pointer p-2 rounded-md' disabled={Error.length > 0} onClick={() => getgithubdata(Owner, Repo)} />
      </div>
      <div className='bg-light-gray/40 dark:bg-dark-gray xss:w-100 md:w-190'>
        <div className='border p-5 rounded-t-md font-extrabold border-light-activeborder/20'>
          Your Projects
        </div>
        <div className='p-8 cursor-pointer border rounded-b-md border-light-activeborder/20 hover:bg-light-activeborder/10 border-t-0'>
          <div className='flex justify-between'>
            <h1>Ecommerce Application</h1>
            <ChevronRight strokeWidth={1} />
          </div>
        </div>
      </div>
      <div>
        {projectdata && <>
          {projectdata}
        </>}
      </div>
    </div>
  )
}

export default ProjectContent
