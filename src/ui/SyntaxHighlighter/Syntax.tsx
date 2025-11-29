"use client"
import { Check, Copy } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { tomorrow, tomorrowNight } from 'react-syntax-highlighter/dist/esm/styles/hljs';


function Syntax({ language, code }: { language: string | undefined, code: string}) {

    const { theme } = useTheme();
    const [copied, setcopied] = useState(false);

    const handlecopy = () => {
        navigator.clipboard.writeText(code!);
        setcopied(true);
    }

    useEffect(() => {
        if (copied) {
            setTimeout(() => {
                setcopied(false);
            }, 1000);
        }
    }, [copied])


    return (
        <div className="m-3 relative overflow-auto rounded-[3px] border dark:border-dark-border border-light-border">
            <div className='text-[10px] absolute top-1 left-1 text-neutral-500'>{language}</div>
            {copied ? <Check className='absolute right-2 top-2 cursor-pointer' size={12} color={theme === "dark" ? "gray" : "black"} /> : <Copy className='absolute right-2 top-2 cursor-pointer' onClick={handlecopy} color={theme === "dark" ? "gray" : "black"} size={10} />}
            <SyntaxHighlighter
                language={language}
                style={theme === "dark" ? tomorrowNight : tomorrow}
                wrapLongLines
                customStyle={{
                    fontSize: 13,
                    paddingTop: 30
                }}
            >
                {code}
            </SyntaxHighlighter>
        </div>
    )
}

export default Syntax
