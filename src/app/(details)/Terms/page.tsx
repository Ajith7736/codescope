import BackButton from "@/ui/Buttons/BackButton"

const Page = () => {

    const Terms: { title: string, desc: string, points?: string[] }[] = [
        {
            title: "ACCEPTANCE OF TERMS",
            desc: "By accessing or using CodeScope AI, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions of this agreement, then you may not access the website or use any services."
        },
        {
            title: "USE LICENSE",
            desc: "Permission is granted to temporarily download one copy of the materials (information or software) on CodeScope AI's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:",
            points: [
                "Modify or copy the materials;",
                "Use the materials for any commercial purpose, or for any public display;",
                "Attempt to decompile or reverse engineer any software contained on the website;",
                "Remove any copyright or other proprietary notations from the materials;",
                "Transfer the materials to another person or \"mirror\" the materials on any other server."
            ]
        },
        {
            title: "USER DATA & PRIVACY",
            desc: "Our analysis engine processes code in volatile memory. We do not store your source code files permanently. Metadata related to analysis reports is stored to provide you with historical insights. For more details, please review our Privacy Policy section."
        },
        {
            title: "DISCLAIMER",
            desc: "The materials on CodeScope AI's website are provided on an 'as is' basis. CodeScope AI makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights."
        },
        {
            title: "LIMITATIONS",
            desc: "In no event shall CodeScope AI or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on CodeScope AI's website."
        },
        {
            title: "RAZORPAY TERMS AND CONDITIONS",
            desc: "Your use of the website and/or purchase from us are governed by following Terms and Conditions:",
            points: [
                "The content of the pages of this website is subject to change without notice.",
                "Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials found or offered on this website for any particular purpose. You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.",
                "Your use of any information or materials on our website and/or product pages is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products, services or information available through our website and/or product pages meet your specific requirements.",
                "Our website contains material which is owned by or licensed to us. This material includes, but is not limited to, the design, layout, look, appearance and graphics. Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions.",
                "All trademarks reproduced in our website which are not the property of, or licensed to, the operator are acknowledged on the website.",
                "Unauthorized use of information provided by us shall give rise to a claim for damages and/or be a criminal offense.",
                "From time to time our website may also include links to other websites. These links are provided for your convenience to provide further information.",
                "You may not create a link to our website from another website or document without CodeScope’s prior written consent.",
                "Any dispute arising out of use of our website and/or purchase with us and/or any engagement with us is subject to the laws of India.",
                "We shall be under no liability whatsoever in respect of any loss or damage arising directly or indirectly out of the decline of authorization for any Transaction, on account of the Cardholder having exceeded the preset limit mutually agreed by us with our acquiring bank from time to time."
            ]
        },
    ];

    return (
        <div className="">
            <BackButton href={"/"} className="m-4" />
            <div className="flex flex-col p-5 gap-5 mx-auto lg:w-[60%]">
                <div className="flex flex-col items-start w-full">
                    <h1 className="text-2xl font-family-sans font-extrabold">TERMS AND CONDITIONS</h1>
                    <p className="text-xs text-gray-300">Last Updated at: 4 Jan 2025</p>
                </div>
                {Terms.map((Term, indx) => {
                    return <div key={indx}>
                        <h3 className="font-extrabold">{indx + 1}. {Term.title}</h3>
                        <p className="text-xs text-gray-300 pl-10 mt-2">{Term.desc}</p>
                        {Term.points && <ol className="list-disc pl-16">
                            {Term.points?.map((point, indx) => {
                                return <li className="text-xs text-gray-300 mt-3" key={indx}>{point}</li>
                            })}
                        </ol>}
                    </div>
                })}

            </div>
        </div>
    )
}

export default Page