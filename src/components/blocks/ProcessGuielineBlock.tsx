import { useTranslation } from "react-i18next";
import { Calculator, CalendarCheck, Sparkles, ArrowRight, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Heading } from "../ui/Heading";
import { Text } from "../ui/Text";
import { Button } from "../ui/Button";
import { FadeIn } from "../utils/FadeIn";

const PROCESS_STEPS = [
    {
        id: "step-1",
        stepNumber: "01",
        icon: Calculator,
    },
    {
        id: "step-2",
        stepNumber: "02",
        icon: CalendarCheck,
    },
    {
        id: "step-3",
        stepNumber: "03",
        icon: Sparkles,
    },
];

export function ProcessGuidelineBlock() {
    const { t } = useTranslation("services");

    return (
        <section className="w-full bg-white py-20 sm:py-28 overflow-hidden">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                <div className="mb-16 md:mb-24 text-center mx-auto max-w-3xl">
                    <FadeIn direction="up" delay={0}>
                        <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-gray-50 px-4 py-1.5 text-[10px] font-bold tracking-widest text-primary-600 uppercase border border-gray-100">
                            <Zap className="h-3.5 w-3.5" /> {t("ProcessGuidelineBlock.badge")}
                        </span>
                    </FadeIn>

                    <FadeIn direction="up" delay={150}>
                        <Heading className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
                            {t("ProcessGuidelineBlock.headingStart")} <br className="hidden sm:block" />
                            <span className="text-primary-600">{t("ProcessGuidelineBlock.headingAccent")}</span>
                        </Heading>
                    </FadeIn>
                </div>

                <div className="relative mx-auto max-w-5xl mb-24 md:mb-32">

                    <div className="absolute left-6.75 md:hidden top-8 bottom-8 w-0.5 bg-linear-to-b from-transparent via-gray-200 to-transparent z-0" />
                    <div className="hidden md:block absolute top-6.75 left-[15%] right-[15%] h-0.5 bg-linear-to-r from-transparent via-gray-200 to-transparent z-0" />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 relative z-10">
                        {PROCESS_STEPS.map((step, index) => {
                            const Icon = step.icon;

                            return (
                                <div key={step.id} className="relative group">

                                    <FadeIn
                                        direction="up"
                                        delay={200 + index * 100}
                                        className="w-full flex flex-row md:flex-col items-start md:items-center gap-6 md:gap-8"
                                    >
                                        <div className="shrink-0 flex h-14 w-14 items-center justify-center rounded-2xl bg-white border border-gray-100 shadow-sm text-gray-400 group-hover:border-primary-200 group-hover:bg-primary-50 group-hover:shadow-md transition-all duration-500 group-hover:scale-110 z-10">
                                            <Icon className="h-6 w-6 transition-colors duration-500 group-hover:text-primary-600" strokeWidth={2} />
                                        </div>

                                        <div className="flex flex-col text-left md:text-center mt-1 md:mt-0">
                                            <span className="block text-[10px] font-black text-gray-300 tracking-[0.2em] mb-2 md:mb-3 transition-colors duration-300 group-hover:text-primary-400">
                                                {t("ProcessGuidelineBlock.stepPrefix")} {step.stepNumber}
                                            </span>

                                            <Heading className="text-xl font-bold text-gray-900 mb-3 transition-colors duration-300 group-hover:text-primary-700">
                                                {t(`ProcessGuidelineBlock.steps.${step.id}.title`)}
                                            </Heading>

                                            <Text className="text-sm leading-relaxed text-gray-500 max-w-xs md:mx-auto">
                                                {t(`ProcessGuidelineBlock.steps.${step.id}.description`)}
                                            </Text>
                                        </div>
                                    </FadeIn>

                                </div>
                            );
                        })}
                    </div>

                </div>

                <FadeIn direction="up" delay={500}>
                    <div className="relative w-full overflow-hidden rounded-2xl bg-gray-900 p-8 sm:p-12 md:p-16 border border-gray-800 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-10 max-w-6xl mx-auto">

                        <div className="absolute top-0 right-0 -mt-20 -mr-20 h-64 w-64 rounded-full bg-primary-600/20 blur-3xl pointer-events-none" />
                        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 h-48 w-48 rounded-full bg-primary-900/40 blur-3xl pointer-events-none" />

                        <div className="flex flex-col items-center md:items-start text-center md:text-left z-10 max-w-2xl">
                            <Heading className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-4">
                                {t("ProcessGuidelineBlock.ctaTitle")}
                            </Heading>
                            <Text className="text-sm sm:text-base text-gray-400">
                                {t("ProcessGuidelineBlock.ctaDescription")}
                            </Text>
                        </div>

                        <div className="z-10 shrink-0 w-full md:w-auto">
                            <Link to="/#calculator" className="w-full">
                                <Button
                                    size="lg"
                                    className="group w-full flex items-center justify-center gap-3 bg-primary-600 text-white hover:bg-primary-500 h-16 px-10 text-base font-bold tracking-wide uppercase rounded-lg shadow-lg shadow-primary-950/30 hover:shadow-xl hover:shadow-primary-600/40 transition-all duration-300 hover:-translate-y-1 cursor-pointer active:scale-95"
                                >
                                    {t("ProcessGuidelineBlock.ctaButton")}
                                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                                </Button>
                            </Link>
                        </div>

                    </div>
                </FadeIn>

            </div>
        </section>
    );
}