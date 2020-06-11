import React, { Component } from "react";
import { 
  Container, 
  Button, 
  Icon, 
  Text, 
  View,
  Grid,
  Content,
  Col
} from "native-base";
import Spinner from "react-native-loading-spinner-overlay";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import moment from 'moment'
import { StatusBar, ActivityIndicator } from "react-native";
import DashBoardHeader from "../../components/Header";
import DashboardCard from "../../components/DashboardCard"
import LineChart from "../../components/Chart/lineChart"
import * as actions from "../../actions";
import styles from "./styles";

const DATE_RANGE =  {
  'week': [moment().subtract(6, 'days').format('MM/DD/YYYY'), moment().format('MM/DD/YYYY'), 'daily'],
  'month': [moment().subtract(29, 'days').format('MM/DD/YYYY'), moment().format('MM/DD/YYYY'), 'daily'],
  'year': [moment().startOf('year').format('MM/DD/YYYY'), moment().format('MM/DD/YYYY'), 'monthly'],
  'total': [moment(new Date('2020-01-01')).format('MM/DD/YYYY'), moment(new Date().setDate(new Date().getDate() + 1)).format('MM/DD/YYYY')]
}


class DashboardScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      filter: 'week'
    };

    this.switchGraph = this.switchGraph.bind(this)
    this.getDashboardData = this.getDashboardData.bind(this)
  }

  componentDidMount() {
    this.getDashboardData()
  }

  getDashboardData() {
    Promise.all([
      this.props.actions.getDashboardTotalData(DATE_RANGE['total'][0], DATE_RANGE['total'][1]),
      this.props.actions.getDashboardGraphData(DATE_RANGE['week'][0], DATE_RANGE['week'][1])
    ])
  }

  switchGraph(filter) {
    this.setState({filter: filter})
    this.props.actions.getDashboardGraphData(DATE_RANGE[filter][0], DATE_RANGE[filter][1])
  }

  render() {
    let { loading, updating, gdata, total } = this.props
    const { filter } = this.state

    return (
      <Container style={styles.container}>
        <StatusBar translucent={false}/>
        <DashBoardHeader {...this.props} refresh={true} title={'Dashboard'} refreshCallBack={this.getDashboardData}/>
        <Spinner visible={loading}/>
        <Content padder>
          {
            !loading && 
            <View>
              <Grid>
                <Col>
                  <DashboardCard 
                    bgColor={'#e36ce1'} 
                    title="Total Revenue" 
                    content={'$'+((total && total.revenue) || 0)}/>
                </Col>
                <Col>
                  <DashboardCard 
                    bgColor={'#37b8ff'} 
                    title="Total Orders" 
                    content={(total && total.orders_count) || 0}/>
                </Col>
              </Grid>
              <Grid>
                <Col>
                  <DashboardCard 
                    bgColor={'#ff7795'} 
                    title="Total Views" 
                    content={(total && total.views_count) || 0}/>
                </Col>
                <Col>
                  <DashboardCard 
                    bgColor={'#6fe46b'} 
                    title="Total Queries" 
                    content={(total && total.queries_count) || 0}/>
                </Col>
              </Grid>

              <Grid between style={{marginTop: 20}}>
                <Col style={{paddingTop: 3, paddingLeft:5}}>
                  <Text>Revenue | Orders</Text>
                </Col>
                <Col>
                  <Grid>
                    <Col style={{paddingRight: 0}}>
                      <Button small 
                        light={filter!='week'} 
                        onPress={() => this.switchGraph('week')} >
                        <Text>1w</Text>
                      </Button>
                    </Col>
                    <Col>
                      <Button small 
                        light={filter!='month'} 
                        onPress={() => this.switchGraph('month')} >
                        <Text>1m</Text>
                      </Button>
                    </Col>
                    <Col>
                      <Button small 
                        light={filter!='year'} 
                        onPress={() => this.switchGraph('year')} >
                        <Text>1y</Text>
                      </Button>
                    </Col>
                  </Grid>
                </Col>
              </Grid>
              <View style={styles.graphView}>
              {gdata.total && (
                  updating?<ActivityIndicator/>:<LineChart data={gdata} unit={filter}/>
                )
              }
              </View>
            </View>
          }
        </Content>
      </Container>
    );
  }
}


const mapStateToProps = state => ({
  ...state.dashboard,
  loading: state.common.fetching,
  updating: state.common.updating
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardScreen);


