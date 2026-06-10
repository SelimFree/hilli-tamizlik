import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Heading } from "../components/ui/Heading";
import { Text } from "../components/ui/Text";
import { useTranslation } from "react-i18next";

export default function ServerErrorPage() {
  const {t} = useTranslation();
  return (
    <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-danger-500/10 mb-8">
        <AlertTriangle className="h-10 w-10 text-danger-500" />
      </div>
      
      <Heading level={1} className="text-4xl">{t("errorPage.title")}</Heading>
      <Text className="mt-4 text-lg text-gray-600 max-w-md mx-auto">
        {t("errorPage.subtitle")}
      </Text>

      <div className="mt-10">
        <Button onClick={() => window.location.reload()} variant="outline" className="gap-2 rounded-lg">
          <RefreshCw className="h-4 w-4" />
          {t("errorPage.refreshBtn")}
        </Button>
      </div>
    </div>
  );
}