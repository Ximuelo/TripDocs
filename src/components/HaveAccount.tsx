import { Text } from "react-native";
import { useTailwind } from "tailwind-rn";
import { useTranslation } from "react-i18next";
<<<<<<< HEAD

export default function HaveAccount() {
=======
import { useNavigation } from "@react-navigation/native";

export default function HaveAccount() {
  const navigation = useNavigation();
>>>>>>> dev2
  const tailwind = useTailwind();
  const { t } = useTranslation();
  return (
    <Text style={tailwind("text-white pt-5")}>
      {t("HaveAccount")}
<<<<<<< HEAD
      <Text style={tailwind("text-sky-500 underline")}>{t("Login")}</Text>
=======
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
>>>>>>> dev2
    </Text>
  );
}
