import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useTailwind } from "tailwind-rn";
import { Email_Validator } from "../utils/InputController";

export function Email_Icon(props: any) {
  let value = props.value;
  let blur = props.blur;
  let color: any = "transparent";
  let icon: any = "md-close-circle";
  const tailwind = useTailwind();

  if (Email_Validator(value)) {
    color = "#21C55E";
    icon = "md-checkmark-circle";
  } else if (blur) {
    color = "#DF1D48";
  }

  return (
    <Ionicons
      name={icon}
      size={48}
      color={color}
      // color={InputController.Email_Icon_Color(email, emailBlur)}
      style={tailwind("h-12 ml-auto")}
    />
  );
}

export function Password_Icon(props: any) {
  const tailwind = useTailwind();
  let visible = props.visiblePassword;
  let visiblePasswordState = props.visiblePasswordState;
  let icon: any = !visible ? "md-eye-sharp" : "md-eye-off-sharp";
  // visiblePasswordState(visible);
  return (
    <Ionicons
      name={icon}
      size={44}
      color="black"
      onPress={() => (visible ? visiblePasswordState(false) : visiblePasswordState(true))}
      style={tailwind("h-12 ml-auto")}
    />
  );
}
