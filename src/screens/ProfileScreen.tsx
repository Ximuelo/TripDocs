import { useNavigation, useIsFocused } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { Alert, Text, View } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import { Ionicons } from "@expo/vector-icons";
import BackArrow from "../components/BackArrow";
import { Profile } from "../components/Avatar/Avatar";
import { auth, deleProfile, getDocuments, getProfiles, user } from "../utils/Auth";
import { use } from "i18next";
import { ButtonExtra } from "../components/Button";

export default function ProfileScreen(){
    const tailwind = useTailwind()
    const { t, i18n } = useTranslation();
    const navigation = useNavigation()
    const isFocused = useIsFocused();

    const languages = ["Español","English","Valencia"]

    return(
        <View style={tailwind("bg-[#212530] flex-1")}>
            <View style={tailwind("flex-row items-center justify-between")}>
            <BackArrow />
            <Text style={tailwind("mt-14 text-white font-bold text-4xl")}>{t("Profile")}</Text>
            {user.profiles.length>1?<Ionicons
            name="trash"
            size={32}
            color="rgb(244, 63, 94)"
            style={tailwind("mt-14 mr-5 bg-rose-500 w-8 rounded-lg bg-opacity-20")}
            onPress={() => {
                Alert.alert("",t("DeleteConfirmation"),
                [
                    {text: t("Yes"), onPress: async()=>{
                        let deleteResponse = deleProfile(user.selectedProfile["_id"])
                        if(deleteResponse){
                            let profiles = await getProfiles()
                            user.profiles=profiles['profiles']
                            user.selectedProfile=user.profiles[0]
                            let documents = await getDocuments()
                            user.documents=documents
                            navigation.navigate("DrawerConfig" as never, {} as never)
                        }
                        console.log("okay")
                    }},
                    {text: "No", onPress: ()=>console.log("no")}
                ])
                // navigation.goBack();
            }}
            />:<View style={{width:32}}></View>}
            </View>
            <View style={tailwind("bg-white rounded-full overflow-hidden self-center mt-4")}>
                <Profile style={"w-44 h-44"} characters={user.selectedProfile['characters']} />
            </View>
            <View style={tailwind("flex-row justify-center items-center")}>
                <Text style={tailwind("text-white self-center text-xl font-bold mt-2 mb-2")}>{user.selectedProfile['name']}</Text>
                <Ionicons
                name="pencil"
                size={24}
                color="black"
                style={tailwind("ml-2 p-1 bg-white rounded-lg self-center")}
                onPress={()=>navigation.navigate("ProfileUpdateScreen" as never)}
                />
            </View>
            <View style={tailwind("flex-row justify-between ml-2 mr-2 border-t-2 border-white/20 mt-4 pt-4 items-center")}>
                <Text style={tailwind("text-white text-base text-opacity-50 ml-2")}>{t("Email")}</Text>
                <Text style={tailwind("text-white text-base mr-2")}>{user.email}</Text>
            </View>
            <View style={tailwind("flex-row justify-between ml-2 mr-2 border-t-2 border-white/20 mt-4 pt-4 items-center")}>
                <Text style={tailwind("text-white text-base text-opacity-50 ml-2")}>{t("Language")}</Text>
                <View style={tailwind("flex-row")}>
                {/* <Text style={tailwind("text-white text-base mr-2")}>{language}</Text> */}
                {languages.map((language,index)=>{
                    let languageCode=(language.charAt(0)+language.charAt(1)).toLowerCase()
                    // console.log(languageCode)
                    let style="text-white text-base mr-2 pl-2 pr-2 rounded-full "
                    if(languageCode==i18n.language){style+="text-sky-500 bg-sky-500 bg-opacity-5 font-bold"}
                    return <Text key={index} style={tailwind(style)} onPress={()=>i18n.changeLanguage(languageCode)}>{language}</Text>
                })}
                </View>
            </View>
            <View style={tailwind("flex-row justify-between ml-2 mr-2 border-t-2 border-white/20 mt-4 pt-4 items-center")}>
                <Text style={tailwind("text-white text-base text-opacity-50 ml-2")}>{t("DocumentsCreated")}</Text>
                <Text style={tailwind("text-white text-base mr-2")}>{user.documents['documents'].length}</Text>
            </View>
            <View style={tailwind("flex-row justify-between ml-2 mr-2 border-t-2 border-white/20 mt-4 mb-8 pt-4 items-center")}>
                <Text style={tailwind("text-white text-base text-opacity-50 ml-2")}>{t("Account")}</Text>
                <Text style={tailwind("text-white text-base mr-2")}>{user.subscription.charAt(0).toUpperCase()+user.subscription.slice(1)}</Text>
            </View>
            <ButtonExtra text={t("Logout")} additionalStyle="bg-rose-500" function={()=> navigation.navigate("Intro" as never)}/>
        </View>
    )
}