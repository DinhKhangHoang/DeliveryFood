import React, { Component } from "react";
import { Text, View } from "react-native";
import { Icon } from "react-native-elements";
//import MapView from 'react-native-maps';
import { resInforStyle, accountStyle } from "../Style/style";
import RoundButton from "./roundButton";
import firebase from 'react-native-firebase';

class TextWithIcon extends Component
{
  render()
  {
    const { icon, text } = this.props;
    return(
          <View style={ resInforStyle.wrapperText }>
                <Icon
                      name={ icon.name } type={ icon.type } color={ icon.color }
                      size={ (icon.size ? icon.size : 35) }
                      style={ resInforStyle.icon }
                />
                <Text style={ resInforStyle.text }>{ text }</Text>
          </View>
    );
  }
}


export default class RestaurantInfor extends Component
{
  static navigationOptions = {
          title: "Restaurant Information",
          headerTitleStyle:  accountStyle.titleStyle
  };
  constructor(props)
  {
    super(props);
    this.state = { data: [] };
    this.getResData = this.getResData.bind(this);
  }


  async getResData()
  {
        const dataNav = this.props.navigation.getParam("data");
        const infoRes = await firebase.firestore().collection("Restaurants").doc( dataNav.resID ).get();
        await this.setState({
              data: {
                   name: infoRes.data().NameRES,
                   address: infoRes.data().Address,
                   phone: infoRes.data().PhoneNumber,
                   timeWork: infoRes.data().TimeWork,
                   resID: dataNav.resID,
                   price: infoRes.data().bookingTablePrice,
                   ordercount: infoRes.data().Ordercount
              }
        });
  }


  componentDidMount()
  {
       this.getResData();
  }


  render()
  {
    return (
      <View style={ resInforStyle.wrapper }>
        <View style={ resInforStyle.map }>
        {/*
        <MapView
              initialRegion={{
                          latitude: 37.78825,
                          longitude: -122.4324,
                          latitudeDelta: 0.0922,
                          longitudeDelta: 0.0421,
                      }}
            />
            */}
        </View>
        <View style={ resInforStyle.infor }>
            <TextWithIcon
                  icon={{type: "material-community", name: "home-circle", color:"#0B69A3"}}
                  text={ this.state.data.name }
            />
            <TextWithIcon
                  icon={{type: "font-awesome", name: "address-book", color:"#CF1124", size: 30}}
                  text={ this.state.data.address }
            />
            <TextWithIcon
                  icon={{type: "font-awesome", name: "phone", color:"#1F9F5F", size: 30}}
                  text={ this.state.data.phone }
            />
            <TextWithIcon
                  icon={{type: "material", name: "access-time", color:"#6733BA", size: 30}}
                  text={ this.state.data.timeWork }
            />
            <View style={ resInforStyle.buttonWrapper }>
                      <RoundButton
                            text="BOOK TABLE"
                            round={0}
                            boxStyle={ resInforStyle.button }
                            textColor="white"
                            handleOnPress={ ()=> { this.props.navigation.push("bookTable", { data: { ...this.state.data, message: this.props.navigation.getParam("data").message} })} }
                            underlayColor="#227100"
                      />
                      <RoundButton
                            text="SEE MENU"
                            textColor="#1F9F5F"
                            round={0}
                            boxStyle={ resInforStyle.button }
                            background="white"
                            handleOnPress={ ()=> {} }
                            underlayColor="#F2FDE0"
                      />
            </View>
          </View>
      </View>
    );
  }
}
