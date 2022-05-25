import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useTailwind } from "tailwind-rn/dist";
import { user } from "../utils/Auth";
import { Profile } from "./Avatar/Avatar";
import {getDocuments, getProfiles} from "../utils/Auth"
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import Button from "./Button";

export default function DrawerContent(){
    const tailwind = useTailwind()
    const { t } = useTranslation();
    const navigation = useNavigation()
    const [languageDialog,setLanguageDialog] = useState(false)

    const profile:any = user.selectedProfile

    const clickProfile = async(profile) => {
        user.selectedProfile=profile
        let documents = await getDocuments()
        user.documents=documents
        navigation.navigate("Home" as never, {} as never)
    }
    return(
        <View style={tailwind("flex-1")}>
            <Modal isVisible={languageDialog}>
                <View style={tailwind("w-80 h-40 bg-[#212530] self-center")}>
                    <Button text="Save" function={()=>{
                        setLanguageDialog(false)
                    }}/>
                </View>
            </Modal>
            <View style={tailwind("ml-8 mt-16 flex-col justify-between mb-16 flex-1")}>
                <View>
                    <View style={tailwind("bg-white rounded-full overflow-hidden self-start")}>
                            <Profile style={"w-20 h-20"} characters={profile['characters']} />
                    </View>
                    <Text style={tailwind("text-white font-bold text-xl")}>{profile['name']}</Text>
                </View>
                <View>
                    {/* Profiles */}
                    {//@ts-ignore
                    user.profiles.map((profile, index)=>{
                        if(profile['name']==user.selectedProfile['name']){return}
                        return (
                            <TouchableOpacity key={index} style={tailwind("flex-row items-center mt-2")} onPress={()=>clickProfile(profile)}>
                                <View style={tailwind("bg-white rounded-full overflow-hidden self-start")}>
                                    <Profile style={"w-8 h-8"} characters={profile['characters']} />
                                </View>
                                <Text style={tailwind("ml-2 text-white text-base")}>{profile['name']}</Text>
                            </TouchableOpacity>
                        )
                    })}
                    <TouchableOpacity style={tailwind("flex-row items-center mt-2")} onPress={()=>navigation.navigate("ProfileCreatorScreen" as never)}>
                                <Ionicons
                                name="person-add" size={24} 
                                color="#BABABA"
                                />
                                <Text style={tailwind("ml-2 text-white text-base")}>{t("AddProfile")}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={tailwind("flex-row items-center mt-2")} onPress={()=>setLanguageDialog(true)}>
                                <Ionicons
                                name="language" size={24} 
                                color="#BABABA"
                                />
                                <Text style={tailwind("ml-2 text-white text-base")}>{t("Language")}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={tailwind("flex-row items-center mt-2")} onPress={()=>navigation.navigate("ProfileCreatorScreen" as never)}>
                                <Ionicons
                                name="rocket" size={24} 
                                color="#BABABA"
                                />
                                <Text style={tailwind("ml-2 text-white text-base")}>{t("Upgrade")}</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={tailwind("flex-row items-center mt-2")} onPress={()=>navigation.navigate("Intro" as never)}>
                                <Ionicons
                                name="ios-exit-outline" size={24} 
                                color="#BABABA"
                                />
                                <Text style={tailwind("ml-2 text-white text-base")}>{t("Logout")}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}