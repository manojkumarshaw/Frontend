import Footer from '@/components/footer'
import Header from '@/components/header'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Errorpage = () => {
    return (
        <section className="w-screen h-screen justify-center flex place-items-center">
            <div className="py-8 px-4 mx-auto ">
                <div className="mx-auto  text-center w-full">
                    <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">Error&nbsp;404</p>
                    <p className="mb-4 text-lg font-medium text-gray-500 dark:text-gray-400">We are sorry, the page you requested cannot be found.</p>
                    <Link href="/" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Back to Homepage</Link>
                </div>
            </div>
            <Footer />

        </section>
    )
}

export default Errorpage
