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

export default function RegisterScreen() {
  const tailwind = useTailwind();
  const { t } = useTranslation();
  const navigation = useNavigation();

  //Input Logic
  //Email
  const [email, setEmail] = useState("");
  const emailState = (value: string) => setEmail(value);
  //Password
  const [password, setPassword] = useState("");
  const passwordState = (value: string) => setPassword(value);

  //refs
  const passwordRef = React.createRef<TextInput>();

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
              text={t("Login_Button")}
              function={() => navigation.navigate("ProfileCreatorScreen" as never)}
            />
            <DontHaveAccount />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}
