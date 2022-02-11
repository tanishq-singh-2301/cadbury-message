import type { NextPage } from 'next';
import Head from 'next/head';
import * as QRCode from 'qrcode';
import { useEffect, useState } from 'react';
const qrcode_reader = require('qrcode-reader')
import Link from 'next/link';

let url: string = "https://cadbury-message.vercel.app/?token=cadburycelebrations"

const Home: NextPage = () => {
  useEffect(() => {

    QRCode.toString(url, { type: 'terminal' },
      function (err, QRcode) {

        if (err) return console.log("error occurred")

        // document.getElementById("qr_code")!.innerHTML = QRcode.trim()
      })

  }, [])


  return (
    <div id='_app' className="flex justify-center items-center flex-col">
      <Head>
        <title>Cadbury QR-Code</title>
      </Head>

      <header className='h-1/5 w-full'></header>

      <main className='h-4/5 w-full flex justify-center items-center flex-col px-10'>

        <img
          src={"https://www.cadburycelebrationsgifting.com/img/logo-big.png"}
          className="h-40 sm:h-56 md:h-64"
        />

        <div
          className='h-full max-h-36 w-full flex justify-between items-center flex-col'
        >
          <p className='text-white text-center w-full text-lg'>Let’s create a sweet surprise for your loved ones!</p>

          <Link href="/cadbury/creategift">
            <button
              className='max-w-[270px] w-full text-center flex justify-center items-center h-16 bg-pink-600 rounded-full font-semibold sm:font-extrabold text-base text-white'
            >Send a customized gift</button>
          </Link>

          {/* <Link href="/recieve">
            <a
              href='/recieve'
              className='max-w-[270px] w-full h-16 bg-white rounded-full font-semibold sm:font-extrabold text-base text-pink-600'
            >Receive your gift</a>
          </Link> */}

        </div>

      </main>

      <footer className='h-1/5 w-full flex justify-center items-end'>

        <Link href='/terms_and_condition'>
          <button
            className='text-white font-normal mb-2'
          >View the Terms & Conditions</button>
        </Link>

      </footer>
    </div>
  )
}

export default Home