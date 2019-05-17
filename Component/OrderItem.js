import React, { Component } from "react";
import { Text, View , FlatList, ActivityIndicator, TouchableOpacity, Alert} from "react-native";
import {Icon} from "react-native-elements";
import {orderItem, flexStyle, listViewMenuItemStyle } from "../Style/style";
import firebase from 'react-native-firebase';
import NavigationService from './NavigationService.js';


export default class OrderItem extends Component
{
  constructor(props){
    super(props);
    this.state={
      CUS_ID:null,
      Quantity:null,
      Status:null,
      TimeOrder:null,
      Type:null,
      FoodID: null,
      content: null,
      nameCus: null,
      nameFood: null,
      loading: true
    }
    this.ref = firebase.firestore().collection('ListOrders');
    this.unsubscribe = null;
    this._onLongPress = this._onLongPress.bind(this);
  }
  componentDidMount() {
    this.unsubscribe = this.ref.doc(this.props.orderid).onSnapshot(this.onDocumentUpdate);
  }
  /*componentWillUnmount() {
    this.unsubscribe = null;
  }*/
  onDocumentUpdate = async (DocumentSnapshot)=>{

    await this.setState({
      CUS_ID:DocumentSnapshot.get('CUS_ID'),
      Quantity:DocumentSnapshot.get('Quantity'),
      Status:DocumentSnapshot.get('Status'),
      TimeOrder:DocumentSnapshot.get('TimeOrder'),
      Type:DocumentSnapshot.get('Type'),
      FoodID: DocumentSnapshot.get('FoodID'),
                  });
    await firebase.firestore().collection("Customers").doc(this.state.CUS_ID)
    .get()
    .then(doc=>{
      this.setState({nameCus: doc.get('NameCUS'),});
    });
    await firebase.firestore().collection('Food').doc(this.state.FoodID)
    .get()
    .then(doc=>{
      this.setState({nameFood: doc.get('Name'),})
    });

    if(this.state.Type == "Table")
      this.setState({
        content: this.state.nameCus+' đã đặt '+this.state.Quantity+' bàn.',
        loading: false,
      });
    else
      this.setState({
        content: this.state.nameCus+ " đã đặt "+this.state.Quantity+" món "+this.state.nameFood+'.',
        loading: false,
      })
  }
  _onLongPress(){
    Alert.alert("View Information ?",'Select one',
    [
      {text: 'OK', onPress:()=>{NavigationService.navigate('OrderInfo',{orderid: this.props.orderid, status: this.state.Status, type: this.state.Type})}},
      {text: 'Cancel', onPress:()=>{}},
    ]);
  }
  render()
  {
            let body;
            if(this.state.Type == 'Table')
             body = <Icon type="material-community"
                          name="android-messages"
                          color = 'brown'
                          size = {30}
                          style ={{width: "20%"}}/>;
            else {
              body = <Icon
                    type="material-community"
                    name="android-messages"
                    color="#0078D7"
                    size={30}
                    style={{width:"20%"}}/>;
            }
            const {  orderid } = this.props;
                  // --- title = title + nameOfRestaurant -----------------------------------------------
            if(this.state.loading)
              return (
                <View style = {listViewMenuItemStyle.loader}>
                  <ActivityIndicator size = 'small' color = 'gray'/>
                </View>
              );
            else
            return (
              <View style={ orderItem.itemContainer }>
                  <TouchableOpacity style={ orderItem.titleItemWrapper }
                                    onLongPress ={this._onLongPress}>
                        {body}
                        <View style={{width: "75%", marginLeft: "5%"}}>
                                <Text style={ orderItem.titleText }>{ this.state.Type }</Text>
                                <Text style={ orderItem.timeText }>{ this.state.TimeOrder }</Text>
                        </View>
                  </TouchableOpacity>
                  <View style={ orderItem.contentItem }>
                        <Text>{this.state.content}</Text>
                  </View>
              </View>
          );
    }
}
