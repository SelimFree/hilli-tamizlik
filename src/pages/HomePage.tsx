import { useTranslation } from "react-i18next";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { HeroBlock } from "../components/blocks/HeroBlock";
import { TrustBlock } from "../components/blocks/TrustBlock";
import { ServiceTeaserBlock } from "../components/blocks/ServiceTeaserBlock";
import { CalculatorBlock } from "../components/blocks/CalculatorBlock";

export default function HomePage() {

  const { t: tCommon } = useTranslation("common");
  useDocumentTitle(tCommon("navbar.home"));

  return (
    <div className="flex flex-col">
      <HeroBlock />
      <TrustBlock />
      <ServiceTeaserBlock />
      <CalculatorBlock />
    </div>
  );
}