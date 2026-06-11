import { Leaf, Wind, Zap, Sparkles, Thermometer, Layers } from "lucide-react";
import { Heading } from "../ui/Heading";
import { Text } from "../ui/Text";
import { FadeIn } from "../utils/FadeIn";
import { cn } from "../../lib/utils";

const TECH_PILLARS = [
    {
        id: "machinery",
        icon: Zap,
        title: "Pro-Grade Extraction",
        subtitle: "Industrial Machinery",
        description: "Injection-suction technology that pulls embedded dirt and allergens from the deepest fabric layers.",
        image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=800",
        gridClass: "md:col-span-4",
    },
    {
        id: "chemistry",
        icon: Leaf,
        title: "Green Chemistry",
        subtitle: "100% Non-Toxic",
        description: "Biodegradable, hospital-grade agents safe for children, pets, and delicate architectural finishes.",
        image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800",
        gridClass: "md:col-span-4",
    },
    {
        id: "air-quality",
        icon: Wind,
        title: "HEPA Purification",
        subtitle: "Active Air Scrubbing",
        description: "Certified HEPA filtration systems that actively capture 99.97% of micro-particles while we clean.",
        image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=800",
        gridClass: "md:col-span-4",
    },
    {
        id: "steam",
        icon: Thermometer,
        title: "Thermal Sterilization",
        subtitle: "200°C Dry Steam",
        description: "High-pressure dry steam application that instantly eradicates bacteria and lifts hardened grease without chemicals.",
        image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?q=80&w=800",
        gridClass: "md:col-start-3 md:col-span-4",
    },
    {
        id: "microfiber",
        icon: Layers,
        title: "Zonal Microfiber",
        subtitle: "Zero Cross-Contamination",
        description: "Strict color-coded fiber systems ensuring bathroom textiles never touch kitchen or living space surfaces.",
        image: "https://images.unsplash.com/photo-1628177142898-93e46e46503f?q=80&w=800",
        gridClass: "md:col-span-4",
    },
];

export function EquipmentBlock() {
    return (
        <section className="w-full bg-white py-20 sm:py-28 overflow-hidden">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                <div className="mb-12 md:mb-16 text-center mx-auto max-w-3xl">
                    <FadeIn direction="up" delay={0}>
                        <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-1.5 text-[10px] font-bold tracking-widest text-primary-600 uppercase">
                            <Sparkles className="h-3.5 w-3.5" /> Our Arsenal
                        </span>
                    </FadeIn>

                    <FadeIn direction="up" delay={150}>
                        <Heading className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-5xl mb-6">
                            Industrial power. <br className="hidden sm:block" />
                            <span className="text-primary-600">Botanical safety.</span>
                        </Heading>
                    </FadeIn>

                    <FadeIn direction="up" delay={300}>
                        <Text className="text-base sm:text-lg leading-relaxed text-gray-600">
                            We invest heavily in the latest European extraction machinery, thermal sterilization, and environmentally responsible chemistry to ensure your space is not just visually spotless, but biologically sanitized.
                        </Text>
                    </FadeIn>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 max-w-6xl mx-auto">
                    {TECH_PILLARS.map((pillar, index) => {
                        const Icon = pillar.icon;

                        return (
                            <div
                                key={pillar.id}
                                className={cn(
                                    "group relative w-full h-65 sm:h-70 rounded-lg overflow-hidden cursor-default",
                                    pillar.gridClass
                                )}
                            >
                                <FadeIn direction="up" delay={400 + index * 100} className="h-full w-full">

                                    <div
                                        className="absolute inset-0 h-full w-full bg-cover bg-center transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                                        style={{ backgroundImage: `url(${pillar.image})` }}
                                    />

                                    <div className="absolute inset-0 bg-linear-to-t from-gray-950 via-gray-950/60 to-gray-900/10 transition-colors duration-500 group-hover:via-gray-950/70" />

                                    <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-6">

                                        <div className="flex items-start">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white group-hover:bg-primary-600 group-hover:border-primary-500 transition-all duration-500 shadow-lg">
                                                <Icon className="h-4 w-4" strokeWidth={2.2} />
                                            </div>
                                        </div>

                                        <div className="flex flex-col justify-end transition-transform duration-500 group-hover:-translate-y-1.5">
                                            <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.2em] text-primary-400 uppercase mb-1.5">
                                                {pillar.subtitle}
                                            </span>
                                            <Heading className="text-xl sm:text-2xl font-extrabold text-white mb-2">
                                                {pillar.title}
                                            </Heading>
                                            <Text className="text-xs sm:text-sm leading-relaxed text-gray-300 line-clamp-3">
                                                {pillar.description}
                                            </Text>
                                        </div>

                                    </div>
                                </FadeIn>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}