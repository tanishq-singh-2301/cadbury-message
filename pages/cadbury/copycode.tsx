import { NextPage } from "next";
import Head from 'next/head';
import { useState } from "react";

const fallbackCopyTextToClipboard = (text: string): boolean => {
    var textArea = document.createElement("textarea");
    textArea.value = text;

    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        return document.execCommand('copy');
    } catch (err) { }

    document.body.removeChild(textArea);
    return false;
}

const copyTextToClipboard = (text: string): boolean => {
    if (!navigator.clipboard)
        return fallbackCopyTextToClipboard(text);

    try {
        navigator.clipboard.writeText(text);
        return true;
    } catch (error) {
        return false;
    }
}

const CopyCode: NextPage = () => {
    const [copy, setCopy] = useState<boolean>(false);

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
                    <p className="text-yellow-400 text-center w-full text-xl font-semibold sm:font-bold">Send this to the person</p>
                    <p className="text-white text-center w-full text-sm font-light">Copy the link</p>
                </div>

                <div className="w-full h-4/6 flex justify-center items-center px-10 py-5">
                    <button
                        onClick={() => {
                            const copyied: boolean = copyTextToClipboard(window.location.href.replace("copycode", "decode"))

                            if (copyied)
                                setCopy(true)

                            else
                                setCopy(false);
                        }}
                        className="max-w-[370px] w-full text-center flex justify-center items-center h-16 bg-pink-600 rounded-full font-semibold sm:font-extrabold text-base text-white"
                    >{copy ? "Copyied" : "Copy Link"}</button>
                </div>
            </main>

        </div>
    )
}

export default CopyCode;