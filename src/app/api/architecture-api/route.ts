import { NextResponse } from "next/server";
import { z } from "zod"
import { generateObject, generateText } from "ai"
import { google } from "@ai-sdk/google"
import { Project } from "@/types/type";


export async function POST(req: Request) {
    try {

        const AnalysisSchema = z.object({
                type : z.enum(["Architecture"]),
                summary : z.string(),
                totalissues : z.number(),
                score : z.number(),
                issues : z.array(
                    z.object({
                        severity : z.enum(["high","medium","low"]),
                        issuetitle : z.string(),
                        issuedesc : z.string(),
                        issuelocation : z.string(),
                        suggesstedfix : z.string(),
                    })
                )
            })

        const project: Project = await req.json();
        const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

    
        if (!apiKey) {
            return NextResponse.json({
                message: "Api key is missing",
            }, { status: 400 })
        }

        if (!project) return NextResponse.json({ message: "Data error , please try again" }, { status: 400 })

        // const { object } = await generateObject({
        //     model: google("gemini-2.0-flash"),
        //     schema : AnalysisSchema,
        //     prompt : `Analyse the given code ${project.projectcode} and just give a single data object its just for testing and score should be out of 100 find as much issues possible`
        // })


        // console.log(object);

        return NextResponse.json({ message: "recieved" }, { status: 200 })
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Server Error" }, { status: 500 })
    }
}