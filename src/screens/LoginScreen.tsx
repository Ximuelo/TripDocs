import {
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { useTailwind } from "tailwind-rn";
import { useTranslation } from "react-i18next";
import Button from "../components/Button";
import {DontHaveAccount} from "../components/HaveAccount";
import BackArrow from "../components/BackArrow";
import React, { useState } from "react";
import { Email_Input, Password_Input } from "../components/Inputs";
import { useNavigation } from "@react-navigation/native";
import { Email_Validator, Password_Validator } from "../utils/InputController";
import { auth, getDocuments, getProfiles, login, user } from "../utils/Auth";

export default function RegisterScreen() {
  const tailwind = useTailwind();
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [isDisabled, setIsDisabled] = useState(false);

  //Input Logic
  //ErrorMSG
  const [error, setError] = useState("")
  //Email
  const [email, setEmail] = useState("xquintana@gmail.com");
  const emailState = (value: string) => setEmail(value);
  //Password
  const [password, setPassword] = useState("Hola1234.");
  const passwordState = (value: string) => setPassword(value);

  //refs
  const passwordRef = React.createRef<TextInput>();

  const loginButton = async() => {
    setIsDisabled(true)
    if(!Email_Validator(email) || !Password_Validator(password)) { return }
    const loginResponse = await login(email,password)
    if(loginResponse){
      setError("")
      let profiles = await getProfiles()
      
      if(profiles['count']==0){
        navigation.navigate("ProfileCreatorScreen" as never)
      } else {
        user.profiles=profiles['profiles']
        user.selectedProfile=user.profiles[0]
        let documents = await getDocuments()
        user.documents=documents
        navigation.navigate("TabConfig" as never)
      }
    } else {
      // navigation.navigate("Login" as never)
      setError(t("Login_ErrorMSG"))
    }
    setIsDisabled(false)
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView style={tailwind("bg-[#212530] flex-1")} keyboardShouldPersistTaps="always">
        <KeyboardAvoidingView style={{ flex: 1 }} keyboardVerticalOffset={-150} behavior={"position"}>
          <BackArrow />
          <Text style={tailwind("text-white font-bold text-4xl pt-4 text-center w-64 self-center")}>
            {t("Login")}
          </Text>
          {/* <Text style={tailwind("text-white font-bold text-4xl pt-4 text-center w-64 self-center")}>
            {Constants.manifest.extra.apiUrl}
          </Text> */}
          <View style={tailwind("ml-5 mr-5 mt-8")}>
          {error!=""?<Text style={tailwind("ml-2 mr-2 text-rose-500 text-center")}>Error: {error}</Text>:<></>}
            <Email_Input
              text={t("Email_Input")}
              placeholder={t("Email_Placeholder")}
              state={emailState}
              error={t("Email_Error")}
              focusref={passwordRef}
            />
            <Password_Input
              text={t("Password_Input")}
              placeholder={t("Password_Placeholder")}
              state={passwordState}
              reference={passwordRef}
              error={t("Password_Error")}

              confirm={false}
            />
          </View>
          <View style={tailwind("items-center mt-8")}>
            <Button
              isDisabled={isDisabled}
              text={t("Login_Button")}
              function={() => {
                loginButton()
              }}
            />
            <DontHaveAccount />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}
