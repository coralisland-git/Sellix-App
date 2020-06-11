import React, { Component } from "react";
import {
  Card,
  CardItem,
  Body,
  Text,
  H3
} from "native-base";
import styles from "./styles";

export default class DashboardCard extends Component {
  render() {
    return (
      <Card style={styles.card}>
        <CardItem style={{
          paddingTop: 25,
          paddingBottom: 25,
          backgroundColor: this.props.bgColor || 'white'
        }}>
          <Body>
            <Text style={styles.cardTitle}>{this.props.title}</Text>
            <H3 style={styles.cardContent}>{this.props.content}</H3>
          </Body>
        </CardItem>
      </Card>
    );
  }
}
