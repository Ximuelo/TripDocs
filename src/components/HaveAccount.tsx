import { Text } from "react-native";
import { useTailwind } from "tailwind-rn";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";

export default function HaveAccount() {
  const navigation = useNavigation();
  const tailwind = useTailwind();
  const { t } = useTranslation();
  return (
    <Text style={tailwind("text-white pt-5")}>
      {t("HaveAccount")}
      <Text style={tailwind("text-sky-500 underline")} onPress={() => navigation.navigate("Login" as never)}>{t("Login")}</Text>
    </Text>
  );
}

export function DontHaveAccount() {
  const navigation = useNavigation();
  const tailwind = useTailwind();
  const { t } = useTranslation();
  return (
    <Text style={tailwind("text-white pt-5")}>
      {t("DontHaveAccount")}
      <Text style={tailwind("text-sky-500 underline")} onPress={() => navigation.navigate("Register" as never)}>{t("DontHaveAccountButton")}</Text>
    </Text>
  );
}
