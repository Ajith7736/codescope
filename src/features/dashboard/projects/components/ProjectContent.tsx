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
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import BasicLoader from '@/ui/loaders/BasicLoader'


function ProjectContent() {
  const [link, setlink] = useState<string>("")
  const [errorText, seterrorText] = useState<string>("")
  const [Owner, setOwner] = useState("")
  const [Repo, setRepo] = useState("")
  const [projectdata, setprojectdata] = useState<Project[]>([])
  const { data: session } = useSession();
  const router = useRouter();


  const { data, isLoading, isRefetching, isError, refetch } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const res = await fetch("/api/fetch-project", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userId: session?.user?.id })
      })
      const data = await res.json();

      if (!res.ok) {
        if (res.status === 404) {
          throw new Error("No project")
        } else {
          toast.error(data.message);
          throw new Error(data.message);
        }
      }

      return data;
    },
    enabled: !!session?.user?.id,
    refetchOnWindowFocus: false
  })

  useEffect(() => {
    if (data && data.success) {
      setprojectdata(data.project)
    }
  }, [data])


  useEffect(() => {
    if (link.includes("https://github.com/")) {
      githublinkchecker(link, seterrorText, setRepo, setOwner);
    } else {
      if (link.length > 0) {
        seterrorText("Invalid Link")
      }
    }
  }, [link])

  const { data: resdata, loading, fetchdata: getgithubdata } = useFetch("/api/fetch-repo", "POST", { owner: Owner, repo: Repo, userId: session?.user?.id })

  useEffect(() => {
    if (resdata?.success) {
      refetch();
      setlink('');
    }
  }, [resdata])

  const handlesubscription = (projectlength: number) => {
    if (session?.user?.subscription_status === "active" && session?.subscription?.status === "active") {
      if (session.subscription.plan.name === "Basic") {
        if (projectlength < 10) {
          getgithubdata();
        } else {
          toast.error("Project Limit Reached")
        }
      }
    } else {
      if (projectlength < 1) {
        getgithubdata();
      } else {
        router.push("/Billing")
      }
    }
  }

  if (isLoading) return <Loading />

  if (isError) return <ErrorPage />



  return (
    <div className='m-7 dvh gap-8 flex flex-col items-center'>
      <div>
        <div className='flex flex-col md:flex-row gap-4 items-center'>
          <div>
            <input
              type="text"
              value={link}
              onChange={(e) => setlink(e.target.value)}
              className={`bg-light-surface dark:bg-dark-border/50 border ${errorText ? 'border-red-500/40' : 'border-light-border dark:border-dark-input-border'} p-3 w-104 rounded-md focus:outline-none xss:w-xs md:w-md text-sm placeholder:text-sm`}
              placeholder='https://github.com/username/repo'
            />
          </div>
          {loading ?
            <button
              className='w-[108px] py-[9.5px] bg-light-black text-light-background bg-indigo-500 cursor-pointer rounded-md flex justify-center'>
              <ButtonLoader invert />
            </button> :
            <input
              type='submit'
              value="Add Project"
              className='text-sm bg-light-black text-light-white bg-indigo-600 shadow-sm  shadow-indigo-600 text-white hover:bg-indigo-700 transition-all duration-300 cursor-pointer p-2 rounded-[3px]'
              disabled={errorText.length > 0 || link === ""}
              onClick={() => {
                handlesubscription(projectdata.length);
              }}
            />}
        </div>
        {errorText && link !== "" && <div className='text-xs pt-2 text-red-500'>{errorText}</div>}
      </div>
      {(!session?.subscription || (session?.user?.subscription_status === "active" && session.subscription.plan.name === "Basic" && session.subscription.status === "active")) && <div className='text-xs  flex justify-start items-center gap-3'>Total projects : <div className='bg-light-text-muted/10 dark:bg-dark-input-border w-40 h-2 rounded-full'>
        <div className='bg-indigo-500 h-2 rounded-full transition-all duration-300'
          style={{
            width: !session?.subscription ? projectdata?.length / 1 * 100 + "%" : projectdata?.length / 10 * 100 + "%"
          }}
        ></div></div><div className='text-dark-text-muted italic'>{projectdata ? projectdata.length : 0} / {session?.subscription?.plan.name === "Basic" ? 10 : 1}</div></div>}

      <div className=' xss:w-85 md:w-110 lg:w-190'>
        <div className='border p-5 xss:text-sm rounded-t-md font-extrabold border-light-border dark:border-dark-border'>
          Your Projects
        </div>
        {isRefetching ? <div className='p-8 border-t-0 text-sm flex items-center justify-center border rounded-b-md border-light-border dark:border-dark-border'><BasicLoader /></div> :
          projectdata?.length > 0 ? projectdata?.map((item) => {
            return <div key={item.id} className='p-6 cursor-pointer border border-light-border dark:border-dark-border hover:bg-dark-accent/10 transition-all duration-300 border-t-0'>
              <Link href={`/Dashboard/Projects/${item.id}`} className='flex justify-between items-center text-sm'>
                <div className='flex flex-col gap-2'>
                  <h1 className='xss:text-[15px] md:text-base'>{item.projectname}</h1>
                  <p className='xss:text-[10px] md:text-xs'>{item.totalfiles} Files • {item.mostused}</p>
                </div>
                <ChevronRight strokeWidth={1} className='size-5' />
              </Link>
            </div>
          }) : <div className='p-8 border-t-0 text-sm  border rounded-b-md border-light-border dark:border-dark-border'>No Projects</div>
        }

      </div>
    </div>
  )
}

export default ProjectContent
