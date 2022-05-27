import { Image, ImageBackground, Text, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import Button from "../components/Button";
import HaveAccount from "../components/HaveAccount";
<<<<<<< HEAD
=======
import { useEffect } from "react";
>>>>>>> dev2

export default function IntroScreen() {
  const tailwind = useTailwind();

  const { t } = useTranslation();

  //Navigation
  const navigation = useNavigation();

<<<<<<< HEAD
=======
  //Prevent going back
  useEffect(()=>{
    navigation.addListener('beforeRemove', (e)=>{
      e.preventDefault()
    })
  })

>>>>>>> dev2
  return (
    <ImageBackground source={require("../assets/intro.png")} resizeMode="cover" style={tailwind("flex-1")}>
      <LinearGradient colors={["rgba(14, 165, 233,0.12)", "rgba(14, 165, 233,0.12)"]} style={tailwind("flex-1")}>
        <View style={tailwind("items-center mt-20")}>
          <Image source={require("../assets/logo.png")} style={tailwind("w-16 h-16")} />
          <Text style={tailwind("text-white text-2xl font-bold mt-1.5")}>Trip Docs</Text>
          <Text style={tailwind("text-white text-base mt-1")}>All Documents At Hand</Text>
        </View>
        <View style={tailwind("mt-auto items-center mb-20")}>
          <Button text={t("IntroScreen_Start")} function={() => navigation.navigate("Register" as never)} />
          <HaveAccount />
        </View>
      </LinearGradient>
    </ImageBackground>
  );
}
