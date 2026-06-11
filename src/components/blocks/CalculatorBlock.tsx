import { useState, useMemo } from "react";
import { MessageCircle, Calculator, Sparkles, Check, ChevronRight } from "lucide-react";
import { Heading } from "../ui/Heading";
import { Text } from "../ui/Text";
import { FadeIn } from "../utils/FadeIn";
import { cn } from "../../lib/utils";

const WHATSAPP_NUMBER = "99361234567";

const SERVICE_LEVELS = [
  { id: "standard", label: "Standard Maintenance", pricePerSqm: 15, desc: "Light dusting, vacuuming, and surface mopping." },
  { id: "deep", label: "Premium Deep Clean", pricePerSqm: 25, desc: "Detailed scrubbing, baseboards, and hidden dust vectors." },
  { id: "construction", label: "Post-Construction", pricePerSqm: 35, desc: "Industrial removal of fine dust, paint, and residues." },
];

const ADDONS = [
  { id: "fridge", label: "Inside Fridge", price: 50 },
  { id: "oven", label: "Inside Oven", price: 60 },
  { id: "windows", label: "Interior Windows", price: 100 },
  { id: "balcony", label: "Balcony Cleaning", price: 80 },
  { id: "carpet", label: "Deep Carpet Wash", price: 120 },
  { id: "mattress", label: "Mattress Sanitization", price: 90 },
  { id: "cabinets", label: "Inside Cabinets", price: 70 },
];

export function CalculatorBlock() {
  const [sqm, setSqm] = useState<number>(60);
  const [activeService, setActiveService] = useState<string>("deep");
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  const { basePrice, addonsPrice, totalPrice } = useMemo(() => {
    const service = SERVICE_LEVELS.find((s) => s.id === activeService);
    const base = (service?.pricePerSqm || 0) * sqm;
    
    const addonsTotal = selectedAddons.reduce((sum, addonId) => {
      const addon = ADDONS.find((a) => a.id === addonId);
      return sum + (addon?.price || 0);
    }, 0);

    return {
      basePrice: base,
      addonsPrice: addonsTotal,
      totalPrice: base + addonsTotal,
    };
  }, [sqm, activeService, selectedAddons]);

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) => 
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const handleWhatsAppRedirect = () => {
    const serviceName = SERVICE_LEVELS.find((s) => s.id === activeService)?.label;
    const addonNames = selectedAddons.map(id => ADDONS.find(a => a.id === id)?.label).join(", ");
    
    const message = `Hello Hilli Tämizlik! 👋\n\nI used your website calculator and would like to request a booking:\n\n*Service:* ${serviceName}\n*Size:* ${sqm} m²\n*Add-ons:* ${addonNames || "None"}\n*Estimated Total:* ${totalPrice} TMT\n\nIs this available?`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodedMessage}`, "_blank");
  };

  return (
    <section className="w-full bg-gray-50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="mb-12 text-center md:mb-16">
          <FadeIn direction="up" delay={0}>
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-[10px] font-bold tracking-widest text-primary-600 uppercase shadow-sm border border-gray-100">
              <Calculator className="h-3.5 w-3.5" /> Instant Estimate
            </span>
          </FadeIn>
          
          <FadeIn direction="up" delay={150}>
            <Heading className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
              Transparent pricing. <br className="hidden sm:block" />
              <span className="text-primary-600">No hidden fees.</span>
            </Heading>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12 items-start">
          
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-10">
            
            <FadeIn direction="up" delay={300}>
              <div className="rounded-lg border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <Heading className="text-lg font-bold text-gray-900">1. Property Size</Heading>
                  <span className="text-2xl font-black text-primary-600">{sqm} <span className="text-sm font-semibold text-gray-400">m²</span></span>
                </div>
                
                <input 
                  type="range" 
                  min="20" 
                  max="300" 
                  step="5"
                  value={sqm}
                  onChange={(e) => setSqm(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500/30 transition-all hover:bg-gray-300"
                />
                <div className="flex justify-between text-xs font-semibold text-gray-400 mt-3 uppercase tracking-wider">
                  <span>20 m²</span>
                  <span>300+ m²</span>
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={450}>
              <div className="rounded-lg border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
                <Heading className="text-lg font-bold text-gray-900 mb-6">2. Cleaning Level</Heading>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {SERVICE_LEVELS.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => setActiveService(service.id)}
                      className={cn(
                        "relative flex flex-col items-start p-4 rounded-lg border-2 text-left transition-all duration-300 cursor-pointer active:scale-95 group",
                        activeService === service.id 
                          ? "border-primary-600 bg-primary-50/50 shadow-md shadow-primary-900/5" 
                          : "border-gray-100 hover:border-primary-300 hover:bg-primary-50/30 hover:-translate-y-1 hover:shadow-lg"
                      )}
                    >
                      {activeService === service.id && (
                        <div className="absolute top-3 right-3 h-5 w-5 rounded-full bg-primary-600 flex items-center justify-center animate-in zoom-in duration-200">
                          <Check className="h-3 w-3 text-white" strokeWidth={3} />
                        </div>
                      )}
                      <span className="font-bold text-gray-900 text-sm mb-1 pr-6 group-hover:text-primary-700 transition-colors">{service.label}</span>
                      <span className="text-xs text-gray-500 leading-relaxed">{service.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={600}>
              <div className="rounded-lg border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
                <Heading className="text-lg font-bold text-gray-900 mb-6">3. Extra Services</Heading>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3">
                  {ADDONS.map((addon) => {
                    const isSelected = selectedAddons.includes(addon.id);
                    return (
                      <button
                        key={addon.id}
                        onClick={() => toggleAddon(addon.id)}
                        className={cn(
                          "flex items-center gap-2 px-3 py-3 sm:px-4 sm:py-2.5 rounded-lg border text-left transition-all duration-300 cursor-pointer active:scale-95 h-full",
                          isSelected
                            ? "bg-gray-900 border-gray-900 text-white shadow-md scale-[1.02]"
                            : "bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:-translate-y-0.5 hover:shadow-sm"
                        )}
                      >
                        <div className="shrink-0 flex items-center justify-center">
                          {isSelected ? <Check className="h-4 w-4 text-primary-400 animate-in zoom-in" /> : <Sparkles className="h-4 w-4 text-gray-400" />}
                        </div>
                        
                        <span className="text-xs sm:text-sm font-semibold leading-tight">{addon.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </FadeIn>

          </div>

          <div className="lg:col-span-5 xl:col-span-4 sticky top-28">
            <FadeIn direction="up" delay={750}>
              <div className="rounded-lg bg-gray-900 border border-gray-800 p-6 sm:p-8 shadow-2xl overflow-hidden relative">
                
                <div className="absolute -top-24 -right-24 h-48 w-48 bg-primary-600/20 rounded-full blur-3xl pointer-events-none" />

                <Heading className="text-xl font-bold text-white mb-6">Your Estimate</Heading>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center pb-4 border-b border-gray-800">
                    <span className="text-sm text-gray-400">Base Clean ({sqm} m²)</span>
                    <span className="font-semibold text-white transition-all">{basePrice} TMT</span>
                  </div>
                  
                  {selectedAddons.length > 0 && (
                    <div className="flex justify-between items-center pb-4 border-b border-gray-800 animate-in fade-in slide-in-from-top-2 duration-300">
                      <span className="text-sm text-gray-400">Extras ({selectedAddons.length})</span>
                      <span className="font-semibold text-white">+{addonsPrice} TMT</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-end pt-2">
                    <span className="text-sm font-bold tracking-widest text-gray-500 uppercase">Estimated Total</span>
                    <span className="text-4xl font-black text-primary-400 transition-all duration-300">{totalPrice} <span className="text-lg text-primary-600/50">TMT</span></span>
                  </div>
                </div>

                <Text className="text-xs text-gray-500 leading-relaxed mb-6">
                  *This is an approximate estimate based on average conditions. Final price is confirmed before work begins.
                </Text>

                <button
                  onClick={handleWhatsAppRedirect}
                  className="w-full group flex items-center justify-center gap-3 bg-primary-600 hover:bg-primary-500 text-white h-14 rounded-lg font-bold text-sm tracking-wide uppercase transition-all duration-300 shadow-lg shadow-primary-500/20 hover:shadow-xl hover:shadow-primary-500/40 hover:-translate-y-1 active:scale-[0.98] cursor-pointer"
                >
                  <MessageCircle className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                  Book via WhatsApp
                  <ChevronRight className="h-4 w-4 opacity-70 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </FadeIn>
          </div>

        </div>
      </div>
    </section>
  );
}