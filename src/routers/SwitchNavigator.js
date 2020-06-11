import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import App from "./AppNavigator";
import Loading from "../screens/Loading";
import Login from "../screens/Auth/Login";
import SignUp from "../screens/Auth/SignUp";

const AuthStack = createStackNavigator(
  {
    Login: { screen: Login },
    SignUp: { screen: SignUp }
  },
  {
  	headerMode: 'none',
	  	navigationOptions: {
	    	headerVisible: false,
	  	}
  }
);


export default createAppContainer(createSwitchNavigator(
  {
    Loading: Loading,
    App: App,
    Auth: AuthStack
  },
  {
    initialRouteName: "Loading"
  }
));
