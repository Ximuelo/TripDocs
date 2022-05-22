import { View, Text } from "react-native";
import { Svg, Path } from "react-native-svg";
import { useTailwind } from "tailwind-rn/dist";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import * as PCO from "../../utils/ProfileCreatorOptions";
import Body from "./Body";
import Mouth from "./Mouth";
import Nose from "./Nose";
import Skin from "./Skin";
import FacialHair from "./Facial-hair";
import Eyes from "./Eyes";
import Hair from "./Hair";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Selector(props: any) {
  const tailwind = useTailwind();
  const { t } = useTranslation();
  const options = t("AvatarOptions", { returnObjects: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selected, setSelected] = useState(options[selectedIndex]);

  const skin = props.skin;
  const setSkin = props.setSkin;
   const [selectedSkin, setSelectedSkin] = useState(PCO.skinColors[skin.split("skin_")[1]])

  const body = props.body;
  const setBody = props.setBody;
  const [selectedBody,setSelectedBody] = useState(body.split("_")[0])
  const [selectedBodyColor,setSelectedBodyColor] = useState(body.split("_")[1])

  const mouth = props.mouth
  const setMouth = props.setMouth

  const nose = props.nose
  const setNose = props.setNose

  const facialHair = props.facialHair
  const setFacialHair = props.setFacialHair

  const eyes = props.eyes
  const setEyes = props.setEyes

  const hair = props.hair;
  const setHair = props.setHair;
  const [selectedHair,setSelectedHair] = useState(hair.split("_")[0])
  const [selectedHairColor,setSelectedHairColor] = useState(hair.split("_")[1])
 
  useEffect(()=>{
    setBody(selectedBody+"_"+selectedBodyColor)
    setHair(selectedHair+"_"+selectedHairColor)
  },[selectedBody,selectedBodyColor, selectedHair, selectedHairColor])
  
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
      {/* <Text>{selectedIndex}</Text> */}
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
      
      <Options 
      value={selectedIndex} selectedSkin={selectedSkin} setSkin={setSkin} setSelectedSkin={setSelectedSkin} 
      selectedBody={selectedBody} setSelectedBody={setSelectedBody} selectedBodyColor={selectedBodyColor}
      setSelectedBodyColor={setSelectedBodyColor} mouth={mouth} setMouth={setMouth} nose={nose} setNose={setNose}
      facialHair={facialHair} setFacialHair={setFacialHair} eyes={eyes} setEyes={setEyes} hair={hair} setHair={setHair}
      selectedHair={selectedHair} setSelectedHair={setSelectedHair} selectedHairColor={selectedHairColor}
      setSelectedHairColor={setSelectedHairColor}
      />
      
    </View>
  );
}

const Options = (props: any) => {
  const tailwind = useTailwind();
  const Option = () => {
    switch (props.value) {
      case 0:
        return <Skin color={props.selectedSkin} />;
        break;
      case 1:
        return <Body value={props.selectedBody} color={PCO.bodyColors[props.selectedBodyColor]}/>
        break;
      case 2:
        return <Mouth value={props.mouth} />
        break;
      case 3:
        return <Nose value={props.nose} color={props.selectedSkin} />
        break;
      case 4:
        return <FacialHair value={props.facialHair} color="black" />
        break;
      case 5:
      return <Eyes value={props.eyes}/>
      break;
      case 6:
        return <Hair value={props.selectedHair} color={PCO.hairColors[props.selectedHairColor]}/>
      break;
      default:
        return <Text>aa</Text>
        break;
    }
  };
  const OptionTypes = () => {
    switch (props.value) {
      //SKIN====================
      case 0:
        return <View 
        style={tailwind("flex-row flex-wrap")}
        >
          {PCO.skinColors.map((value,index)=>{
           return <TouchableOpacity key={index} 
          style={[{backgroundColor: value}, tailwind("w-8 h-8 ml-1 mr-1 mb-1 rounded-lg")]}
          onPress={()=>{
            props.setSkin("skin_"+index)
            props.setSelectedSkin(PCO.skinColors[index])
          }
          }
           ></TouchableOpacity>
        })}
        </View>
        break;
        //BODY====================
        case 1:
          const bodies=["body1","body2","body3"]
          return <View style={tailwind("items-center")}>
            <View style={tailwind("flex-row flex-wrap")}>
          {bodies.map((body,index)=>{
            return <TouchableOpacity 
            key={index}
            style={tailwind("w-8 h-8 ml-1 mr-1 mb-1 rounded-lg bg-slate-300")}
            onPress={()=>{
              props.setSelectedBody(body)
            }
            }
             >
               <Svg style={tailwind("w-8 h-8")} viewBox="0 16 64 64">
               <Body value={body} color="black"/>
               </Svg>
             </TouchableOpacity>
          }
          )}
          </View>
          <View style={tailwind("flex-row flex-wrap")} >
          {PCO.bodyColors.map((value,index)=>{
           return <TouchableOpacity key={index} 
          style={[{backgroundColor: value}, tailwind("w-8 h-8 ml-1 mr-1 mb-1 rounded-lg")]}
          onPress={()=>{
            props.setSelectedBodyColor(index)
          }
          }
           ></TouchableOpacity>
        })}
          </View>
          </View>
          break;
        //MOUTH====================
        case 2:
          const mouths=["mouth1","mouth2","mouth3","mouth4","mouth5","mouth6","mouth7"]
          return <View style={tailwind("items-center")}>
            <View style={tailwind("flex-row flex-wrap")}>
          {mouths.map((mouth,index)=>{
            return <TouchableOpacity 
            key={index}
            style={tailwind("w-8 h-8 ml-1 mr-1 mb-1 rounded-lg bg-slate-300")}
            onPress={()=>{
              props.setMouth(mouth)
            }
            }
             >
               <Svg style={tailwind("w-8 h-8")} viewBox="0 0 64 64">
               <Mouth value={mouth} />
               </Svg>
             </TouchableOpacity>
          }
          )}
          </View>
             </View>
        break;
        //NOSE====================
        case 3:
          const noses=["nose1","nose2","nose3"]
          return <View style={tailwind("items-center")}>
            <View style={tailwind("flex-row flex-wrap")}>
          {noses.map((nose,index)=>{
            return <TouchableOpacity 
            key={index}
            style={tailwind("w-8 h-8 ml-1 mr-1 mb-1 rounded-lg bg-slate-300")}
            onPress={()=>{
              props.setNose(nose)
            }
            }
             >
               <Svg style={tailwind("w-8 h-8")} viewBox="0 0 64 64">
               <Nose value={nose} color={props.selectedSkin}/>
               </Svg>
             </TouchableOpacity>
          }
          )}
          </View>
             </View>
        break;
        //FACIAL HAIR====================
        case 4:
          const facialHairs=["facialHair1","facialHair2","facialHair3","facialHair4","facialHair5","facialHair6"]
          return <View style={tailwind("items-center")}>
            <View style={tailwind("flex-row flex-wrap")}>
          {facialHairs.map((facialHair,index)=>{
            return <TouchableOpacity 
            key={index}
            style={tailwind("w-8 h-8 ml-1 mr-1 mb-1 rounded-lg bg-slate-300")}
            onPress={()=>{
              props.setFacialHair(facialHair)
            }
            }
             >
               <Svg style={tailwind("w-8 h-8")} viewBox="0 0 64 64">
               <FacialHair value={facialHair} color="black"/>
               </Svg>
             </TouchableOpacity>
          }
          )}
          </View>
             </View>
        break;
        //EYES====================
        case 5:
          const eyes=["eyes1","eyes2","eyes3","eyes4","eyes5","eyes6"]
          return <View style={tailwind("items-center")}>
            <View style={tailwind("flex-row flex-wrap")}>
          {eyes.map((eye,index)=>{
            return <TouchableOpacity 
            key={index}
            style={tailwind("w-8 h-8 ml-1 mr-1 mb-1 rounded-lg bg-slate-300")}
            onPress={()=>{
              props.setEyes(eye)
            }
            }
             >
               <Svg style={tailwind("w-8 h-8")} viewBox="0 0 64 64">
               <Eyes value={eye}/>
               </Svg>
             </TouchableOpacity>
          }
          )}
          </View>
             </View>
        break;
        //HAIR====================
        case 6:
          const hairs=["hair1","hair2","hair3","hair4","hair6","hair7","hair8","hair11","hair12","hair13","hair16","hair18","hair19","hair20"]
          return <View style={tailwind("items-center")}>
            <View style={tailwind("flex-row flex-wrap ml-4")}>
          {hairs.map((hair,index)=>{
            return <TouchableOpacity 
            key={index}
            style={tailwind("w-8 h-8 ml-1 mr-1 mb-1 rounded-lg bg-slate-300")}
            onPress={()=>{
              props.setSelectedHair(hair)
            }
            }
             >
               <Svg style={tailwind("w-8 h-8")} viewBox="0 0 64 64">
               <Hair value={hair} color="black"/>
               </Svg>
             </TouchableOpacity>
          }
          )}
          </View>
          <View style={tailwind("flex-row flex-wrap")} >
          {PCO.hairColors.map((value,index)=>{
           return <TouchableOpacity key={index} 
          style={[{backgroundColor: value}, tailwind("w-8 h-8 ml-1 mr-1 mb-1 rounded-lg")]}
          onPress={()=>{
            props.setSelectedHairColor(index)
          }
          }
           ></TouchableOpacity>
        })}
          </View>
          </View>
          break;
        default:
          return <Text>aa</Text>
          break;
    }
  }

  let selectedIndexCorrected
  switch (props.value) {
    case 0:
        selectedIndexCorrected="0 0 64 64"
      break;
    case 5:
      selectedIndexCorrected="0 0 64 64"
    break;
    case 4:
      selectedIndexCorrected="0 6 64 64"
    break;
    case 6:
      if(props.selectedHair==="hair18"){
        selectedIndexCorrected="0 5 64 64"
      } else{
      selectedIndexCorrected="0 0 64 64"
      }
    break;
    default:
      selectedIndexCorrected="0 16 64 64"
      break;
  }

  let selectedSizeCorrected
  switch (props.value) {
    case 6:
      selectedSizeCorrected="w-44 h-36"
      break;
  
    default:
      selectedSizeCorrected="w-44 h-44"
      break;
  }

  return (
    <View style={tailwind("items-center")}>
    <Svg style={tailwind(selectedSizeCorrected)} viewBox={selectedIndexCorrected}>
      <Option />
    </Svg>
    <OptionTypes />
    </View>
  );
};
