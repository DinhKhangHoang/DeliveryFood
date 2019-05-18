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
import { SkypeIndicator } from 'react-native-indicators';


export default class BookingTable extends Component
{
  static navigationOptions = {
          title: "Booking Table",
          headerTitleStyle:  accountStyle.titleStyle
  };
  constructor(props)
  {
        super(props);
        ////------------------------------------------------------------------------------------------------------------------------------------------
        this.state = {
                        numberInput:'',
                        price: 0,
                        type: "normal",
                        count: 1,
                        isCountDialogShow: false,
                        display: "none",
                        date: null,
                        adjustDate: null,
                        error: false,
                        errorMess: "",
                        user: firebase.auth().currentUser,
                        showMessage: false,
                        message: "",
                        isProcessing: false
                     };
        //------------------------------------------------------------------------------------------------------------------------------------------
        this.increase = this.increase.bind(this);
        this.decrease = this.decrease.bind(this);
        this.validateNumber = this.validateNumber.bind(this);
        this.validateTime = this.validateTime.bind(this);
        this.orderConfig = this.orderConfig.bind(this);
        this.formatTime = this.formatTime.bind(this);
  }
// ---------------------------------------------------------------------------------------------------------------------
componentDidMount()
{
    this.setState({ price:  this.props.navigation.getParam("data").price });
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

       this.setState({ error: true, errorMess: "Sorry, we don't work on your picking time."});
    }
  }
  else
  {
      this.setState( { error: true, errorMess: "Please choose the time being at least 30 minutes after now." } );
  }
}
// ---- Format time --------------------------------------------------------------------------------------------------------
formatTime(time, s = false)
{
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const timeString = (time.getHours() >= 10 ? time.getHours() : "0" + time.getHours()) + ":" + (time.getMinutes() >= 10 ? time.getMinutes() : "0" + time.getMinutes()) + (s ? "   " : " ") + (time.getDate() < 10 ? "0" + time.getDate() : time.getDate()) + "-" + monthNames[time.getMonth()] + "-" + time.getFullYear();
      return timeString;
}
// ---- Process booking table ----------------------------------------------------------------------------------------------
orderConfig()
{
      if (this.state.user)
      {
         // Test for internet connect
         NetInfo.getConnectionInfo().then( async (data)=>{
               if (data.type === "unknown" || data.type === "none")
               {
                      this.setState({showMessage: false})
                     setTimeout(()=>this.setState( {message: "Please check your internet connecttion.", showMessage: true} ), 20);
                }
               else {
                  // Processing the booking cart
                  if (this.state.date == null)
                  {
                        this.setState({showMessage: false})
                        setTimeout(()=>this.setState( {message: "Please choose the time.", showMessage: true} ), 20);
                  }
                  else
                  {
                          this.setState({isProcessing: true });
                          const user = await firebase.firestore().collection( global.UserType + "s" ).doc( firebase.auth().currentUser.uid).get();
                          if (( global.UserType == "Customer" && user.data().Address == "" ) || ( global.UserType == "Restaurant" && user.data().bookingTablePrice == 0 ))
                          {
                                  this.setState({showMessage: false, isProcessing: false})
                                  setTimeout(()=>this.setState( {message: "Please update and complete your personal information.", showMessage: true} ), 20);
                          }
                          else
                          {
                                  firebase.firestore().collection("ListOrders").add({}).then(
                                  async (ref)=>{
                                        const item = {
                                              CUS_ID: user.id,
                                              ChargeTotal: (this.state.type == "normal" ? this.state.price * this.state.count : this.state.price * this.state.count * 1.2)  * 0.2,
                                              OrderID: ref.id,
                                              PhoneNumber: user.data().PhoneNumber,
                                              Quantity: this.state.count,
                                              RES_ID: this.props.navigation.getParam("data").resID,
                                              Status: "nonchecked",
                                              TimeOrder: this.formatTime(new Date()),
                                              TimeReceive: this.formatTime( this.state.date ),
                                              Type: "Table",
                                              typeOfTable: this.state.type.toLowerCase(),
                                        };
                                         firebase.firestore().collection("ListOrders").doc(ref.id).update(item);
                                         firebase.firestore().collection("Restaurants").doc(this.props.navigation.getParam("data").resID).update({ Ordercount: this.props.navigation.getParam("data").ordercount + 1});
                                         this.props.navigation.getParam("data").message();
                                         this.props.navigation.navigate("Detail");
                                   });
                                   firebase.firestore().collection("Notification").add({}).then( (ref)=>{
                                         const item = {
                                               Content: "Đơn hàng đặt bàn của bạn tại '" + this.props.navigation.getParam("data").name +  "' đã được gửi thành công. Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi, chúc bạn ngon miệng.",
                                               ID: ref.id,
                                               RES_ID: this.props.navigation.getParam("data").resID,
                                               Time: this.formatTime(new Date()),
                                               Title: this.props.navigation.getParam("data").name + "- Table order sent successfully",
                                               UID: user.id
                                         };
                                         firebase.firestore().collection("Notification").doc(ref.id).update(item);
                                   });
                         }
                   }
         }});
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
                                      onLongPress={ ()=> this.setState({ isCountDialogShow: true, display: "none"}) }
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
                                                        onChangeText={ (text) => this.setState({ numberInput: text}) }
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
                                onPress={ () => this.setState({ isShow: true, error: false })}
                          >
                              <Text
                                    style={{ fontSize: 14,
                                             paddingVertical: 10,
                                             paddingHorizontal: 10,
                                             textAlign: "center"}}>
                                                      {(  this.state.date === null ? "" : this.formatTime(this.state.date, true)) }
                              </Text>

                          </TouchableOpacity>
                          <Modal isVisible={this.state.isShow}>
                                <View style={bookingStyle.modal}>
                                      <View style={{width:"90%", marginVertical: 20, borderBottomWidth: 1, borderBottomColor: "rgba(0, 0, 0, 0.2)"}}>
                                              <Text style={{fontSize: 20, padding: 8, fontWeight: "bold", textAlign: 'center'}}>Pick a time</Text>
                                      </View>

                                      <DatePicker
                                              onDateChange={ date => this.setState({ adjustDate: date }) }
                                              date={(this.state.adjustDate !== null ? this.state.adjustDate : new Date() )}
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
                                                handleOnPress={ ()=> this.setState({ isShow: false}) }
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
                                  <Text style={bookTableStyle.price}>{ new Intl.NumberFormat('en').format(( this.state.type == "normal" ? this.state.price * this.state.count : this.state.price * this.state.count * 1.2)  * 0.2)  + " đ"}</Text>
                            </View>
                      {( this.state.isProcessing ? <SkypeIndicator  color="#114B5F" /> :
                            <RoundButton
                                    text="Book"
                                    round={0}
                                    boxStyle={{width: "40%", borderWidth: 1, borderColor: "#1F9F5F"}}
                                    handleOnPress={this.orderConfig}
                                    underlayColor="#227100"
                                    textStyle={{color: "white"}}
                            /> )}
                    </View>
             </View>
           {message}
      </ImageBackground>
    );
  }
}
