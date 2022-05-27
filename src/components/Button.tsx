<<<<<<< HEAD
=======
import { t } from "i18next";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
>>>>>>> dev2
import { Text, TouchableOpacity } from "react-native";
import { useTailwind } from "tailwind-rn";

export default function Button(props: any) {
  const tailwind = useTailwind();
<<<<<<< HEAD
  return (
    <TouchableOpacity
      onPress={props.function}
      style={tailwind("bg-sky-500 p-3 w-2/3 rounded-2xl")}
=======
  const {t} = useTranslation()
  const [internalState, setInternalState] = useState(props.isDisabled);
  const [previousValue, setPreviousValue] = useState();

  if (props.isDisabled !== previousValue) {
    setInternalState(props.isDisabled);
    setPreviousValue(props.isDisabled);
  }
  return (
    <TouchableOpacity
      disabled={internalState}
      onPress={props.function}
      style={tailwind("bg-sky-500 p-3 w-2/3 rounded-2xl self-center")}
    >
      <Text style={tailwind("text-white text-base text-center")}>{internalState?t("Loading"):props.text}</Text>
    </TouchableOpacity>
  );
}

export function ButtonExtra(props: any) {
  const tailwind = useTailwind();

  return (
    <TouchableOpacity
      disabled={props.isDisabled}
      onPress={props.function}
      style={tailwind("p-3 w-2/3 rounded-2xl self-center "+props.additionalStyle)}
>>>>>>> dev2
    >
      <Text style={tailwind("text-white text-base text-center")}>{props.text}</Text>
    </TouchableOpacity>
  );
}
