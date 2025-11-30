"use client"
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import StatusIcon from '@/ui/icon/StatusIcon'
import RiskText from '@/ui/Text/RiskText'
import { ChevronDown, CircleCheckBig } from 'lucide-react'
import Syntax from '@/ui/SyntaxHighlighter/Syntax'

function sample() {
    const [showcode, setshowcode] = useState<any>({
        id: null,
        show: false
    })

    const samples: any[] = [
        {
            id: 1,
            type: "Architecture",
            severity: "medium",
            sampletitle: "Poor Separation of Concerns",
            sampledesc: "The function mixes routing, business logic, and database operations in a single file, making the code harder to maintain and test.",
            suggestedcode: `
    // Separate route handler, service, and db access

    // controller.ts
    export async function getUserController(req, res) {
      const data = await userService.getUser(req.query.id);
      res.json(data);
    }

    // userService.ts
    export const userService = {
      async getUser(id) {
        return userRepo.findUserById(id);
      }
    };

    // userRepo.ts
    export async function findUserById(id) {
      return db.query("SELECT * FROM users WHERE id = ?", [id]);
    }
  `,
            samplelocation: "userservice.ts",
            suggesstedcodelanguage: "typescript"
        },
        {
            id: 2,
            type: "Security",
            severity: "high",
            sampletitle: "SQL Injection Vulnerability",
            sampledesc: "User input is directly inserted into the SQL query without sanitization, allowing attackers to inject malicious SQL.",
            suggestedcode: `
    // FIX: Use parameterized queries
    const query = "SELECT * FROM users WHERE id = ?";
    const user = await db.query(query, [userId]);
  `,
            samplelocation: "userservice.ts",
            suggesstedcodelanguage: "typescript"
        },
        {
            id: 3,
            type: "Performance",
            severity: "low",
            sampletitle: "Inefficient Loop Causing Unnecessary Computation",
            sampledesc: "A loop runs 100000 times doing meaningless work, impacting performance under load.",
            suggestedcode: `
    // FIX: Remove the loop or derive logs only when needed
    const logs = []; // or compute only when required
  `,
            samplelocation: "userservice.ts",
            suggesstedcodelanguage: "typescript"
        }
    ];


    return (
        <div className='bg-light-surface dark:bg-dark-border/20 m-5 rounded-xs dark:border-dark-border w-md p-5 border border-light-border flex flex-col gap-3'>
            {samples.map((sample) => {
                return <motion.div key={sample.id} transition={{ duration: 1, ease: "easeInOut" }} className='bg-light-surface-hover border-light-border border overflow-hidden relative dark:bg-dark-surface dark:border-dark-border flex  flex-col hover:border-dark-accent/30  rounded-[9px] '>
                    <div className={cn(`h-full w-[3px] absolute left-0 top-0 rounded-l-2xl ${sample.severity === "low" ? 'bg-blue-500' : sample.severity === "medium" ? 'bg-orange-500' : 'bg-red-500'}`)}></div>
                    <div onClick={() => setshowcode({ show: sample.id === showcode.id ? !showcode.show : true, id: sample.id })} className='flex justify-between p-5 select-none cursor-pointer'>
                        <div className='flex gap-3 items-center'>
                            <StatusIcon type={sample.type} variant={sample.severity} />
                            <div className='xss:text-[11px] '>{sample.sampletitle}</div>
                        </div>
                        <div className='flex items-center xss:gap-1 md:gap-3'>
                            <RiskText variant={sample.severity}>{sample.severity}</RiskText>
                            <motion.div initial={{ rotate: 0 }} animate={showcode.show && showcode.id === sample?.id ? { rotate: 180 } : { rotate: 0 }}><ChevronDown size={17} /></motion.div>
                        </div>
                    </div>
                    <AnimatePresence>
                        {showcode.show && showcode.id === sample.id && <motion.div layout initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2, ease: 'easeInOut' }}>
                            <div className='pb-5 px-5 flex flex-col gap-3'>
                                <p className=' dark:text-dark-text-muted text-xs'>{sample.sampledesc}</p>
                                <p className='text-[10px] lg:text-[11px]'>{sample.samplelocation}</p>
                                 <div className='dark:bg-dark-surface bg-light-surface border-light-border p-4 rounded-[3px] border dark:border-dark-accent/40 '>
                                    <p className='xss:text-[10px] lg:text-xs flex gap-2 items-center'><CircleCheckBig className='text-emerald-500 xss:size-3 lg:size-4 ' />Suggested fix</p>
                                    <Syntax code={sample.suggestedcode} language={sample.suggesstedcodelanguage} />
                                </div>
                            </div>
                        </motion.div>}
                    </AnimatePresence>
                </motion.div>
            })}
        </div>
    )
}

export default sample
