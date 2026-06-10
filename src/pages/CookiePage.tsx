import { Circle } from "lucide-react";
import { useTranslation } from "react-i18next";
import LegalPage from "./LegalPage";
import { Heading } from "../components/ui/Heading";
import { Text } from "../components/ui/Text";
import { List, ListItem } from "../components/ui/List";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

interface CookieDataItem {
  label: string;
  desc: string;
}

export default function CookiePage() {
  const { t } = useTranslation("legal");

  const { t: tCommon } = useTranslation("common");
  useDocumentTitle(tCommon("navbar.cookie"));

  const Bullet = <Circle className="h-2 w-2 fill-current mt-2" />;

  const cookieList = t("cookiePolicy.section2.list", { returnObjects: true }) as CookieDataItem[];

  const content = (
    <div className="space-y-10">
      <section>
        <Heading level={3} className="mb-4 text-primary uppercase font-semibold">
          {t("cookiePolicy.section1.title")}
        </Heading>
        <Text>
          {t("cookiePolicy.section1.text")}
        </Text>
      </section>

      <section>
        <Heading level={3} className="mb-4 text-primary uppercase font-semibold">
          {t("cookiePolicy.section2.title")}
        </Heading>
        <Text className="mb-4">
          {t("cookiePolicy.section2.text")}
        </Text>

        <List className="space-y-3">
          {Array.isArray(cookieList) && cookieList.map((item, index) => (
            <ListItem key={index} icon={Bullet}>
              <span className="font-semibold text-primary">{item.label} </span>
              {item.desc}
            </ListItem>
          ))}
        </List>
      </section>

      <section>
        <Heading level={3} className="mb-4 text-primary uppercase font-semibold">
          {t("cookiePolicy.section3.title")}
        </Heading>
        <Text>
          {t("cookiePolicy.section3.textBefore")}
          <a
            href="https://allaboutcookies.org"
            className="text-primary font-semibold hover:underline cursor-pointer"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("cookiePolicy.section3.linkText")}
          </a>
          .
        </Text>
      </section>
    </div>
  );

  return (
    <LegalPage
      title={t("cookiePolicy.title")}
      lastUpdated={t("cookiePolicy.lastUpdated")}
      content={content}
    />
  );
}