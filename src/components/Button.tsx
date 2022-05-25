import { useEffect, useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { useTailwind } from "tailwind-rn";

export default function Button(props: any) {
  const tailwind = useTailwind();
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
      <Text style={tailwind("text-white text-base text-center")}>{props.text}</Text>
    </TouchableOpacity>
  );
}
