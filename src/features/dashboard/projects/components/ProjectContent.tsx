import Button from '@/ui/Buttons/Button'
import { ChevronRight, MoveRight } from 'lucide-react'


function ProjectContent() {
  return (
    <div className='m-7 gap-3 flex flex-col md:justify-center xss:items-center'>
      <div className='flex flex-col gap-3 items-center'>
        <input type="text" className='bg-light-gray p-2 w-104 rounded-md focus:outline-none text-sm placeholder:text-sm' placeholder='Paste the Github Repo Link here' />
        <Button>Add Project</Button>
      </div>
      <div className='bg-light-gray w-120'>
        <div className='border p-5 rounded-t-md font-extrabold border-light-activeborder/20'>
          Your Projects
        </div>
        <div className='p-8 border rounded-b-md border-light-activeborder/20 border-t-0'>
          <div className='cursor-pointer'>
            <h1>Ecommerce Application</h1>
            <ChevronRight />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectContent
