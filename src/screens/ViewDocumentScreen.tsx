import { useIsFocused, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, ImageBackground, Keyboard, ScrollView, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import { Ionicons } from "@expo/vector-icons";
import BackArrow from "../components/BackArrow";
import * as ImagePicker from 'expo-image-picker';
import { Calendar } from "react-native-calendars";
import Button from "../components/Button";
import { deleteDocument, getDocuments, http, updateDocument, user } from "../utils/Auth";

export default function ViewDocumentScreen(props:any){
    const isFocused = useIsFocused();
    const parameters = props.route.params;
    const tailwind = useTailwind()
    const { t, i18n } = useTranslation();
    const navigation = useNavigation()
    const [_id]=useState(parameters._id)
    const [name,setName] = useState(parameters.name)
    const [image,setImage] = useState(parameters.image)
    const [imageBase64,setImageBase64]=useState("none")
    const CollectionOptions = t("CollectionOptions",  { returnObjects: true })
    const [collectionIndex, setCollectionIndex] = useState(parameters.collectionIndex)
    const [date,setDate]=useState(new Date(parameters.date).toISOString().split('T')[0])
    const [editMode,setEditMode]=useState(false)


    const nameRef = React.createRef<TextInput>();

    let imageStyle = "ml-2 mt-2 mr-2 h-80 rounded-xl";
    // if(i)
    if(image==null){
        imageStyle+=" bg-[black]/20 justify-center"
    } else {
        imageStyle+=" justify-end"
    }

    const pickImage = async (type:string) => {
        let result;
        // No permissions request is necessary for launching the image library
        if(type=="camera"){
        result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          base64:true,
          aspect: [3,4],
          quality: 0.5,
        });
        }else{
            result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                base64:true,
                aspect: [4, 3],
                quality: 0.5,
              });
        }
    
        if (!result.cancelled) {
          setImage(result.uri);
          setImageBase64(result.base64)
        }
      };

      const update = async() =>{
        //   console.log("update")
          if(image==null || name==""){return}
          let updateDocumentResponse = await updateDocument(_id,name,collectionIndex,date,imageBase64)
          let documents = await getDocuments()
          user.documents=documents
          navigation.navigate("DrawerConfig" as never, {} as never)
      }

      const deleteD = async() =>{
        // console.log("delete")
        let deleteDocumentResponse = await deleteDocument(_id)
        let documents = await getDocuments()
        user.documents=documents
        navigation.navigate("DrawerConfig" as never, {} as never)
    }


    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView style={tailwind("bg-[#212530] flex-1")} keyboardShouldPersistTaps="always">
                <View style={tailwind("flex-row items-center justify-between")}>
                    <BackArrow />
                    <View style={tailwind("flex-row items-end")}>
                        <TextInput style={tailwind("mt-14 text-white font-bold text-4xl")} placeholder={t("DocumentPlaceholder")}
                        maxLength={12} value={name} onChangeText={setName} multiline={false} ref={nameRef} textAlignVertical={'top'}/>
                        <Ionicons
                        name="pencil" size={24} color="white"
                        style={tailwind("ml-2 mb-3")}
                        onPress={() => {
                            nameRef.current?.focus();
                        }}/>
                    </View>
                    <View style={{width:32}}></View>
                </View>
                <ImageBackground source={imageBase64=="none"?{uri: http.ip+"/"+image+"?time=" + new Date()}:{uri: image}} style={tailwind(imageStyle)} imageStyle={tailwind("ml-2 mt-2 mr-2 h-80 rounded-xl justify-center")}>
                    {image==null?
                    <View style={tailwind("flex-row self-center")}>
                        <Ionicons
                        name="camera" size={56} color="#000000"
                        style={tailwind("bg-white rounded-full p-2 self-center")}
                        onPress={() => {
                            Keyboard.dismiss();
                            // Alert.alert(t("ExpireTitleMSG"),t("ExpireMSG"))
                            pickImage("camera")
                        }}/>
                        <Ionicons
                        name="image" size={56} color="#000000"
                        style={tailwind("bg-white rounded-full p-2 ml-3 self-center")}
                        onPress={() => {
                            Keyboard.dismiss();
                            pickImage("gallery")
                        }}/>
                     </View>   
                    :<View style={tailwind("self-end flex-col mr-4")}>
                        {!editMode && <Ionicons
                    name="trash" size={32} color="#F50057"
                    style={tailwind("bg-white rounded-full p-2 mb-2 self-end")}
                    onPress={() => {
                        Keyboard.dismiss();
                        Alert.alert("",t("DeleteDocumentConfirmation"),[
                            {text: t("Yes"), onPress: ()=>deleteD()},
                            {text: "No", onPress: ()=>console.log("no")}
                        ])
                        // Alert.alert(t("ExpireTitleMSG"),t("ExpireMSG"))
                        // pickImage("camera")
                    }}/>}
                    {!editMode && <Ionicons
                    name="pencil" size={32} color="#000000"
                    style={tailwind("bg-white rounded-full p-2 self-end")}
                    onPress={() => {
                        Keyboard.dismiss();
                        setEditMode(true)
                        // Alert.alert(t("ExpireTitleMSG"),t("ExpireMSG"))
                        // pickImage("camera")
                    }}/>}
                    {editMode && <Ionicons
                    name="checkmark" size={32} color="#000000"
                    style={tailwind("bg-white rounded-full p-2 mb-2 self-end")}
                    onPress={() => {
                        Keyboard.dismiss();
                        setEditMode(false)
                        // Alert.alert(t("ExpireTitleMSG"),t("ExpireMSG"))
                        // pickImage("camera")
                    }}/>}
                    {editMode && <Ionicons
                    name="close" size={32} color="#000000"
                    style={tailwind("bg-white rounded-full p-2 self-end")}
                    onPress={() => {
                        Keyboard.dismiss();
                        setImage(null)
                        // Alert.alert(t("ExpireTitleMSG"),t("ExpireMSG"))
                        // pickImage("camera")
                    }}/>}
                    
                 </View> }
                </ImageBackground>
                {/* Options Chips */}
                <ScrollView style={tailwind("mt-4 h-10 flex-row")} horizontal
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
                                } 
                                    return <Text key={index} style={tailwind(style)} onPress={()=>setCollectionIndex(index)}>{option}</Text>
                            })}
                </ScrollView>
                <View style={tailwind("ml-2 mr-2 mb-16 mt-2")}>
                    <Calendar style={tailwind("rounded-xl mb-2")} 
                    current={date}
                    markedDates={{[date]:{selected:true}}} 
                    onDayPress={day=>setDate(day.dateString.toString())}/> 
                    <Button text={t("Update")} function={update}/>  
                </View>
                
            </ScrollView>
        </TouchableWithoutFeedback>
    )
}