import { useTranslation } from "react-i18next";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { ServiceManifestoBlock } from "../components/blocks/ServiceManifestoBlock";
import { ProcessGuidelineBlock } from "../components/blocks/ProcessGuielineBlock";

export default function ServicesPage() {

    const { t: tCommon } = useTranslation("common");
    useDocumentTitle(tCommon("navbar.services"));

    return (
        <div className="flex flex-col">
            <ServiceManifestoBlock />
            <ProcessGuidelineBlock />
        </div>
    );
}