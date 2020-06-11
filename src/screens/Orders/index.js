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
  Content,
  List, 
  ListItem, 
  Thumbnail,
  View,
  Badge,
  Grid
} from "native-base";
import { connect } from "react-redux";
import moment from 'moment';
import Flag from 'react-native-flags';
import { bindActionCreators } from 'redux'
import { StatusBar, FlatList, Dimensions, Image } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";

import DashBoardHeader from "../../components/Header";
import * as CONSTANTS from "../../constants/common"
import * as InvoiceActions from "../../actions";

import styles from "./styles";

class OrderScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      invoices: []
    };

    this.onFetch = this.onFetch.bind(this)
    this.getInvoiceData = this.getInvoiceData.bind(this)
  }

  componentDidMount() {
    this.getInvoiceData()
  }

  getInvoiceData() {
    this.props.actions.getInvoices().then((res) => {
      this.setState({invoices: res.data.invoices.slice(0, 10)})
    })
  }

  onFetch(currentItemIndex) {
    this.setState({invoices: this.props.invoices.slice(0, 10*(currentItemIndex + 1))})
  }


  setCurrentReadOffset = (event) => {
    let contentHeight = Dimensions.get('screen').height;

    let currentOffset = Math.floor(event.nativeEvent.contentOffset.y);

    let currentItemIndex = Math.ceil(currentOffset / contentHeight);
    this.onFetch(currentItemIndex)
  }

  render() {
    const { loading } = this.props
    const { invoices } = this.state

    return (
      <Container style={styles.container}>
        <StatusBar translucent={false}/>
        <DashBoardHeader {...this.props} title={'Orders'} refresh={true} refreshCallBack={this.getInvoiceData}/>
        <Spinner visible={loading}/>
        <Content scrollEventThrottle={Dimensions.get('screen').height} onScroll={this.setCurrentReadOffset} removeClippedSubviews={true}>
          <List>
            {
              invoices.map(invoice => 
                <ListItem thumbnail onPress={() => {this.props.navigation.navigate("OrderDetail", {itemID: invoice.uniqid})}}>
                  <Left>
                    <Button transparent>
                      <Flag code={invoice.country} size={24}/>
                    </Button>
                  </Left>
                  <Body>
                    <Text>{CONSTANTS.PAYMENT_OPTS[invoice.gateway]} - {invoice.customer_email}</Text>
                    <Text note numberOfLines={1}>{invoice.uniqid}</Text>
                    <Grid>
                      <Text note style={{marginRight: 15}}>{moment(new Date(invoice.created_at * 1000)).format('MMM DD, HH:mm')}</Text>
                      <Badge style={styles[`badgeBg${invoice.status}`]}>
                        <Text style={{fontSize: 12, lineHeight: 18}}>{CONSTANTS.ORDER_STATUS[invoice.status]}</Text>
                      </Badge>
                    </Grid>
                  </Body>
                  <Right>
                    <Text style={{color: 'green', fontWeight: 'bold'}}>+{`${CONSTANTS.CURRENCY_LIST[invoice.currency]}${invoice.total_display}`}</Text>
                  </Right>
                </ListItem>
              )
            }
          </List>
        </Content>
      </Container>
    );
  }
}



const mapStateToProps = state => ({
  invoices: state.order.invoices,
  loading: state.common.fetching,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(InvoiceActions, dispatch)
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderScreen);

