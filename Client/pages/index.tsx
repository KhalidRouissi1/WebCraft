import Image from "next/image";
import { Button } from "./components/ui/button";
import Navbar from "./components/gloabal/NavBar";
import { ContainerScroll } from "./components/container-scroll-animation";
import { HeroParallax } from "./components/gloabal/connect-parallax";
import { LampComponent } from "./components/gloabal/lamp-component";
import { CardBody, CardContainer, CardItem } from "./components/gloabal/3dCard";

import { products } from "../lib/constans";
import { CheckIcon } from "lucide-react";
import { ThemeProvider } from "./providers/theme-provider";
import Link from "next/link";
import Footer from "./components/gloabal/Footer";

export default function Home() {
  return (
    <main>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <Navbar />
        <section className="h-screen w-full bg-neutral-950 rounded-md !overflow-visible relative flex flex-col items-center antialiased">
          <div className="absolute inset-0  h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_35%,#222_100%)]"></div>
          <div className="flex flex-col mt-[-100px] md:mt-[-50px]">
            <ContainerScroll
              titleComponent={
                <div className="flex items-center justify-center flex-col">
                  <Button
                    size={"lg"}
                    className="p-8 mb-8 md:mb-0 text-2xl w-full sm:w-fit border-t-2 rounderd-full border-[#4D4D4D] bg-[#1F1F1F1F] hover:bg-white group transition-all flex items-center justify-center gap-4 hover:shadow-xl hover:shadow-neutral-500 duration-500"
                  >
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-500 to-neutral-600 md:text-center font-sans group-hover:bg-gradient-to-r group-hover:from-black group-hover:to-black:">
                      Start For Free Today
                    </span>
                  </Button>
                  <h1 className="text-5xl md:text-8xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-sans font-bold">
                    Create Websites with WebCrafter
                  </h1>
                </div>
              }
            />
          </div>
        </section>

        <section>
          <HeroParallax products={products}></HeroParallax>
        </section>
        <section className="mt-[-500px]">
          <LampComponent />
          <CardContainer className="inter-var flex flex-wrap items-center justify-center flex-col md:flex-row gap-8 -mt-72 ">
            <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-neutral-500/[0.1] dark:bg-black dark:border-[#E2CBFF] dark:border-white/[0.2] border-black/[0.1] w-full md:!w-[350px] h-auto rounded-xl p-6 border">
              <CardItem
                translateZ="50"
                className="text-xl font-blod text-neutral-600 dark:text-white"
              >
                Basic Plan
                <h2 className="text-6xl">$0</h2>
              </CardItem>
              <CardItem
                translateZ="60"
                className="text-xl font-blod text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300"
              >
                Get started with essential features. Upgrade as you grow.
                <ul className="my-4 flex flex-col gap-2">
                  <li className="flex items-center gap-2">
                    <CheckIcon /> Basic website builder
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon /> Limited templates
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon /> Basic support
                  </li>
                </ul>
              </CardItem>
              <div className="flex justify-between items-center mt-8">
                <CardItem
                  translateZ="20"
                  className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-blod"
                >
                  <Link href="/auth">Get Started Now</Link>
                </CardItem>
                <CardItem
                  translateZ={20}
                  as="button"
                  className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
                >
                  Try now →
                </CardItem>
              </div>
            </CardBody>
            <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-neutral-500/[0.1] dark:bg-black dark:border-[#E2CBFF] dark:border-white/[0.2] border-black/[0.1] w-full md:!w-[350px] h-auto rounded-xl p-6 border">
              <CardItem
                translateZ="50"
                className="text-xl font-blod text-neutral-600 dark:text-white"
              >
                Pro Plan
                <h2 className="text-6xl">$29</h2>
              </CardItem>
              <CardItem
                translateZ="60"
                className="text-xl font-blod text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300"
              >
                Unlock advanced features and support for growing businesses.
                <ul className="my-4 flex flex-col gap-2">
                  <li className="flex items-center gap-2">
                    <CheckIcon /> Advanced website builder
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon /> Access to all templates
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon /> Priority support
                  </li>
                </ul>
              </CardItem>
              <div className="flex justify-between items-center mt-8">
                <CardItem
                  translateZ="20"
                  className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-blod"
                >
                  <Link href="/auth">Get Started Now</Link>
                </CardItem>
                <CardItem
                  translateZ={20}
                  as="button"
                  className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
                >
                  Try now →
                </CardItem>
              </div>
            </CardBody>
            <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-neutral-500/[0.1] dark:bg-black dark:border-[#E2CBFF] dark:border-white/[0.2] border-black/[0.1] w-full md:!w-[350px] h-auto rounded-xl p-6 border">
              <CardItem
                translateZ="50"
                className="text-xl font-blod text-neutral-600 dark:text-white"
              >
                Unlimited Plan
                <h2 className="text-6xl">$99</h2>
              </CardItem>
              <CardItem
                translateZ="60"
                className="text-xl font-blod text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300"
              >
                For businesses that need unlimited capabilities and support.
                <ul className="my-4 flex flex-col gap-2">
                  <li className="flex items-center gap-2">
                    <CheckIcon /> Full website builder suite
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon /> Unlimited templates
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon /> 24/7 premium support
                  </li>
                </ul>
              </CardItem>
              <div className="flex justify-between items-center mt-8">
                <CardItem
                  translateZ="20"
                  className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-blod"
                >
                  <Link href="/auth">Get Started Now</Link>
                </CardItem>
                <CardItem
                  translateZ={20}
                  as="button"
                  className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
                >
                  Try now →
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>
        </section>
      </ThemeProvider>
      <div className="mb-20"></div>
      <Footer />
    </main>
  );
}
