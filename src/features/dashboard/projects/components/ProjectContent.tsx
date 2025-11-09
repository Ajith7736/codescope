import Button from '@/ui/Buttons/Button'
import { ChevronRight } from 'lucide-react'


function ProjectContent() {
  return (
    <div className='m-7 gap-3 flex flex-col md:justify-center xss:items-center'>
      <div className='flex flex-col gap-3 items-center'>
        <input type="text" className='bg-light-gray border border-light-activeborder/20 p-3 w-104 rounded-md focus:outline-none text-sm placeholder:text-sm' placeholder='Paste the Github Repo Link here' />
        <Button>Add Project</Button>
      </div>
      <div className='bg-light-gray/40 xss:w-100 md:w-190'>
        <div className='border p-5 rounded-t-md font-extrabold border-light-activeborder/20'>
          Your Projects
        </div>
        <div className='p-8 cursor-pointer border rounded-b-md border-light-activeborder/20 hover:bg-light-activeborder/10 border-t-0'>
          <div className='flex justify-between'>
            <h1>Ecommerce Application</h1>
            <ChevronRight strokeWidth={1}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectContent
