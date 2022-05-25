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
import { createProfile, getDocuments, getProfiles, user } from "../utils/Auth";

export default function ProfileCreatorScreen({navigation}) {
  const tailwind = useTailwind();
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [skin,setSkin] = useState("skin_0")
  // "skin_0|body1_0|mouth1|nose1|facialHair1|eyes1|hair3_0"
  const [body,setBody] = useState("body1_0")
  const [mouth,setMouth] = useState("mouth1")
  const [nose,setNose] = useState("nose1")
  const [facialHair,setFacialHair]=useState("facialHair1")
  const [eyes,setEyes]=useState("eyes1")
  const [hair,setHair] = useState("hair3_0")
  const [characters, setCharacters] = useState(skin+"|"+body+"|"+mouth+"|"+nose+"|"+facialHair+"|"+eyes+"|"+hair);

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
    let newProfile = await createProfile(name,characters)
    console.log(newProfile)
    let profiles = await getProfiles()
    user.profiles=profiles['profiles']
    user.selectedProfile=user.profiles[0]
    let documents = await getDocuments()
    user.documents=documents
    navigation.navigate("HomeDrawer" as never, {} as never)
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
