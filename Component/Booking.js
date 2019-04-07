import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity, Platform } from "react-native";
import { Input, Icon } from "react-native-elements";
import DatePicker from 'react-native-date-picker';
import Modal from "react-native-modal";
import RoundButton from "./roundButton";
import { bookingStyle, flexStyle } from "../Style/style";

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
    let minDate = new Date(); minDate.setMinutes(minDate.getMinutes() + 30);
    const price = (this.state.price * this.state.count);
    let interval;
    if ( Platform.OS === 'android' ) {
            require('intl');
            require('intl/locale-data/jsonp/en');
    }
    return (
  <View style={ bookingStyle.container }>
      <View style={ bookingStyle.wrapper }>
           <View style={ bookingStyle.name }>
                 <Image
                      source={ require("../Media/listView/1.jpg") }
                      style={ bookingStyle.image }
                 />
                 <View style={{display: "flex", justifyContent: "center", alignItems: "center", width: "70%"}}>
                        <Text
                                style={{
                                          fontSize: 20,
                                          fontWeight: "bold",
                                          textAlign: "left",
                                          color: "#227100",
                                          width: "80%"
                                     }}>
                                Name of food
                        </Text>
                 </View>
           </View>
           <View style={ bookingStyle.count }>
                <Text style={ bookingStyle.text } >Amount</Text>
                <View style={ bookingStyle.adjustCount }>
                        <TouchableOpacity
                             onPressIn={ () =>  {interval = setInterval(this.decrease, 10); } }
                             onPressOut={ () => clearInterval(interval) }
                             style={bookingStyle.TouchableOpacity}
                             activeOpacity={0.5}
                             >
                                <Icon
                                    type="antdesign"
                                    name="down"
                                    color="gray"
                                    size={20}
                              />
                        </TouchableOpacity>
                        <Text style={ bookingStyle.counting }>{ this.state.count }</Text>
                        <TouchableOpacity
                            onPressIn={ () =>  {interval = setInterval(this.increase, 10); }}
                            onPressOut={ () => clearInterval(interval) }
                            style={bookingStyle.TouchableOpacity}
                            activeOpacity={0.7}>
                              <Icon
                                    type="antdesign"
                                    name="up"
                                    color="gray"
                                    size={20}
                              />
                        </TouchableOpacity>
                </View>
           </View>
           <View style={ bookingStyle.time }>
              <Text style={ bookingStyle.text }>Time to receive</Text>
              <Modal isVisible={true} >
                  <View style={ [flexStyle.wrapper, {backgroundColor: "white"}]}>
                    {/*
                    <DatePicker
                            onDateChange={ date => this.setState({ ...this.state, date: date }) }
                            date={this.state.date}
                            minimumDate={ minDate }
                            maximumDate = { new Date(minDate.getFullYear() + 1, 11, 31) }
                            minuteInterval={10}

                     />
                     */}
                  </View>
               </Modal>
           </View>
           <View style={ bookingStyle.address }>
                <Text style={ bookingStyle.text }>Address</Text>
                <Input
                      placeholder="Enter your address here..."
                      inputStyle={{ fontSize: 14, paddingVertical: 0, paddingHorizontal: 10}}
                      inputContainerStyle={{ borderWidth: 1, borderColor: "rgba(0, 0, 0, 0.2)", borderRadius: 5, width: "80%", marginLeft: "10%"}}
                      multiline
                />
           </View>
           <View style={ bookingStyle.confirm }>
                <Text style={{fontSize: 20, fontWeight: "bold", color: "#911111"}}>{ new Intl.NumberFormat('en').format(price) + " đ" }</Text>
                <RoundButton
                    text="ORDER NOW"
                    round={10}
                    textColor="white"
                    background="#227100"
                    boxStyle={{ width: "50%" }}
                    handleOnPress={ ()=>{} }
                    underlayColor="#227100"
                />
           </View>

      </View>
  </View>
    );
  }
}
