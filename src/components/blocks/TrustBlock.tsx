import { useTranslation } from "react-i18next";
import {
    Leaf,
    ShieldCheck,
    Flame,
    Heart,
    BadgeCheck,
    DollarSign,
    Sparkles,
    Smile
} from "lucide-react";

const TRUST_STAMPS = [
    { id: "eco", icon: Leaf },
    { id: "guarantee", icon: ShieldCheck },
    { id: "equip", icon: Flame },
    { id: "safe", icon: Heart },
    { id: "vetted", icon: BadgeCheck },
    { id: "price", icon: DollarSign },
    { id: "stain", icon: Sparkles },
    { id: "satisfy", icon: Smile },
];

export function TrustBlock() {
    const { t } = useTranslation("home");
    const doubleStamps = [...TRUST_STAMPS, ...TRUST_STAMPS];

    return (
        <section className="w-full overflow-hidden border-y border-gray-100 bg-white h-20 md:h-24 shadow-xs">
            <div className="relative flex h-full w-full items-center">

                <div className="flex h-full w-max animate-marquee items-center whitespace-nowrap will-change-transform">
                    {doubleStamps.map((stamp, index) => {
                        const Icon = stamp.icon;

                        return (
                            <div
                                key={`${stamp.id}-${index}`}
                                className="group flex h-full items-center gap-4 border-r border-gray-100/80 px-8 transition-colors duration-300 hover:bg-primary-50/30 md:px-12 cursor-default select-none"
                            >
                                <div className="text-primary-500 transition-transform duration-300 ease-out group-hover:scale-110 group-hover:text-primary-600 shrink-0">
                                    <Icon className="h-5 w-5 md:h-6 md:w-6" strokeWidth={2} />
                                </div>

                                <span className="text-[10px] md:text-xs font-black tracking-[0.2em] text-gray-800 uppercase transition-colors duration-300 group-hover:text-primary-900">
                                    {t(`TrustBlock.${stamp.id}`)}
                                </span>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}