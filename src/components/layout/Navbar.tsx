import { forwardRef, type ComponentProps, useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLink, Link } from "react-router-dom";
import { Button } from "../ui/Button";
import { cn } from "../../lib/utils";
import type { NavLinkItem } from "./Layout";
import { Image } from "../ui/Image";
import { LanguageSwitcher } from "../ui/LanguageSwitcher";
import { useTranslation } from "react-i18next";

export interface NavbarProps extends ComponentProps<"header"> {
  links: NavLinkItem[];
}

export const Navbar = forwardRef<HTMLElement, NavbarProps>(
  ({ links, className, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const { t } = useTranslation("common");

    const navItemClasses = ({ isActive }: { isActive: boolean }) =>
      cn(
        "group relative py-2 text-sm font-bold tracking-wide uppercase transition-colors duration-300",
        isActive ? "text-primary-700" : "text-gray-600 hover:text-primary-600"
      );

    const mobileNavItemClasses = ({ isActive }: { isActive: boolean }) =>
      cn(
        "block w-full px-4 py-3 text-sm font-bold tracking-wide uppercase transition-all duration-300 rounded-lg",
        isActive
          ? "bg-primary-50 text-primary-700 border-l-4 border-secondary-500"
          : "text-gray-600 border-l-4 border-transparent hover:bg-gray-50 hover:text-primary-600"
      );

    return (
      <header
        ref={ref}
        className={cn(
          "sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-gray-100 transition-all h-16 md:h-20 shadow-sm",
          className
        )}
        {...props}
      >
        <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

          <div className="relative flex h-full items-center">
            <Link
              to="/"
              className="relative z-10 flex h-full items-center outline-none group"
            >
              <div className="shrink-0 transition-opacity duration-300 group-hover:opacity-80 flex items-center">
                <Image
                  src="/android-chrome-512x512.png"
                  aspectRatio="auto"
                  alt={t("navbar.logoAlt") || "Hilli Tämizlik Logo"}
                  className="h-12 object-contain md:h-16"
                  containerClassName="bg-transparent"
                />
                <div className="flex flex-col items-left ml-3 whitespace-nowrap">
                  <span className="text-sm md:text-lg font-extrabold tracking-wider text-primary-800 uppercase">
                    Hilli Tämizlik
                  </span>
                  <span className="inline-block text-[0.65rem] font-bold tracking-[0.2em] text-secondary-600 uppercase">
                    Professional Cleaning
                  </span>
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden flex-1 items-center justify-end gap-8 px-8 md:flex">
            {links.map((link) => (
              <NavLink key={link.href} to={link.href} className={navItemClasses}>
                {({ isActive }) => (
                  <>
                    {t(`navbar.${link.label}`)}
                    <span
                      className={cn(
                        "absolute bottom-0 left-0 h-0.5 bg-secondary-500 transition-all duration-300 origin-left",
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      )}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex h-full items-center gap-2 md:gap-4">
            <LanguageSwitcher />

            <Button
              variant="ghost"
              size="sm"
              className="relative h-10 w-10 p-0 flex items-center justify-center text-gray-700 hover:bg-gray-100 hover:text-primary-600 md:hidden overflow-hidden rounded-xl"
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-label="Toggle navigation menu"
            >
              <div className="relative h-6 w-6 flex items-center justify-center">
                <Menu
                  className={cn(
                    "absolute h-6 w-6 transition-all duration-300 ease-in-out transform",
                    isOpen ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"
                  )}
                />
                <X
                  className={cn(
                    "absolute h-6 w-6 transition-all duration-300 ease-in-out transform",
                    isOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"
                  )}
                />
              </div>
            </Button>
          </div>
        </div>

        <div
          className={cn(
            "absolute top-[calc(100%+0.5rem)] left-4 right-4 z-50 grid bg-white transition-all duration-300 ease-in-out md:hidden shadow-xl rounded-2xl border border-gray-100 overflow-hidden",
            isOpen ? "grid-rows-[1fr] opacity-100 scale-100" : "grid-rows-[0fr] opacity-0 scale-95 pointer-events-none"
          )}
        >
          <div className="overflow-hidden">
            <nav className="flex flex-col space-y-1.5 px-3 py-3.5">
              {links.map((link) => (
                <NavLink
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={mobileNavItemClasses}
                >
                  {t(`navbar.${link.label}`)}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>

        {isOpen && (
          <div
            className="fixed inset-0 z-40 h-screen w-screen cursor-default bg-transparent md:hidden"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
        )}
      </header>
    );
  }
);

Navbar.displayName = "Navbar";