import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ArrowUpRight, Sparkles, Home, Construction, Sofa, Building2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Heading } from "../ui/Heading";
import { Text } from "../ui/Text";
import { Button } from "../ui/Button";
import { FadeIn } from "../utils/FadeIn";
import { cn } from "../../lib/utils";
import DeepImg from "../../assets/services/deep_after.png";
import ConstructionImg from "../../assets/services/construction_after.png";
import CorporateImg from "../../assets/services/corporate_after.png";
import DrycleaningImg from "../../assets/services/drycleaning_after.png";


const SERVICES = [
    {
        id: "deep",
        image: DeepImg,
        icon: Home,
    },
    {
        id: "drycleaning",
        image: DrycleaningImg,
        icon: Sofa,
    },
    {
        id: "construction",
        image: ConstructionImg,
        icon: Construction,
    },
    {
        id: "corporate",
        image: CorporateImg,
        icon: Building2,
    },
];

const gridLayoutClasses: Record<string, string> = {
    deep: "md:grid-cols-[2.2fr_1fr] md:grid-rows-[2.2fr_1fr]",
    drycleaning: "md:grid-cols-[1fr_2.2fr] md:grid-rows-[2.2fr_1fr]",
    construction: "md:grid-cols-[2.2fr_1fr] md:grid-rows-[1fr_2.2fr]",
    corporate: "md:grid-cols-[1fr_2.2fr] md:grid-rows-[1fr_2.2fr]",
    default: "md:grid-cols-[1fr_1fr] md:grid-rows-[1fr_1fr]",
};

export function ServiceTeaserBlock() {
    const { t } = useTranslation("home");
    const [activeId, setActiveId] = useState<string | null>(null);
    const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        return () => {
            if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
        };
    }, []);

    const handleMouseEnter = (id: string) => {
        if (window.matchMedia("(hover: hover)").matches) {
            if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
            hoverTimeoutRef.current = setTimeout(() => setActiveId(id), 300);
        }
    };

    const handleMouseLeave = () => {
        if (window.matchMedia("(hover: hover)").matches) {
            if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
            setActiveId(null);
        }
    };

    const handleClick = (id: string) => {
        if (!window.matchMedia("(hover: hover)").matches) {
            setActiveId(activeId === id ? null : id);
        }
    };

    const activeGridClass = activeId ? gridLayoutClasses[activeId] : gridLayoutClasses.default;

    return (
        <section className="w-full bg-white py-20 sm:py-28">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                <div className="mb-12 md:mb-16 text-center md:text-left">
                    <FadeIn direction="up" delay={0}>
                        <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-1.5 text-[10px] font-bold tracking-widest text-primary-600 uppercase">
                            <Sparkles className="h-3.5 w-3.5" /> {t("ServiceTeaserBlock.badge")}
                        </span>
                    </FadeIn>

                    <FadeIn direction="up" delay={150}>
                        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                            <Heading className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                                {t("ServiceTeaserBlock.headingStart")} <br className="hidden sm:block" />
                                <span className="text-primary-600">{t("ServiceTeaserBlock.headingAccent")}</span>
                            </Heading>

                            <Link to="/services">
                                <Button variant="ghost" className="group hidden sm:flex text-primary-600 hover:bg-primary-50 hover:text-primary-700 px-4 py-2 font-bold tracking-wide transition-all rounded-lg active:scale-95 cursor-pointer">
                                    {t("ServiceTeaserBlock.viewAll")}
                                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                                </Button>
                            </Link>
                        </div>
                    </FadeIn>
                </div>

                <FadeIn direction="up" delay={300}>
                    <div className={cn("flex flex-col gap-4 md:grid md:h-160 md:w-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]", activeGridClass)}>
                        {SERVICES.map((service) => {
                            const Icon = service.icon;
                            const isActive = activeId === service.id;
                            const isAnotherActive = activeId !== null && !isActive;

                            return (
                                <div
                                    key={service.id}
                                    onMouseEnter={() => handleMouseEnter(service.id)}
                                    onMouseLeave={handleMouseLeave}
                                    onClick={() => handleClick(service.id)}
                                    className={cn(
                                        "group relative w-full overflow-hidden bg-gray-900 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer select-none rounded-lg",
                                        isActive ? "h-85 sm:h-95" : isAnotherActive ? "h-30" : "h-40 sm:h-48",
                                        "md:h-full"
                                    )}
                                >
                                    <div className={cn("absolute inset-0 h-full w-full bg-cover bg-center transition-transform duration-[1.5s] ease-out", isActive ? "scale-100 opacity-90" : "scale-105 opacity-50 group-hover:scale-100")} style={{ backgroundImage: `url(${service.image})` }} />
                                    <div className={cn("absolute inset-0 transition-all duration-700", isActive ? "bg-linear-to-t from-gray-950/95 via-gray-950/60 to-transparent" : "bg-gray-950/40 group-hover:bg-gray-950/30")} />

                                    <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-6 md:p-8">
                                        <div className="flex items-start">
                                            <div className={cn("flex items-center justify-center rounded-lg backdrop-blur-md border transition-all duration-500", isActive ? "h-12 w-12 bg-primary-600 border-primary-500 shadow-lg shadow-primary-900/50" : "h-10 w-10 bg-white/10 border-white/20 text-white group-hover:bg-white/20 group-hover:scale-105")}>
                                                <Icon className={cn("transition-colors", isActive ? "h-6 w-6 text-white" : "h-5 w-5 text-primary-400")} />
                                            </div>
                                        </div>

                                        <div className={cn("flex flex-col justify-end transition-all duration-700 w-full overflow-hidden", isActive ? "translate-y-0" : "translate-y-2 md:translate-y-0")}>
                                            <span className={cn("text-[10px] font-bold tracking-[0.2em] text-primary-400 uppercase mb-2 transition-opacity duration-300", isAnotherActive ? "opacity-0 hidden md:block md:opacity-100" : "opacity-100")}>
                                                {t(`ServiceTeaserBlock.services.${service.id}.subtitle`)}
                                            </span>
                                            <Heading className={cn("font-extrabold text-white transition-all duration-500 truncate", isActive ? "text-2xl sm:text-3xl lg:text-4xl mb-3" : "text-lg sm:text-lg md:text-xl")}>
                                                {t(`ServiceTeaserBlock.services.${service.id}.title`)}
                                            </Heading>

                                            <div className={cn("grid transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]", isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
                                                <div className="overflow-hidden">
                                                    <Text className="text-sm sm:text-base leading-relaxed text-gray-200 mb-6 mt-1 max-w-sm">
                                                        {t(`ServiceTeaserBlock.services.${service.id}.description`)}
                                                    </Text>
                                                    <Link to={`/services#${service.id}`} className="w-full">
                                                        <Button
                                                            size="lg"
                                                            className="group/btn bg-primary-600 hover:bg-primary-500 text-white rounded-lg gap-2 font-bold uppercase tracking-wider text-xs h-12 px-6 transition-all duration-300 hover:shadow-lg hover:shadow-primary-900/30 hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                                                        >
                                                            {t("ServiceTeaserBlock.details")}
                                                            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                                                        </Button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </FadeIn>

                <div className="mt-8 flex justify-center sm:hidden">
                    <Link to="/services" className="w-full">
                        <Button variant="outline" className="w-full group rounded-lg font-bold tracking-wide border-gray-200 cursor-pointer active:scale-95">
                            {t("ServiceTeaserBlock.viewAll")}
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </Link>
                </div>

            </div>
        </section>
    );
}