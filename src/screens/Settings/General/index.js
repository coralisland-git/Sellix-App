import React, { Component } from "react";
import { Image, StatusBar, Alert, ActivityIndicator, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { Field, reduxForm } from "redux-form";
import { Col, Row, Grid } from 'react-native-easy-grid'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import { 
  Item, 
  Input, 
  Toast, 
  Form, 
  Container, 
  Content, 
  Button, 
  Icon,
  Text, 
  View,
  List, 
  ListItem,
  Left,
  Right,
  Body,
  Thumbnail,
  Switch
} from "native-base";
import Spinner from "react-native-loading-spinner-overlay";
import * as AuthActions from "../../../actions";
import { userRequestLogout } from "../../../actions";
import DashBoardHeader from "../../../components/Header";
import styles from  "./styles";

const logo = require("../../../../assets/logoApp.jpg");
const lockIcon = require("../../../../assets/icon/lock.png");
const mailIcon = require("../../../../assets/icon/mail.png");

class SettingsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      order_notification: false,
      email_authentication: false,
      email: ''
    };

    this.getSettingsData = this.getSettingsData.bind(this)
  }

  componentDidMount() {
    this.getSettingsData()
  }

  getSettingsData() {
    this.setState({loading: true})
    this.props.actions.getSelfSettings().then(res => {
      const settings = res.data.settings.user
      console.log(settings.notifications_invoices)
      this.setState({
        email: settings.email,
        order_notification: settings.notifications_invoices=='1'?true:false,
        email_authentication: settings.email_2fa=='1'?true:false
      })
    }).finally(() => {
      this.setState({loading: false})
    })
  }

  saveNotification(key, value) {

  }

  toggleSwitch(key) {
    this.setState({
      [key]:!this.state[key]
    })
  }

  logoutAccount() {
    this.props.logout();
    this.props.navigation.navigate("Login");
  }

  render() {
    const profile = this.props.profile
    const settings = this.props.settings

    const { email, order_notification, email_authentication, loading } = this.state

    return (
      <Container style={styles.container}>
        <StatusBar hidden={true}/>
        <DashBoardHeader {...this.props} title={'Settings'} refresh={true} refreshCallBack={this.getSettingsData}/>
        <Spinner visible={loading}/>
        <Content style={{backgroundColor: '#f4f4f4'}}>
          <List style={{backgroundColor: 'white'}}>
            <ListItem itemDivider/>
              
            <ListItem thumbnail style={{paddingTop: 10, paddingBottom: 10}} 
              onPress={() => {this.props.navigation.navigate("Profile")}}>
              <Left>
                {
                  profile && profile.avatar? 
                    <Thumbnail source={{ uri: profile.avatar}} />:
                    <Icon name="person" style={styles.avatar}/>
                }
              </Left>
              <Body style={{borderBottom: 0}}>
                <Text>{profile.name}</Text>
                <Text note>{email}</Text>
              </Body>
              <Right>
                <Button transparent onPress={() => {this.props.navigation.navigate("Profile")}}>
                  <Icon active name="arrow-forward" />
                </Button>
              </Right>
            </ListItem>
            <ListItem itemDivider/>

            <ListItem itemDivider>
              <Text style={{fontWeight: 'bold', color: '#623bea'}}>Security</Text>
            </ListItem>
            <ListItem icon onPress={() => {this.props.navigation.navigate("ChangePassword")}}>
              <Left>
                <Button style={{ backgroundColor: "#f86c6b" }}>
                  <Icon active name="lock" />
                </Button>
              </Left>
              <Body>
                <Text>Change Password</Text>
              </Body>
              <Right>
                <Button transparent onPress={() => {this.props.navigation.navigate("ChangePassword")}}>
                  <Icon active name="arrow-forward" />
                </Button>
              </Right>
            </ListItem>
            <ListItem icon>
              <Left>
                <Button style={{ backgroundColor: "#FF9501" }}>
                  <Icon active name="mail" />
                </Button>
              </Left>
              <Body>
                <Text>Email Authentication</Text>
              </Body>
              <Right>
                <Switch value={email_authentication} 
                  onValueChange={() => this.toggleSwitch('email_authentication')} />
              </Right>
            </ListItem>

            <ListItem itemDivider/>
            <ListItem itemDivider>
              <Text style={{fontWeight: 'bold', color: '#623bea'}}>Push Notification</Text>
            </ListItem>         
            <ListItem icon>
              <Body>
                <Text>Orders</Text>
              </Body>
              <Right>
                <Switch value={order_notification} 
                  onValueChange={() => this.toggleSwitch('order_notification')}/>
              </Right>
            </ListItem>
            <ListItem itemDivider/>
            <Button transparent danger block onPress={() => this.logoutAccount()}>
              <Text>Log out current account</Text>
            </Button>
          </List>
          
        </Content>
      </Container>
    );
  }
}


const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.auth.profile,
  settings: state.auth.settings
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AuthActions, dispatch),
  logout: () => dispatch(userRequestLogout())
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsScreen);
