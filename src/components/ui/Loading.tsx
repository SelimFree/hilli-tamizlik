import { useTranslation } from "react-i18next";
import { cn } from "../../lib/utils";
import { Text } from "./Text";

export function Loading({ className }: { className?: string }) {
  const { t } = useTranslation("common");

  return (
    <div className={cn("flex min-h-[60vh] w-full flex-col items-center justify-center bg-gray-50", className)}>
      <div className="flex flex-col items-center gap-6">

        <div className="flex items-center gap-2">
          <div className="h-2 w-2 animate-bounce rounded-full bg-primary-600 [animation-delay:-0.3s]"></div>
          <div className="h-2 w-2 animate-bounce rounded-full bg-secondary-500 [animation-delay:-0.15s]"></div>
          <div className="h-2 w-2 animate-bounce rounded-full bg-primary-600"></div>
        </div>

        <Text className="text-[10px] font-bold tracking-[0.3em] text-gray-400 uppercase">
          {t("loading.message")}
        </Text>

      </div>
    </div>
  );
}