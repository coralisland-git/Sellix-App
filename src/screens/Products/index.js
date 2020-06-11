import React, { Component } from "react";
import {
  Left, 
  Container, 
  Button, 
  Body, 
  Title, 
  Right, 
  Icon, 
  Text, 
  Content 
} from "native-base";
import { StatusBar } from "react-native";
import DashBoardHeader from "../../components/Header";
import styles from "./styles";

export default class ProductScreen extends Component {
  render() {
    return (
      <Container style={styles.container}>
        <StatusBar translucent={false}/>
        <DashBoardHeader {...this.props} title={'Products'}/>
        <Content>
          <Text style={{ alignSelf: "center", marginTop: 10}}>Products</Text>
        </Content>
      </Container>
    );
  }
}

