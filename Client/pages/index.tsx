import Link from "next/link";

export default function Home() {
 
  return (
    <>
  



  <div className="w-screen h-screen overflow-hidden relative before:block before:absolute before:bg-black before:h-full before:w-full before:top-0 before:left-0 before:z-10 before:opacity-70">
        <img src="https://media.discordapp.net/attachments/1138848747665768499/1206704700980854794/Landing.png?ex=65dcfa54&is=65ca8554&hm=7f46096acac86949e76bed83820940a9961a2b700d4fff73b8e5fbcb1b1c10a3&=&format=webp&quality=lossless&width=1440&height=669" className="absolute top-0 left-0 min-h-full ob" alt="" />
        <div className="relative z-20 max-w-screen-lg mx-auto grid grid-cols-12 h-full items-center">
          <div className="col-span-6">
            <span className="uppercase text-white text-xs font-bold mb-2 block">NO CODE!</span>
            <h1 className="text-white font-extrabold text-5xl mb-8">Build your website Custom templates, Custom Style, Images,Videos with no code</h1>
            <p className="text-stone-100  text-base mb-8">
              and more... so what are you waiting for
            </p>
            <Link href={"auth"} className="mt-8 text-white uppercase py-4 text-base font-light px-10 border border-white hover:bg-white hover:bg-opacity-10">Get started</Link>
          </div>
        </div>
      </div>
      <div className="bg-[#BFA888] py-20">
        <div className="max-w-screen-lg mx-auto flex justify-between items-center">
          <div className="max-w-xl">
            <h2 className="font-black text-sky-950 text-3xl mb-4">No code is cool</h2>
          </div>
        </div>
      </div>

    
      <section className="bg-white dark:bg-gray-900">
                    <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                        <div className="mr-auto place-self-center lg:col-span-7">
                            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold leading-none md:text-5xl xl:text-6xl dark:text-white">Your time is gold</h1>
                            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">Because of that we develope this tool to help you creating websites with no code.</p>
                   
                        </div>
                        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
                            <img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png" alt="mockup" />
                        </div>
                    </div>
                </section>


      <div className="py-12 relative overflow-hidden bg-white">
        <div className="grid grid-cols-2 max-w-screen-lg mx-auto">
          <div className="w-full flex flex-col items-end pr-16">
            <h2 className="text-[#64618C] font-bold text-2xl max-w-xs text-right mb-12 mt-10">Drag and drop</h2>
            <div className="h-full mt-auto overflow-hidden relative">
              <img src="https://blogs.articulate.com/rapid-elearning/wp-content/uploads/sites/7/2016/07/drag-drop-350.png" className="h-full w-full object-contain" alt="" />
            </div>
          </div>
          <div className="py-20 bg-slate-100 relative before:absolute before:h-full before:w-screen before:bg-sky-950 before:top-0 before:left-0">
            <div className="relative z-20 pl-12">
              <h2 className="text-[#f7d0b6] font-black text-5xl leading-snug mb-10">Build just <br />with drag and drop</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
