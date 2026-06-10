import { useState, useEffect } from "react";
import { Button } from "../ui/Button";
import { Heading } from "../ui/Heading";
import { Text } from "../ui/Text";
import { FadeIn } from "../utils/FadeIn";
import { cn } from "../../lib/utils";
import { Sparkles, MessageCircle, PhoneCall } from "lucide-react";

const SLIDER_IMAGES = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000",
  "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2000",
  "https://images.unsplash.com/photo-1527515637462-cff948817765?q=80&w=2000",
];

export function HeroBlock() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SLIDER_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative flex min-h-[85vh] w-full items-center overflow-hidden bg-gray-950">
      
      <div className="absolute inset-0 h-full w-full">
        {SLIDER_IMAGES.map((img, index) => (
          <div
            key={img}
            className={cn(
              "absolute inset-0 h-full w-full bg-cover bg-center transition-opacity duration-1000 ease-in-out",
              index === activeIndex ? "opacity-100" : "opacity-0"
            )}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-linear-to-r from-gray-950/95 via-gray-950/75 to-black/40 z-10" />

      <div className="relative z-20 mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-3xl lg:max-w-2xl">
          
          <FadeIn direction="up" delay={0}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 backdrop-blur-md">
              <Sparkles className="h-4 w-4 text-secondary-400" />
              <span className="text-xs font-bold tracking-widest text-white uppercase">
                Premium Deep Cleaning Specialist
              </span>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={150}>
            <Heading className="mb-6 text-5xl font-black leading-[1.1] text-white sm:text-6xl md:text-7xl lg:text-6xl lg:font-extrabold tracking-tight">
              Not every cleaning is <span className="text-primary-400">professional</span>.
            </Heading>
          </FadeIn>
          
          <FadeIn direction="up" delay={300}>
            <Text className="hidden sm:inline-block mb-8 text-lg leading-relaxed text-gray-200 sm:text-xl md:text-2xl font-medium lg:text-xl lg:font-normal max-w-2xl">
              See a visible difference with detailing that goes beyond surface sheen. We target hidden dust layers and deep grime to restore absolute, long-lasting freshness to your property.
            </Text>
          </FadeIn>

          <FadeIn direction="up" delay={450}>
            <div className="mb-10 flex flex-col gap-3 text-base md:text-lg font-bold text-gray-200 sm:flex-row sm:items-center sm:gap-x-6 lg:text-base lg:font-semibold">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary-400 shrink-0 lg:h-1.5 lg:w-1.5" />
                <span>Deep Dirt Extraction</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary-400 shrink-0 lg:h-1.5 lg:w-1.5" />
                <span>Full Zone Disinfection</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary-400 shrink-0 lg:h-1.5 lg:w-1.5" />
                <span>Stain & Odor Elimination</span>
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={600}>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button 
                size="lg" 
                className="group flex items-center justify-center gap-3 bg-primary-600 text-white hover:bg-primary-700 h-16 px-10 text-base font-bold tracking-wide uppercase rounded-lg shadow-xl shadow-primary-950/30 transition-all cursor-pointer"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp Estimate
              </Button>
              <Button 
                size="lg" 
                variant="ghost" 
                className="group flex items-center justify-center gap-3 border-2 border-white/40 bg-white/5 text-white hover:bg-white/20 h-16 px-10 text-base font-bold tracking-wide uppercase rounded-lg transition-all cursor-pointer"
              >
                <PhoneCall className="h-5 w-5" />
                Call Directly
              </Button>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
}