import React from 'react'
import { motion } from "framer-motion"

function SeperatorLine() {
  return (
    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className='flex gap-5'>
        <div className='h-px w-[180px] bg-linear-to-r from-dark-background via-dark-background to-indigo-500/80'></div>
        <div className='h-px w-[180px] bg-linear-to-r to-dark-background via-dark-background from-indigo-500/80'></div>
    </motion.div>
  )
}

export default SeperatorLine