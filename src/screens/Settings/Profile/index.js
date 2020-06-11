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
import DashBoardHeader from "../../../components/Header";
import apis from '../../../constants/apis'
import { emailFormat, required, alphaNumeric } from "./validators";
import styles from  "./styles";

const logo = require("../../../../assets/logoApp.jpg");
const lockIcon = require("../../../../assets/icon/lock.png");
const mailIcon = require("../../../../assets/icon/mail.png");

class ProfileForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillReceiveProps(nextProps, nextState){
  
  }

  renderInput({ input, label, type, meta: { touched, error, warning } }) {
    return (
      <Item error={error && touched} style={styles.itemForm}>
        <Icon name={input.name === "username" ? 'person' : 'mail'} style={{width: 40}}/>
        <Input
          ref={c => (this.textInput = c)}
          placeholder={input.name === "email" ? "Email" : "Name"}
          {...input}
          style={styles.inputText}
          keyboardType={input.name === "email" ? "email-address" : "default"}
          autoCapitalize = "none"
        />
      </Item>
    );
  }

  saveUserSettings() {
    if (this.props.valid) {
      let { email, username } = this.props.profileForm.values;
      alert('save')
    } else {
      Toast.show({
        text: "Enter valid username & password!",
        duration: 3000,
        position: "top",
        textStyle: { textAlign: "center" }
      });
    }
  }


  render() {
    return (
      <Container style={styles.container}>
        <StatusBar hidden={true}/>
        <DashBoardHeader {...this.props} title={'Edit Profile'} back={true}/>
        <Content>
          
          <View style={styles.containerForm}>
            <View style={styles.contentForm}>
              <Form>
                <Field
                  name="username"
                  component={this.renderInput}
                  validate={[required]}
                />
                <Field
                  name="email"
                  component={this.renderInput}
                  validate={[alphaNumeric, required]}
                />
              </Form>
              <Button 
                block 
                disabled={this.props.auth.isAuthenticating}
                onPress={() => this.saveUserSettings()} 
                style={styles.buttonLogin}>
                {
                  this.props.auth.isAuthenticating? 
                    <ActivityIndicator size="large" color="#fffff" />:
                    <Text uppercase={false} style={styles.textLogin}>Save Update</Text>
                }
              </Button>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}


const ProfileScreen = reduxForm({
  form: "profile"
})(ProfileForm);

const mapStateToProps = state => ({
  auth: state.auth,
  settings: state.auth.settings,
  profileForm: state.form.profile
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AuthActions, dispatch)
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileScreen);
