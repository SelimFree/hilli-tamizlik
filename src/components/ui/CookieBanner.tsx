import { useState, useEffect } from "react";
import { Cookie, X } from "lucide-react";
import { Button } from "./Button";
import { Text } from "./Text";
import { cn } from "../../lib/utils";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function CookieBanner() {
    const [isVisible, setIsVisible] = useState(false);
    const { t } = useTranslation("common");

    useEffect(() => {
        const consent = localStorage.getItem("cookie-consent");
        if (!consent) {
            const timer = setTimeout(() => setIsVisible(true), 2000);
            return () => clearTimeout(timer);
        }
    }, []);

    const acceptCookies = () => {
        localStorage.setItem("cookie-consent", "accepted");
        setIsVisible(false);
    };

    return (
        <div
            className={cn(
                "fixed bottom-6 left-4 right-4 md:left-8 md:max-w-md z-50 transition-all duration-500 transform",
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none"
            )}
        >
            <div className="rounded-xl bg-white p-6 shadow-2xl border border-gray-100 flex flex-col gap-4">
                <div className="flex items-start gap-4">
                    {/* Soft green circle icon */}
                    <div className="bg-primary-50 p-3 rounded-full shrink-0">
                        <Cookie className="h-5 w-5 text-primary-600" />
                    </div>

                    <div className="space-y-1 pr-6">
                        <Text className="text-primary-800 uppercase font-bold text-xs tracking-widest">
                            {t("cookieBanner.title")}
                        </Text>
                        <Text className="text-gray-600 text-sm leading-relaxed">
                            {t("cookieBanner.body")}
                        </Text>
                    </div>

                    <button
                        onClick={() => setIsVisible(false)}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>

                <div className="flex items-center gap-3">
                    <Button size="sm" onClick={acceptCookies} className="bg-primary-600 hover:bg-primary-700 text-white rounded-lg px-6">
                        {t("cookieBanner.accept")}
                    </Button>
                    <Link to="/cookies" onClick={() => setIsVisible(false)} className="text-xs font-bold text-gray-500 hover:text-primary-700 underline underline-offset-4">
                        {t("cookieBanner.more")}
                    </Link>
                </div>
            </div>
        </div>
    );
}