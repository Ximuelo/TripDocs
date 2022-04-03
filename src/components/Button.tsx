import { Text, TouchableOpacity } from "react-native";
import { useTailwind } from "tailwind-rn";

export default function Button(props: any) {
  const tailwind = useTailwind();
  return (
    <TouchableOpacity
      onPress={props.function}
      style={tailwind("bg-sky-500 p-3 w-2/3 rounded-2xl")}
    >
      <Text style={tailwind("text-white text-base text-center")}>{props.text}</Text>
    </TouchableOpacity>
  );
}
