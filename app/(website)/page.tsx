import NewHero from "@/components/home/NewHero";
import WelcomeSection from "@/components/home/WelcomeSection";
import ServiceSelector from "@/components/home/ServiceSelector";
import ArchitectureSector from "@/components/home/ArchitectureSector";
import HomeEvents from "@/components/home/HomeEvents";
import WisdomChest from "@/components/home/WisdomChest";
import BlogSpotlight from "@/components/home/BlogSpotlight";
import NewNewsletter from "@/components/home/NewNewsletter";
import TestSpotlight from "@/components/home/TestSpotlight";
import BooksBanner from "@/components/home/BooksBanner";

export default function Home() {
    return (
        <main className="relative flex flex-col min-h-screen bg-background text-text overflow-x-clip">
            {/* Home Specific Global Orange Flare Overlays (#e97b32) */}
            {/* Top Left Corner Glow */}
            <div className="absolute top-[50vh] left-[-20vw] w-[40vw] h-[40vw] bg-[radial-gradient(circle_at_center,rgba(233,123,50,0.9)_0%,rgba(233,123,50,0.4)_50%,transparent_80%)] blur-[100px] pointer-events-none z-[50]" />
            
            {/* Right Side (Service area junction) */}
            <div className="absolute top-[200vh] right-[-20vw] w-[40vw] h-[40vw] bg-[radial-gradient(circle_at_center,rgba(233,123,50,0.9)_0%,rgba(233,123,50,0.4)_50%,transparent_80%)] blur-[100px] pointer-events-none z-[50]" />

            <NewHero />
            <WelcomeSection />
            <ServiceSelector />
            <ArchitectureSector />
            <WisdomChest />
            <NewNewsletter />
        </main>
    );
}

