import NewHero from "@/components/home/NewHero";
import WelcomeSection from "@/components/home/WelcomeSection";
import ServiceSelector from "@/components/home/ServiceSelector";
import ArchitectureSector from "@/components/home/ArchitectureSector";
import HomeEvents from "@/components/home/HomeEvents";
import WisdomChest from "@/components/home/WisdomChest";
import BlogSpotlight from "@/components/home/BlogSpotlight";
import NewNewsletter from "@/components/home/NewNewsletter";

export default function Home() {
    return (
        <main className="flex flex-col min-h-screen bg-background text-text">
            <NewHero />
            <WelcomeSection />
            <ServiceSelector />
            <ArchitectureSector />
            <HomeEvents />
            <WisdomChest />
            <BlogSpotlight />
            <NewNewsletter />
        </main>
    );
}
