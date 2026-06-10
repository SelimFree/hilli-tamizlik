import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Globe, ChevronDown } from "lucide-react";
import { Button } from "../ui/Button";
import { cn } from "../../lib/utils";
import { useAppContext } from "../../context/AppContext";

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { languages } = useAppContext();

  const currentLang = languages.find((lang) => i18n.language?.startsWith(lang.code)) || languages[0];

  const handleLanguageChange = (code: string) => {
    i18n.changeLanguage(code);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  if (languages.length <= 1) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        type="button"
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2 py-1.5 h-auto hover:bg-gray-100 rounded-md transition-all"
      >
        <Globe className="h-3.5 w-3.5 text-gray-600" />
        <span className="hidden md:inline-block text-[13px] font-bold tracking-widest text-gray-700 uppercase">
          {currentLang.label}
        </span>
        <ChevronDown className={cn("h-3 w-3 text-gray-400 transition-transform duration-300", isOpen && "rotate-180")} />
      </Button>

      <div
        className={cn(
          "absolute right-0 top-full mt-2 w-32 origin-top-right overflow-hidden rounded-lg border border-gray-100 bg-white shadow-xl transition-all duration-200 ease-out",
          isOpen ? "visible scale-100 opacity-100" : "invisible scale-95 opacity-0"
        )}
      >
        <div className="py-1">
          {languages.map((lang) => {
            const isActive = currentLang.code === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={cn(
                  "flex w-full items-center px-4 py-2 text-xs font-bold tracking-widest uppercase transition-colors",
                  isActive ? "bg-primary-50 text-primary-800" : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                {lang.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}