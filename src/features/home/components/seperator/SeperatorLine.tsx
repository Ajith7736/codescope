import React from 'react'

function SeperatorLine() {
  return (
    <div className='flex gap-5'>
        <div className='h-px w-[180px] bg-linear-to-r from-dark-background via-dark-background to-indigo-500/80'></div>
        <div className='h-px w-[180px] bg-linear-to-r to-dark-background via-dark-background from-indigo-500/80'></div>
    </div>
  )
}

export default SeperatorLine