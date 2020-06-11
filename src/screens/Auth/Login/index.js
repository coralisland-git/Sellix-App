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
  View 
} from "native-base";
import ConfirmGoogleCaptcha from 'react-native-google-recaptcha-v2'
import Spinner from "react-native-loading-spinner-overlay";
import * as AuthActions from "../../../actions";
import apis from '../../../constants/apis'
import { emailFormat, required, alphaNumeric } from "./validators";
import styles from  "./styles";

const logo = require("../../../../assets/logoApp.jpg");
const lockIcon = require("../../../../assets/icon/lock.png");
const mailIcon = require("../../../../assets/icon/mail.png");

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillReceiveProps(nextProps, nextState){
    if (this.props.auth.isFailed !== nextProps.auth.isFailed){
      if (nextProps.auth.isFailed && !nextProps.auth.isAuthenticating){
        let message = nextProps.auth.error;
        Toast.show({
          type: "danger",
          text: message,
          duration: 3000,
          position: "top",
          textStyle: { textAlign: "center" }
        });
      }
    }

    if (this.props.auth.token !== nextProps.auth.token){
      if (nextProps.auth.token){
        this.props.navigation.navigate("App");
      }
    }
  }

  renderInput({ input, label, type, meta: { touched, error, warning } }) {
    return (
      <Item error={error && touched} style={styles.itemForm}>
        <Icon name={input.name === "email" ? 'mail' : 'lock'} style={{width: 40}}/>
        <Input
          ref={c => (this.textInput = c)}
          placeholder={input.name === "email" ? "Email" : "Password"}
          secureTextEntry={input.name === "password"}
          {...input}
          style={styles.inputText}
          keyboardType={input.name === "email" ? "email-address" : "default"}
          autoCapitalize = "none"
        />
      </Item>
    );
  }

  login() {
    if (this.props.valid) {
      this.captchaForm.show()
    } else {
      Toast.show({
        text: "Enter valid username & password!",
        duration: 3000,
        position: "top",
        textStyle: { textAlign: "center" }
      });
    }
  }

  onMessage = (event) => {
    let { email, password } = this.props.loginForm.values;

    if (event && event.nativeEvent.data) {
      if (['cancel', 'error', 'expired'].includes(event.nativeEvent.data)) {
          this.captchaForm.hide();
          return;
      } else {
          let captcha_value = event.nativeEvent.data
          setTimeout(() => {
            this.captchaForm.hide();
            this.props.actions.login({
              email: email, 
              password: password,
              captcha: captcha_value
            })
          }, 1500);
      }
    }
  }

  render() {
    return (
      <Container style={styles.container}>
        <StatusBar hidden={true}/>
        <ConfirmGoogleCaptcha 
          ref={_ref=>this.captchaForm=_ref}
          siteKey={apis.CAPTCHA_KEY}
          baseUrl={apis.CAPTCHA_URL}
          languageCode="en"
          onMessage={this.onMessage}
        />
        <Content>
          <Image source={logo} style={styles.logo}/>
          
          <View style={styles.containerForm}>
            <View style={styles.contentForm}>
              <Form>
                <Field
                  name="email"
                  component={this.renderInput}
                  validate={[emailFormat, required]}
                />
                <Field
                  name="password"
                  component={this.renderInput}
                  validate={[alphaNumeric, required]}
                />
              </Form>
              <Button 
                block 
                disabled={this.props.auth.isAuthenticating}
                onPress={() => this.login()} 
                style={styles.buttonLogin}>
                {
                  this.props.auth.isAuthenticating? 
                    <ActivityIndicator size="large" color="#fffff" />:
                    <Text uppercase={false} style={styles.textLogin}>Sign In</Text>
                }
              </Button>
            </View>
            <Grid style={styles.toSignup}>
              <Text style={{marginRight:5, color: '#4e4e4e'}}>
                Don't have account? 
              </Text>
              <TouchableOpacity onPress={() => {this.props.navigation.navigate("SignUp")}}>
                <Text style={styles.link}>
                  Sign Up
                </Text>
              </TouchableOpacity>
            </Grid>
          </View>
        </Content>
      </Container>
    );
  }
}


const LoginScreen = reduxForm({
  form: "login"
})(LoginForm);

const mapStateToProps = state => ({
  auth: state.auth,
  loginForm: state.form.login
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AuthActions, dispatch)
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);
