import { Link } from "react-router-dom";
import { FileQuestion, ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Heading } from "../components/ui/Heading";
import { Text } from "../components/ui/Text";
import { useTranslation } from "react-i18next";

export default function NotFoundPage() {
  const {t} = useTranslation();
  return (
    <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 mb-8">
        <FileQuestion className="h-10 w-10 text-primary" />
      </div>
      
      <Heading level={1} className="text-6xl sm:text-7xl tracking-tight">{t("notFoundPage.title")}</Heading>
      <Heading level={3} className="mt-4">{t("notFoundPage.subtitle")}</Heading>
      
      <Text className="whitespace-pre-line mt-2 text-gray-500 max-w-md mx-auto">
        {t("notFoundPage.body")}
      </Text>

      <div className="mt-10">
        <Link to="/">
          <Button className="gap-2 rounded-lg">
            <ArrowLeft className="h-4 w-4" />
            {t("notFoundPage.returnBtn")}
          </Button>
        </Link>
      </div>
    </div>
  );
}