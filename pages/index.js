import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Navigation, ButtonLink, Heading, Marquee, Section } from '@components';
import { Marquee2 } from '@/components/Marquee';
import NextLink from "next/link";

const Hero = () => {
  return (
    <div className="h-[85%] border border-black bg-yolk rounded grid">
      <div className="h-[90%] p-2 content">
        <div className="h-full rounded-sm bg-gray-300 border border-[#cbd6e0]"></div>
      </div>
      <h2 className="text-center place-self-center overlay text-[144px] font-[900] leading-none tracking-tighter">
        CHASING LIFE
      </h2>
    </div>
  );
}

let us =
  "https://images.unsplash.com/photo-1645389776527-43c47e909550?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80";

const About = () => {
  return (
    <div className="grid h-full grid-cols-2 gap-x-12">
      <div className="flex flex-col justify-between">
        <Heading as="h2">Work</Heading>
        <div>
          <p className="mb-8 text-4xl tracking-tight">
            So I started from scratch. I made another, then another. And by the
            end of the semester, by like box number five, I had built this
            thing. You should have seen it. It was insane. I mean, I built it
            out of Peruvian walnut with inlaid zebrawood.
          </p>
          <NextLink href="/about" passHref>
            <ButtonLink>
              <span>Get to know me or something</span>
              <span>-&gt;</span>
            </ButtonLink>
          </NextLink>
        </div>
      </div>
      <div>
        <div className="w-full h-[90vh] transition duration-1000 rounded shadow-none hover:scale-[1.003] hover:-translate-y-0.5 bg-black/25 hover:shadow-xl hover:shadow-yolk/25 overflow-hidden">
          <img src={us} alt="About" className="object-cover" />
        </div>
      </div>
    </div>
  );
}

const Photos = () => {
  return (
    <div className="grid h-full grid-rows-2 mb-4 gap-x-6 gap-y-2 sm:grid-cols-2">
      <div className="rounded bg-black/25 h-96"></div>
      <div className="rounded bg-black/25 h-96"></div>
      <div className="flex w-full col-span-2 overflow-auto gap-x-2">
        <div className="max-w-xs overflow-hidden rounded w-96">
          <img
            src="https://images.unsplash.com/photo-1645642175398-5dada10d4951?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
            className="object-contain"
            alt="photo"
          />
        </div>
      </div>
    </div>
  );
}

const Break = () => {
  return (
    <>
      <div className="grid w-full">
        <div className="flex justify-between px-4 mt-px -mr-px font-light cursor-default select-none text-dark/50 text-7xl overlay">
          <span className='aspect-square'>+</span>
          <span className='aspect-square'>+</span>
          <span className='aspect-square'>+</span>
          <span className='aspect-square'>+</span>
          <span className='aspect-square'>+</span>
        </div>
        <hr className="self-center content border-dark/10"></hr>
      </div>
    </>
  );
}

const CallToAction = () => {
  return (
    <div className="grid grid-cols-4 py-12 gap-x-2">
      <div className="col-span-3 py-12 space-y-12 bg-white rounded px-11">
        <h3 className="text-3xl font-bold uppercase">Uber</h3>
        <blockquote className="text-5xl max-w-prose">
          &quot;We worked with Mitul to build an exhibit featuring employee
          stories. He provided high quality work that was on-brief and delivered
          within a tight timeline!&quot;
        </blockquote>
        <p>Nicole Korb</p>
      </div>
      <div className="flex items-center justify-center rounded bg-yolk">
        &rarr;
      </div>
    </div>
  );
}

const ScrollArea = () => {
  return (
    <div className="relative grid h-full grid-cols-2 gap-4">
      <div className="sticky top-0 w-full h-screen pt-12 pb-6 grow-1">
        <div className="flex flex-col justify-between h-full">
          <Heading as="h3">Work</Heading>
          <div>
            <p className="text-3xl">
              So I started from scratch. I made another, then another. And by
              the end of the semester, by like box number five, I had built this
              thing. You should have seen it. It was insane. I mean, I built it
              out of Peruvian walnut with inlaid zebrawood.
            </p>
            <p className="w-2/3 mt-6 text-md text-dark/50">
              Photography is my craft. From brand shoots to non-exclusive
              licensing, I’m able to provide creative pieces that work for you.
            </p>
            <div className="flex mt-4 gap-x-4">
              <div className="flex items-center justify-center w-1/2 px-6 py-4 border rounded border-dark">
                Photography
              </div>
              <div className="flex items-center justify-center w-1/2 px-6 py-4 border rounded border-dark">
                Licensing
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col pt-12 pb-6 gap-y-3">
        <div className="w-full border rounded shadow-sm border-stone-light h-96 bg-dark"></div>
        <div className="w-full border rounded shadow-sm border-stone-light h-96 bg-dark"></div>
        <div className="w-full border rounded shadow-sm border-stone-light h-96 bg-dark"></div>
        <div className="w-full border rounded shadow-sm border-stone-light h-96 bg-dark"></div>
        <div className="w-full border rounded shadow-sm border-stone-light h-96 bg-dark"></div>
        <div className="w-full border rounded shadow-sm border-stone-light h-96 bg-dark"></div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Section padding={false}>
        <Navigation />
      </Section>
      <Section isFullHeight={true}>
        <Marquee />
        <Hero />
      </Section>
      <Section isFullHeight={true}>
        <About />
      </Section>
      <Section padding={false}>
        <Break />
      </Section>
      <Section>
        <Photos />
        <NextLink href="/photos" passHref>
          <ButtonLink>
            <span>See more</span>
            <span>-&gt;</span>
          </ButtonLink>
        </NextLink>
      </Section>
      <Section className="relative">
        <ScrollArea />
      </Section>
      <Section>
        <CallToAction />
      </Section>
      <Section>
        <Break />
      </Section>
    </>
  );
}
