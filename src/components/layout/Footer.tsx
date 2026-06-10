import { forwardRef, type ComponentProps } from "react";
import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";
import { Text } from "../ui/Text";
import { List, ListItem } from "../ui/List";
import type { NavLinkItem } from "./Layout";
import { Image } from "../ui/Image";
import { useTranslation } from "react-i18next";
import { useAppContext } from "../../context/AppContext";

export interface FooterProps extends ComponentProps<"footer"> {
  links: NavLinkItem[];
}

export const Footer = forwardRef<HTMLElement, FooterProps>(
  ({ links, className, ...props }, ref) => {
    const { t } = useTranslation("common");
    const { companyName } = useAppContext();

    return (
      <footer
        ref={ref}
        className={cn("bg-gray-50 border-t border-gray-200", className)}
        {...props}
      >
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">

            <div className="md:col-span-2 lg:col-span-2">
              <Link to="/" className="group flex items-center outline-none">
                <Image
                  src="/android-chrome-512x512.png"
                  aspectRatio="square"
                  alt={t("navbar.logoAlt", "Hilli Tämizlik")}
                  className="h-20 object-contain md:h-24"
                  containerClassName="bg-transparent"
                />
                <div className="ml-4 flex flex-col">
                  <span className="text-xl font-extrabold text-primary-800 uppercase tracking-wider">
                    Hilli
                  </span>
                  <span className="text-xl font-extrabold text-primary-800 uppercase tracking-wider">
                    Tämizlik
                  </span>
                </div>
              </Link>
              <Text
                variant="muted"
                className="mt-4 max-w-sm text-sm leading-relaxed text-gray-600 text-justify"
              >
                {t("footer.slogan")}
              </Text>
            </div>

            <div className="lg:col-start-4">
              <Text className="mb-6 text-xs font-bold tracking-widest text-gray-900 uppercase whitespace-nowrap">
                {t("footer.quickLinks")}
              </Text>
              <List className="grid gap-y-4">
                {links.map((link) => (
                  <ListItem key={link.href} icon={null} className="p-0">
                    <Link
                      to={link.href}
                      className="text-sm font-medium text-gray-600 transition-colors hover:text-primary-600"
                    >
                      {t(`navbar.${link.label}`)}
                    </Link>
                  </ListItem>
                ))}
              </List>
            </div>

            <div>
              <Text className="mb-6 text-xs font-bold tracking-widest text-gray-900 uppercase whitespace-nowrap">
                {t("footer.legal")}
              </Text>
              <List className="grid gap-y-4">
                <ListItem icon={null} className="p-0">
                  <Link to="/privacy" className="text-sm font-medium text-gray-600 transition-colors hover:text-primary-600">
                    {t("footer.privacy")}
                  </Link>
                </ListItem>
                <ListItem icon={null} className="p-0">
                  <Link to="/terms" className="text-sm font-medium text-gray-600 transition-colors hover:text-primary-600">
                    {t("footer.terms")}
                  </Link>
                </ListItem>
                <ListItem icon={null} className="p-0">
                  <Link to="/cookies" className="text-sm font-medium text-gray-600 transition-colors hover:text-primary-600">
                    {t("footer.cookie")}
                  </Link>
                </ListItem>
              </List>
            </div>
          </div>

          <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-8 md:flex-row">
            <Text
              className="text-xs font-medium tracking-wider text-gray-500 uppercase"
            >
              {t("footer.rights", { company: companyName, year: new Date().getFullYear() })}
            </Text>
          </div>
        </div>
      </footer>
    );
  }
);

Footer.displayName = "Footer";