import { useEffect, useState } from "react";
import React from "react";
import { View, TouchableWithoutFeedback, Keyboard, ScrollView, Text } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useTailwind } from "tailwind-rn/dist";
import BackArrow from "../components/BackArrow";
import { Profile } from "../components/Avatar/Avatar";
import Button from "../components/Button";
import { useTranslation } from "react-i18next";
import Selector from "../components/Avatar/Selector";
import { createProfile, getDocuments, getProfiles, updateProfile, user } from "../utils/Auth";
import { useNavigation } from "@react-navigation/native";

export default function ProfileUpdateScreen(props) {
  const navigation = useNavigation()
  const parameters = props.route.params;
  const tailwind = useTailwind();
  const { t } = useTranslation();
  const _id=user.selectedProfile['_id']
  const [name, setName] = useState(user.selectedProfile['name']);
  const [skin,setSkin] = useState(user.selectedProfile['characters'].split("|")[0])
  // "skin_0|body1_0|mouth1|nose1|facialHair1|eyes1|hair3_0"
  const [body,setBody] = useState(user.selectedProfile['characters'].split("|")[1])
  const [mouth,setMouth] = useState(user.selectedProfile['characters'].split("|")[2])
  const [nose,setNose] = useState(user.selectedProfile['characters'].split("|")[3])
  const [facialHair,setFacialHair]=useState(user.selectedProfile['characters'].split("|")[4])
  const [eyes,setEyes]=useState(user.selectedProfile['characters'].split("|")[5])
  const [hair,setHair] = useState(user.selectedProfile['characters'].split("|")[6])
  const [characters, setCharacters] = useState(user.selectedProfile['characters']);

  const nameRef = React.createRef<TextInput>();

  useEffect(() => {
    //Ref to the name input when page loads
    nameRef.current?.focus();
  });

  useEffect(()=>{
    // console.log("test")
    setCharacters(skin+"|"+body+"|"+mouth+"|"+nose+"|"+facialHair+"|"+eyes+"|"+hair)
  },[skin,body, mouth, nose, facialHair, eyes, hair])

  const continueButton = async() =>{
    if(name==""){return}
    let updateProfileD = await updateProfile(_id,name,characters)
    let profiles = await getProfiles()
    user.profiles=profiles['profiles']
    // console.log(updateProfileD)
    user.selectedProfile=updateProfileD['profile']
    let documents = await getDocuments()
    user.documents=documents
    navigation.navigate("DrawerConfig" as never, {} as never)
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView style={tailwind("bg-[#212530] flex-1")} keyboardShouldPersistTaps="always">
        <BackArrow />
        <View style={tailwind("items-center ml-5 mr-5")}>
          <TextInput
            placeholder={t("NamePlaceholder")}
            ref={nameRef}
            maxLength={14}
            multiline={true}
            value={name}
            onChangeText={setName}
            style={tailwind("text-white font-bold text-4xl mt-4 mb-4 text-center w-72 self-center")}
          />
          <View style={tailwind("bg-white rounded-full overflow-hidden")}>
            <Profile style={"w-44 h-44"} characters={characters} />
          </View>
          <Selector skin={skin} setSkin={setSkin} body={body} setBody={setBody} mouth={mouth} setMouth={setMouth}
          nose={nose} setNose={setNose} facialHair={facialHair} setFacialHair={setFacialHair} eyes={eyes}
          setEyes={setEyes} hair={hair} setHair={setHair}
          />
          <Button text={t("Continue")} function={continueButton}/>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}
