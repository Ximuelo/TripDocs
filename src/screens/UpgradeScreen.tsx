import { useNavigation, useIsFocused } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { Alert, Text, View } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import { Ionicons } from "@expo/vector-icons";
import BackArrow from "../components/BackArrow";
import { Profile } from "../components/Avatar/Avatar";
import { upgrade, user} from "../utils/Auth";
import Button from "../components/Button";
import { StripeProvider, CardField, useConfirmPayment } from "@stripe/stripe-react-native"
import { useState } from "react";
import { Email_Input } from "../components/Inputs";

export default function UpgradeScreen(){
    const tailwind = useTailwind()
    const { t, i18n } = useTranslation();
    const navigation = useNavigation()
    const isFocused = useIsFocused();
      //Email
  const [email, setEmail] = useState("");
  const [disabled,setDisabled] = useState(false)
  const emailState = (value: string) => setEmail(value);
  //Card details
  const [cardDetails,setCardDetails]=useState(null)

  const {confirmPayment, loading} = useConfirmPayment();

  const handlePayPress = async()=>{
    setDisabled(true)

    if (!cardDetails?.complete || email=="") {
        // console.log(cardDetails)
        Alert.alert("Error",t("PaymentMissingInfo"));
        setDisabled(false)
        return;
      }

      const billingDetails = {
        email: email,
      };
      //2.Fetch the intent client secret from the backend
    //   try {
        const { clientSecret, error } = await upgrade();
        //2. confirm the payment
        if (error) {
        //   console.log("Unable to process payment");
        } else {
          const { paymentIntent, error } = await confirmPayment(clientSecret, {
            type: "Card",
            billingDetails: billingDetails,
          });
          if (error) {
            Alert.alert(t("Payment"),t("PaymentError"));
          } else if (paymentIntent) {
              user.subscription="paid"
              navigation.navigate("DrawerConfig" as never)
            Alert.alert(t("Payment"),t("PaymentSuccesful"));
            // console.log("Payment successful ", paymentIntent);
          }
        }
        setDisabled(false)
    //   } catch (e) {
    //     console.log(e);
    //   }
    
  }

    return(
        <StripeProvider publishableKey="pk_test_51L3OaEHTXUVPcscqJxYPHalqwpQXQlcqp33QNSgPZ3TX4DQ674Geq02MRhy1P4G4yhcKZou6JDDGbJSLgj8WiJ3k006lVdcGpF">
            <View style={tailwind("bg-[#212530] flex-1")}>
                <BackArrow />
                <View style={tailwind("ml-5 mr-5 mt-8")}>
                    <Email_Input
                    text={t("Email_Input")}
                    placeholder={t("Email_Placeholder")}
                    state={emailState}
                    error={t("Email_Error")}
                    />
                    <Text style={tailwind("text-white text-base ml-2 mt-2")}>{t("CardField")}</Text>
                    <CardField 
                        postalCodeEnabled
                        placeholder={{
                            number: "4242 4242 4242 4242"
                        }}
                        style={tailwind("h-12 mt-2 rounded mb-4")}
                        cardStyle={{
                            borderRadius: 100
                        }}
                        onCardChange={cardDetails=>setCardDetails(cardDetails)}
                    />
                </View>
                <Button text={t("Upgrade")} function={handlePayPress} isDisabled={disabled}/>
            </View>
        </StripeProvider>
    )
}