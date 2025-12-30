import { authClient } from '@/lib/auth-client';
import LinkLoader from '@/ui/loaders/LinkLoader';
import { Trash2, TriangleAlert } from 'lucide-react'
import { redirect } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

function DeleteUser() {
    const [isdeleting, setisdeleting] = useState<boolean>(false)
    
    const handledelete = async () => {
        try {
            setisdeleting(true);
            const { error, data } = await authClient.deleteUser();

            if (error) {
                return toast.error(error.message)
            }

            toast.success(data.message);

        } catch (err) {
            toast.error("Something went wrong")
        } finally {
            setisdeleting(false);
            redirect("/Signup")
        }
    }

    return (
        <div className=" xl:w-[75vw] w-full">
            <div className="text-[10px] mb-5 text-red-500 gap-2 font-bold flex items-center"><h1>ACCOUNT SECURITY</h1> <span className="w-1 h-1 bg-red-400/60 rounded-full"></span></div>
            <div className="bg-red-500/5 border border-red-500/20 rounded-[11px] text-sm p-5 text-red-500 xss:flex xss:flex-col md:flex-row md:justify-between md:items-center gap-5">
                <div className="flex gap-3">
                    <div className="bg-red-600/10 p-3 w-fit border border-red-500/20 rounded-md">
                        <TriangleAlert className="size-6" />
                    </div>
                    <div className="md:w-[30vw]">
                        <h3 className="font-bold">DELETE ACCOUNT</h3>
                        <p className="text-gray-500 text-[10px]">Permanently delete your account and all associated data. This action is irreversible and cannot be undone.</p>
                    </div>
                </div>
                <button className="xss:text-[12px] md:text-[9px] cursor-pointer hover:bg-red-600/10 transition-all duration-300 bg-red-600/5 py-3 px-5 border border-red-500/20  flex gap-3 justify-center items-center" onClick={handledelete}>{isdeleting ? <LinkLoader type='Unlink' /> : <><Trash2 className="size-4" /> DELETE ACCOUNT PERMANENTLY</>}</button>
            </div>
        </div>
    )
}

export default DeleteUser