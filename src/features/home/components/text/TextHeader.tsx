"use client"
import { motion } from 'framer-motion'

function TextHeader() {

    return (
        <section className='flex relative h-[30vh] md:px-13 items-center xss:text-6xl xl:text-8xl font-extrabold justify-center'>
            <span>Codesc
                <motion.span
                    initial={{ bottom: 0 }}
                    whileInView={{ bottom: 30 }}
                    transition={{ duration: 2, ease: "linear" }}
                    viewport={{ amount: "all", once: true }}
                    className='relative text-indigo-600'
                >
                    o
                </motion.span>
                <motion.span initial={{ bottom: 0 }} whileInView={{ bottom: -20 }} transition={{ duration: 1.3, ease: "linear" }} viewport={{ once: true, amount: "all" }} className='relative '>
                    p
                </motion.span>
                <motion.span initial={{ bottom: 0 }} whileInView={{ bottom: 25 }} transition={{ duration: 2.2, ease: "linear" }} viewport={{ once: true, amount: "all" }} className='relative text-indigo-600'>
                    e
                </motion.span>
            </span>
        </section>
    )

}
export default TextHeader;
