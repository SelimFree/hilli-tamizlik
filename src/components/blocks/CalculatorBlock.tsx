import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { MessageCircle, Calculator, Sparkles, Check, ChevronRight } from "lucide-react";
import { Heading } from "../ui/Heading";
import { Text } from "../ui/Text";
import { FadeIn } from "../utils/FadeIn";
import { cn } from "../../lib/utils";
import { Button } from "../ui/Button";

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER;

const SERVICE_LEVELS = [
  { id: "standard", pricePerSqm: 15 },
  { id: "deep", pricePerSqm: 25 },
  { id: "construction", pricePerSqm: 35 },
];

const ADDONS = [
  { id: "fridge", price: 50 },
  { id: "oven", price: 60 },
  { id: "windows", price: 100 },
  { id: "balcony", price: 80 },
  { id: "carpet", price: 120 },
  { id: "mattress", price: 90 },
  { id: "cabinets", price: 70 },
];

export function CalculatorBlock() {
  const { t } = useTranslation("home");
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
    const serviceName = t(`CalculatorBlock.services.${activeService}.label`);
    const addonNames = selectedAddons
      .map(id => t(`CalculatorBlock.addons.${id}.label`))
      .join(", ");

    const message = `${t("CalculatorBlock.msgGreet")}\n\n${t("CalculatorBlock.msgIntro")}\n\n*${t("CalculatorBlock.msgService")}:* ${serviceName}\n*${t("CalculatorBlock.msgSize")}:* ${sqm} m²\n*${t("CalculatorBlock.msgAddons")}:* ${addonNames || t("CalculatorBlock.none")}\n*${t("CalculatorBlock.msgTotal")}:* ${totalPrice} TMT\n\n${t("CalculatorBlock.msgOutro")}`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodedMessage}`, "_blank");
  };

  return (
    <section id="calculator" className="w-full bg-gray-50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="mb-12 text-center md:mb-16">
          <FadeIn direction="up" delay={0}>
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-[10px] font-bold tracking-widest text-primary-600 uppercase shadow-sm border border-gray-100">
              <Calculator className="h-3.5 w-3.5" /> {t("CalculatorBlock.badge")}
            </span>
          </FadeIn>

          <FadeIn direction="up" delay={150}>
            <Heading className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
              {t("CalculatorBlock.headingStart")} <br className="hidden sm:block" />
              <span className="text-primary-600">{t("CalculatorBlock.headingAccent")}</span>
            </Heading>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12 items-start">

          <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-10">

            <FadeIn direction="up" delay={300}>
              <div className="rounded-lg border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <Heading className="text-lg font-bold text-gray-900">{t("CalculatorBlock.step1Title")}</Heading>
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
                  <span>{t("CalculatorBlock.rangeMin")}</span>
                  <span>{t("CalculatorBlock.rangeMax")}</span>
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={450}>
              <div className="rounded-lg border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
                <Heading className="text-lg font-bold text-gray-900 mb-6">{t("CalculatorBlock.step2Title")}</Heading>
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
                      <span className="font-bold text-gray-900 text-sm mb-1 pr-6 group-hover:text-primary-700 transition-colors">
                        {t(`CalculatorBlock.services.${service.id}.label`)}
                      </span>
                      <span className="text-xs text-gray-500 leading-relaxed">
                        {t(`CalculatorBlock.services.${service.id}.desc`)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={600}>
              <div className="rounded-lg border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
                <Heading className="text-lg font-bold text-gray-900 mb-6">{t("CalculatorBlock.step3Title")}</Heading>

                <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3">
                  {ADDONS.map((addon) => {
                    const isSelected = selectedAddons.includes(addon.id);
                    return (
                      <Button
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

                        <span className="text-xs sm:text-sm font-semibold leading-tight">
                          {t(`CalculatorBlock.addons.${addon.id}.label`)}
                        </span>
                      </Button>
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

                <Heading className="text-xl font-bold text-white mb-6">{t("CalculatorBlock.sidebarTitle")}</Heading>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center pb-4 border-b border-gray-800">
                    <span className="text-sm text-gray-400">{t("CalculatorBlock.summaryBase")} ({sqm} m²)</span>
                    <span className="font-semibold text-white transition-all">{basePrice} TMT</span>
                  </div>

                  {selectedAddons.length > 0 && (
                    <div className="flex justify-between items-center pb-4 border-b border-gray-800 animate-in fade-in slide-in-from-top-2 duration-300">
                      <span className="text-sm text-gray-400">{t("CalculatorBlock.summaryExtras")} ({selectedAddons.length})</span>
                      <span className="font-semibold text-white">+{addonsPrice} TMT</span>
                    </div>
                  )}

                  <div className="flex justify-between items-end pt-2">
                    <span className="text-sm font-bold tracking-widest text-gray-500 uppercase">{t("CalculatorBlock.estimatedTotal")}</span>
                    <span className="text-4xl font-black text-primary-400 transition-all duration-300">{totalPrice} <span className="text-lg text-primary-600/50">TMT</span></span>
                  </div>
                </div>

                <Text className="text-xs text-gray-500 leading-relaxed mb-6">
                  {t("CalculatorBlock.disclaimer")}
                </Text>

                <Button
                  onClick={handleWhatsAppRedirect}
                  className="w-full group flex items-center justify-center gap-3 bg-primary-600 hover:bg-primary-500 text-white h-14 rounded-lg font-bold text-sm tracking-wide uppercase transition-all duration-300 shadow-lg shadow-primary-500/20 hover:shadow-xl hover:shadow-primary-500/40 hover:-translate-y-1 active:scale-[0.98] cursor-pointer"
                >
                  <MessageCircle className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                  {t("CalculatorBlock.ctaWhatsApp")}
                  <ChevronRight className="h-4 w-4 opacity-70 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </div>
            </FadeIn>
          </div>

        </div>
      </div>
    </section>
  );
}