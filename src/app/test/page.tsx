"use client"
import Link from 'next/link';

export default function StaticLandingPage() {
    return (
        <div className="min-h-screen bg-[#1a1a1a] text-[#f4f1ea] font-sans p-4 md:p-10 relative overflow-hidden selection:bg-[#ff4d4d] selection:text-white">

            {/* BACKGROUND: Grid Pattern */}
            <div
                className="fixed inset-0 pointer-events-none opacity-20"
                style={{
                    backgroundImage: 'linear-gradient(#444 1px, transparent 1px), linear-gradient(90deg, #444 1px, transparent 1px)',
                    backgroundSize: '30px 30px'
                }}
            />

            <main className="max-w-5xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* --- CARD 1: HERO / INTRO (Spans 2 columns) --- */}
                <div className="md:col-span-2 bg-[#f4f1ea] text-black border-4 border-black p-8 shadow-[8px_8px_0px_0px_#ff4d4d] relative group hover:-translate-y-1 transition-transform duration-200">
                    {/* Decorative Tape */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#ff4d4d]/80 rotate-1"></div>

                    <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9]">
                        I Build <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff4d4d] to-orange-500">Digital</span> <br />
                        Stuff.
                    </h1>
                    <p className="mt-6 text-lg font-mono border-l-4 border-[#ff4d4d] pl-4">
                        Software Engineer & Creative Developer based in Bangladesh.
                        Obsessed with pixel-perfect UIs and clean backends.
                    </p>
                </div>

                {/* --- CARD 2: PROFILE PICTURE --- */}
                <div className="bg-[#ff4d4d] border-4 border-black p-4 shadow-[8px_8px_0px_0px_#fff] flex flex-col items-center justify-center rotate-2 hover:rotate-0 transition-transform duration-300">
                    <div className="w-32 h-32 bg-black border-2 border-white mb-4 overflow-hidden grayscale contrast-125">
                        {/* Placeholder for your image */}
                        <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix" alt="Me" className="w-full h-full object-cover" />
                    </div>
                    <div className="bg-black text-white px-3 py-1 font-mono text-xs uppercase -rotate-2">
                        Available for work
                    </div>
                </div>

                {/* --- CARD 3: STATIC MUSIC PLAYER (The Request) --- */}
                <div className="bg-black border-4 border-[#f4f1ea] p-6 shadow-[8px_8px_0px_0px_#333] flex flex-col justify-between h-full relative overflow-hidden">
                    {/* "Noise" texture overlay */}
                    <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

                    <div className="flex justify-between items-start z-10">
                        <span className="text-[#ff4d4d] font-mono text-xs animate-pulse">● LIVE BROADCAST</span>
                        {/* Fake Equalizer */}
                        <div className="flex gap-1 items-end h-4">
                            <div className="w-1 bg-[#f4f1ea] h-full animate-[bounce_1s_infinite]"></div>
                            <div className="w-1 bg-[#f4f1ea] h-2/3 animate-[bounce_1.2s_infinite]"></div>
                            <div className="w-1 bg-[#f4f1ea] h-full animate-[bounce_0.8s_infinite]"></div>
                        </div>
                    </div>

                    <div className="z-10 mt-8">
                        <h3 className="text-gray-400 font-mono text-xs uppercase mb-1">Now Playing (Static)</h3>
                        <div className="text-2xl font-black text-white leading-none uppercase truncate">
                            Starboy
                        </div>
                        <div className="text-lg text-[#ff4d4d] font-bold truncate">
                            The Weeknd
                        </div>
                    </div>

                    {/* Progress Bar (Fake) */}
                    <div className="w-full h-2 bg-gray-800 mt-4 rounded-full overflow-hidden border border-gray-600 z-10">
                        <div className="h-full bg-[#ff4d4d] w-2/3"></div>
                    </div>
                </div>

                {/* --- CARD 4: LINKS / SIDE QUESTS --- */}
                <div className="md:col-span-2 bg-[#e0e7ff] text-black border-4 border-black p-6 shadow-[8px_8px_0px_0px_#000]">
                    <div className="flex justify-between items-center border-b-2 border-black border-dashed pb-2 mb-4">
                        <h2 className="text-2xl font-black uppercase">Side Quests & Links</h2>
                        <span className="text-xs font-mono bg-black text-white px-2 rounded-full">4 items</span>
                    </div>

                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            { name: "GitHub", url: "#", tag: "Code" },
                            { name: "Twitter / X", url: "#", tag: "Thoughts" },
                            { name: "LinkedIn", url: "#", tag: "Professional" },
                            { name: "Read.cv", url: "#", tag: "Resume" },
                        ].map((link) => (
                            <li key={link.name}>
                                <Link href={link.url} className="group flex justify-between items-center bg-white border-2 border-black p-3 hover:bg-[#ff4d4d] transition-colors">
                                    <span className="font-bold font-mono group-hover:text-white">{link.name}</span>
                                    <span className="text-xs border border-black px-1 rounded group-hover:bg-white group-hover:text-black">{link.tag}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* --- CARD 5: TECH STACK --- */}
                <div className="bg-[#fef3c7] text-black border-4 border-black p-6 shadow-[8px_8px_0px_0px_#d97706] relative">
                    <div className="absolute top-2 right-2">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
                    </div>
                    <h2 className="text-xl font-black uppercase mb-4">Weaponry</h2>
                    <div className="flex flex-wrap gap-2">
                        {['Next.js', 'React', 'TypeScript', 'Tailwind', 'Node', 'Postgres'].map(tech => (
                            <span key={tech} className="px-2 py-1 bg-white border-2 border-black text-xs font-bold shadow-[2px_2px_0px_0px_#000]">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

            </main>

            {/* --- FOOTER MARQUEE --- */}
            <div className="fixed bottom-0 left-0 w-full bg-[#ff4d4d] border-t-4 border-black py-2 overflow-hidden z-20">
                <div className="whitespace-nowrap animate-marquee font-black text-black uppercase tracking-widest text-sm">
                    OPEN FOR COLLABORATIONS  +++  SEND ME AN EMAIL  +++  CURRENTLY DRINKING COFFEE  +++  DESIGNING IN PRODUCTION  +++
                    OPEN FOR COLLABORATIONS  +++  SEND ME AN EMAIL  +++  CURRENTLY DRINKING COFFEE  +++  DESIGNING IN PRODUCTION  +++
                </div>
            </div>

            <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: inline-block;
          animation: marquee 20s linear infinite;
        }
      `}</style>
        </div>
    );
}