import { Ring } from 'ldrs/react';
import 'ldrs/react/Ring.css'


function Loading() {

    return (
        <div role='status' aria-live='polite' aria-label='loading content' className='fixed inset-0 z-50 dark:bg-dark-black bg-light-white flex justify-center items-center'>
            <Ring
            size={40}
            stroke={5}
            bgOpacity={0.2}
            speed={2}
            color={"#6B7280"}
         />
        </div>
    )
}

export default Loading;
