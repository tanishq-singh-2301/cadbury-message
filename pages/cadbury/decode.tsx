import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

const loadScript: Function = (src: string): Promise<boolean> => {
    return new Promise((resolve) => {
        try {
            const script: HTMLScriptElement = document.createElement("script");
            script.src = src;

            document.body.appendChild(script);

            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);

        } catch (error) {
            resolve(false);
        }
    })
}

const Decode: NextPage<{ decoded: string; }> = ({ decoded }) => {
    const [scanned, setScanned] = useState<boolean>(false);
    const [btn, setBtn] = useState<boolean>(false);

    return (
        <div id='_app' className="flex justify-center items-center flex-col">

            <Head>
                <title>Cadbury QR-Code</title>
            </Head>

            <header className="h-1/6 w-full flex justify-center items-center">
                <img src="https://www.cadburycelebrationsgifting.com/img/logo.svg" className="h-1/2" />
            </header>

            <main className="h-5/6 w-full flex flex-col justify-center items-center py-5">
                {scanned && <div className="w-full h-1/6 flex justify-evenly items-center flex-col">
                    <p className="text-yellow-400 text-center w-full text-xl font-semibold sm:font-bold">Someone wrote this for you</p>
                    <p className="text-white text-center w-full text-sm font-light">Write a personal message and choose the right design to create the perfect greeting card.</p>
                </div>}

                <div className={`w-full ${scanned ? "h-4/6" : "h-5/6"} flex justify-center items-center px-10 py-5`}>
                    {scanned ?
                        <div className="w-full h-full flex justify-center items-center border-2 border-yellow-400 rounded-2xl">
                            <textarea
                                cols={30}
                                rows={10}
                                className="h-full w-full rounded-2xl bg-transparent text-white p-5 sm:p-10 outline-none border-0"
                                maxLength={600}
                                value={decoded}
                                readOnly={true}
                            ></textarea>
                        </div> :
                        <div className="w-full h-full flex justify-center items-center flex-col">
                            <div>
                                <div id="qr-reader" style={{ width: "500px" }}></div>
                                <div id="qr-reader-results"></div>
                            </div>
                            <button
                                onClick={async () => {
                                    const success = await loadScript("https://unpkg.com/html5-qrcode")
                                    if (success) {
                                        const window_ = window as any;
                                        var lastResult: any, countResults: any = 0;

                                        var html5QrcodeScanner = new window_.Html5QrcodeScanner("qr-reader", { fps: 10, qrbox: 250 });
                                        html5QrcodeScanner.render(onScanSuccess);
                                    }

                                    function onScanSuccess(decodedText: string, decodedResult: string) {
                                        if (decodedText !== lastResult) {
                                            ++countResults;
                                            lastResult = decodedText;

                                            if (decodedText.toLowerCase().includes("cadbury")) {
                                                setScanned(true)
                                            } else {
                                                console.log(decodedResult)
                                            }
                                        }
                                    }

                                }}
                                className="max-w-[370px] w-full text-center flex justify-center items-center h-16 bg-pink-600 rounded-full font-semibold sm:font-extrabold text-base text-white"
                            >Scan Qr Code</button>

                        </div>}
                </div>

                <div className="w-full h-1/6 flex justify-center items-center flex-col px-10">
                    {scanned &&
                        <Link href="/cadbury/creategift">
                            <button
                                className="max-w-[370px] w-full text-center flex justify-center items-center h-16 bg-pink-600 rounded-full font-semibold sm:font-extrabold text-base text-white"
                            >Create Your Own</button>
                        </Link>}
                </div>
            </main>

        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const { encrypted } = query;

    if (encrypted) {
        const decoded: string = Buffer.from(encrypted as string, 'base64').toString('ascii');

        return {
            props: {
                decoded
            }
        }
    }

    return {
        props: {},
        redirect: {
            destination: "/",
            permanent: false
        }
    }
}

export default Decode;