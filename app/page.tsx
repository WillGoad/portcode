'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Home() {

  const portcodeexamples = ['wiger-fto50-lzoyg', '7ow0w-bew20-gzri9', 'yw5hn-sqqhm-8daa7'];

  const [action1Text, setAction1Text] = React.useState('Get Started');
  const [action2Text, setAction2Text] = React.useState('View Examples   →');
  const [exampleMode, setExampleMode] = React.useState(false);
  const [exampleSite, setExampleSite] = React.useState(portcodeexamples[0]);
  const [menuOpen, setMenuOpen] = React.useState(false);

  const onExampleModeOn = () => {
    if (exampleMode === false) {
      setExampleMode(true);
      setAction1Text('Build Yours');
      setAction2Text('Next Example   →');
    } else {
      const rand = Math.floor(Math.random() * portcodeexamples.length);
      setExampleSite(portcodeexamples[rand]);
    }
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  }


  return (
    <main className="min-h-screen  p-12">
      <div className="flex flex-row justify-center gap-16">
        <div className={!exampleMode ? "flex flex-col items-center justify-around gap-16" : "flex flex-col items-center justify-around max-w-xl gap-16"}>
          <header className="flex items-center sm:justify-between justify-center w-full max-w-5xl">
            <Link href="/">
              <Image
                src="/portcodelogo.png"
                alt="Portcode"
                width={100}
                height={100}
              />
            </Link>
            {menuOpen && <div className="hidden lg:flex flex-row items-center justify-center gap-5 transition-all">
              <p><Link href='/onboarding'>Signup</Link></p>
              <p><Link href='/signin'>Signin</Link></p>
              <p><Link href='/stats'>Stats for Hackers</Link></p>
            </div>}
            {!menuOpen && <svg xmlns="http://www.w3.org/2000/svg" className="hidden lg:block" height="1em" viewBox="0 0 448 512" onClick={toggleMenu}><path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" /></svg>}
            {menuOpen && <svg xmlns="http://www.w3.org/2000/svg" className="hidden lg:block" height="1em" viewBox="0 0 384 512" onClick={toggleMenu}><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" /></svg>}
          </header>


          <div className='flex flex-row items-start justify-center w-full max-w-5xl'>
            <div className='flex flex-col'>
              <div className="grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">

                <div className={exampleMode ? "hidden sm:flex flex-col items-center justify-center w-full mb-8 lg:mb-0 lg:col-span-2" : "flex flex-col items-center justify-center w-full mb-8 lg:mb-0 lg:col-span-2"}>
                  <h1 className={`mb-3 text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500 lg:col-span-2 hover:from-green-500 hover:to-blue-500`}>
                    Build your portfolio in minutes
                  </h1>
                  <h2 className={`my-3 text-2xl font-semibold`}>
                    The portfolio site builder{' '}
                    <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500 hover:from-green-500 hover:to-blue-500'>for developers</span>
                  </h2>
                  <p className={`mt-4 max-w-[30ch] text-lg opacity-50`}>
                    Github&apos;s great for code, LinkedIn for career history, but your Portcode is what you send recruiters, hiring managers, and potential clients.
                  </p>
                </div>

                {exampleMode &&
                  <div className='lg:hidden relative w-full h-[447px] shadow-lg rounded-2xl'>
                    <iframe className='rounded-2xl w-full h-[447px]' src={'https://portco.de/' + exampleSite} title="Example Portfolio" />
                  </div>}

              </div>

              <div className="flex flex-col items-center w-full max-w-5xl mb-32 mt-8 lg:flex-row justify-start gap-4">
                <Link href="/onboarding" className="w-full mb-4 text-center text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-green-500 rounded-lg px-2.5 py-2 lg:w-auto lg:mb-0 lg:mr-4 hover:from-green-500 hover:to-blue-500 hover:border-green-500 hover:border-2 transition duration-700 hover:animate-pulse">
                  {action1Text}
                </Link>
                <a className="w-full text-center text-lg font-semibold rounded-lg px-2.5 py-2 lg:w-auto cursor-pointer" onClick={onExampleModeOn}>
                  {action2Text}
                </a>
              </div>
              <div className="lg:hidden flex flex-row flex-wrap items-center justify-center gap-5 transition-all">
                <p><Link href='/onboarding'>Signup</Link></p>
                <p><Link href='/signin'>Signin</Link></p>
                <p><Link href='/stats'>Stats for Hackers</Link></p>
              </div>
            </div>
            <div>
              {!exampleMode &&
                <div className='hidden lg:block relative w-[375px] h-[447px] shadow-lg rounded-2xl'>
                  <iframe className='rounded-2xl w-[375px] h-[447px]' src={'https://portco.de/' + exampleSite} title="Example Portfolio" />
                </div>}
            </div>
          </div>

          <p className='text-center opacity-50'>Built using <a href='https://heledron.com/tools/pixel-text-generator/'>Pixel Text Generator</a>, <a href='https://fontawesome.com/'>Font Awesome</a>, <a href='https://nextjs.org/'>NextJS</a> and <a href='https://tailwindcss.com/'>TailwindCSS</a></p>
        </div>
        {exampleMode &&
          <div className='hidden lg:block relative w-[375px]  shadow-lg rounded-2xl'>
            <iframe className='rounded-2xl w-[375px] h-full' src={'https://portco.de/' + exampleSite} title="Example Portfolio" />
          </div>}
      </div>
    </main>
  )
}
