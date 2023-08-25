import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12">
      <header className="flex items-center justify-between w-full max-w-5xl">
        <a href="https://portco.de">
          <Image
            src="/portcodelogo.png"
            alt="Portcode"
            width={100}
            height={100}
          />
        </a>
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" /></svg>
      </header>

      
      <div className='mt-16 flex flex-row items-start justify-center w-full max-w-5xl'>
        <div className='flex flex-col'>
          <div className="grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">

            <div className="flex flex-col justify-center w-full mb-8 lg:mb-0 lg:col-span-2">
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

          </div>

          <div className="flex flex-col items-center w-full max-w-5xl mb-32 mt-8 lg:flex-row justify-start gap-4">
            <a href="https://app.portco.de" className="w-full mb-4 text-center text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-green-500 rounded-lg px-2.5 py-2 lg:w-auto lg:mb-0 lg:mr-4 hover:from-green-500 hover:to-blue-500 hover:border-green-500 hover:border-2 transition duration-700 hover:animate-bounce">
              Get Started
            </a>
            <a href="https://app.portco.de" className="w-full text-center text-lg font-semibold rounded-lg px-2.5 py-2 lg:w-auto">
              View Examples   →
            </a>
          </div>
        </div>
        <div>
          <div className='hidden lg:block relative w-[375px] h-[447px] shadow-lg rounded-2xl'>
            <iframe className='rounded-2xl w-[375px] h-[447px]' src="https://tailwindcss.com" title="Google" />
          </div>
        </div>
      </div>
    </main>
  )
}
