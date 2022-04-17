import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useTailwind } from "tailwind-rn";
import { Keyboard } from "react-native";

export default function BackArrow() {
  const tailwind = useTailwind();
  const navigation = useNavigation();
  return (
    <Ionicons
      name="chevron-back"
      size={32}
      color="#0DA4E8"
      style={tailwind("mt-14 ml-5 bg-sky-500 w-8 rounded-lg bg-opacity-20")}
      onPress={() => {
        Keyboard.dismiss();
        navigation.goBack();
      }}
    />
  );
}
