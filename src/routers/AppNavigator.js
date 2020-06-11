import React, { Component } from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { View, Icon, Badge, Button, Text, FooterTab, Footer } from "native-base";
import DashboardStack from "./DashboardNavigator";
import Products from "../screens/Products";
import OrderList from "../screens/Orders";
import OrderDetail from "../screens/Orders/Detail";
import General from "../screens/Settings/General";
import Profile from "../screens/Settings/Profile";
import ChangePassword from "../screens/Settings/ChangePassword";


const Dashboard = createStackNavigator(
  {
    Drawer: { screen: DashboardStack },
  },
  {
    initialRouteName: "Drawer",
    headerMode: "none"
  }
);


const Settings = createStackNavigator(
  {
    Settings: { screen: General },
    Profile: { screen: Profile },
    ChangePassword: {screen: ChangePassword}
  },
  {
    headerMode: 'none',
      navigationOptions: {
        headerVisible: false,
      }
  }
);


const Orders = createStackNavigator(
  {
    OrderList: {screen: OrderList},
    OrderDetail: { screen: OrderDetail }
  },
  {
    headerMode: 'none',
      navigationOptions: {
        headerVisible: false,
      }
  }
);



export default createBottomTabNavigator(
	{
		Dashboard: {screen: Dashboard},
		Orders: {screen: Orders},
		Settings: {screen: Settings},
	}, 
	{
		initialRouteName: "Dashboard",
		animationEnabled: true,
		tabBarComponent: props => {
			return (
				<Footer>
          <FooterTab>
            <Button 
            	vertical
            	active={props.navigation.state.index === 0}
            	onPress={() => props.navigation.navigate('Dashboard')}>
              <Icon name="home" />
              <Text>Home</Text>
            </Button>
            <Button 
            	vertical
            	active={props.navigation.state.index === 1}
            	onPress={() => props.navigation.navigate('Orders')}>
              <Icon name="list" />
              <Text>Orders</Text>
            </Button>
            <Button 
            	vertical
            	active={props.navigation.state.index === 2}
            	onPress={() => props.navigation.navigate('Settings')}>
              <Icon name="settings" />
              <Text>Settings</Text>
            </Button>
          </FooterTab>
        </Footer>
			)
		}
	}
)
