import { useEffect, useState } from "react";
import React from "react";
import { View, TouchableWithoutFeedback, Keyboard, ScrollView } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useTailwind } from "tailwind-rn/dist";
import BackArrow from "../components/BackArrow";
import { Profile } from "../components/Avatar/Avatar";
import Button from "../components/Button";
import { useTranslation } from "react-i18next";
import Selector from "../components/Avatar/Selector";

export default function ProfileCreatorScreen() {
  const tailwind = useTailwind();
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [characters, setCharacters] = useState("skin_1|body1_4|mouth7|nose1|facialHair6_0|eyes2|hair20");

  const nameRef = React.createRef<TextInput>();

  useEffect(() => {
    //Ref to the name input when page loads
    nameRef.current?.focus();
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView style={tailwind("bg-[#212530] flex-1")}>
        <BackArrow />
        <View style={tailwind("items-center ml-5 mr-5")}>
          <TextInput
            placeholder={t("NamePlaceholder")}
            ref={nameRef}
            maxLength={14}
            value={name}
            onChangeText={setName}
            style={tailwind("text-white font-bold text-4xl mt-4 mb-4 text-center w-64 self-center")}
          />
          <View style={tailwind("bg-white rounded-full overflow-hidden")}>
            <Profile style={"w-44 h-44"} characters={characters} />
          </View>
          <Selector />
          <Button text={t("Continue")} />
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}
