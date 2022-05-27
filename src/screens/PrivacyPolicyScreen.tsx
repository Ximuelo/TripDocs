import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useTailwind } from "tailwind-rn/dist";
import BackArrow from "../components/BackArrow";


export default function PrivacyPolicyScreen(){
    const tailwind = useTailwind()
    const { t, i18n } = useTranslation();
    const navigation = useNavigation()
    const isFocused = useIsFocused();
    const privacyPolicy = t("Text_PrivacyPolicy", { returnObjects: true });
    return(
        <View style={tailwind("bg-[#212530] flex-1")}>
            <BackArrow />
            <Text style={tailwind("text-white font-bold text-4xl pt-4 text-center w-64 self-center")}>
            {t("PrivacyPolicy")}
            </Text>
            <ScrollView style={tailwind("m-2")}>
                        {privacyPolicy.map((text, index) => {
                            if (text.length < 60) {
                                return <Text style={tailwind("font-bold text-white text-lg")} key={index}>{text}</Text>
                            } else {
                                return <Text style={tailwind("text-white")} key={index}>{text}</Text>
                            }
                        })}
            </ScrollView>
        </View>
    )
}