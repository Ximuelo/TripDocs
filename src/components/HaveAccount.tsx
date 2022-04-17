import { Text } from "react-native";
import { useTailwind } from "tailwind-rn";
import { useTranslation } from "react-i18next";

export default function HaveAccount() {
  const tailwind = useTailwind();
  const { t } = useTranslation();
  return (
    <Text style={tailwind("text-white pt-5")}>
      {t("HaveAccount")}
      <Text style={tailwind("text-sky-500 underline")}>{t("Login")}</Text>
    </Text>
  );
}
