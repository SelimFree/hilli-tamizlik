import { useState } from "react";
import { Check, Plus, Sparkles } from "lucide-react";
import { Heading } from "../ui/Heading";
import { Text } from "../ui/Text";
import { Button } from "../ui/Button";
import { Image } from "../ui/Image";
import { FadeIn } from "../utils/FadeIn";
import { cn } from "../../lib/utils";

const SERVICES_DATA = [
    {
        id: "deep",
        label: "Premium Deep Clean",
        title: "Complete property restoration.",
        description: "Our signature service. We strip away months of accumulated dust, sanitize hidden vectors, and restore your architectural finishes to their original state.",
        imageBefore: "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?q=80&w=800",
        imageAfter: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800",
        checklist: [
            "Baseboard & molding detail scrubbing",
            "Behind/under movable appliances",
            "Interior window glass & tracks",
            "Deep grout line sanitation",
            "Air vent & ceiling fan dusting",
            "Cabinet exteriors & handles",
            "Door frames & light switches",
            "Hard floor multi-stage mopping",
        ],
        addons: ["Inside Fridge", "Inside Oven", "Interior Cabinets"],
    },
    {
        id: "standard",
        label: "Standard Maintenance",
        title: "Flawless routine management.",
        description: "Designed for properties that have already undergone our Deep Clean. A rigorous recurring protocol to maintain absolute hygiene and aesthetic perfection.",
        imageBefore: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800",
        imageAfter: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=800",
        checklist: [
            "Surface dusting & polishing",
            "Full vacuuming of all floors",
            "Standard hard floor mopping",
            "Bathroom sanitation (toilets, sinks)",
            "Shower glass & mirror polishing",
            "Kitchen counter & sink detailing",
            "Trash removal & liner replacement",
            "General tidying & bed making",
        ],
        addons: ["Balcony Cleaning", "Deep Carpet Wash"],
    },
    {
        id: "construction",
        label: "Post-Construction",
        title: "Raw space to turn-key home.",
        description: "Industrial-grade dust extraction. We safely remove fine drywall particulate, silicon residue, and paint splatters without damaging brand new finishes.",
        imageBefore: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=800",
        imageAfter: "https://images.unsplash.com/photo-1628177142898-93e46e46503f?q=80&w=800",
        checklist: [
            "Wall & ceiling fine dust removal",
            "Paint splatter & tape residue removal",
            "Window sticker & adhesive clearing",
            "HVAC vent intensive vacuuming",
            "Inside/outside all new cabinetry",
            "Plumbing fixture polishing",
            "Multi-stage micro-dust floor sweep",
            "Final turn-key shine protocol",
        ],
        addons: ["Exterior Windows", "Pressure Washing"],
    },
    {
        id: "upholstery",
        label: "Sofa & Upholstery Care",
        title: "Deep injection-suction extraction.",
        description: "We extract embedded dust mites, sweat, stains, and bacteria from luxury furniture fabrics using heavy-duty thermal fluid machinery that refreshes deep textiles.",
        imageBefore: "https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=800",
        imageAfter: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?q=80&w=800",
        checklist: [
            "Industrial fabric vacuuming",
            "Targeted stain pre-treatment",
            "Deep extraction fluid injection",
            "Microfiber pile alignment",
            "Odour enzyme neutralization",
            "Crevice & under-cushion clearance",
            "Allergen & dander elimination",
            "Delicate fiber safe drying",
        ],
        addons: ["Pillow Restoration", "Leather Conditioning"],
    },
    {
        id: "carpet",
        label: "Carpet Restoration",
        title: "Industrial fiber rejuvenation.",
        description: "High-traffic pile requires structural dirt removal. Our industrial rotary brushes extract deep sand and abrasive grime that breaks down carpet weave over time.",
        imageBefore: "https://images.unsplash.com/photo-1558317374-067fb5f30001?q=80&w=800",
        imageAfter: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=800",
        checklist: [
            "Mechanical pile lifting",
            "Intensive edge-track vacuuming",
            "Stain chemical encapsulation",
            "Hot water extraction rinse",
            "pH-balancing fabric conditioning",
            "Industrial moisture extraction",
            "Heavy shadow stain scrubbing",
            "Disinfection misting layer",
        ],
        addons: ["Stain Guard Protection", "Pet Odor Treatment"],
    },
    {
        id: "turnover",
        label: "Move-In / Move-Out",
        title: "Seamless real estate turn-key.",
        description: "An intensive sanitization pass designed to erase all traces of previous occupants. Ideal for landlords, premium property management agencies, and new buyers.",
        imageBefore: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800",
        imageAfter: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=800",
        checklist: [
            "Deep inside all kitchen cabinetry",
            "Oven & stovetop carbon removal",
            "Refrigerator defrost & sanitization",
            "Wardrobe interior vacuum & wash",
            "Full wall spot scrubbing",
            "Light fixture & chandelier detailing",
            "Exhaust fan grid degreasing",
            "Bathroom lime-scale dissolving",
        ],
        addons: ["Garage Deep Sweep", "Wall Washing"],
    },
    {
        id: "commercial",
        label: "Corporate Spaces",
        title: "Premium workspace maintenance.",
        description: "Maintain absolute corporate professionalism. High-frequency, meticulous sanitation designed for premium corporate offices, boutique retail, and showrooms.",
        imageBefore: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800",
        imageAfter: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800",
        checklist: [
            "Workstation & desk disinfection",
            "Glass partition streak-free wipe",
            "High-traffic hallway floor care",
            "Communal breakroom deep sanitize",
            "Conference room audio/visual wipe",
            "Central HVAC return grill dusting",
            "Document shredder area cleanup",
            "Systematic trash & recycling loop",
        ],
        addons: ["Server Room Static Dusting", "Eco-Fog Air Disinfection"],
    },
    {
        id: "windows",
        label: "Window & Facade",
        title: "Streak-free optical clarity.",
        description: "Overcome hard-water scaling and sand dust accumulation. We scrape, treat, and buff high-end glass installations to absolute perfection using premium squeegee systems.",
        imageBefore: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?q=80&w=800",
        imageAfter: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800",
        checklist: [
            "Heavy mineral buildup scraping",
            "Track system pressure clearance",
            "Fly-screen pressure washing",
            "Rubber seal silicone conditioning",
            "Streak-free solution polish",
            "Exterior sill pressure wash",
            "Balcony enclosure glass tracking",
            "High-reach structural frame dusting",
        ],
        addons: ["Frame Oxidation Shine", "Glass Rain-Repellent Layer"],
    },
];

export function ServiceManifestoBlock() {
    const [activeTab, setActiveTab] = useState(SERVICES_DATA[0].id);
    const activeData = SERVICES_DATA.find((s) => s.id === activeTab) || SERVICES_DATA[0];

    return (
        <section className="w-full bg-white py-12 lg:py-16 overflow-hidden">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                <div className="mb-10 md:mb-16 flex flex-col items-center">
                    <FadeIn direction="up" delay={0}>
                        <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-1.5 text-[10px] font-bold tracking-widest text-primary-600 uppercase">
                            <Sparkles className="h-3.5 w-3.5" /> Our Services
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
                                        onClick={() => setActiveTab(service.id)}
                                        className={cn(
                                            "text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 rounded-md select-none",
                                            isActive
                                                ? "bg-white text-primary-700 shadow-sm border border-gray-200/50 hover:bg-white"
                                                : "text-gray-500 hover:text-gray-900 border border-transparent hover:bg-gray-200/50"
                                        )}
                                    >
                                        {service.label}
                                    </Button>
                                );
                            })}
                        </div>
                    </FadeIn>
                </div>

                <div key={activeTab} className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14 items-start">

                    <div className="lg:col-span-6 flex flex-col items-start pt-2">
                        <FadeIn direction="right" delay={0}>
                            <Heading className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-5xl mb-6">
                                {activeData.title}
                            </Heading>

                            <Text className="text-base sm:text-lg leading-relaxed text-gray-600 mb-8 border-b border-gray-100 pb-8">
                                {activeData.description}
                            </Text>
                        </FadeIn>

                        <FadeIn direction="right" delay={100} className="w-full">
                            <Heading className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-6">
                                Standard Inclusions
                            </Heading>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 mb-8">
                                {activeData.checklist.map((item, index) => (
                                    <div key={index} className="flex items-start gap-3">
                                        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-600 mt-0.5">
                                            <Check className="h-3.5 w-3.5" strokeWidth={3} />
                                        </div>
                                        <span className="text-sm font-medium text-gray-600 leading-snug">
                                            {item}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </FadeIn>

                        <FadeIn direction="right" delay={200} className="w-full mb-8">
                            <div className="flex flex-wrap gap-2 sm:gap-3">
                                {activeData.addons.map((addon, index) => (
                                    <div key={index} className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-xs font-bold text-gray-600">
                                        <Plus className="h-3.5 w-3.5 text-primary-400" strokeWidth={3} />
                                        {addon}
                                    </div>
                                ))}
                            </div>
                        </FadeIn>

                    </div>

                    <div className="lg:col-span-6 relative w-full">
                        <FadeIn direction="left" delay={200} className="w-full h-full">

                            <div className="grid grid-cols-2 gap-2 sm:gap-4 h-full min-h-75 sm:min-h-120">

                                <div className="relative rounded-lg overflow-hidden border border-gray-200 shadow-sm group bg-gray-100">
                                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded border border-gray-200 z-10 shadow-sm pointer-events-none">
                                        <span className="text-[10px] font-bold text-gray-900 uppercase tracking-widest">Before</span>
                                    </div>
                                    <Image
                                        src={activeData.imageBefore}
                                        alt={`${activeData.label} Before state`}
                                        containerClassName="h-full w-full"
                                        className="transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>

                                <div className="relative rounded-lg overflow-hidden border border-gray-200 shadow-sm group bg-gray-100">
                                    <div className="absolute top-3 right-3 bg-primary-600/90 backdrop-blur-md px-2.5 py-1 rounded border border-primary-500 z-10 shadow-sm pointer-events-none">
                                        <span className="text-[10px] font-bold text-white uppercase tracking-widest">After</span>
                                    </div>
                                    <Image
                                        src={activeData.imageAfter}
                                        alt={`${activeData.label} After state`}
                                        containerClassName="h-full w-full"
                                        className="transition-transform duration-700 group-hover:scale-105"
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