import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Award, FileText, ExternalLink, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Heading } from "../ui/Heading";
import { Text } from "../ui/Text";
import { FadeIn } from "../utils/FadeIn";
import { cn } from "../../lib/utils";

const RECOMMENDATIONS = [
  { id: "client1", file: "/documents/recommendation_1.pdf" },
  { id: "client2", file: "/documents/recommendation_2.pdf" },
  { id: "client5", file: "/documents/recommendation_5.pdf" },
  { id: "client3", file: "/documents/recommendation_3.pdf" },
  { id: "client4", file: "/documents/recommendation_4.pdf" },
];

export function RecommendationsBlock() {
  const { t } = useTranslation("about");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = window.innerWidth > 640 ? 450 : window.innerWidth * 0.85;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="recommendations"
      className="w-full bg-white py-20 sm:py-28 relative border-t border-gray-100"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center md:mb-16">
          <FadeIn direction="up" delay={0}>
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-gray-50 px-4 py-1.5 text-[10px] font-bold tracking-widest text-gray-600 uppercase shadow-sm border border-gray-200">
              <Award className="h-3.5 w-3.5 text-yellow-500" />{" "}
              {t("RecommendationsBlock.badge")}
            </span>
          </FadeIn>

          <FadeIn direction="up" delay={150}>
            <Heading className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
              {t("RecommendationsBlock.headingStart")}{" "}
              <br className="hidden sm:block" />
              <span className="text-primary-600">
                {t("RecommendationsBlock.headingAccent")}
              </span>
            </Heading>
          </FadeIn>

          <FadeIn direction="up" delay={250}>
            <Text className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
              {t("RecommendationsBlock.description")}
            </Text>
          </FadeIn>
        </div>

        <FadeIn direction="up" delay={300}>
          <div className="relative max-w-6xl mx-auto group/carousel">
            
            <button 
              onClick={() => scroll("left")} 
              className="absolute -left-4 sm:-left-6 top-1/2 -translate-y-1/2 z-10 hidden sm:flex h-12 w-12 items-center justify-center rounded-full bg-white border border-gray-200 shadow-md text-gray-600 hover:bg-gray-50 hover:text-primary-600 hover:scale-105 transition-all opacity-0 group-hover/carousel:opacity-100 focus:opacity-100"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            
            <button 
              onClick={() => scroll("right")} 
              className="absolute -right-4 sm:-right-6 top-1/2 -translate-y-1/2 z-10 hidden sm:flex h-12 w-12 items-center justify-center rounded-full bg-white border border-gray-200 shadow-md text-gray-600 hover:bg-gray-50 hover:text-primary-600 hover:scale-105 transition-all opacity-0 group-hover/carousel:opacity-100 focus:opacity-100"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <div 
              ref={scrollContainerRef}
              className="flex overflow-x-auto gap-4 sm:gap-6 py-8 px-4 -mx-4 sm:px-6 sm:-mx-6 snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
              {RECOMMENDATIONS.map((rec) => (
                <div
                  key={rec.id}
                  className="shrink-0 w-[85vw] sm:w-105 snap-center flex"
                >
                  <a
                    href={rec.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "group relative flex flex-col sm:flex-row items-start gap-5 p-6 sm:p-8 rounded-2xl border-2 border-gray-100 bg-white text-left transition-all duration-300 hover:border-primary-300 hover:bg-primary-50/30 hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
                      "w-full h-full"
                    )}
                  >
                    <div className="shrink-0 flex h-12 w-12 items-center justify-center rounded-full bg-primary-50 text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300">
                      <FileText className="h-5 w-5" strokeWidth={2.5} />
                    </div>

                    <div className="flex-1 w-full flex flex-col h-full">
                      <div className="flex flex-col gap-1.5 mb-4">
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary-700 transition-colors">
                          {t(`RecommendationsBlock.items.${rec.id}.name`)}
                        </h3>

                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="h-4 w-4 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                        </div>
                      </div>

                      <p className="text-sm text-gray-600 italic leading-relaxed mb-6 flex-1">
                        "{t(`RecommendationsBlock.items.${rec.id}.snippet`)}"
                      </p>

                      <div className="mt-auto flex items-center gap-2 text-xs font-bold text-primary-600 uppercase tracking-wider opacity-80 group-hover:opacity-100 transition-opacity">
                        {t("RecommendationsBlock.viewDocument")}
                        <ExternalLink className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}