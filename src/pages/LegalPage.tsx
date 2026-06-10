import { useTranslation } from "react-i18next";
import { Heading } from "../components/ui/Heading";
import { Text } from "../components/ui/Text";

interface LegalPageProps {
  title: string;
  lastUpdated: string;
  content: React.ReactNode;
}

export default function LegalPage({ title, lastUpdated, content }: LegalPageProps) {
  const {t} = useTranslation("legal");

  return (
    <div className="bg-white py-24">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <Heading level={1} className="mb-4 font-semibold text-primary uppercase">{title}</Heading>
        <Text variant="muted" className="mb-12">{t("custom.lastUpdatedLabel")} {lastUpdated}</Text>
        
        <div className="prose prose-gray max-w-none space-y-8">
          {content}
        </div>
      </div>
    </div>
  );
}