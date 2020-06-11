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
  View,
  Content,
  Grid,
  Card, 
  CardItem,
  Badge,
  Col
} from "native-base";
import { connect } from "react-redux";
import moment from 'moment'
import { bindActionCreators } from 'redux'
import { StatusBar, FlatList, Dimensions } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import Flag from 'react-native-flags';

import * as CONSTANTS from "../../../constants/common"
import DashBoardHeader from "../../../components/Header";
import styles from "../styles";


class OrderDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const allInvoices = this.props.invoices
    const invoiceId = this.props.navigation.state.params.itemID
    const selectedInvoice = allInvoices.filter(invoice => invoice.uniqid === invoiceId)[0]

    return (
      <Container style={styles.container}>
        <StatusBar translucent={false}/>
        <DashBoardHeader {...this.props} title={'Order Detail'} back={true}/>
        <Content padder style={{backgroundColor: '#3F51B5', textAlign: 'center'}}>
          <Text style={{fontSize: 40, paddingTop: 10, textAlign: 'center', color: 'white'}}>
            BTC
          </Text>
          <Text style={{fontSize: 15, paddingTop: 10, textAlign: 'center', color: 'white'}}>
            testuser@gmail.com
          </Text>
          <Text style={{fontSize: 15, paddingTop: 5, paddingBottom: 5, width: 90, textAlign: 'center', color: 'white', backgroundColor: 'orange', borderRadius: 5}}>
            pending
          </Text>
        </Content>
        <Content padder>
          <View>
            <Card>
              <CardItem header bordered>
                <View>
                  <Grid>
                    <Text style={{marginRight: 15}}>View Order</Text>
                    <Badge style={styles[`badgeBg${selectedInvoice.status}`]}>
                      <Text style={{fontSize: 12, lineHeight: 18}}>
                        {CONSTANTS.ORDER_STATUS[selectedInvoice.status]}</Text>
                    </Badge>
                  </Grid>
                  <Text note>{selectedInvoice.uniqid}</Text>
                </View>
              </CardItem>
              <CardItem bordered>
                <Body>
                  <Grid style={{marginBottom: 15, marginTop: 15}}>
                    <Text note style={styles.orderInfoTitle}>
                      Email: 
                    </Text>
                    <Grid style={{flexWrap: 'wrap'}}>
                      <Text>
                        {selectedInvoice.customer_email} 
                      </Text>
                    </Grid>
                  </Grid>
                  <Grid style={{marginBottom: 15}}>
                    <Text note style={styles.orderInfoTitle}>
                      Product:
                    </Text>
                    <Text>
                      {selectedInvoice.product_title}
                    </Text>
                  </Grid>
                  <Grid style={{marginBottom: 15}}>
                    <Text note style={styles.orderInfoTitle}>
                      Value: 
                    </Text>
                    <Text>
                      {`${CONSTANTS.CURRENCY_LIST[selectedInvoice.currency]} ${selectedInvoice.total_display}`}
                    </Text>
                  </Grid>
                  <Grid style={{marginBottom: 15}}>
                    <Text note style={styles.orderInfoTitle}>
                      Gateway: 
                    </Text>
                    <Text>
                      {CONSTANTS.PAYMENT_OPTS[selectedInvoice.gateway]}
                    </Text>
                  </Grid>
                  <Grid style={{marginBottom: 15}}>
                    <Text note style={styles.orderInfoTitle}>
                      Created At: 
                    </Text>
                    <Text>
                      {moment(new Date(selectedInvoice.created_at * 1000)).format('MMM DD, HH:mm')}
                    </Text>
                  </Grid>
                  <Grid style={{marginBottom: 15}}>
                    <Text note style={styles.orderInfoTitle}>
                      Quantity: 
                    </Text>
                    <Text>
                      {selectedInvoice.quantity}
                    </Text>
                  </Grid>
                  <Grid style={{marginBottom: 15}}>
                    <Text note style={styles.orderInfoTitle}>
                      Coupon: 
                    </Text>
                    <Text>
                      {selectedInvoice.coupon_id || 'No Coupon'}
                    </Text>
                  </Grid>
                  <Grid style={{marginBottom: 15}}>
                    <Text note style={styles.orderInfoTitle}>
                      IP Address: 
                    </Text>
                    <Grid>
                      <Text>
                        {selectedInvoice.ip}
                      </Text>
                      {
                        selectedInvoice.is_vpn_or_proxy === '1' && 
                          <Badge danger style={{height: 20, marginLeft: 10}}>
                            <Text style={{fontSize: 12, lineHeight: 18}}>VPN/Proxy</Text>
                          </Badge>
                      }
                    </Grid>
                  </Grid>
                  <Grid style={{marginBottom: 15}}>
                    <Text note style={styles.orderInfoTitle}>
                      Country: 
                    </Text>
                    <Grid style={{flexWrap: 'wrap'}}>
                      <Text>
                        {selectedInvoice.location}
                      </Text>
                      <Flag code={selectedInvoice.country} size={24}  style={{marginLeft: 10}}/>
                    </Grid>
                  </Grid>
                  <Grid style={{marginBottom: 15}}>
                    <Text note style={styles.orderInfoTitle}>
                      Device: 
                    </Text>
                    <Grid style={{flexWrap: 'wrap'}}>
                      <Text>
                        {selectedInvoice.user_agent}
                      </Text>
                    </Grid>
                    
                  </Grid>
                </Body>
              </CardItem>
            </Card>
          </View>
        </Content>
      </Container>
    );
  }
}



const mapStateToProps = state => ({
  invoices: state.order.invoices,
  loading: state.common.fetching,
});

export default connect(
  mapStateToProps,
  null
)(OrderDetail);

