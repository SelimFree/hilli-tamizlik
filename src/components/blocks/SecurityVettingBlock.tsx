import { useTranslation } from "react-i18next";
import { ShieldCheck, GraduationCap, FileCheck, Sparkles } from "lucide-react";
import { Heading } from "../ui/Heading";
import { Text } from "../ui/Text";
import { FadeIn } from "../utils/FadeIn";
import { cn } from "../../lib/utils";

const VETTING_STEPS = [
    {
        id: "screening",
        stepNumber: "01",
        icon: ShieldCheck,
    },
    {
        id: "academy",
        stepNumber: "02",
        icon: GraduationCap,
    },
    {
        id: "insurance",
        stepNumber: "03",
        icon: FileCheck,
    },
];

export function SecurityVettingBlock() {
    const { t } = useTranslation("about");

    return (
        <section className="w-full bg-white py-20 sm:py-28 overflow-hidden">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                <div className="mb-20 md:mb-28 text-center mx-auto max-w-3xl">
                    <FadeIn direction="up" delay={0}>
                        <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-1.5 text-[10px] font-bold tracking-widest text-primary-600 uppercase">
                            <Sparkles className="h-3.5 w-3.5" /> {t("SecurityVettingBlock.badge")}
                        </span>
                    </FadeIn>

                    <FadeIn direction="up" delay={150}>
                        <Heading className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
                            {t("SecurityVettingBlock.headingStart")} <br className="hidden sm:block" />
                            <span className="text-primary-600">{t("SecurityVettingBlock.headingAccent")}</span>
                        </Heading>
                    </FadeIn>
                </div>

                <div className="relative mx-auto max-w-5xl">

                    <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-gray-100 md:left-1/2 md:-translate-x-1/2" />
                    <div className="absolute left-4.25 top-2 bottom-2 w-0.5 bg-gray-100 md:left-1/2 md:-translate-x-1/2" />

                    <div className="space-y-16 md:space-y-24">
                        {VETTING_STEPS.map((step, index) => {
                            const Icon = step.icon;
                            const isEven = index % 2 === 0;

                            return (
                                <div
                                    key={step.id}
                                    className="group relative flex flex-col md:flex-row w-full items-start justify-between pl-10 md:pl-0"
                                >
                                    <div className="absolute left-4.25 md:left-1/2 top-1.5 md:top-4 h-3 w-3 -translate-x-1/2 rounded-full bg-gray-200 ring-4 ring-white transition-all duration-500 group-hover:bg-primary-600 group-hover:scale-125 z-10" />

                                    <div className={cn(
                                        "w-full md:w-[calc(50%-36px)] flex flex-col",
                                        isEven ? "md:items-end md:text-right order-2 md:order-1" : "md:items-end md:text-right order-3 md:order-1 mt-2 md:mt-0"
                                    )}>
                                        <FadeIn direction={window.matchMedia("(min-width: 768px)").matches ? "left" : "up"} delay={200}>
                                            {isEven ? (
                                                <div className="flex flex-col md:items-end">
                                                    <div className="flex items-center gap-3 mb-2 md:flex-row-reverse">
                                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-50 border border-gray-100 text-primary-600 group-hover:bg-primary-600 group-hover:text-white group-hover:border-primary-500 transition-all duration-300 shadow-xs">
                                                            <Icon className="h-4 w-4" strokeWidth={2} />
                                                        </div>
                                                        <span className="text-xs font-bold text-primary-600 tracking-wider md:hidden">
                                                            {step.stepNumber} // {t(`SecurityVettingBlock.steps.${step.id}.subtitle`)}
                                                        </span>
                                                        <span className="hidden md:block text-sm font-black text-gray-300 tracking-wider">
                                                            {step.stepNumber}
                                                        </span>
                                                    </div>
                                                    <Heading className="text-xl font-extrabold text-gray-900 group-hover:text-primary-600 transition-colors duration-300">
                                                        {t(`SecurityVettingBlock.steps.${step.id}.title`)}
                                                    </Heading>
                                                </div>
                                            ) : (
                                                <div className="max-w-md">
                                                    <span className="hidden md:block text-xs font-bold text-primary-500 tracking-widest uppercase mb-2">
                                                        {t(`SecurityVettingBlock.steps.${step.id}.subtitle`)}
                                                    </span>
                                                    <Text className="text-sm sm:text-base leading-relaxed text-gray-500">
                                                        {t(`SecurityVettingBlock.steps.${step.id}.description`)}
                                                    </Text>
                                                </div>
                                            )}
                                        </FadeIn>
                                    </div>

                                    <div className={cn(
                                        "w-full md:w-[calc(50%-36px)] flex flex-col",
                                        isEven ? "md:items-start md:text-left order-3 md:order-2 mt-2 md:mt-0" : "md:items-start md:text-left order-2 md:order-2"
                                    )}>
                                        <FadeIn direction={window.matchMedia("(min-width: 768px)").matches ? "right" : "up"} delay={300}>
                                            {!isEven ? (
                                                <div className="flex flex-col md:items-start">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-50 border border-gray-100 text-primary-600 group-hover:bg-primary-600 group-hover:text-white group-hover:border-primary-500 transition-all duration-300 shadow-xs">
                                                            <Icon className="h-4 w-4" strokeWidth={2} />
                                                        </div>
                                                        <span className="text-xs font-bold text-primary-600 tracking-wider md:hidden">
                                                            {step.stepNumber} // {t(`SecurityVettingBlock.steps.${step.id}.subtitle`)}
                                                        </span>
                                                        <span className="hidden md:block text-sm font-black text-gray-300 tracking-wider">
                                                            {step.stepNumber}
                                                        </span>
                                                    </div>
                                                    <Heading className="text-xl font-extrabold text-gray-900 group-hover:text-primary-600 transition-colors duration-300">
                                                        {t(`SecurityVettingBlock.steps.${step.id}.title`)}
                                                    </Heading>
                                                </div>
                                            ) : (
                                                <div className="max-w-md">
                                                    <span className="hidden md:block text-xs font-bold text-primary-500 tracking-widest uppercase mb-2">
                                                        {t(`SecurityVettingBlock.steps.${step.id}.subtitle`)}
                                                    </span>
                                                    <Text className="text-sm sm:text-base leading-relaxed text-gray-500">
                                                        {t(`SecurityVettingBlock.steps.${step.id}.description`)}
                                                    </Text>
                                                </div>
                                            )}
                                        </FadeIn>
                                    </div>

                                </div>
                            );
                        })}
                    </div>

                </div>

            </div>
        </section>
    );
}