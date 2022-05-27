import { useState } from "react";
import { Text, View, TextInput } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import { Email_Input_Error, Password_Input_Error, Password_Confirm_Input_Error } from "./Errors";
import { Email_Icon, Password_Icon } from "./Icons";

export function Email_Input(props: any) {
  const tailwind = useTailwind();
  const text = props.text;
  const placeholder = props.placeholder;
  const focusref = props.focusref;
  const state = props.state;
  const errormsg = props.error;
  const [email, setEmail] = useState("");
  const [emailBlur, setEmailBlur] = useState(false);
  return (
    <View>
      <Text style={tailwind("text-white text-base ml-2")}>{text}</Text>
      <View style={tailwind("bg-white rounded-2xl h-12 pl-3 mt-2 flex-row")}>
        <TextInput
          placeholder={placeholder}
          style={tailwind("h-12 w-10/12")}
          onSubmitEditing={() => focusref.current?.focus()}
          keyboardType="email-address"
          autoCapitalize="none"
          returnKeyType="next"
          value={email}
          onChangeText={(e) => [setEmail(e.trim()), state(e.trim())]}
          onPressIn={() => setEmailBlur(true)}
          onBlur={() => setEmailBlur(true)}
        />
        <Email_Icon value={email} blur={emailBlur} />
      </View>
      <Email_Input_Error value={email} blur={emailBlur} text={errormsg} />
    </View>
  );
}

export function Password_Input(props: any) {
  const tailwind = useTailwind();
  const text = props.text;
  const placeholder = props.placeholder;
  const reference = props.reference;
  const focusref = props.focusref;
  const state = props.state;
  const errormsg = props.error;
  const [password, setPassword] = useState("");
  const [passwordBlur, setPasswordBlur] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(true);
  const visiblePasswordState = (value: boolean) => setVisiblePassword(value);
  //Confirm Password Input Variables
  const confirm = props.confirm;
  const passwordToCheck = props.passwordToCheck;
  return (
    <View>
      <Text style={tailwind("text-white text-base ml-2 mt-2")}>{text}</Text>
      <View style={tailwind("bg-white rounded-2xl h-12 pl-3 mt-2 flex-row")}>
        {confirm ? (
          <TextInput
            style={tailwind("h-12 w-10/12")}
            placeholder={placeholder}
            ref={reference}
            secureTextEntry={visiblePassword}
            autoCapitalize="none"
            returnKeyType="done"
            value={password}
            onChangeText={(e) => [setPassword(e), state(e)]}
            onPressIn={() => setPasswordBlur(true)}
            onFocus={() => setPasswordBlur(true)}
            onBlur={() => setPasswordBlur(true)}
          />
        ) : (
          <TextInput
            style={tailwind("h-12 w-10/12")}
            placeholder={placeholder}
            ref={reference}
<<<<<<< HEAD
            onSubmitEditing={() => focusref.current?.focus()}
=======
            // onSubmitEditing={() => focusref.current?.focus()}
>>>>>>> dev2
            secureTextEntry={visiblePassword}
            autoCapitalize="none"
            returnKeyType="next"
            value={password}
            onChangeText={(e) => [setPassword(e), state(e)]}
            onPressIn={() => setPasswordBlur(true)}
            onFocus={() => setPasswordBlur(true)}
            onBlur={() => setPasswordBlur(true)}
          />
        )}
        <Password_Icon visiblePasswordState={visiblePasswordState} visiblePassword={visiblePassword} />
      </View>
      {confirm ? (
        <Password_Confirm_Input_Error
          value={password}
          valueToCheck={passwordToCheck}
          blur={passwordBlur}
          text={errormsg}
        />
      ) : (
        <Password_Input_Error value={password} blur={passwordBlur} text={errormsg} />
      )}
    </View>
  );
}
