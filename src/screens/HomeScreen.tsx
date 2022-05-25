import { Text, TouchableWithoutFeedback, ScrollView, Keyboard, View, TextInput, TouchableOpacity, ImageBackground } from "react-native"
import { LinearGradient } from "expo-linear-gradient";
import { useTailwind } from "tailwind-rn/dist"
import { Ionicons } from "@expo/vector-icons";
import { Profile } from "../components/Avatar/Avatar";
import { getDocuments, user, http } from "../utils/Auth";
import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import { useEffect } from "react";

export default function HomeScreen(props: any){
    const tailwind = useTailwind()
    const { t } = useTranslation();

    const profile:any = user.selectedProfile
    const [filter,setFilter] = useState("")
    const searchRef = React.createRef<TextInput>();
    const CollectionOptions = t("CollectionOptions",  { returnObjects: true })
    const [collectionIndex, setCollectionIndex] = useState(0)

    // useEffect(()=>{
    //     console.log(user.documents)
    //     // console.log(user.selectedProfile['_id'])
    // },[])

    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            
        <ScrollView style={tailwind("bg-[#212530] flex-1")} keyboardShouldPersistTaps="always">
        <View style={tailwind("flex-row mt-14 ml-5 mr-5 justify-between items-center")}>
            {/* Header */}
            
            <Ionicons
            name="ios-menu" size={32} color="white"
            onPress={() => {
                Keyboard.dismiss();
                props.navigation.openDrawer();
            }}/>
            <View style={tailwind("flex-row items-center")}>
                <Text style={tailwind("text-white text-xl mr-2")}>{t("Hello")} {profile['name'].split(" ")[0]}!</Text>
                <View style={tailwind("bg-white rounded-full overflow-hidden")}>
                    <Profile style={"w-12 h-12"} characters={profile['characters']} />
                </View>
            </View>
        </View>
        <View style={tailwind("mt-10 ml-5 mr-5")}>
            <Text style={tailwind("text-white text-3xl font-bold")}>{t("SearchText")}</Text>
            {/* Search bar */}
            <TouchableOpacity style={tailwind("mt-2 bg-white h-10 rounded-lg items-center flex-row")}
            onPress={()=>searchRef.current?.focus()}>
                <Ionicons
                name="search" size={24} color="#BABABA"
                style={tailwind("p-2")}
                onPress={() => {
                    Keyboard.dismiss();
                    searchRef.current?.focus();
                }}/>
                <TextInput
                placeholder={t("SearchPlaceholder")} ref={searchRef} maxLength={27} value={filter} 
                onChangeText={setFilter} style={tailwind("text-[#BABABA] self-stretch text-xl")}/>
            </TouchableOpacity>
        </View>
        {/* Options Chips */}
        <ScrollView style={tailwind("mt-2 h-10 flex-row")} horizontal
            contentContainerStyle={tailwind("items-center")} showsHorizontalScrollIndicator={false}>
                    {//@ts-ignore
                    //map gives an error because by default CollectionOptions returns an String
                    //but then It's converted to an Array
                    CollectionOptions.map((option,index)=>{
                        let arrayLength=CollectionOptions.length-1
                        let style="p-2 rounded-full text-sm"
                        if(collectionIndex==index){
                            style+=" text-sky-500 bg-sky-500 bg-opacity-5 font-bold"
                        } else {
                            style+=" text-[#B8B8B8]"
                        }

                        if(index==0){
                            style+=" ml-5"
                        }

                        if(index==0 || index!=arrayLength){
                            style+=" mr-5"
                            // return <Text key={index} style={tailwind(style)} onPress={()=>setCollectionIndex(index)}>{option}</Text>
                        } 
                        // else {
                            return <Text key={index} style={tailwind(style)} onPress={()=>setCollectionIndex(index)}>{option}</Text>
                        // }
                    })}
        </ScrollView>
        {/* Documents */}
        <ScrollView style={tailwind("mt-5 flex-row")} horizontal
            contentContainerStyle={tailwind("items-center ")} showsHorizontalScrollIndicator={false}>
            {user.documents['documents'].map((document,index)=>{
                if(!document['name'].toLowerCase().includes(filter.toLowerCase())
                 || document['collectionIndex']!= collectionIndex){return}
                let arrayLength=user.documents['count']-1
                let warningDate = new Date().getTime()+10
                let documentDate = new Date(document['effective_date']).getTime()
                //Styles
                let style="h-72 w-52"
                if(index==0){
                    style+=" ml-5"
                }
                if(index==0 || index!=arrayLength){
                    style+=" mr-5"
                } 

                return <ImageBackground key={index} source={{uri: http.ip+"/"+document['img_url']}}
                    style={tailwind(style)} imageStyle={tailwind("rounded-lg")}>
                        <TouchableOpacity style={tailwind("flex-1")} onPress={()=>console.log("a")}>
                        <LinearGradient colors={["rgba(14, 165, 233,0)", "rgba(14, 165, 233,0.35)"]} style={tailwind("flex-1 rounded-lg justify-end p-2")}>
                            <View style={tailwind("h-20 flex-row justify-between")}>
                                <View style={tailwind("h-20 justify-between")}>
                                    <Text style={tailwind("bg-[#212530] text-white text-sm p-2 rounded-full self-start")}>{document['name']}</Text>
                                    <Text style={tailwind("bg-[#212530] text-white text-sm p-2 rounded-full self-start")}>{document['effective_date'].split("T")[0]}</Text>
                                </View>
                                <View style={tailwind("h-20 justify-end")}>
                                    {warningDate>documentDate?
                                        <Ionicons
                                        name="warning" size={24} color="#F50057"
                                        style={tailwind("bg-white rounded-full p-2 mb-1")}
                                        onPress={() => {
                                            Keyboard.dismiss();
                                            props.navigation.openDrawer();
                                        }}/>
                                        :<></>}
                                </View>
                            </View>
                        </LinearGradient>
                        </TouchableOpacity>
                    </ImageBackground>
                
            })}
        </ScrollView>
        </ScrollView>
        </TouchableWithoutFeedback>
    )
}