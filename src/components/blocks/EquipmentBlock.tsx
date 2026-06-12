import { useTranslation } from "react-i18next";
import { Leaf, Wind, Zap, Sparkles, Thermometer, Layers } from "lucide-react";
import { Heading } from "../ui/Heading";
import { Text } from "../ui/Text";
import { Image } from "../ui/Image";
import { FadeIn } from "../utils/FadeIn";
import { cn } from "../../lib/utils";

const TECH_PILLARS = [
    {
        id: "machinery",
        icon: Zap,
        image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=800",
        gridClass: "md:col-span-4",
    },
    {
        id: "chemistry",
        icon: Leaf,
        image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800",
        gridClass: "md:col-span-4",
    },
    {
        id: "air-quality",
        icon: Wind,
        image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=800",
        gridClass: "md:col-span-4",
    },
    {
        id: "steam",
        icon: Thermometer,
        image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?q=80&w=800",
        gridClass: "md:col-start-3 md:col-span-4",
    },
    {
        id: "microfiber",
        icon: Layers,
        image: "https://images.unsplash.com/photo-1628177142898-93e46e46503f?q=80&w=800",
        gridClass: "md:col-span-4",
    },
];

export function EquipmentBlock() {
    const { t } = useTranslation("about");

    return (
        <section className="w-full bg-white py-20 sm:py-28 overflow-hidden">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                <div className="mb-12 md:mb-16 text-center mx-auto max-w-3xl">
                    <FadeIn direction="up" delay={0}>
                        <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-1.5 text-[10px] font-bold tracking-widest text-primary-600 uppercase">
                            <Sparkles className="h-3.5 w-3.5" /> {t("EquipmentBlock.badge")}
                        </span>
                    </FadeIn>

                    <FadeIn direction="up" delay={150}>
                        <Heading className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-5xl mb-6">
                            {t("EquipmentBlock.headingStart")} <br className="hidden sm:block" />
                            <span className="text-primary-600">{t("EquipmentBlock.headingAccent")}</span>
                        </Heading>
                    </FadeIn>

                    <FadeIn direction="up" delay={300}>
                        <Text className="text-base sm:text-lg leading-relaxed text-gray-600">
                            {t("EquipmentBlock.description")}
                        </Text>
                    </FadeIn>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 max-w-6xl mx-auto">
                    {TECH_PILLARS.map((pillar, index) => {
                        const Icon = pillar.icon;

                        return (
                            <FadeIn direction="up" delay={400 + index * 100} className={cn(
                                "group relative w-full h-65 sm:h-70 rounded-lg overflow-hidden cursor-default bg-gray-900",
                                pillar.gridClass
                            )}>
                                <div
                                    key={pillar.id}
                                    className="h-full w-full"
                                >

                                    <Image
                                        src={pillar.image}
                                        alt={t(`EquipmentBlock.pillars.${pillar.id}.title`)}
                                        containerClassName="absolute inset-0 h-full w-full"
                                        className="transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                                    />

                                    <div className="absolute inset-0 bg-linear-to-t from-gray-950 via-gray-950/60 to-gray-900/10 transition-colors duration-500 group-hover:via-gray-950/70 z-10" />

                                    <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-6 z-20">

                                        <div className="flex items-start">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white group-hover:bg-primary-600 group-hover:border-primary-500 transition-all duration-500 shadow-lg">
                                                <Icon className="h-4 w-4" strokeWidth={2.2} />
                                            </div>
                                        </div>

                                        <div className="flex flex-col justify-end transition-transform duration-500 group-hover:-translate-y-1.5">
                                            <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.2em] text-primary-400 uppercase mb-1.5">
                                                {t(`EquipmentBlock.pillars.${pillar.id}.subtitle`)}
                                            </span>
                                            <Heading className="text-xl sm:text-2xl font-extrabold text-white mb-2">
                                                {t(`EquipmentBlock.pillars.${pillar.id}.title`)}
                                            </Heading>
                                            <Text className="text-xs sm:text-sm leading-relaxed text-gray-300 line-clamp-3">
                                                {t(`EquipmentBlock.pillars.${pillar.id}.description`)}
                                            </Text>
                                        </div>

                                    </div>
                                </div>
                            </FadeIn>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}