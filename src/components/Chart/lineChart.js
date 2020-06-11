import React, { Component } from "react";
import { Dimensions } from "react-native"
import { View } from "native-base";
import {
  LineChart,
  BarChart
} from "react-native-chart-kit";

import PureChart from 'react-native-pure-chart';
import styles from "./styles";

export default class SellixChart extends Component {
  getGraphLabels(){
    const {unit, data} = this.props

    if(unit == 'week')
      return data.daily.map(d => `${d.day_value}`)
    if(unit == 'month')
      return data.daily.map(d => `${d.day_value}`).filter((d, index) => (index%4)==0)
    if(unit == 'year')
      return data.monthly.map(d => `${d.month}`)
  }

  getOrdersData(){
    const {unit, data} = this.props
    if(unit == 'week')
      return data.daily.map(d => d.orders_count)
    if(unit == 'month')
      return data.daily.map(d => d.orders_count)
    if(unit == 'year')
      return data.monthly.map(d => d.orders_count)
  }

  getRevenueData(){
    const {unit, data} = this.props
    if(unit == 'week')
      return data.daily.map(d => d.revenue)
    if(unit == 'month')
      return data.daily.map(d => d.revenue)
    if(unit == 'year')
      return data.monthly.map(d => d.revenue)
  }

  render() {
    return (
      <LineChart
        data={{
          labels: this.getGraphLabels(),
          datasets: [
            {
              data: this.getRevenueData(),
              color: (opacity = 1) => `#e36ce1`, // optional
              strokeWidth: 2 // optional
            },
            {
              data: this.getOrdersData(),
              color: (opacity = 1) => `#37b8ff`, // optional
              strokeWidth: 2 // optional
            }
          ]
        }}
        width={Dimensions.get("window").width - 30} // from react-native
        height={220}
        yAxisLabel="$"
        chartConfig={
          {
            backgroundColor: "grey",
            backgroundGradientFrom: "white",
            backgroundGradientTo: "white",
            barPercentage: 0.5,
            useShadowColorFromDataset: false,
            decimalPlaces: 2, // optional, defaults to 2dp
            color: () => "#623bea",
            labelColor: (opacity = 1) => "grey",
            propsForDots: {
              r: "1",
              strokeWidth: "1",
            },
            propsForBackgroundLines: {

            }
          }
        }
        bezier
        style={{
          marginVertical: 8,
          paddingVertical: 8,
          borderRadius: 2
        }}
      />
    );
  }
}
