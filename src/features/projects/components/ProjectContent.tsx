import ProjectText from '@/ui/Text/ProjectText'
import { Code, Github, Upload } from 'lucide-react'
import React from 'react'

function ProjectContent() {
  return (
    <div>
      <div className='m-7 gap-3 flex xss:flex-col md:flex-row md:flex-wrap md:justify-center xss:items-center'>

        <div className='bg-dark-gray w-100 border border-dark-activeborder/30 rounded-md flex items-center gap-5 p-5 border-dashed'>
          <div className='dark:bg-light-border/80 rounded-md text-black flex justify-center items-center h-13 w-13'><Github /></div>
          <ProjectText>Import Your Github Repositary</ProjectText>
        </div>


        <div className='bg-dark-gray w-100 border border-dark-activeborder/30 rounded-md flex items-center gap-5 p-5 border-dashed'>
          <div className='dark:bg-light-border/80 rounded-md text-black flex justify-center items-center h-13 w-13'><Upload /></div>
          <ProjectText>Drop or upload your folder</ProjectText>
        </div>

        <div className='bg-dark-gray w-100 border border-dark-activeborder/30 rounded-md flex items-center gap-5 p-5 border-dashed'>
          <div className='dark:bg-light-border/80 rounded-md text-black flex justify-center items-center h-13 w-13'><Code /></div>
          <ProjectText>Paste Your Code Here</ProjectText>
        </div>


      </div>
    </div>
  )
}

export default ProjectContent
