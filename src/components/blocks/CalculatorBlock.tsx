import { useState, useMemo, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { MessageCircle, Calculator, Check, ChevronRight } from "lucide-react";
import { Heading } from "../ui/Heading";
import { Text } from "../ui/Text";
import { FadeIn } from "../utils/FadeIn";
import { cn } from "../../lib/utils";
import { Button } from "../ui/Button";

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER;

const SERVICES = [
  { id: "routine", type: "area", pricePerSqm: 15 },
  { id: "deep", type: "area", pricePerSqm: 23 },
  { id: "construction", type: "area", pricePerSqm: 23 },
  { id: "offices", type: "custom", pricePerSqm: 0 },
  { id: "dry_cleaning", type: "items", pricePerSqm: 0 },
  { id: "pressure_washing", type: "area", pricePerSqm: 25 },
  { id: "facade", type: "area", pricePerSqm: 13 },
  { id: "chandelier", type: "items", pricePerSqm: 0 },
  { id: "window", type: "custom", pricePerSqm: 0 },
];

const DRY_CLEANING_ITEMS = [
  { id: "sofa2", price: 200 },
  { id: "sofa3", price: 300 },
  { id: "sofa_set", price: 450 },
  { id: "mattress_big", price: 250 },
  { id: "mattress_small", price: 180 },
];

const CHANDELIER_ITEMS = [
  { id: "chand_small", price: 75 },
  { id: "chand_med", price: 500 },
  { id: "chand_large", price: 1000 },
];

export function CalculatorBlock() {
  const { t } = useTranslation("home");

  const [selectedServices, setSelectedServices] = useState<string[]>(["deep"]);
  const [propertySqm, setPropertySqm] = useState<number>(60);
  const [carpetSqm, setCarpetSqm] = useState<number>(0);
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  // Mobile Sticky Bar State
  const [isInsideSection, setIsInsideSection] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const hasAreaService = selectedServices.some(id => SERVICES.find(s => s.id === id)?.type === "area");
  const hasDryCleaning = selectedServices.includes("dry_cleaning");
  const hasChandelier = selectedServices.includes("chandelier");

  useEffect(() => {
    const sectionObserver = new IntersectionObserver(
      ([entry]) => setIsInsideSection(entry.isIntersecting),
      { threshold: 0 }
    );

    const sidebarObserver = new IntersectionObserver(
      ([entry]) => setIsSidebarVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    if (sectionRef.current) sectionObserver.observe(sectionRef.current);
    if (sidebarRef.current) sidebarObserver.observe(sidebarRef.current);

    return () => {
      sectionObserver.disconnect();
      sidebarObserver.disconnect();
    };
  }, []);

  const showMobileSticky = isInsideSection && !isSidebarVisible;

  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const updateQuantity = (id: string, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) + delta),
    }));
  };

  const { areaTotal, itemsTotal, totalPrice } = useMemo(() => {
    let area = 0;
    let items = 0;

    selectedServices.forEach((id) => {
      const service = SERVICES.find((s) => s.id === id);
      if (service?.type === "area") {
        area += service.pricePerSqm * propertySqm;
      }
    });

    if (hasDryCleaning) {
      items += carpetSqm * 15;
      DRY_CLEANING_ITEMS.forEach(item => {
        items += (quantities[item.id] || 0) * item.price;
      });
    }

    if (hasChandelier) {
      CHANDELIER_ITEMS.forEach(item => {
        items += (quantities[item.id] || 0) * item.price;
      });
    }

    return {
      areaTotal: area,
      itemsTotal: items,
      totalPrice: area + items,
    };
  }, [selectedServices, propertySqm, carpetSqm, quantities, hasDryCleaning, hasChandelier]);

  const handleWhatsAppRedirect = () => {
    const detailsList: string[] = [];

    if (hasAreaService) {
      detailsList.push(`- ${t("CalculatorBlock.items.propertySqm")}: ${propertySqm} m²`);
    }
    if (hasDryCleaning) {
      if (carpetSqm > 0) detailsList.push(`- ${t("CalculatorBlock.items.carpet")}: ${carpetSqm} m²`);
      DRY_CLEANING_ITEMS.forEach(item => {
        if (quantities[item.id]) detailsList.push(`- ${t(`CalculatorBlock.items.${item.id}`)}: ${quantities[item.id]}`);
      });
    }
    if (hasChandelier) {
      CHANDELIER_ITEMS.forEach(item => {
        if (quantities[item.id]) detailsList.push(`- ${t(`CalculatorBlock.items.${item.id}`)}: ${quantities[item.id]}`);
      });
    }

    if (detailsList.length === 0) {
      detailsList.push(`- ${t("CalculatorBlock.none")}`);
    }

    const serviceLines = selectedServices.length > 0
      ? selectedServices.map(id => `- ${t(`CalculatorBlock.services.${id}.label`)}`)
      : [`- ${t("CalculatorBlock.none")}`];

    const rawMessage = [
      t("CalculatorBlock.msgGreet"),
      "",
      t("CalculatorBlock.msgIntro"),
      "",
      `*${t("CalculatorBlock.msgServices")}:*`,
      ...serviceLines,
      "",
      `*${t("CalculatorBlock.msgDetails")}:*`,
      ...detailsList,
      "",
      `*${t("CalculatorBlock.msgTotal")}:* ≈ ${totalPrice} TMT`,
      "",
      t("CalculatorBlock.msgOutro")
    ].join("\n");

    const params = new URLSearchParams({
      phone: WHATSAPP_NUMBER,
      text: rawMessage,
      type: "phone_number",
      app_absent: "0"
    });

    const whatsappUrl = `https://api.whatsapp.com/send/?${params.toString()}`;

    const link = document.createElement("a");
    link.href = whatsappUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";

    document.body.appendChild(link);
    link.click();

    setTimeout(() => {
      document.body.removeChild(link);
    }, 100);
  };

  return (
    <>
      <section ref={sectionRef} id="calculator" className="w-full bg-gray-50 py-20 sm:py-28 relative">
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

          <FadeIn direction="up" delay={300}>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12 items-start">

              <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-10">

                <div className="rounded-lg border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
                  <Heading className="text-lg font-bold text-gray-900 mb-6">{t("CalculatorBlock.step1Title")}</Heading>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    {SERVICES.map((service) => {
                      const isSelected = selectedServices.includes(service.id);
                      return (
                        <button
                          key={service.id}
                          onClick={() => toggleService(service.id)}
                          className={cn(
                            "relative flex flex-col items-start p-4 rounded-lg border-2 text-left transition-all duration-300 cursor-pointer active:scale-95 group",
                            isSelected
                              ? "border-primary-600 bg-primary-50/50 shadow-md shadow-primary-900/5"
                              : "border-gray-100 hover:border-primary-300 hover:bg-primary-50/30 hover:-translate-y-1 hover:shadow-lg"
                          )}
                        >
                          {isSelected && (
                            <div className="absolute top-3 right-3 h-5 w-5 rounded-full bg-primary-600 flex items-center justify-center animate-in zoom-in duration-200">
                              <Check className="h-3 w-3 text-white" strokeWidth={3} />
                            </div>
                          )}
                          <span className="font-bold text-gray-900 text-sm mb-1 pr-6 group-hover:text-primary-700 transition-colors">
                            {t(`CalculatorBlock.services.${service.id}.label`)}
                          </span>
                          <span className="text-xs text-gray-500 leading-relaxed block mb-1">
                            {t(`CalculatorBlock.services.${service.id}.desc`)}
                          </span>
                          {service.pricePerSqm > 0 && (
                            <span className="text-xs font-bold text-primary-600 bg-primary-50 px-2 py-1 rounded-md mt-auto">
                              {service.pricePerSqm} TMT/m²
                            </span>
                          )}
                          {service.pricePerSqm === 0 && service.type === "custom" && (
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide bg-gray-50 px-2 py-1 rounded-md mt-auto">
                              {t("CalculatorBlock.priceByAgreement")}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {(hasAreaService || hasDryCleaning || hasChandelier) && (
                  <div className="rounded-lg border border-gray-200 bg-white p-6 sm:p-8 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <Heading className="text-lg font-bold text-gray-900 mb-8">{t("CalculatorBlock.step2Title")}</Heading>

                    {hasAreaService && (
                      <div className="mb-10 last:mb-0">
                        <div className="flex items-center justify-between mb-4">
                          <Heading level={4} className="text-sm font-bold text-primary-700">{t("CalculatorBlock.items.propertySqm")}</Heading>
                          <span className="text-2xl font-black text-gray-900">{propertySqm} <span className="text-sm font-semibold text-gray-400">m²</span></span>
                        </div>
                        <input
                          type="range"
                          min="20"
                          max="500"
                          step="5"
                          value={propertySqm}
                          onChange={(e) => setPropertySqm(Number(e.target.value))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500/30 transition-all hover:bg-gray-300"
                        />
                        <div className="flex justify-between text-xs font-semibold text-gray-400 mt-3 uppercase tracking-wider">
                          <span>{t("CalculatorBlock.rangeMin")}</span>
                          <span>{t("CalculatorBlock.rangeMax")}</span>
                        </div>
                      </div>
                    )}

                    {hasDryCleaning && (
                      <div className="mb-10 last:mb-0 pt-8 border-t border-gray-100 first:pt-0 first:border-0">
                        <Heading level={4} className="text-sm font-bold text-primary-700 mb-6">{t("CalculatorBlock.services.dry_cleaning.label")}</Heading>

                        <div className="mb-8">
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-medium text-gray-700">{t("CalculatorBlock.items.carpet")}</span>
                            <span className="text-lg font-bold text-gray-900">{carpetSqm} <span className="text-xs font-semibold text-gray-400">m²</span></span>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            step="1"
                            value={carpetSqm}
                            onChange={(e) => setCarpetSqm(Number(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500/30 transition-all hover:bg-gray-300"
                          />
                        </div>

                        <div className="space-y-1">
                          {DRY_CLEANING_ITEMS.map(item => (
                            <div key={item.id} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                              <span className="text-sm font-medium text-gray-700">{t(`CalculatorBlock.items.${item.id}`)}</span>
                              <div className="flex items-center gap-3">
                                <button onClick={() => updateQuantity(item.id, -1)} className="h-8 w-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors cursor-pointer active:scale-95">-</button>
                                <span className="w-6 text-center text-sm font-bold text-gray-900">{quantities[item.id] || 0}</span>
                                <button onClick={() => updateQuantity(item.id, 1)} className="h-8 w-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors cursor-pointer active:scale-95">+</button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {hasChandelier && (
                      <div className="mb-10 last:mb-0 pt-8 border-t border-gray-100 first:pt-0 first:border-0">
                        <Heading level={4} className="text-sm font-bold text-primary-700 mb-6">{t("CalculatorBlock.services.chandelier.label")}</Heading>
                        <div className="space-y-1">
                          {CHANDELIER_ITEMS.map(item => (
                            <div key={item.id} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                              <span className="text-sm font-medium text-gray-700">{t(`CalculatorBlock.items.${item.id}`)}</span>
                              <div className="flex items-center gap-3">
                                <button onClick={() => updateQuantity(item.id, -1)} className="h-8 w-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors cursor-pointer active:scale-95">-</button>
                                <span className="w-6 text-center text-sm font-bold text-gray-900">{quantities[item.id] || 0}</span>
                                <button onClick={() => updateQuantity(item.id, 1)} className="h-8 w-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors cursor-pointer active:scale-95">+</button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

              </div>

              <div className="lg:col-span-5 xl:col-span-4 sticky top-28" ref={sidebarRef}>
                <div className="rounded-lg bg-gray-900 border border-gray-800 p-6 sm:p-8 shadow-2xl overflow-hidden relative">

                  <div className="absolute -top-24 -right-24 h-48 w-48 bg-primary-600/20 rounded-full blur-3xl pointer-events-none" />

                  <Heading className="text-xl font-bold text-white mb-6">{t("CalculatorBlock.sidebarTitle")}</Heading>

                  <div className="space-y-4 mb-8">
                    {areaTotal > 0 && (
                      <div className="flex justify-between items-center pb-4 border-b border-gray-800 animate-in fade-in duration-300">
                        <span className="text-sm text-gray-400">{t("CalculatorBlock.summaryArea")}</span>
                        <span className="font-semibold text-white transition-all">{areaTotal} TMT</span>
                      </div>
                    )}

                    {itemsTotal > 0 && (
                      <div className="flex justify-between items-center pb-4 border-b border-gray-800 animate-in fade-in duration-300">
                        <span className="text-sm text-gray-400">{t("CalculatorBlock.summaryItems")}</span>
                        <span className="font-semibold text-white transition-all">{itemsTotal} TMT</span>
                      </div>
                    )}

                    <div className="flex flex-col items-start pt-2 gap-1">
                      <span className="text-sm font-bold tracking-widest text-gray-500 uppercase">{t("CalculatorBlock.estimatedTotal")}</span>
                      <span className="text-4xl font-black text-primary-400 transition-all duration-300">
                        ≈ {totalPrice} <span className="text-lg text-primary-600/50">TMT</span>
                      </span>
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
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <div
        className={cn(
          "fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] transition-transform duration-300 lg:hidden",
          showMobileSticky ? "translate-y-0" : "translate-y-full"
        )}
      >
        <div className="flex justify-between items-center max-w-7xl mx-auto gap-4">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">{t("CalculatorBlock.estimatedTotal")}</span>
            <span className="text-xl font-black text-gray-900">≈ {totalPrice} <span className="text-sm text-gray-500 font-bold">TMT</span></span>
          </div>
          <Button
            onClick={handleWhatsAppRedirect}
            className="flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-500 text-white rounded-lg font-bold text-sm h-11 px-6 shadow-md transition-all active:scale-[0.98]"
          >
            <MessageCircle className="h-4 w-4" />
            {t("CalculatorBlock.ctaWhatsAppShort")}
          </Button>
        </div>
      </div>
    </>
  );
}