import React, { Component } from "react";
import {
  Header, 
  Left, 
  Container, 
  Button, 
  Body, 
  Title, 
  Right, 
  Icon, 
  Text, 
  Content,
  Thumbnail
} from "native-base";
import { StatusBar } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'

import * as actions from "../../actions";
import styles from "./styles";

class DashBoardHeader extends Component {
  componentWillMount() {
    this.props.actions.getSelfUser()
  }

  render() {
    const profile = this.props.profile

    return (
      <Header
        noShadow
        iosBarStyle={"dark-content"}
        androidStatusBarColor={"#fff"}
        style={{ borderBottomWidth: 1, height: 80 }}>
        <Left style={styles.headerLeft}>
          {
            this.props.refresh && 
              <Button transparent onPress={() => this.props.refreshCallBack()}>
                <Icon name="refresh" style={{ color: "#FFF" }}/>
              </Button>
          }

          {
            this.props.back && 
              <Button transparent onPress={() => this.props.navigation.goBack()}>
                <Icon name="arrow-back" style={{ color: "#FFF" }}/>
              </Button>
          }
        </Left>
        <Body style={styles.headerBody}>
          <Title style={styles.textBody}>{this.props.title}</Title>
        </Body>
        <Right style={styles.headerRight}>
          {
            profile && profile.avatar? 
              <Thumbnail small source={{uri: profile.avatar}}/>:
              <Icon name="person" style={styles.avatar}/>
          }
        </Right>
        
      </Header>
    );
  }
}


const mapStateToProps = state => ({
  profile: state.auth.profile
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashBoardHeader);
