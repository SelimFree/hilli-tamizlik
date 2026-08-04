import { useTranslation } from "react-i18next";
import { Users } from "lucide-react";
import { Heading } from "../ui/Heading";
import { Text } from "../ui/Text";
import { FadeIn } from "../utils/FadeIn";
import { cn } from "../../lib/utils";

import logo1 from "../../assets/about/logos/logo_1.png";
import logo2 from "../../assets/about/logos/logo_2.png";
import logo3 from "../../assets/about/logos/logo_3.png";
import logo4 from "../../assets/about/logos/logo_4.png";
import logo5 from "../../assets/about/logos/logo_5.png";
import logo6 from "../../assets/about/logos/logo_6.png";
import logo7 from "../../assets/about/logos/logo_7.png";
import logo8 from "../../assets/about/logos/logo_8.png";
import logo9 from "../../assets/about/logos/logo_9.png";
import logo10 from "../../assets/about/logos/logo_10.png";

const PARTNERS = [
    { id: "partner1", name: "Partner One", logo: logo1 },
    { id: "partner2", name: "Partner Two", logo: logo2 },
    { id: "partner3", name: "Partner Three", logo: logo3 },
    { id: "partner4", name: "Partner Four", logo: logo4 },
    { id: "partner5", name: "Partner Five", logo: logo5 },
    { id: "partner6", name: "Partner Six", logo: logo6 },
    { id: "partner7", name: "Partner Seven", logo: logo7 },
    { id: "partner8", name: "Partner Eight", logo: logo8 },
    { id: "partner9", name: "Partner Nine", logo: logo9 },
    { id: "partner10", name: "Partner Ten", logo: logo10 },
];

export function PartnersBlock() {
    const { t } = useTranslation("about");

    const duplicatedPartners = [...PARTNERS, ...PARTNERS];

    return (
        <section
            id="partners"
            className="w-full bg-white py-20 sm:py-28 relative border-t border-gray-100 overflow-hidden"
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-12 text-center md:mb-16">
                    <FadeIn direction="up" delay={0}>
                        <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-gray-50 px-4 py-1.5 text-[10px] font-bold tracking-widest text-gray-600 uppercase shadow-sm border border-gray-200">
                            <Users className="h-3.5 w-3.5 text-primary-500" />{" "}
                            {t("PartnersBlock.badge")}
                        </span>
                    </FadeIn>

                    <FadeIn direction="up" delay={150}>
                        <Heading className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
                            {t("PartnersBlock.headingStart")}{" "}
                            <br className="hidden sm:block" />
                            <span className="text-primary-600">
                                {t("PartnersBlock.headingAccent")}
                            </span>
                        </Heading>
                    </FadeIn>

                    <FadeIn direction="up" delay={250}>
                        <Text className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
                            {t("PartnersBlock.description")}
                        </Text>
                    </FadeIn>
                </div>
            </div>

            <FadeIn direction="up" delay={300}>
                <div className="relative mx-auto max-w-7xl group">
                    <div className="absolute inset-y-0 left-0 w-12 sm:w-24 bg-linear-to-r from-white to-transparent z-10 pointer-events-none" />
                    <div className="absolute inset-y-0 right-0 w-12 sm:w-24 bg-linear-to-l from-white to-transparent z-10 pointer-events-none" />

                    <div className="flex overflow-hidden w-full py-6">
                        <div
                            className="flex w-max animate-marquee hover:[animation-play-state:paused] items-center"
                            style={{
                                animationDuration: `${PARTNERS.length * 6}s`,
                            }}
                        >
                            {duplicatedPartners.map((partner, index) => (
                                <div
                                    key={`${partner.id}-${index}`}
                                    className="flex shrink-0 items-center justify-center w-50 sm:w-62.5 mx-4 sm:mx-8"
                                >
                                    <img
                                        src={partner.logo}
                                        alt={partner.name}
                                        className={cn(
                                            "max-h-12 sm:max-h-16 w-auto object-contain transition-all duration-500 ease-in-out cursor-pointer",
                                            "opacity-50 hover:opacity-100 hover:scale-110"
                                        )}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </FadeIn>
        </section>
    );
}