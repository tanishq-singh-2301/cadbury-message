import { NextPage } from "next";
import Head from 'next/head';
import { useState } from "react";
import { NextRouter, useRouter } from "next/router";

const CreatingGift: NextPage = () => {
    const [text, setText] = useState<string>("");
    const router: NextRouter = useRouter();

    return (
        <div id='_app' className="flex justify-center items-center flex-col">

            <Head>
                <title>Cadbury QR-Code</title>
            </Head>

            <header className="h-1/6 w-full flex justify-center items-center">
                <img src="https://www.cadburycelebrationsgifting.com/img/logo.svg" className="h-1/2" />
            </header>

            <main className="h-5/6 w-full flex flex-col justify-center items-center py-5">
                <div className="w-full h-1/6 flex justify-evenly items-center flex-col">
                    <p className="text-yellow-400 text-center w-full text-xl font-semibold sm:font-bold">Say it in your own words</p>
                    <p className="text-white text-center w-full text-sm font-light">Write a personal message and choose the right design to create the perfect greeting card.</p>
                </div>

                <div className="w-full h-4/6 flex justify-center items-center px-10 py-5">
                    <div className="w-full h-full flex justify-center items-center border-2 border-yellow-400 rounded-2xl">
                        <textarea
                            cols={30}
                            rows={10}
                            className="h-full w-full rounded-2xl bg-transparent text-white p-5 sm:p-10 outline-none border-0"
                            maxLength={600}
                            value={text}
                            onChange={e => setText(e.target.value)}
                        ></textarea>
                    </div>
                </div>

                <div className="w-full h-1/6 flex justify-center items-center flex-col px-10">
                    <button
                        onClick={() => {
                            if (text.length < 5)
                                alert("Text should be minimun 5 letters.")

                            else {
                                const encrypted: string = Buffer.from(text).toString('base64');
                                router.replace(`/cadbury/copycode?encrypted=${encrypted}`)
                            }
                        }}
                        className="max-w-[370px] w-full text-center flex justify-center items-center h-16 bg-pink-600 rounded-full font-semibold sm:font-extrabold text-base text-white"
                    >Generate</button>
                </div>
            </main>

        </div>
    )
}

export default CreatingGift;