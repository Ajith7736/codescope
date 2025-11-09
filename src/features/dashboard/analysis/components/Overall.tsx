import { AnalysisProps } from '@/types/type'
import ProjectText from '@/ui/Text/ProjectText'


function Overall({item} : {item : AnalysisProps}) {
    return (
        <div className='flex flex-col w-fit items-center'>
            <div className='bg-light-white/40 p-5 rounded-md  backdrop-blur-2xl'>
                {item.icon}
            </div>
            <div className='text-center'>
                <h1 className='text-xl md:text-2xl font-extrabold'>{item.score}</h1>
                <ProjectText>{item.type}</ProjectText>
            </div>
        </div>
    )
}

export default Overall
