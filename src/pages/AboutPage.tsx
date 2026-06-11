import { useTranslation } from "react-i18next";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { MissionBlock } from "../components/blocks/MissionBlock";
import { SecurityVettingBlock } from "../components/blocks/SecurityVettingBlock";
import { EquipmentBlock } from "../components/blocks/EquipmentBlock";

export default function AboutPage() {

    const { t: tCommon } = useTranslation("common");
    useDocumentTitle(tCommon("navbar.about"));

    return (
        <div className="flex flex-col">
            <MissionBlock />
            <SecurityVettingBlock />
            <EquipmentBlock />
        </div>
    );
}