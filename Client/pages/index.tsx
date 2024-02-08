import Link from "next/link";

export default function Home() {
 
  return (
    <>
     <div className="flex bg-white" style={{ height: '600px' }}>
        <div className="flex items-center text-center lg:text-left px-8 md:px-12 lg:w-1/2">
          <div>
            <h2 className="text-3xl font-semibold text-gray-800 md:text-4xl">Drag & Drop Website  <span className="text-indigo-600">crafter</span></h2>
            <p className="mt-2 text-sm text-gray-500 md:text-base">With webcraft you can now easily build your website free and with   <span className="text-indigo-600">no code</span></p>
            <div className="flex justify-center lg:justify-start mt-6">
              <Link href="auth" className="px-4 py-3 bg-gray-900 text-gray-200 text-xs font-semibold rounded hover:bg-gray-800">Get Started</Link>
              <a className="mx-4 px-4 py-3 bg-gray-300 text-gray-900 text-xs font-semibold rounded hover:bg-gray-400" href="#">Learn More</a>
            </div>
          </div>
        </div>
        <div className="hidden lg:block lg:w-1/2" style={{ clipPath: 'polygon(10% 0, 100% 0%, 100% 100%, 0 100%)' }}>
          <div className="h-full object-cover" style={{ backgroundImage: 'url(https://media.discordapp.net/attachments/1138848747665768499/1204907862074327132/image.png?ex=65d670e4&is=65c3fbe4&hm=a16444a08cc5ef0587019061fb665768bd123c9c5d6dcaaed10eb702116ee141&=&format=webp&quality=lossless&width=1431&height=671)' }}>
            <div className="h-full bg-black opacity-25"></div>
          </div>
        </div>
      </div>
    </>
  );
}
