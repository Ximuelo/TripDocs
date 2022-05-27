import { Svg, Path } from "react-native-svg";
import { useTailwind } from "tailwind-rn/dist";
import * as PCO from "../../utils/ProfileCreatorOptions";
import Body from "./Body";
import Mouth from "./Mouth";
import Nose from "./Nose";
import Skin from "./Skin";
import FacialHair from "./Facial-hair";
import Eyes from "./Eyes";
import Hair from "./Hair";

export function Profile(props: any) {
  const tailwind = useTailwind();
  const style = props.style;
  const characters = props.characters.split("|");
  //Skin
  const skin = characters[0];
  const skinColorIndex = parseInt(skin.split("_")[1]);
  const skinColor = PCO.skinColors[skinColorIndex];
  //Body
  const body = characters[1];
  const bodyType = body.split("_")[0];
  const bodyColorIndex = parseInt(body.split("_")[1]);
  const bodyColor = PCO.bodyColors[bodyColorIndex];
  //Mouth
  const mouth = characters[2];
  //Nose
  const nose = characters[3];
  //Facial Hair
  const facialHair = characters[4];
<<<<<<< HEAD
  const facialHairColorIndex = parseInt(facialHair.split("_")[1]);
  const facialHairType = facialHair.split("_")[0];
  const facialHairColor = PCO.hairColors[facialHairColorIndex];
=======
>>>>>>> dev2
  //Eyes
  const eyes = characters[5];
  //Hair
  const hair = characters[6];
<<<<<<< HEAD
=======
  const hairColorIndex = parseInt(hair.split("_")[1]);
  const hairType = hair.split("_")[0];
  const hairColor = PCO.hairColors[hairColorIndex];
>>>>>>> dev2

  return (
    <Svg style={tailwind(style)} viewBox="0 0 64 64">
      <Skin color={skinColor} />
      <Body value={bodyType} color={bodyColor} />
      <Mouth value={mouth} />
      <Nose value={nose} color={skinColor} />
<<<<<<< HEAD
      <FacialHair value={facialHairType} color={facialHairColor} />
      <Eyes value={eyes} />
      <Hair value={hair} color={facialHairColor} />
=======
      <FacialHair value={facialHair} color={hairColor} />
      <Eyes value={eyes} />
      <Hair value={hairType} color={hairColor} />
>>>>>>> dev2
    </Svg>
  );
}
