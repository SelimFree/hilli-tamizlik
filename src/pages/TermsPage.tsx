import { Circle } from "lucide-react";
import { useTranslation } from "react-i18next";
import LegalPage from "./LegalPage";
import { Heading } from "../components/ui/Heading";
import { Text } from "../components/ui/Text";
import { List, ListItem } from "../components/ui/List";
import { useAppContext } from "../context/AppContext";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export default function TermsPage() {
  const { t } = useTranslation("legal");
  const { companyName, country } = useAppContext();

  const { t: tCommon } = useTranslation("common");
  useDocumentTitle(tCommon("navbar.terms"));


  const Bullet = <Circle className="h-2 w-2 fill-current mt-2" />;

  const licenseList = t("termsOfService.section2.list", { returnObjects: true }) as string[];

  const content = (
    <div className="space-y-10">
      <section>
        <Heading level={3} className="mb-4 text-primary uppercase font-semibold">
          {t("termsOfService.section1.title")}
        </Heading>
        <Text>
          {t("termsOfService.section1.text", { company: companyName })}
        </Text>
      </section>

      <section>
        <Heading level={3} className="mb-4 text-primary uppercase font-semibold">
          {t("termsOfService.section2.title")}
        </Heading>
        <Text className="mb-4">
          {t("termsOfService.section2.text")}
        </Text>

        <List className="space-y-3">
          {Array.isArray(licenseList) && licenseList.map((item, index) => (
            <ListItem key={index} icon={Bullet}>
              {item}
            </ListItem>
          ))}
        </List>
      </section>

      <section>
        <Heading level={3} className="mb-4 text-primary uppercase font-semibold">
          {t("termsOfService.section3.title")}
        </Heading>
        <Text>
          {t("termsOfService.section3.text", { country: country })}
        </Text>
      </section>
    </div>
  );

  return (
    <LegalPage
      title={t("termsOfService.title")}
      lastUpdated={t("termsOfService.lastUpdated")}
      content={content}
    />
  );
}