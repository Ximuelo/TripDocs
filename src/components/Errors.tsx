import { Email_Validator, Password_Validator } from "../utils/InputController";
import { Text } from "react-native";
import { useTailwind } from "tailwind-rn/dist";

export function Email_Input_Error(props: any) {
  const blur = props.blur;
  const value = props.value;
  const text = props.text;
  const tailwind = useTailwind();

  const styles = tailwind("ml-2 mr-2 text-rose-500");
  return blur ? Email_Validator(value) ? <></> : <Text style={styles}>Error: {text}</Text> : <></>;
}

export function Password_Input_Error(props: any) {
  const blur = props.blur;
  const value = props.value;
  const text = props.text;
  const tailwind = useTailwind();
  const styles = tailwind("ml-2 mr-2 text-rose-500");

  return blur ? Password_Validator(value) ? <></> : <Text style={styles}>Error: {text}</Text> : <></>;
}

export function Password_Confirm_Input_Error(props: any) {
  const blur = props.blur;
  const value = props.value;
  const valueToCheck = props.valueToCheck;
  const text = props.text;
  const tailwind = useTailwind();
  const styles = tailwind("ml-2 mr-2 text-rose-500");

  return blur ? value === valueToCheck ? <></> : <Text style={styles}>Error: {text}</Text> : <></>;
}
