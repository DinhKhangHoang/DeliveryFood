import React, { Component } from "react";
import { Text, View, Image } from "react-native";
import { Input, Icon } from "react-native-elements";
//import DateTimePicker from 'react-datetime-picker';
import RoundButton from "./roundButton";
import { bookingStyle } from "../Style/style";

export default class Booking extends Component
{
  constructor(props)
  {
        super(props);
        this.state = { count: 1, price: 55000, date: new Date() }
        this.increase = this.increase.bind(this);
        this.decrease = this.decrease.bind(this);
  }

  increase() { this.setState({...this.state, count: this.state.count + 1}); }
  decrease()
  {
    if (this.state.count > 1)
    {
      this.setState({...this.state, count: this.state.count - 1});
    }
  }

  render()
  {
    return (
      <View style={ bookingStyle.wrapper }>
           <View style={ bookingStyle.name }>
                 <Image
                      source={ require("../Media/listView/1.jpg") }
                      style={ bookingStyle.image }
                 />
                 <View style={{display: "flex", justifyContent: "center", alignItems: "center", width: "70%"}}>
                        <Text
                                style={{
                                          fontSize: 16,
                                          fontWeight: "bold",
                                          textAlign: "left",
                                          padding: 5,
                                          paddingLeft: 10
                                     }}>
                                Name of food
                        </Text>
                 </View>
           </View>
           <View style={ bookingStyle.count }>
                <Text>Count</Text>
                <View style={ bookingStyle.adjustCount }>
                        <Icon
                              type="antdesign"
                              name="down"
                              color="gray"
                              onPress={this.decrease}
                        />
                        <Text style={ bookingStyle.text }>{ this.state.count }</Text>
                        <Icon
                              type="antdesign"
                              name="down"
                              color="gray"
                              onPress={this.increase}
                        />
                </View>
           </View>
           <View>
              <Text>Time to receive</Text>
              {/*
              <DateTimePicker
                    onChange={ date => this.setState({ ...this.state, date: date }) }
                    value={this.state.date}
              />
              */}
           </View>
           <View style={ bookingStyle.address }>
                <Text>Address</Text>
                <Input
                      placeholder="Enter your address here..."
                      inputStyle={{  }}
                      inputContainerStyle={{ }}
                />
           </View>
           <View style={ bookingStyle.confirm }>
                <Text>{ this.state.price * this.state.count }</Text>
                <RoundButton
                    text="ORDER NOW"
                    round={10}
                    textColor="white"
                    background="#227100"
                    boxStyle={{ width: "40%" }}
                    handleOnPress={ ()=>{} }
                />
           </View>

      </View>
    );
  }
}
