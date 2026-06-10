import { useLocation, Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "../../lib/utils";

export function Breadcrumbs({ className }: { className?: string }) {
    const location = useLocation();
    const { t } = useTranslation("common");

    const pathnames = location.pathname.split("/").filter((x) => x);

    if (pathnames.length === 0) return null;

    return (
        <nav
            aria-label="Breadcrumb"
            className={cn("w-full py-4", className)}
        >
            <div className="w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-2">
                    <Link
                        to="/"
                        className="text-[10px] font-bold tracking-widest text-gray-500 hover:text-primary-700 uppercase transition-colors"
                    >
                        {t("navbar.home", "Home")}
                    </Link>

                    {pathnames.map((value, index) => {
                        const isLast = index === pathnames.length - 1;
                        const to = `/${pathnames.slice(0, index + 1).join("/")}`;

                        const defaultLabel = value.charAt(0).toUpperCase() + value.slice(1).replace(/-/g, ' ');
                        const label = t(`navbar.${value}`, defaultLabel);

                        return (
                            <div key={to} className="flex items-center gap-2">
                                <ChevronRight className="h-3 w-3 text-gray-400" aria-hidden="true" />

                                {isLast ? (
                                    <span className="text-[10px] font-bold tracking-widest text-secondary-600 uppercase" aria-current="page">
                                        {label}
                                    </span>
                                ) : (
                                    <Link
                                        to={to}
                                        className="text-[10px] font-bold tracking-widest text-gray-500 hover:text-primary-700 uppercase transition-colors"
                                    >
                                        {label}
                                    </Link>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
}