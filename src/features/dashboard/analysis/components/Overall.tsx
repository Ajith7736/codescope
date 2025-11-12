import { AnalysisProps } from '@/types/type'
import ProjectText from '@/ui/Text/ProjectText'


function Overall({item} : {item : AnalysisProps}) {
    return (
        <div className='flex flex-col gap-2 w-fit items-center'>
            <div className={`dark:bg-dark-hovergray bg-light-white/40 ${item.type === "Architecture" ? 'text-blue-500' : item.type === "Security" ?  'text-red-500' : 'text-green-500'} border border-light-gray/10 p-5 rounded-md  backdrop-blur-2xl`}>
                {item.icon}
            </div>
            <div className='text-center'>
                <h1 className={`text-xl  md:text-2xl font-extrabold`}>{item.score}</h1>
                <ProjectText>{item.type}</ProjectText>
            </div>
        </div>
    )
}

export default Overall
