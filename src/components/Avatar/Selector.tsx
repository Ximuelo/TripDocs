import { View, Text } from "react-native";
import { Svg, Path } from "react-native-svg";
import { useTailwind } from "tailwind-rn/dist";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import * as PCO from "../../utils/ProfileCreatorOptions";
import Body from "./Body";
import Mouth from "./Mouth";
import Nose from "./Nose";
import Skin from "./Skin";
import FacialHair from "./Facial-hair";
import Eyes from "./Eyes";
import Hair from "./Hair";

export default function Selector() {
  const tailwind = useTailwind();
  const { t } = useTranslation();
  const options = t("AvatarOptions", { returnObjects: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selected, setSelected] = useState(options[selectedIndex]);
  const next = () => {
    const newIndex = selectedIndex + 1;
    setSelectedIndex(newIndex);
    setSelected(options[newIndex]);
  };

  const back = () => {
    const newIndex = selectedIndex - 1;
    setSelectedIndex(newIndex);
    setSelected(options[newIndex]);
  };

  const nextVisible = selectedIndex != options.length - 1 ? true : false;
  const backVisible = selectedIndex > 0 ? true : false;
  return (
    <View style={tailwind("bg-white w-full h-80 mt-4 mb-4 p-5 rounded-lg")}>
      <View style={tailwind("flex-row justify-between")}>
        {backVisible ? (
          <Ionicons
            name="chevron-back"
            size={32}
            color="#f43f5e"
            style={tailwind("bg-rose-500 w-8 h-8 rounded-lg bg-opacity-20")}
            onPress={back}
          />
        ) : (
          <Text style={tailwind("w-8 h-8")}></Text>
        )}
        <Text style={tailwind("text-black text-2xl")}>{selected}</Text>
        {nextVisible ? (
          <Ionicons
            name="chevron-forward"
            size={32}
            color="#f43f5e"
            style={tailwind("bg-rose-500 w-8 h-8 rounded-lg bg-opacity-20")}
            onPress={next}
          />
        ) : (
          <Text style={tailwind("w-8 h-8")}></Text>
        )}
      </View>
      <Options value={0} />
    </View>
  );
}

const Options = (props: any) => {
  const tailwind = useTailwind();
  const Option = () => {
    switch (props.value) {
      case 0:
        return <Skin color={PCO.skinColors[0]} />;
        break;
    }
  };
  return (
    <Svg style={tailwind("w-44 h-44")} viewBox="0 0 64 64">
      <Option />
    </Svg>
  );
};
