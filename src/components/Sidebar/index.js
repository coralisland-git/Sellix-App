import React, { Component } from "react";
import { Image, TouchableOpacity } from "react-native";
import { 
  Content, 
  Text, 
  List, 
  ListItem, 
  Container, 
  View, 
  Icon, 
  Thumbnail 
} from "native-base";
import _ from "lodash";
import styles from "./styles";

const avatarImage = require("../../../assets/avatar.png");

class SideBar extends Component {
  render() {
    let logoutMenu = _.find(this.props.data, { route: "Logout" });
    const uri = "https://icons-for-free.com/iconfiles/png/512/business+costume+male+man+office+user+icon-1320196264882354682.png"
    return (
      <Container style={styles.container}>
        <View style={styles.drawerCover}>
          {
            uri?
              <Thumbnail source={{uri: uri}} style={styles.avatar}/>:
              <Image source={avatarImage} style={styles.avatar}/>
          }
          <Text style={styles.organizerName}>Midas</Text>
        </View>
        <Content bounces={false}>
          <List
            dataArray={this.props.data}
            renderRow={data => {
              if (data.route === "Logout") {
                return null;
              } else {
                return <ListItem style={styles.menuItem} onPress={() => this.props.onPress(data)}>
                  <Icon
                    active
                    name={data.icon}
                    style={{ color: "#777", fontSize: 26, width: 30 }}
                  />
                  <Text style={styles.menuText}>{data.name}</Text>
                </ListItem>;
              }
            }}
          />
        </Content>
        <TouchableOpacity style={styles.footer} onPress={() => this.props.onPress(logoutMenu)}>
          <Icon
            active
            name={logoutMenu.icon}
            style={{ color: "#777", fontSize: 26, width: 30 }}
          />
          <Text style={styles.menuText}>{logoutMenu.name}</Text>
        </TouchableOpacity>
      </Container>
    );
  }
}

export default SideBar;
