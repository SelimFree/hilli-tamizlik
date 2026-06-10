import { useTranslation } from "react-i18next";
import LegalPage from "./LegalPage";
import { Heading } from "../components/ui/Heading";
import { Text } from "../components/ui/Text";
import { List, ListItem } from "../components/ui/List";
import { useAppContext } from "../context/AppContext";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

interface PrivacyDataItem {
  label: string;
  desc: string;
}

export default function PrivacyPage() {
  const { t } = useTranslation("legal");
  const { companyName } = useAppContext();

  const { t: tCommon } = useTranslation("common");
  useDocumentTitle(tCommon("navbar.privacy"));


  const dataList = t("privacyPolicy.section2.dataList", { returnObjects: true }) as PrivacyDataItem[];

  const content = (
    <div className="space-y-10">
      <section>
        <Heading level={3} className="mb-4 text-primary uppercase font-semibold">
          {t("privacyPolicy.section1.title")}
        </Heading>
        <Text>
          {t("privacyPolicy.section1.text", { company: companyName })}
        </Text>
      </section>

      <section>
        <Heading level={3} className="mb-4 text-primary uppercase font-semibold">
          {t("privacyPolicy.section2.title")}
        </Heading>
        <Text className="mb-4">
          {t("privacyPolicy.section2.text")}
        </Text>

        <List className="space-y-3">
          {Array.isArray(dataList) && dataList.map((item, index) => (
            <ListItem key={index} icon={null}>
              <span className="font-semibold text-primary">{item.label} </span>
              {item.desc}
            </ListItem>
          ))}
        </List>
      </section>

      <section>
        <Heading level={3} className="mb-4 text-primary uppercase font-semibold">
          {t("privacyPolicy.section3.title")}
        </Heading>
        <Text>
          {t("privacyPolicy.section3.text")}
        </Text>
      </section>
    </div>
  );

  return (
    <LegalPage
      title={t("privacyPolicy.title")}
      lastUpdated={t("privacyPolicy.lastUpdated")}
      content={content}
    />
  );
}