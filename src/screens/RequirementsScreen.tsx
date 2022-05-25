import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import {Picker} from '@react-native-picker/picker';
import BackArrow from "../components/BackArrow";
import { useEffect, useState } from "react";
import { useEvent } from "react-native-reanimated";
import Button from "../components/Button";

export default function RequirementsScreen(){
    const tailwind = useTailwind()
    const { t, i18n } = useTranslation();
    const navigation = useNavigation()
    const isFocused = useIsFocused();
    const [countries, setCountries] = useState(null)
    const [country1, setCountry1] = useState("af")
    const [country2, setCountry2] = useState("af")
    const [visa,setVisa] = useState("")
    const [duration,setDuration] = useState("")

    useEffect(()=>{
        fetch("https://passportvisa-api.herokuapp.com/countryList").then(async(countriesList)=>{
           
            let response = await countriesList.json()
            // console.log(response['list'])
            setCountries(response['list'])
        
        }) 
    },[])

    const show = async() =>{
        if(country1==country2){
            setVisa(t("None"))
            setDuration(t("None"))
            return
        }
        fetch("https://passportvisa-api.herokuapp.com/api/"+country1+"/"+country2).then(async(info)=>{
           
            let response = await info.json()
            setVisa(response['status'])
            if(response['dur']==""){
                setDuration(t("None"))
                return
            }
            setDuration(response['dur']+"d")
        
        }) 
    }

    
    return(
        <View style={tailwind("bg-[#212530] flex-1")}>
            <BackArrow />
            <Text style={tailwind("text-white font-bold text-4xl pt-4 text-center w-64 self-center")}>
            {t("Requirements")}
            </Text>
            {countries!=null &&
            // console.log(countries)}
            <View style={tailwind("flex-row items-center mb-4 justify-center")}>
            <View style={tailwind("w-36 bg-white rounded-full mt-4 ml-4")}>
                <Picker selectedValue={country1} onValueChange={(value)=>setCountry1(value)}
                style={tailwind("w-36 rounded-full")}>
                        {countries.map((country, index)=>{
                            return <Picker.Item key={index} label={country.name} value={country.code} />
                        })}
                </Picker>
            </View>
            <Text style={tailwind("text-white ml-2 mr-2")}>{">"}</Text>
            <View style={tailwind("w-36 bg-white rounded-full mt-4")}>
                <Picker selectedValue={country2} onValueChange={(value)=>setCountry2(value)}
                style={tailwind("w-36 rounded-full")}>
                        {countries.map((country, index)=>{
                            return <Picker.Item key={index} label={country.name} value={country.code} />
                        })}
                </Picker>
           </View>
           </View>
            }
            <Button text={t("Show")} function={()=>show()}/>
            <View style={tailwind("flex-row justify-center ml-4 mt-4 mr-4")}>
                <Text style={tailwind("text-white font-bold text-lg")}>Visa: {visa}</Text>
                <Text style={tailwind("ml-6 text-white font-bold text-lg")}>{t("Duration")}: {duration}</Text>
            </View>
        </View>
    )
}