import { TailwindProvider } from "tailwind-rn";
import utilities from "./tailwind.json";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from "@expo/vector-icons";

import IntroScreen from "./src/screens/IntroScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import LoginScreen from "./src/screens/LoginScreen";
import HomeScreen from "./src/screens/HomeScreen";

import initLanguages from "./src/utils/Languages";
import ProfileCreatorScreen from "./src/screens/ProfileCreatorScreen";
import DrawerContent from "./src/components/DrawerContent";
import CreateDocumentScreen from "./src/screens/CreateDocumentScreen";
import RequirementsScreen from "./src/screens/RequirementsScreen";
import ProfileScreen from "./src/screens/ProfileScreen";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  //Languages
  initLanguages();

  return (
    <TailwindProvider utilities={utilities}>
      <NavigationContainer>
        <StackConfig />
      </NavigationContainer>
    </TailwindProvider>
  );
}

function DrawerConfig(){
  return(
    <Drawer.Navigator useLegacyImplementation={true}
    screenOptions={{
      headerShown: false,
      drawerStyle:{
        backgroundColor: "#212530"
      }
    }}
    drawerContent={props=> <DrawerContent/>}
    initialRouteName="Home"
    >
      <Drawer.Screen name="Home" component={HomeScreen}/>
    </Drawer.Navigator>
  )
}

function StackConfig(){
  return(
<Stack.Navigator
          screenOptions={{
            headerShown: false,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
          initialRouteName="Login"
        >
          <Stack.Screen name="Intro" component={IntroScreen}/>
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="ProfileCreatorScreen" component={ProfileCreatorScreen} />
          <Stack.Screen name="TabConfig" component={TabConfig} />
  </Stack.Navigator>
  )
}

function TabConfig(){
  return(
  <Tab.Navigator 
  screenOptions={{
    headerShown: false,
    tabBarShowLabel: false,
    tabBarStyle: {
      borderRadius: 100,
      position: "absolute"
    }
  }}
  initialRouteName="DrawerConfig">
    <Tab.Screen name="DrawerConfig" component={DrawerConfig} options={{
      tabBarIcon: ({focused}) => (
        <Ionicons
        name="home-sharp" size={24} 
        color={focused?"#2D9CDB":"#BABABA"}
        />
      )
    }}/>
    <Tab.Screen name="CreateDocument" component={CreateDocumentScreen} options={{
      tabBarIcon: ({focused}) => (
        <Ionicons
        name="ios-folder-open-sharp" size={24} 
        color={focused?"#2D9CDB":"#BABABA"}
        />
      )
    }}/>
    <Tab.Screen name="RequirementsScreen" component={RequirementsScreen} options={{
      tabBarIcon: ({focused}) => (
        <Ionicons
        name="compass" size={24} 
        color={focused?"#2D9CDB":"#BABABA"}
        />
      )
    }}/>
    <Tab.Screen name="ProfileScreen" component={ProfileScreen} options={{
      tabBarIcon: ({focused}) => (
        <Ionicons
        name="person" size={24} 
        color={focused?"#2D9CDB":"#BABABA"}
        />
      ),
    }}/>
  </Tab.Navigator>)
}