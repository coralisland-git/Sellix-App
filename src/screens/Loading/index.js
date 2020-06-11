import React, { Component } from "react";
import SplashScreen from "react-native-splash-screen";
import { connect } from "react-redux";
import { Image, StatusBar, ActivityIndicator } from "react-native";
import { Container, Text, View } from "native-base";
import styles from "./styles";

const logo = require("../../../assets/logoApp.jpg");

class LoadingScreen extends Component {
  componentDidMount(){
    setTimeout(() => {
      SplashScreen.hide();
    }, 3000);
    this.props.navigation.navigate(this.props.auth.token ? "App" : "Login");
  }
  render() {
    return (
      <Container style={styles.container}>
        <StatusBar hidden={true} />
          <Image source={logo} style={styles.logo}/>
          <View style={styles.containerLoading}>
            <ActivityIndicator size="large" color="#5ABEEC" />
          </View>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});


export default connect(
  mapStateToProps,
  null
)(LoadingScreen);
