import { Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Heading } from "../ui/Heading";
import { Text } from "../ui/Text";
import { Button } from "../ui/Button";
import { FadeIn } from "../utils/FadeIn";

export function MissionBlock() {
  return (
    <section className="w-full bg-white py-20 sm:py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-center">
          <div className="lg:col-span-7 flex flex-col items-center text-center lg:items-start lg:text-left">
            <FadeIn direction="up" delay={0}>
              <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-1.5 text-[10px] font-bold tracking-widest text-primary-600 uppercase">
                <Sparkles className="h-3.5 w-3.5" /> Our Philosophy
              </span>
            </FadeIn>

            <FadeIn direction="up" delay={150}>
              <Heading className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl mb-6">
                Where professional precision meets <span className="text-primary-600">uncompromising care.</span>
              </Heading>
            </FadeIn>

            <FadeIn direction="up" delay={300}>
              <div className="space-y-6 max-w-2xl">
                <Text className="text-base sm:text-lg leading-relaxed text-gray-600">
                  Hilli Tämizlik was founded on a singular, clear realization: true cleanliness cannot be achieved through surface-level rushing. In our language, <strong className="text-gray-900 font-bold">"Hilli" means Quality</strong>, and we treat that definition as an architectural blueprint rather than a generic slogan.
                </Text>

                <Text className="text-sm sm:text-base leading-relaxed text-gray-500">
                  We observed an industry plagued by unpredictable scheduling, inconsistent results, and harsh, toxic chemicals. We chose a different path. By combining industrial-grade extraction engineering with rigorously vetted hospitality professionals, we transform residential and commercial properties into pristine, deeply sanitized environments.
                </Text>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={450} className="w-full">
              <div className="mt-10 flex flex-col sm:flex-row justify-center lg:justify-start gap-4 w-full sm:w-auto">
                <Link to="/services" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="group w-full sm:w-auto flex items-center justify-center gap-2 bg-primary-600 text-white hover:bg-primary-500 h-14 px-8 text-sm font-bold tracking-wide uppercase rounded-lg shadow-lg shadow-primary-900/10 hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                  >
                    Explore Our Standards
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </FadeIn>
          </div>

          <div className="lg:col-span-5 relative w-full flex items-center justify-center">
            <FadeIn direction="up" delay={450}>
              <div className="relative w-full max-w-md lg:max-w-none aspect-4/5 md:aspect-[1 parent] h-120 lg:h-135">

                <div className="hidden md:block absolute inset-4 -bottom-4 -left-4 bg-primary-50 rounded-lg -z-10 transition-transform duration-500 group-hover:translate-x-1" />

                <div
                  className="w-full h-full bg-cover bg-center rounded-lg shadow-xl border border-gray-100"
                  style={{ backgroundImage: `url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200')` }}
                />

                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-lg border border-gray-100 shadow-xl flex items-center gap-4">
                  <div className="h-3 w-3 rounded-full bg-primary-600 animate-pulse shrink-0" />
                  <div className="overflow-hidden">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Operational Metric</span>
                    <span className="text-xs font-extrabold text-gray-900 block truncate">100% Verified Quality Standards</span>
                  </div>
                </div>

              </div>
            </FadeIn>
          </div>

        </div>

      </div>
    </section>
  );
}