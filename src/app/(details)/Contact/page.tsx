"use client"
import useFetch from "@/hooks/useFetch";
import { contactformschema, contactInputs } from "@/lib/client/Schemas/contactschema/Schema";
import { delay } from "@/lib/delay";
import BackButton from "@/ui/Buttons/BackButton";
import InputBox from "@/ui/Forms/InputBox";
import ButtonLoader from "@/ui/loaders/ButtonLoader";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";


const Page = () => {

    const { register, formState: { errors, isSubmitting }, handleSubmit } = useForm<contactInputs>({
        resolver: zodResolver(contactformschema)
    })

    const { data, fetchdata, loading } = useFetch("/api/addmessage", "POST")

    const onSubmit: SubmitHandler<contactInputs> = async (data) => {
        await delay(3)
        await fetchdata(data);
    }

    useEffect(() => {

        if (data?.success) {
            toast.success(data?.message);
        }

    }, [data])


    return (
        <div>
            <BackButton href={"/"} className="m-4" />
            <div className="flex xss:flex-col lg:flex-row xss:items-center lg:items-start">
                <div className="p-5 xss:w-full flex flex-col gap-3  xl:w-[50%]">
                    <p className="text-xs font-extralight text-dark-accent">GET IN TOUCH</p>
                    <h1 className="xss:text-4xl lg:text-6xl font-family-sans font-extrabold">How Can <span className="text-dark-accent">I Help You</span></h1>
                    <p className="text-sm font-family-sans mt-3 text-dark-text-muted/70">
                        Whether you have a question, need technical assistance, or simply want to connect—I'm here to help! Reach out and I'll get back to you as soon as possible.
                    </p>
                </div>
                <div className="p-5 xss:w-full md:w-[80%] xl:w-[50%]">
                    <div className="p-5 rounded-lg dark:bg-gray-800/20 border border-gray-500/20">
                        <form
                            className="flex flex-col gap-4"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <label
                                htmlFor="fullname"
                                className="text-xs font-family-mono"
                            >
                                FULL NAME
                            </label>
                            <InputBox
                                errors={errors.fullname?.message}
                                register={register}
                                id="fullname"
                                type="text"
                                placeholder="Enter your Full Name"
                            />

                            <label
                                htmlFor="email"
                                className="text-xs font-family-mono"
                            >
                                EMAIL
                            </label>
                            <InputBox
                                errors={errors.email?.message}
                                register={register}
                                id="email"
                                type="email"
                                placeholder="Enter your Email"
                            />

                            <label
                                htmlFor="subject"
                                className="text-xs font-family-mono"
                            >
                                SUBJECT
                            </label>
                            <InputBox
                                errors={errors.subject?.message}
                                register={register}
                                id="subject"
                                type="text"
                                placeholder="Enter Subject"
                            />
                            <label
                                htmlFor="message"
                                className="text-xs font-family-mono"
                            >
                                MESSAGE
                            </label>
                            <InputBox
                                inputtype="textarea"
                                errors={errors.message?.message}
                                register={register}
                                id="message"
                                type="text"
                                placeholder="Enter your message"
                            />

                            {isSubmitting || loading ? <button className="bg-indigo-600 font-extrabold cursor-pointer hover:bg-indigo-600/90 transition-all duration-300 p-2 rounded-md"><ButtonLoader /></button> : <input
                                type="submit"
                                value={"Send Message"}
                                className="bg-indigo-600 font-extrabold cursor-pointer hover:bg-indigo-600/90 transition-all duration-300 p-2 rounded-md"
                            />}
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Page;