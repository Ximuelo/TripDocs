import { View, Text } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import { Ionicons } from "@expo/vector-icons";

export default function Selector() {
  const tailwind = useTailwind();
  return (
    <View style={tailwind("bg-white w-full h-80 mt-4 mb-4 p-5 rounded-lg")}>
      <View style={tailwind("flex-row justify-between")}>
        <Ionicons
          name="chevron-back"
          size={32}
          color="#f43f5e"
          style={tailwind("bg-rose-500 w-8 h-8 rounded-lg bg-opacity-20")}
          //   onPress={() => {
          //     Keyboard.dismiss();
          //     navigation.goBack();
          //   }}
        />
        <Text style={tailwind("text-black text-2xl")}>Skin</Text>
        <Ionicons
          name="chevron-forward"
          size={32}
          color="#f43f5e"
          style={tailwind("bg-rose-500 w-8 h-8 rounded-lg bg-opacity-20")}
          //   onPress={() => {
          //     Keyboard.dismiss();
          //     navigation.goBack();
          //   }}
        />
      </View>
    </View>
  );
}
