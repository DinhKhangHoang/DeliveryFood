import React, { Component } from "react";
import { Text, View, TouchableOpacity, Picker, Platform, ImageBackground } from "react-native";
import { Input, Icon } from "react-native-elements";
import DatePicker from 'react-native-date-picker';
import Modal from "react-native-modal";
import RoundButton from "./roundButton";
import { bookTableStyle, flexStyle, bookingStyle, accountStyle } from "../Style/style";
import NetInfo from "@react-native-community/netinfo";
import Message from "./Message";
import firebase from 'react-native-firebase';



export default class BookingTable extends Component
{
  static navigationOptions = {
          title: "Booking Table",
          headerTitleStyle:  accountStyle.titleStyle
  };
  constructor(props)
  {
        super(props);
        //------------------------------------------------------------------------------------------------------------------------------------------
        let date = new Date();
        date.setMinutes(date.getMinutes() + 30);
        ////------------------------------------------------------------------------------------------------------------------------------------------
        this.state = {
                        numberInput:'',
                        price: 10000,
                        type: "normal",
                        count: 1,
                        isCountDialogShow: false,
                        display: "none",
                        date: date,
                        error: false,
                        errorMess: "",
                        user: firebase.auth().currentUser,
                        showMessage: false,
                        message: ""
                     };
        //------------------------------------------------------------------------------------------------------------------------------------------
        this.increase = this.increase.bind(this);
        this.decrease = this.decrease.bind(this);
        this.validateNumber = this.validateNumber.bind(this);
        this.validateTime = this.validateTime.bind(this);
        this.orderConfig = this.orderConfig.bind(this);
  }
//-----increase the number by 1-----------------------------------------------------------------------------------------
  increase() { this.setState({ count: this.state.count + 1}); }
//-----decrease the number by 1 if the number is larger than 1----------------------------------------------------------
  decrease()
  {
    if (this.state.count > 1)
    {
      this.setState({ count: this.state.count - 1});
    }
  }
 //------Test if the number is correct format------------------------------------------------------------------------
  validateNumber()
  {
          if (isNaN(this.state.numberInput) | !Number.isInteger(Number(this.state.numberInput)) )
          {
            this.setState({display: "flex"});
          }
          else {
            let count =  Number(this.state.numberInput);
            if (count <= 0) { count = 1; }

           this.setState({count: count, isCountDialogShow: false});
          }
  }
//-----------------------------------------------------------------------------------------------------------------------
validateTime()
{
  if ((this.state.adjustDate - new Date()) / (1000 * 60) >= 30)
  {
    if ( this.state.adjustDate.getHours() < 20 && this.state.adjustDate.getHours() >= 7)
    {
        this.setState({ date: this.state.adjustDate, isShow: false});
    }
    else {

       this.setState({ error1: true, errorMess: "Sorry, we don't work on your picking time."});
    }
  }
  else
  {
      this.setState( { error: true, errorMess: "Please choose the time being at least 30 minutes after now." } );
  }
}
// ---- Process booking table ----------------------------------------------------------------------------------------------
orderConfig()
{
      if (this.state.user)
      {
         // Test for internet connect
         NetInfo.getConnectionInfo().then( (data)=>{
               if (data.type === "unknown" || data.type === "none")
               {
                      this.setState({showMessage: false})
                     setTimeout(()=>this.setState( {message: "Please check your internet connecttion.", showMessage: true} ), 20);
                }
               else {
                  // Processing the booking cart
               }
         } );
      }
      else
      {
        this.props.navigation.navigate("LogIn");
      }
}
//-//-----------------------------------------------------------------------------------------------------------------------
  render()
  {
    //-------Message -------------------------------------------------------------------------------------------------------
    const message = (this.state.showMessage ? <Message text={this.state.message} /> : null);
    // -----Number and date format ------------------------------------------------------------------------------------------
    if ( Platform.OS === 'android' ) {
            require('intl');
            require('intl/locale-data/jsonp/en');
    }
    return(
    <ImageBackground source={ require("../Media/wallpaper/homeNotLogIn.jpg") } style={ [flexStyle.wrapper, bookTableStyle.container] } imageStyle={{opacity: 0.6 }} >
            <View style={ bookTableStyle.wrapper }>
                  <View style={ bookTableStyle.titleWrapper }>
                          <Text style={ bookTableStyle.title} >Booking Table</Text>
                  </View>
                  <View style={{width: "90%", marginVertical: 5}}>
                          <Text style={bookTableStyle.text}>Number of table</Text>
                          <View style={ bookingStyle.adjustCount }>
                                  <TouchableOpacity
                                       onPress={ this.decrease }
                                       style={bookingStyle.TouchableOpacity}
                                       activeOpacity={0.7}
                                       >
                                          <Icon
                                              type="antdesign"
                                              name="down"
                                              color="gray"
                                              size={20}
                                        />
                                  </TouchableOpacity>
                                  <TouchableOpacity
                                      style={{width: "40%"}}
                                      onLongPress={ ()=> this.setState({...this.state, isCountDialogShow: true, display: "none"}) }
                                      activeOpacity={0.5}>
                                              <Text style={ bookingStyle.counting }>{this.state.count}</Text>
                                  </TouchableOpacity>
                                  <TouchableOpacity
                                      onPress={  this.increase }
                                      style={bookingStyle.TouchableOpacity}
                                      activeOpacity={0.7}>
                                        <Icon
                                              type="antdesign"
                                              name="up"
                                              color="gray"
                                              size={20}
                                        />
                                  </TouchableOpacity>
                                  <Modal isVisible={ this.state.isCountDialogShow } >
                                        <View style={bookingStyle.modalCounting}>
                                                <Text style={{fontSize: 20, fontWeight: "bold", textAlign: 'center', padding: 10, borderBottomWidth: 1, borderColor: "rgba(0, 0, 0, 0.2)", width: "90%"}}>Enter the number</Text>
                                                <Input
                                                        placeholder="Enter here..."
                                                        inputContainerStyle={{borderWidth: 1, borderColor: "rgba(0,0,0,0.2)", borderRadius: 5, marginVertical: 20, width: "40%", marginLeft: "30%"}}
                                                        onChangeText={ (text) => this.setState({...this.state, numberInput: text}) }
                                                        inputStyle={{fontSize: 14, paddingVertical: 0}}
                                                        autoFocus={true}
                                                 />
                                                 <Text style={{padding: 5, marginLeft: 10, marginBottom: 10, color: "red", display: this.state.display}}>You must enter a positive integer number.</Text>
                                                 <RoundButton
                                                        text="Confirm"
                                                        round={0}
                                                        textColor="white"
                                                        boxStyle={{height: 50, width: "100%"}}
                                                        handleOnPress={ this.validateNumber }
                                                        underlayColor="#227100"
                                                />
                                          </View>
                                  </Modal>
                            </View>
                    </View>
                    <View style={{width: "90%"}}>
                          <Text  style={bookTableStyle.text}>Type of table</Text>
                      <View style={{width: "60%", marginLeft: "20%", borderWidth: 1, borderColor: "rgba(0, 0, 0, 0.2)", padding: 8, paddingRight: 0, borderRadius: 5}}>
                          <Picker
                                style={bookTableStyle.picker}
                                selectedValue={(this.state && this.state.type)}
                                onValueChange={(itemValue) => this.setState({type: itemValue})} >
                                      <Picker.Item label="Normal" value="normal" />
                                      <Picker.Item label="VIP" value="vip" />
                          </Picker>
                      </View>
                    </View>
                    <View style={{width: "90%"}}>
                          <Text  style={bookTableStyle.text}>Time</Text>
                          <TouchableOpacity
                                style={{borderWidth: 1, borderColor: "rgba(0, 0, 0, 0.2)", borderRadius: 5, width: "60%", marginLeft: "20%"}}
                                activeOpacity={0.5}
                                onPress={ () => this.setState({...this.state, isShow: true, error: false, error1: false})}
                          >
                              <Text
                                    style={{ fontSize: 14,
                                             paddingVertical: 10,
                                             paddingHorizontal: 10,
                                             textAlign: "center"}}>
                                                    { new Intl.DateTimeFormat('en-US').format(this.state.date)
                                                    + "    " + this.state.date.getHours() + ':' +
                                                    (this.state.date.getMinutes().toString().length === 2 ? this.state.date.getMinutes() : "0" + this.state.date.getMinutes()) }
                              </Text>

                          </TouchableOpacity>
                          <Modal isVisible={this.state.isShow}>
                                <View style={bookingStyle.modal}>
                                      <View style={{width:"90%", marginVertical: 20, borderBottomWidth: 1, borderBottomColor: "rgba(0, 0, 0, 0.2)"}}>
                                              <Text style={{fontSize: 20, padding: 8, fontWeight: "bold", textAlign: 'center'}}>Pick a time</Text>
                                      </View>

                                      <DatePicker
                                              onDateChange={ date => this.setState({ ...this.state, adjustDate: date }) }
                                              date={this.state.adjustDate}
                                              minuteInterval={10}
                                              style={{width: "90%"}}

                                      />
                                      <View style={{width:"90%", marginBottom: 10, display: (this.state.error ? "flex" : "none")}}>
                                            <Text style={{padding: 5, color: "red"}}>{ this.state.errorMess }</Text>
                                      </View>
                                      <View style={{...flexStyle.wrapper, flexDirection: "row", marginTop: 0}}>
                                          <RoundButton
                                                text="Confirm"
                                                handleOnPress={ this.validateTime }
                                                round={0}
                                                boxStyle={{width: "50%", height: 60}}
                                                background="#227100"
                                                textColor="white"
                                                underlayColor="#227105"

                                          />
                                          <RoundButton
                                                text="Cancel"
                                                textStyle={{color: "gray"}}
                                                handleOnPress={ ()=> this.setState({...this.state, isShow: false}) }
                                                round={0}
                                                boxStyle={{width: "50%", height: 60, borderWidth: 1, borderColor: "rgba(0, 0, 0, 0.2)"}}
                                                background="white"
                                                underlayColor="rgba(0, 0, 0, 0.2)"
                                          />
                                      </View>
                                </View>
                          </Modal>
                    </View>
                    <View>
                          <Text style={{marginTop: 10, padding: 5}}>Note: You must paid 20% first</Text>
                    </View>
                    <View style={[ flexStyle.wrapper, {flexDirection: "row", marginTop: 20,   borderTopWidth: 1, borderColor: "rgba(0, 0, 0, 0.2)"} ]}>
                            <View style={{width: "60%"}}>
                                  <Text style={bookTableStyle.price}>{ new Intl.NumberFormat('en').format(this.state.price * this.state.count * 0.2)  + " đ"}</Text>
                            </View>
                            <RoundButton
                                    text="Book"
                                    round={0}
                                    boxStyle={{width: "40%", borderWidth: 1, borderColor: "#1F9F5F"}}
                                    handleOnPress={this.orderConfig}
                                    underlayColor="#227100"
                                    textStyle={{color: "white"}}
                            />

                    </View>
             </View>
           {message}
      </ImageBackground>
    );
  }
}
