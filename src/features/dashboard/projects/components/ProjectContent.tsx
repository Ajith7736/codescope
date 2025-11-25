"use client"
import { useSession } from '@/lib/auth-client'
import ButtonLoader from '@/ui/loaders/ButtonLoader'
import { ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Project } from '@/types/type'
import Loading from '@/app/loading'
import ErrorPage from '@/app/error'
import Link from 'next/link'
import useFetch from '@/hooks/useFetch'
import githublinkchecker from '@/lib/githublinkchecker'


function ProjectContent() {
  const [link, setlink] = useState<string>("")
  const [Error, setError] = useState<string>("")
  const [Owner, setOwner] = useState("")
  const [Repo, setRepo] = useState("")
  const [projectdata, setprojectdata] = useState<Project[]>([])
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {

    }
  }, [session])


  const { data, isLoading, isError } = useQuery({
    queryKey: ["projects"],
    queryFn: () => fetch("/api/fetch-project", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ userId: session?.user.id })
    }).then(res => res.json()),
    enabled: !!session?.user.id,
    refetchOnMount: false,
    staleTime: Infinity
  })

  useEffect(() => {
    if (data && data.success) {
      setprojectdata(data.project)
    }
  }, [data])


  useEffect(() => {
    if (link.includes("https://github.com/")) {
      githublinkchecker(link, setError, setRepo, setOwner);
    } else {
      if (link.length > 0) {
        setError("Invalid Link")
      }
    }
  }, [link])

  const { data: resdata, loading, fetchdata: getgithubdata } = useFetch("/api/fetch-repo", "POST", { owner: Owner, repo: Repo, userId: session?.user.id })

  useEffect(() => {
    if (resdata && resdata.project) {
      projectdata.length > 0 ? setprojectdata([...projectdata, resdata.project]) : setprojectdata([resdata.project])
    }
  }, [resdata])

  if (isLoading) return <Loading />

  if (isError) return <ErrorPage />


  return (
    <div className='m-7 h-screen gap-8 flex flex-col items-center'>
      <div className='flex flex-col md:flex-row gap-4 items-center'>
        <div>
          <input type="text" value={link} onChange={(e) => setlink(e.target.value)} className={`bg-light-gray dark:bg-dark-accent/10 border ${Error ? 'border-red-500/40' : ' border-dark-input-border'} p-3 w-104 rounded-md focus:outline-none text-sm placeholder:text-sm`} placeholder='https://github.com/username/repo' />
          {Error && <div className='text-xs pt-2 text-red-500'>{Error}</div>}
        </div>
        {loading ? <button className='w-[108px] py-[9.5px] bg-light-black text-light-background dark:bg-indigo-500 cursor-pointer rounded-md flex justify-center'><ButtonLoader /></button> : <input type='submit' value="Add Project" className='text-sm bg-light-black hover:bg-dark-text-primary text-light-white dark:bg-indigo-600 shadow-sm  shadow-indigo-600 dark:text-white hover:dark:bg-indigo-700 transition-all duration-300 cursor-pointer p-2 rounded-[3px]' disabled={Error.length > 0 || link === ""} onClick={getgithubdata} />}
      </div>
      <div className=' xss:w-100 md:w-110 lg:w-190'>
        <div className='border p-5 rounded-t-md font-extrabold border-dark-border'>
          Your Projects
        </div>
        {projectdata.length > 0 ? projectdata?.map((item) => {
          return <div key={item.id} className='p-6 cursor-pointer border rounded-b-md border-dark-border hover:bg-dark-accent/10 transition-all duration-300 border-t-0'>
            <Link href={`/Dashboard/Projects/${item.id}`} className='flex justify-between items-center text-sm'>
              <div className='flex flex-col gap-2'>
                <h1 className='text-base'>{item.projectname}</h1>
                <p className='text-xs'>{item.totalfiles} Files • {item.mostused}</p>
              </div>
              <ChevronRight strokeWidth={1} />
            </Link>
          </div>
        }) : <div className='p-8 border-t-0 text-sm  border rounded-b-md border-dark-border'>No Projects</div>}
      </div>
    </div>
  )
}

export default ProjectContent
