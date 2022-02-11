import { NextPage } from "next";
import Head from 'next/head';

const TermsAndCondition: NextPage = () => {
    return (
        <div id='_app' className="flex justify-center items-center flex-col">

            <Head>
                <title>Cadbury QR-Code</title>
            </Head>

            <main className="h-full w-full flex flex-col justify-center items-center">
                <h1 className="text-white font-semibold">Made only for education pourpose</h1>
                <h1 className="text-white font-semibold">By Tanishq singh</h1>
            </main>

        </div>
    )
}

export default TermsAndCondition;