import React from 'react'

function SampleCode() {

  const code = `
import db from "./db";

export async function getUserData(req: any, res: any) {
  const userId = req.query.id;

  const query = SELECT * FROM users WHERE id = userId;
  const user = await db.query(query);

  const logs = [];
  for (let i = 0; i < 100000; i++) {
    logs.push({ index: i, status: "ok" });
  }

  res.json({
    user,
    logsCount: logs.length,
  });
}`
  return (
    <div className='dark:bg-dark-surface shadow-lg m-5 bg-light-surface border xss:w-md xl:w-xl border-light-border dark:border-dark-border rounded-[7px]'>
      <div className='p-2 flex gap-2'>
        <div className='w-2 h-2 bg-red-500/30 border border-red-500 rounded-full'></div>
        <div className='w-2 h-2 bg-yellow-500/30 border border-yellow-500 rounded-full'></div>
        <div className='w-2 h-2 bg-green-500/30 border border-green-500 rounded-full'></div>
      </div>
      <div className='p-5 dark:bg-dark-background bg-light-background rounded-b-[7px]'>
        <pre className='text-xs dark:text-dark-text-muted text-black'>{code}</pre>
      </div>
    </div>
  )
}

export default SampleCode

