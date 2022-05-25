import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import { Ionicons } from "@expo/vector-icons";
import BackArrow from "../components/BackArrow";
import { Profile } from "../components/Avatar/Avatar";
import { auth, user } from "../utils/Auth";
import { use } from "i18next";

export default function ProfileScreen(){
    const tailwind = useTailwind()
    const { t, i18n } = useTranslation();
    const navigation = useNavigation()

    let language;
    switch(i18n.language){
        case "es": language="Español";break;
    }

    return(
        <View style={tailwind("bg-[#212530] flex-1")}>
            <View style={tailwind("flex-row items-center justify-between")}>
            <BackArrow />
            <Text style={tailwind("mt-14 text-white font-bold text-4xl")}>{t("Profile")}</Text>
            <Ionicons
            name="trash"
            size={32}
            color="rgb(244, 63, 94)"
            style={tailwind("mt-14 mr-5 bg-rose-500 w-8 rounded-lg bg-opacity-20")}
            onPress={() => {
                navigation.goBack();
            }}
            />
            </View>
            <View style={tailwind("bg-white rounded-full overflow-hidden self-center mt-4")}>
                <Profile style={"w-44 h-44"} characters={user.selectedProfile['characters']} />
            </View>
            <Text style={tailwind("text-white self-center text-xl font-bold mt-2 mb-2")}>{user.selectedProfile['name']}</Text>
            <View style={tailwind("flex-row justify-between ml-2 mr-2 border-t-2 border-white/20 mt-4 pt-4 items-center")}>
                <Text style={tailwind("text-white text-base text-opacity-50 ml-2")}>{t("Email")}</Text>
                <Text style={tailwind("text-white text-base mr-2")}>{user.email}</Text>
            </View>
            <View style={tailwind("flex-row justify-between ml-2 mr-2 border-t-2 border-white/20 mt-4 pt-4 items-center")}>
                <Text style={tailwind("text-white text-base text-opacity-50 ml-2")}>{t("Language")}</Text>
                <Text style={tailwind("text-white text-base mr-2")}>{language}</Text>
            </View>
            <View style={tailwind("flex-row justify-between ml-2 mr-2 border-t-2 border-white/20 mt-4 pt-4 items-center")}>
                <Text style={tailwind("text-white text-base text-opacity-50 ml-2")}>{t("DocumentsCreated")}</Text>
                <Text style={tailwind("text-white text-base mr-2")}>{user.documents['documents'].length}</Text>
            </View>
            <View style={tailwind("flex-row justify-between ml-2 mr-2 border-t-2 border-white/20 mt-4 pt-4 items-center")}>
                <Text style={tailwind("text-white text-base text-opacity-50 ml-2")}>{t("Account")}</Text>
                <Text style={tailwind("text-white text-base mr-2")}>{user.subscription.charAt(0).toUpperCase()+user.subscription.slice(1)}</Text>
            </View>
        </View>
    )
}