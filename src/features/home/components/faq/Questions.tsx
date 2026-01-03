"use client"
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { questions } from '@/lib/client/faq/questions'

function Questions() {

    const [questionshow, setquestionshow] = useState<{
        id: string | null,
        show: boolean
    }>({
        id: null,
        show: false
    })

    const handleclick = (id: string) => {
        setquestionshow((prev) => {
            return {
                id,
                show: prev.show && prev.id === id ? false : true
            }
        })
    }



    return (
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5, ease: "easeInOut" }} className='flex flex-col gap-5 px-10'>
            <h1 className='xss:text-2xl md:text-4xl font-extrabold text-center'>OUESTIONS & ANSWERS</h1>
            {questions.map((item) => {
                return <motion.div key={item.id} className='border overflow-hidden border-light-border dark:border-gray-600/50 rounded-lg xl:w-[40vw] xss:w-[80vw] flex flex-col'>
                    <div onClick={() => handleclick(item.id)} className=' flex justify-between items-center p-5'>
                        <button className='xl:text-sm xss:text-xs text-start w-85'>{item.question}</button>
                        <motion.div initial={{ rotate: 0 }} animate={questionshow.id === item.id && questionshow.show ? { rotate: 180 } : { rotate: 0 }}>
                            <ChevronDown className='size-4' />
                        </motion.div>
                    </div>
                    <AnimatePresence>
                        {(questionshow.show && questionshow.id == item.id) && <motion.div layout initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2, ease: "easeInOut" }} className='xl:text-xs text-[10px] text-gray-600 italic'>
                            <p className='px-4 py-2'>
                                {item.answer}
                            </p>
                        </motion.div>}
                    </AnimatePresence>
                </motion.div>
            })}
        </motion.div>
    )
}

export default Questions;