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


const INPUT_NAMES = {
  'email': 'Email',
  'password': 'Password',
  'username': 'Username',
  'confirm_password': 'Confirm Password',
}

class SignupForm extends Component {
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

  renderInput({ input, label, type, placeholder,  meta: { touched, error, warning } }) {
    return (
      <Item error={error && touched} style={styles.itemForm}>
        <Icon name={input.name === "email" ? 'mail' : 
          (input.name === "username" ?'person':'lock')} style={{width: 40}}/>
        <Input
          ref={c => (this.textInput = c)}
          placeholder={placeholder}
          secureTextEntry={type === "password"}
          {...input}
          style={styles.inputText}
          keyboardType={type === "email" ? "email-address" : "default"}
          autoCapitalize = "none"
        />
      </Item>
    );
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  signup() {
    const {valid, signupForm} = this.props

    if (valid && (signupForm.values.password === signupForm.values.confirm_password)) {
      this.captchaForm.show()
    } else {
      let err_msg = ""
      if(signupForm.syncErrors) {
        let error_key = Object.keys(signupForm.syncErrors)[0]
        err_msg = `${INPUT_NAMES[error_key]} is ${signupForm.syncErrors[error_key]}`
      } else err_msg = "Password mismatched"
      
      Toast.show({
        text: err_msg,
        duration: 3000,
        position: "top",
        textStyle: { textAlign: "center" }
      });
    }
  }

  onMessage = (event) => {
    let { email, password, username } = this.props.signupForm.values;

    if (event && event.nativeEvent.data) {
      if (['cancel', 'error', 'expired'].includes(event.nativeEvent.data)) {
          this.captchaForm.hide();
          return;
      } else {
          let captcha_value = event.nativeEvent.data
          setTimeout(() => {
            this.captchaForm.hide();
            this.props.actions.signup({
              email: email, 
              password: password,
              username: username,
              captcha: captcha_value
            }).then(res => {
              if(res.status == 202) {
                const message = "A message with a confirmation link has been sent to your email address. Please follow the link to activate your account."
                Toast.show({
                  text: message,
                  buttonText: "OK",
                  position: "top",
                  duration: 8000,
                  type: "success"
                })
                this.props.navigation.navigate("Login");
              }
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
                  placeholder="Email"
                  type="email"
                  component={this.renderInput}
                  validate={[emailFormat, required]}
                />
                <Field
                  name="username"
                  placeholder="Username"
                  type="text"
                  component={this.renderInput}
                  validate={[required]}
                />
                <Field
                  name="password"
                  placeholder="Password"
                  type="password"
                  component={this.renderInput}
                  validate={[required]}
                />
                <Field
                  name="confirm_password"
                  placeholder="Confirm Password"
                  type="password"
                  component={this.renderInput}
                  validate={[required]}
                />
              </Form>
              <Button 
                block 
                disabled={this.props.auth.isAuthenticating}
                onPress={() => this.signup()} 
                style={styles.buttonSignup}>
                {
                  this.props.auth.isAuthenticating? 
                    <ActivityIndicator size="large" color="#fffff" />:
                    <Text uppercase={false} style={styles.textSignup}>Sign Up</Text>
                }
              </Button>
            </View>
            <Grid style={styles.toLogin}>
              <Text style={{marginRight:5, color: '#4e4e4e'}}>
                Do you have account? 
              </Text>
              <TouchableOpacity onPress={() => {this.props.navigation.navigate("Login")}}>
                <Text style={styles.link}>
                  Sign In
                </Text>
              </TouchableOpacity>
            </Grid> 
          </View>
        </Content>
      </Container>
    );
  }
}


const SignupScreen = reduxForm({
  form: "signup"
})(SignupForm);

const mapStateToProps = state => ({
  auth: state.auth,
  signupForm: state.form.signup
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AuthActions, dispatch)
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupScreen);
