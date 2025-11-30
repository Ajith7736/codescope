import {
    FileCode,
    Bug,
    Search,
    Terminal,
    BarChart2,
    Layers,
    AlertTriangle,
    ClipboardList
} from "lucide-react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

const icons = [
    { name: "FileCode", icon: <FileCode size={20} className="text-light-text-primary dark:text-dark-text-primary" /> },
    { name: "Bug", icon: <Bug size={20} className="text-light-text-primary dark:text-dark-text-primary" /> },
    { name: "Search", icon: <Search size={20} className="text-light-text-primary dark:text-dark-text-primary" /> },
    { name: "Terminal", icon: <Terminal size={20} className="text-light-text-primary dark:text-dark-text-primary" /> },
    { name: "BarChart2", icon: <BarChart2 size={20} className="text-light-text-primary dark:text-dark-text-primary" /> },
    { name: "Layers", icon: <Layers size={20} className="text-light-text-primary dark:text-dark-text-primary" /> },
    { name: "AlertTriangle", icon: <AlertTriangle size={20} className="text-light-text-primary dark:text-dark-text-primary" /> },
    { name: "ClipboardList", icon: <ClipboardList size={20} className="text-light-text-primary dark:text-dark-text-primary" /> },
    { name: "FileCode", icon: <FileCode size={20} className="text-light-text-primary dark:text-dark-text-primary" /> },
    { name: "Bug", icon: <Bug size={20} className="text-light-text-primary dark:text-dark-text-primary" /> },
    { name: "Search", icon: <Search size={20} className="text-light-text-primary dark:text-dark-text-primary" /> },
    { name: "Terminal", icon: <Terminal size={20} className="text-light-text-primary dark:text-dark-text-primary" /> },
    { name: "BarChart2", icon: <BarChart2 size={20} className="text-light-text-primary dark:text-dark-text-primary" /> },
    { name: "Layers", icon: <Layers size={20} className="text-light-text-primary dark:text-dark-text-primary" /> },
    { name: "AlertTriangle", icon: <AlertTriangle size={20} className="text-light-text-primary dark:text-dark-text-primary" /> },
    { name: "ClipboardList", icon: <ClipboardList size={20} className="text-light-text-primary dark:text-dark-text-primary" /> },
    { name: "FileCode", icon: <FileCode size={20} className="text-light-text-primary dark:text-dark-text-primary" /> },
    { name: "Bug", icon: <Bug size={20} className="text-light-text-primary dark:text-dark-text-primary" /> },
    { name: "Terminal", icon: <Terminal size={20} className="text-light-text-primary dark:text-dark-text-primary" /> },
    { name: "BarChart2", icon: <BarChart2 size={20} className="text-light-text-primary dark:text-dark-text-primary" /> },
    { name: "Layers", icon: <Layers size={20} className="text-light-text-primary dark:text-dark-text-primary" /> },
    { name: "AlertTriangle", icon: <AlertTriangle size={20} className="text-light-text-primary dark:text-dark-text-primary" /> },
    { name: "ClipboardList", icon: <ClipboardList size={20} className="text-light-text-primary dark:text-dark-text-primary" /> },
    { name: "FileCode", icon: <FileCode size={20} className="text-light-text-primary dark:text-dark-text-primary" /> },
    
    { name: "Bug", icon: <Bug size={20} className="text-light-text-primary dark:text-dark-text-primary" /> },
    { name: "Terminal", icon: <Terminal size={20} className="text-light-text-primary dark:text-dark-text-primary" /> },
    { name: "BarChart2", icon: <BarChart2 size={20} className="text-light-text-primary dark:text-dark-text-primary" /> },
    { name: "Layers", icon: <Layers size={20} className="text-light-text-primary dark:text-dark-text-primary" /> },
    { name: "AlertTriangle", icon: <AlertTriangle size={20} className="text-light-text-primary dark:text-dark-text-primary" /> },
    { name: "ClipboardList", icon: <ClipboardList size={20} className="text-light-text-primary dark:text-dark-text-primary" /> },
    { name: "FileCode", icon: <FileCode size={20} className="text-light-text-primary dark:text-dark-text-primary" /> },
    

];

function IconCircle() {
    const boxref = useRef(null)

    const { scrollYProgress } = useScroll({
        target: boxref
    })


   const x = useTransform(scrollYProgress,[0,1],["-100","0%"])

   

    return (
        <div ref={boxref} className="flex items-center touch-none no-scrollbar w-full gap-4 h-[30vh]  overflow-auto mb-10">
            <motion.div  style={{ x }}  className="flex transition-all ease-in-out duration-1000 items-center gap-6 py-6">
                {icons.map((icon, index) => (
                    <motion.div
                        key={index}
                        initial = {{ opacity : 0 }}
                        whileInView={{ opacity : 1}}
                        viewport={{
                            amount : "all"
                        }}
                        className={`animate-bounce p-7 rounded-full border border-light-border dark:border-dark-border dark:bg-dark-surface shadow-md ${index % 2 === 0 && 'mb-10'}`}
                    >
                        {icon.icon}
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}

export default IconCircle;
