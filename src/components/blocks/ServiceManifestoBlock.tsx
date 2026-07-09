import { useTranslation } from "react-i18next";
import { Check, Plus, Sparkles } from "lucide-react";
import { Heading } from "../ui/Heading";
import { Text } from "../ui/Text";
import { Button } from "../ui/Button";
import { Image } from "../ui/Image";
import { FadeIn } from "../utils/FadeIn";
import { cn } from "../../lib/utils";
import { useLocation, useNavigate } from "react-router-dom";
import RoutineBeforeImg from "../../assets/services/routine_before.png";
import RoutineAftereImg from "../../assets/services/routine_after.png";

import DeepBeforeImg from "../../assets/services/deep_before.png";
import DeepAftereImg from "../../assets/services/deep_after.png";

import ConstructionBeforeImg from "../../assets/services/construction_before.png";
import ConstructionAftereImg from "../../assets/services/construction_after.png";

import CorporateBeforeImg from "../../assets/services/corporate_before.png";
import CorporateAftereImg from "../../assets/services/corporate_after.png";

import DrycleaningBeforeImg from "../../assets/services/drycleaning_before.png";
import DrycleaningAftereImg from "../../assets/services/drycleaning_after.png";

import PressureBeforeImg from "../../assets/services/pressure_before.png";
import PressureAftereImg from "../../assets/services/pressure_after.png";

import FacadeBeforeImg from "../../assets/services/facade_before.png";
import FacadeAftereImg from "../../assets/services/facade_after.png";

import ChandelierBeforeImg from "../../assets/services/chandelier_before.png";
import ChandelierAftereImg from "../../assets/services/chandelier_after.png";

import WindowsBeforeImg from "../../assets/services/windows_before.png";
import WindowsAftereImg from "../../assets/services/windows_after.png";

const SERVICES_DATA = [
    {
        id: "routine",
        imageBefore: RoutineBeforeImg,
        imageAfter: RoutineAftereImg,
        checklist: ["dusting", "vacuuming", "mopping", "kitchen", "bathroom", "mirrors", "waste", "handles", "sills", "inspection"],
        addons: [],
    },
    {
        id: "deep",
        imageBefore: DeepBeforeImg,
        imageAfter: DeepAftereImg,
        checklist: ["dusting", "furniture", "degreasing", "descaling", "skirting", "doors", "cabinets", "vents", "floors", "spots", "windows", "inspection"],
        addons: [],
    },
    {
        id: "construction",
        imageBefore: ConstructionBeforeImg,
        imageAfter: ConstructionAftereImg,
        checklist: ["extraction", "detailing", "paint", "residue", "windows", "cabinets", "fixtures", "tile", "doors", "exterior", "packaging", "handover"],
        addons: [],
    },
    {
        id: "corporate",
        imageBefore: CorporateBeforeImg,
        imageAfter: CorporateAftereImg,
        checklist: ["desks", "furniture", "floors", "reception", "pantry", "washrooms", "disinfection", "glass", "waste", "common", "supply", "inspection"],
        addons: [],
    },
    {
        id: "drycleaning",
        imageBefore: DrycleaningBeforeImg,
        imageAfter: DrycleaningAftereImg,
        checklist: ["assessment", "vacuuming", "pretreatment", "compound", "agitation", "spot", "odour", "allergen", "fibre", "finishing", "detailing", "inspection"],
        addons: [],
    },
    {
        id: "pressure",
        imageBefore: PressureBeforeImg,
        imageAfter: PressureAftereImg,
        checklist: ["assessment", "debris", "pretreatment", "washing", "grout", "algae", "oil", "detailing", "sensitive", "rinsing", "protection", "inspection"],
        addons: [],
    },
    {
        id: "facade",
        imageBefore: FacadeBeforeImg,
        imageAfter: FacadeAftereImg,
        checklist: ["assessment", "dust", "washing", "glass", "cladding", "stone", "marks", "ledge", "algae", "entrance", "protection", "inspection"],
        addons: [],
    },
    {
        id: "chandelier",
        imageBefore: ChandelierBeforeImg,
        imageAfter: ChandelierAftereImg,
        checklist: ["assessment", "protection", "crystal", "metal", "detailing", "residue", "polishing", "bulbs", "alignment", "highlevel", "moisture", "inspection"],
        addons: [],
    },
    {
        id: "windows",
        imageBefore: WindowsBeforeImg,
        imageAfter: WindowsAftereImg,
        checklist: ["glass", "frames", "tracks", "fingerprints", "marks", "detailing", "doors", "skylights", "highlevel", "polishing", "protection", "inspection"],
        addons: [],
    },
];

export function ServiceManifestoBlock() {
    const { t } = useTranslation("services");
    const location = useLocation();
    const navigate = useNavigate();

    const hashId = location.hash.replace("#", "");
    const isValidTab = SERVICES_DATA.some((s) => s.id === hashId);
    const activeTab = isValidTab ? hashId : SERVICES_DATA[0].id;

    const activeData = SERVICES_DATA.find((s) => s.id === activeTab) || SERVICES_DATA[0];

    const handleTabChange = (id: string) => {
        navigate(`#${id}`, { replace: true });
    };

    return (
        <section id="manifesto" className="w-full bg-white py-12 lg:py-16 overflow-hidden">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                <div className="mb-10 md:mb-16 flex flex-col items-center">
                    <FadeIn direction="up" delay={0}>
                        <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-1.5 text-[10px] font-bold tracking-widest text-primary-600 uppercase">
                            <Sparkles className="h-3.5 w-3.5" /> {t("ServiceManifestoBlock.badge")}
                        </span>
                    </FadeIn>

                    <FadeIn direction="up" delay={100} className="w-full flex justify-center">
                        <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 p-1.5 bg-gray-100/80 rounded-lg border border-gray-200/60 shadow-inner max-w-3xl">
                            {SERVICES_DATA.map((service) => {
                                const isActive = activeTab === service.id;
                                return (
                                    <Button
                                        key={service.id}
                                        variant="ghost"
                                        onClick={() => handleTabChange(service.id)}
                                        className={cn(
                                            "text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 rounded-md select-none",
                                            isActive
                                                ? "bg-white text-primary-700 shadow-sm border border-gray-200/50 hover:bg-white"
                                                : "text-gray-500 hover:text-gray-900 border border-transparent hover:bg-gray-200/50"
                                        )}
                                    >
                                        {t(`ServiceManifestoBlock.services.${service.id}.label`)}
                                    </Button>
                                );
                            })}
                        </div>
                    </FadeIn>
                </div>

                <div key={activeTab} className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14 items-start">

                    <div className="lg:col-span-6 flex flex-col items-start pt-2 text-center md:text-left">
                        <FadeIn direction="right" delay={0}>
                            <Heading className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-5xl mb-6">
                                {t(`ServiceManifestoBlock.services.${activeData.id}.title`)}
                            </Heading>

                            <Text className="text-base sm:text-lg leading-relaxed text-gray-600 mb-8 border-b border-gray-100 pb-8">
                                {t(`ServiceManifestoBlock.services.${activeData.id}.description`)}
                            </Text>
                        </FadeIn>

                        <FadeIn direction="right" delay={100} className="w-full">
                            <Heading className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-6">
                                {t("ServiceManifestoBlock.inclusionsTitle")}
                            </Heading>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 mb-8">
                                {activeData.checklist.map((itemKey) => (
                                    <div key={itemKey} className="flex items-start gap-3">
                                        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-600 mt-0.5">
                                            <Check className="h-3.5 w-3.5" strokeWidth={3} />
                                        </div>
                                        <span className="text-sm font-medium text-gray-600 leading-snug">
                                            {t(`ServiceManifestoBlock.services.${activeData.id}.checklist.${itemKey}`)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </FadeIn>

                        <FadeIn direction="right" delay={200} className="w-full mb-8">
                            <div className="flex flex-wrap gap-2 sm:gap-3">
                                {activeData?.id && Array.isArray(activeData.addons) && activeData.addons.length > 0 && (
                                    activeData.addons.map((addonKey: string) => (
                                        <div key={addonKey} className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-xs font-bold text-gray-600">
                                            <Plus className="h-3.5 w-3.5 text-primary-400" strokeWidth={3} />
                                            {t(`ServiceManifestoBlock.services.${activeData.id}.addons.${addonKey}` as const)}
                                        </div>
                                    ))
                                )}
                            </div>
                        </FadeIn>

                    </div>

                    <div className="lg:col-span-6 relative w-full">
                        <FadeIn direction="left" delay={200} className="w-full h-full">

                            <div className="grid grid-cols-2 gap-2 sm:gap-4 h-full min-h-75 sm:min-h-120">

                                <div className="relative rounded-lg overflow-hidden border border-gray-200 shadow-sm group bg-gray-100">
                                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded border border-gray-200 z-10 shadow-sm pointer-events-none">
                                        <span className="text-[10px] font-bold text-gray-900 uppercase tracking-widest">
                                            {t("ServiceManifestoBlock.before")}
                                        </span>
                                    </div>
                                    <Image
                                        src={activeData.imageBefore}
                                        alt={t(`ServiceManifestoBlock.services.${activeData.id}.imageBeforeAlt`)}
                                        containerClassName="h-full w-full"
                                        className="transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <Image
                                        src="/android-chrome-192x192.png"
                                        containerClassName="absolute h-10 w-auto bottom-3 left-3 z-20 rounded-full pointer-events-none opacity-50 transition-opacity duration-300 group-hover:opacity-80 drop-shadow-md"
                                        alt="Company Watermark"
                                    />

                                </div>

                                <div className="relative rounded-lg overflow-hidden border border-gray-200 shadow-sm group bg-gray-100">
                                    <div className="absolute top-3 right-3 bg-primary-600/90 backdrop-blur-md px-2.5 py-1 rounded border border-primary-500 z-10 shadow-sm pointer-events-none">
                                        <span className="text-[10px] font-bold text-white uppercase tracking-widest">
                                            {t("ServiceManifestoBlock.after")}
                                        </span>
                                    </div>
                                    <Image
                                        src={activeData.imageAfter}
                                        alt={t(`ServiceManifestoBlock.services.${activeData.id}.imageAfterAlt`)}
                                        containerClassName="h-full w-full"
                                        className="transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <Image
                                        src="/android-chrome-192x192.png"
                                        containerClassName="absolute h-10 w-auto bottom-3 right-3 z-20 rounded-full pointer-events-none opacity-50 transition-opacity duration-300 group-hover:opacity-80 drop-shadow-md"
                                        alt="Company Watermark"
                                    />
                                </div>

                            </div>

                        </FadeIn>
                    </div>

                </div>

            </div>
        </section>
    );
}