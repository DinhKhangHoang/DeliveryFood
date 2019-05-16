import React, { Component } from "react";
import { Text, View, SectionList, Image, Platform, ActivityIndicator } from "react-native";
import { Icon } from "react-native-elements";
import { CartCustomerStyle, accountStyle } from "../Style/style";
import firebase from 'react-native-firebase';
import Login from "./login";
import Message from "./Message";
import NetInfo from "@react-native-community/netinfo";


class ShoppingCartItem extends Component
{
  constructor(props)
  {
        super(props);
        this.state = { imageURL: ' ', status: 'received', title: '', nameRES: '',  address: '', quantity: 0, price: 0, isLoading: true, foodID: '' };
  }
   componentDidMount()
   {
        firebase.firestore().collection("ListOrders").doc(this.props.cartID).get().then(
            (doc)=>{
                const foodID = doc.data().FoodID, resID = doc.data().RES_ID, status = doc.data().Status;
                this.setState({
                        quantity: doc.data().Quantity,
                        price: doc.data().ChargeTotal,
                        foodID: foodID
                });
                if (foodID)
                {
                        // -------------------- Set image URL --------------------------------------------------------------------------
                        if (this.props.imageURL == ' ')
                                firebase.storage().ref().child("/FoodImage/" + foodID + ".jpg").getDownloadURL().then(url=>{
                                      this.setState({ imageURL: url });
                                });
                        else this.setState({ imageURL: this.props.imageURL });
                        // ------------------- Get food name ---------------------------------------------------------------------------
                        firebase.firestore().collection("Food").doc(foodID).get().then(data=>{
                                this.setState({ title: data.data().Name });
                        });
                        // -------------------- Get restaurant name ---------------------------------------------------------------------
                        firebase.firestore().collection("Restaurants").doc(resID).get().then(data=>{
                                this.setState({ nameRES: data.data().NameRES });
                        });
                        // ------------------- Set status of order ----------------------------------------------------------------------
                        if (status == "deliveried") this.setState({ status: "received"});
                        else if (status == "discarded") this.setState({ status: "discarded"});
                        else this.setState({ status: "delivery"});
                  }
                  else
                  {
                        // Table --> Must change architechures !!! ----------------------------------------
                        firebase.firestore().collection("Restaurants").doc(resID).get().then(data=>{
                                this.setState({ nameRES: data.data().NameRES, address: data.data().Address });
                        });
                        if (status == "nonchecked") this.setState({ status: "In use"});
                        else this.setState({ status: "Out of order"});
                  }
                  this.setState({ isLoading: false });
            }
        );
   }


  render()
  {
    // ---- Price format ------------------------------------------------------------------------------------------------
    if ( Platform.OS === 'android' ) {
            require('intl');
            require('intl/locale-data/jsonp/en');
    }
    // -------------------------------------------------------------------------------------------------------------------
    const { time } = this.props;  // ****
    let icon, headerStyle;
    if (this.state.status == "received" || this.state.status == "Out of order")
     {
        icon = <Icon
                  name="checkcircleo"
                  type="antdesign"
                  color="white"
              />;
        headerStyle = CartCustomerStyle.headerY;
      }
      else if (this.state.status == "delivery" || this.state.status == "In use")
      {
          icon = <Icon
                      type="material-community"
                      name="rocket"
                      color="white"
                  />;
          headerStyle = CartCustomerStyle.headerD;
      }
      else
      {
         icon = <Icon
                       type="entypo"
                       name="circle-with-cross"
                       color="white"
                />;
          headerStyle = CartCustomerStyle.headerN;
      }
      if (this.state.isLoading)
         return (
              <View style={{ height: 180, display: "flex", justifyContent: "center", alignItems: "center"}}>
                  <View style={{width: "100%"}}>
                      <ActivityIndicator size="small" color="black" />
                  </View>
              </View>
         );
      else if (this.state.foodID)
            return (
              <View style={ CartCustomerStyle.wrapperItem }>
                      <View style={ headerStyle }>
                              <View style={ CartCustomerStyle.icon }>
                                      { icon }
                              </View>
                              <Text style={ CartCustomerStyle.titleHeader }>{ this.state.status.charAt(0).toUpperCase() + this.state.status.slice(1) }</Text>
                              <Text style= { CartCustomerStyle.time }>{ time }</Text>
                      </View>
                      <View style={ CartCustomerStyle.info }>
                            <Image
                                    source={{ uri: this.state.imageURL }}
                                    style={ CartCustomerStyle.image }
                                    resizeMode="cover"
                            />
                            <View style={ CartCustomerStyle.textWrapper }>
                                  <View style={{width: "100%", borderBottomWidth: 1, borderBottomColor: "rgba(0, 0, 0, 0.2)", paddingBottom: 5, marginBottom: 5}}>
                                          <Text numberOfLines={1} style={ CartCustomerStyle.title }>{ this.state.title }</Text>
                                          <Text style={ CartCustomerStyle.nameRes }>{ this.state.nameRES }</Text>
                                  </View>
                                  <View style={{width: "100%"}}>
                                          <Text>Quantity: {this.state.quantity}</Text>
                                          <Text style={ CartCustomerStyle.price }>Total: { new Intl.NumberFormat('en').format(this.state.price)  + " đ" }</Text>
                                  </View>
                            </View>
                      </View>
              </View>
            );
      else {
        return (
            <View style={ CartCustomerStyle.wrapperItem }>
                  <View style={ headerStyle }>
                          <View style={ CartCustomerStyle.icon }>
                                  { icon }
                          </View>
                          <Text style={ CartCustomerStyle.titleHeader }>{ this.state.status.charAt(0).toUpperCase() + this.state.status.slice(1) }</Text>
                          <Text style= { CartCustomerStyle.time }>{ time }</Text>
                  </View>
                  <View style={{ display: "flex",  width: "100%", padding: 10 }}>
                          <View style={{width: "98%", borderBottomWidth: 1, borderBottomColor: "rgba(0, 0, 0, 0.2)", paddingBottom: 5, marginBottom: 5}}>
                                  <Text  style={ CartCustomerStyle.title }>{ this.state.nameRES }</Text>
                                  <Text style={ CartCustomerStyle.nameRes }>{ this.state.address }</Text>
                          </View>
                          <View style={{width: "100%"}}>
                                  <Text>Quantity: {this.state.quantity}</Text>
                                  <Text style={ CartCustomerStyle.price }>Total: { new Intl.NumberFormat('en').format(this.state.price)  + " đ" }</Text>
                          </View>
                  </View>
            </View>);
       }
    }
}


export default class CartCustomer extends Component
{
  static navigationOptions = {
                    title: "Shopping Cart",
                    headerTitleStyle:  { ...accountStyle.titleStyle, color: "white" },
                    headerStyle:{
                          backgroundColor: "#FF5607",
                    },
  };

  constructor(props)
  {
    super(props);
    //---------------------------------------------------------------------------------------------------------
    this.state = {
      data: [ {title: "Food", data: []}, {title: "Table", data: []} ],
      isEmpty: true,
      isConnected: true,
      isLoading: true
    };
    //---------------------------------------------------------------------------------------------------------
    this.getData = this.getData.bind(this);
  }
  async getData()
  {
            await firebase.firestore().collection("ListOrders").where("CUS_ID", "==",  firebase.auth().currentUser.uid).get().then(data=>{
                    data.forEach(doc => {
                            const item = {
                                    key: ' ',
                                    cartID: doc.data().OrderID,
                                    time: doc.data().TimeReceive,
                                };
                          let temp = this.state.data;
                          temp[temp.findIndex(i=>i.title == doc.data().Type)].data.push(item);
                          temp[temp.findIndex(i=>i.title == doc.data().Type)].data.sort((a, b)=>{
                                if (new Date(a.time) > new Date(b.time)) return -1;
                                else if (new Date(a.time) == new Date(b.time)) return 0;
                                else return 1;
                          });
                          this.setState({ data: temp, isEmpty: false, isLoading: false });
                    });
            });

            this.setState({ isLoading: false });
  }


  async componentDidMount()
  {
          NetInfo.addEventListener('connectionChange', (data)=>{
                if (data.type === "unknown" || data.type === "none")
                        this.setState({ isConnected: false });
                else {
                        if (this.state.isEmpty && !this.state.isLoading)
                                this.getData();
                        this.setState({isConnected: true});
                }
          });
          const isConnected = await NetInfo.isConnected.fetch();
          if (isConnected)
                this.getData();
          else
                this.setState({isEmpty: true});
          //this.setState({ isLoading: false });
  }


  render()
  {
    let message = null;
    if (!this.state.isConnected)
         message = <Message text="Something went wrong with internet connection." />

    if (firebase.auth().currentUser)
    {
        if (this.state.isLoading)
            return (
            <View style={{ display: "flex",justifyContent: 'center', alignItems: 'center', flex: 1}}>
                  <View style={{ height: "20%", backgroundColor: "white"}}>
                            <ActivityIndicator size="large" color='black' />
                            <Text style={{ width: "100%", fontWeight: "bold", fontSize: 18, textAlign: "center", color: "black", marginTop: 20}}>LOADING</Text>
                  </View>
                  { message }
             </View>);
        else {
                  if (this.state.isEmpty)
                      return (
                           <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                                  <Image
                                        source={require("../Media/icon/emptyList.jpg")}
                                        style={{width: 150, height: 150, marginBottom: 20}}
                                  />
                                  <Text style={{fontSize: 16, paddingBottom: 5}}>You have no shopping cart.</Text>
                                  <Text style={{fontSize: 18, fontWeight: "bold"}}>Feel free to go shopping around.</Text>
                                  { message }
                           </View>
                    );
                   else
                           return(
                            <View style={ CartCustomerStyle.container }>
                            <SectionList
                                showsVerticalScrollIndicator={false}
                                sections={ this.state.data }
                                keyExtractor={(item, index) => item + index}
                                renderSectionHeader={({section: {title}}) => ( <Text style={ CartCustomerStyle.titleCart }>{  title + " Orders" }</Text> )}
                                renderItem={( {item, index, section} ) =>  <ShoppingCartItem
                                                                                  imageURL={item.key}
                                                                                  cartID={ item.cartID }
                                                                                  time={ item.time }
                                                                                  />}
                                />
                                    { message }
                            </View>);
            }
    }
    else
        return (<Login navigation={this.props.navigation} />)
  }
}
