import {
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import CheckBox from "expo-checkbox";
import { useTailwind } from "tailwind-rn";
import { useTranslation } from "react-i18next";
import Button from "../components/Button";
import HaveAccount from "../components/HaveAccount";
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
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [email, setEmail] = useState("");
  const emailState = (value: string) => setEmail(value);
  //Password
  const [password, setPassword] = useState("");
  const passwordState = (value: string) => setPassword(value);
  //Confirm Password
  const [confirmPassword, setConfirmPassword] = useState("");
  const ConfirmPasswordState = (value: string) => setConfirmPassword(value);

  //refs
  const passwordRef = React.createRef<TextInput>();
  const confirmPasswordRef = React.createRef<TextInput>();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView style={tailwind("bg-[#212530] flex-1")} keyboardShouldPersistTaps="always">
        <KeyboardAvoidingView style={{ flex: 1 }} keyboardVerticalOffset={-150} behavior={"position"}>
          <BackArrow />
          <Text style={tailwind("text-white font-bold text-4xl pt-4 text-center w-64 self-center")}>
            {t("Register")}
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
              focusref={confirmPasswordRef}
              confirm={false}
            />
            <Password_Input
              text={t("PasswordConfirm_Input")}
              placeholder={t("Password_Placeholder")}
              state={ConfirmPasswordState}
              reference={confirmPasswordRef}
              error={t("PasswordConfirm_Error")}
              confirm={true}
              passwordToCheck={password}
            />

            <View style={tailwind("pl-3 mt-3 flex-row items-center")}>
              <CheckBox
                disabled={false}
                value={toggleCheckBox}
                onValueChange={(newValue) => setToggleCheckBox(newValue)}
              />
              <Text
                style={[
                  tailwind("text-lg underline pl-2"),
                  tailwind(toggleCheckBox ? "text-white" : "text-rose-500"),
                ]}
              >
                *{t("Policy_Privacy")}
              </Text>
            </View>
          </View>
          <View style={tailwind("items-center mt-8")}>
            <Button
              text={t("Register_Button")}
              function={() => navigation.navigate("ProfileCreatorScreen" as never)}
            />
            <HaveAccount />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}
