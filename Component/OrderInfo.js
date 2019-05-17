import React, { Component } from "react";
import firebase from 'react-native-firebase';
import{accountStyle, orderStyle} from '../Style/style.js';
import{Text, View, Image, ScrollView, Button, Alert} from 'react-native';
import Loader from './loader.js';


export default class OrderInfo extends Component {
  constructor(props) {
    super(props);
    this.state ={
      CUS_ID:null,
      Quantity:null,
      Status:null,
      TimeOrder:null,
      Type:null,
      FoodID: null,
      Quantity: null,
      ChargeTotal:null,
      PhoneNumber: null,
      TimeReceive: null,
      AddressReceive: null,
      imgURL: null,
      loading: true,
      nameFood: null,
      nameCus: null
    }
    this.ref = firebase.firestore().collection('ListOrders');
    this.accept = this.accept.bind(this);
    this.discard = this.discard.bind(this);
    this.deliveried = this.deliveried.bind(this);
  }
  static navigationOptions = {
                    title: 'Order Information',
                    headerTitleStyle:  accountStyle.titleStyle
            };
  componentDidMount() {
    this.unsubscribe = this.ref.doc(this.props.navigation.getParam('orderid')).onSnapshot(this.onDocumentUpdate);
  }
  /*componentWillUnmount() {
    this.unsubscribe();
  }*/
  onDocumentUpdate = async (DocumentSnapshot)=>{
    let orderid = this.props.navigation.getParam('orderid');
    let Type = this.props.navigation.getParam('type');
    if(Type =='Food' ){
      await this.setState({
        CUS_ID:DocumentSnapshot.get('CUS_ID'),
        Quantity:DocumentSnapshot.get('Quantity'),
        Status:DocumentSnapshot.get('Status'),
        TimeOrder:DocumentSnapshot.get('TimeOrder'),
        Type:DocumentSnapshot.get('Type'),
        FoodID: DocumentSnapshot.get('FoodID'),
        Quantity:  DocumentSnapshot.get('Quantity'),
        ChargeTotal: DocumentSnapshot.get('ChargeTotal'),
        PhoneNumber:  DocumentSnapshot.get('PhoneNumber'),
        TimeReceive:  DocumentSnapshot.get('TimeReceive'),
        AddressReceive:  DocumentSnapshot.get('AddressReceive'),
                    });
      await firebase.firestore().collection('Food').doc(this.state.FoodID)
      .get()
      .then(doc=>{
        this.setState({nameFood: doc.get('Name'),})
      });
      await firebase.firestore().collection("Customers").doc(this.state.CUS_ID)
      .get()
      .then(doc=>{
        this.setState({nameCus: doc.get('NameCUS'),});
      });
      await firebase.storage().ref('FoodImage').child(`${this.state.FoodID}.jpg`)
      .getDownloadURL()
      .then(url=>{
        this.setState({imgURL: url, loading: false});
      });
    }
    else if(Type == 'Table'){
      await this.setState({
        CUS_ID:DocumentSnapshot.get('CUS_ID'),
        Quantity:DocumentSnapshot.get('Quantity'),
        Status:DocumentSnapshot.get('Status'),
        TimeOrder:DocumentSnapshot.get('TimeOrder'),
        Type:DocumentSnapshot.get('Type'),
        Quantity:  DocumentSnapshot.get('Quantity'),
        ChargeTotal: DocumentSnapshot.get('ChargeTotal'),
        PhoneNumber:  DocumentSnapshot.get('PhoneNumber'),
        TimeReceive:  DocumentSnapshot.get('TimeReceive'),
                    });
      await firebase.firestore().collection("Customers").doc(this.state.CUS_ID)
      .get()
      .then(doc=>{
        this.setState({nameCus: doc.get('NameCUS'),loading: false});
      });
      await firebase.storage().ref('FoodImage').child('ban.jpg')
      .getDownloadURL()
      .then(url=>{
        this.setState({imgURL: url, loading: false});
      });
    }
  }
  async accept(){
    this.setState({loading: true});
    await this.ref.doc(this.props.navigation.getParam('orderid'))
    .set({
      Status: 'accepted',
    },{merge: true});
    await Alert.alert('Data saved!');
    await this.props.navigation.goBack();
  }
  async discard(){
    this.setState({loading: true});
    await this.ref.doc(this.props.navigation.getParam('orderid'))
    .set({
      Status: 'discarded',
    },{merge: true});
    await Alert.alert('Data saved!');
    await this.props.navigation.goBack();
  }
  async deliveried(){
    this.setState({loading: true});
    await this.ref.doc(this.props.navigation.getParam('orderid'))
    .set({
      Status: 'deliveried',
    },{merge: true});
    await Alert.alert('Data saved!');
    await this.props.navigation.goBack();
  }
  render(){
    const {goBack} = this.props.navigation;
    let status  =  this.props.navigation.getParam('status'),
        button;
    if( status == 'nonchecked')
      button = (<View style={{marginHorizontal: 70, justifyContent: 'space-between',flexDirection: 'row',paddingTop: 20,paddingBottom: 20}}>

                 <Button
                         onPress = {this.accept}
                         title = 'Accept'/>
                 <Button
                         onPress = {this.discard}
                         title = 'Discard'/>

                </View>);
    else if( status == 'accepted'){
      if(this.state.Type=='Food')
        button = (<View style={{marginHorizontal: 70, justifyContent: 'space-between',flexDirection: 'row',paddingTop: 20,paddingBottom: 20}}>

                   <Button
                           onPress = {this.deliveried}
                           title = 'Deliveried'/>
                   <Button
                           onPress = {this.discard}
                           title = 'Discard'/>

                  </View>);
      else if(this.state.Type=='Table')
        button = (<View style={{marginHorizontal: 70,justifyContent:'center',flexDirection: 'row',paddingTop: 20,paddingBottom: 20}}>

                   <Button
                           onPress = {this.discard}
                           title = 'Discard'/>

                  </View>);
              }
    else if(status == 'discarded')
      button = null;
    else if(status == 'deliveried')
      button = null;
    if(this.state.loading)
      return(<Loader/>);
    else if(this.state.Type=="Food"){
      return(
        <ScrollView>

             <View style={ orderStyle.name }>
                   <Image
                        source={ {uri: this.state.imgURL} }
                        style={ orderStyle.image }
                   />
                   <View style={{display: "flex", justifyContent: "center", alignItems: "center", width: "67%", height: "100%"}}>
                          <Text
                                  numberOfLines={2}
                                  style={{
                                            fontSize: 20,
                                            fontWeight: "bold",
                                            textAlign: "left",
                                            color: "#227100",
                                            width: "80%",
                                            paddingRight: 10
                                       }}>
                                  { this.state.nameFood }
                          </Text>
                   </View>
             </View>
             <View style={ orderStyle.count }>
                  <Text style={ orderStyle.text } >Name:</Text>
                  <Text style={{...orderStyle.text, color: 'black'}}>{this.state.nameCus}</Text>
             </View>

             <View style={ orderStyle.count }>
                  <Text style={ orderStyle.text } >Amount:</Text>
                  <Text style={{...orderStyle.text, color: 'black'}}>{this.state.Quantity}</Text>
             </View>
             <View style={ orderStyle.count }>
                  <Text style={ orderStyle.text } >Total Charge:</Text>
                  <Text style={{...orderStyle.text, color: 'black'}}>{this.state.ChargeTotal}</Text>
             </View>
             <View style={ orderStyle.count }>
                  <Text style={ orderStyle.text } >Time Order:</Text>
                  <Text style={{...orderStyle.text, color: 'black'}}>{this.state.TimeOrder}</Text>
             </View>
             <View style={ orderStyle.count }>
                <Text style={ orderStyle.text }>Time to receive:</Text>
                <Text style ={{...orderStyle.text, color: 'black'}}>{this.state.TimeReceive}</Text>

             </View>
             <View style={ orderStyle.count }>
                  <Text style={ orderStyle.text }>Address:</Text>
                  <Text style ={{...orderStyle.text, color: 'black'}}>{this.state.AddressReceive}</Text>
             </View>
             <View style={ orderStyle.count }>
                  <Text style={ orderStyle.text } >Phone number:</Text>
                  <Text style={{...orderStyle.text, color: 'black'}}>{this.state.PhoneNumber}</Text>
             </View>
             {button}
      </ScrollView>
      );
    }
    else if(this.state.Type =="Table"){
      return(
        <ScrollView>

             <View style={ orderStyle.name }>
                   <Image
                        source={ {uri: this.state.imgURL} }
                        style={ orderStyle.image }
                   />
                   <View style={{display: "flex", justifyContent: "center", alignItems: "center", width: "67%", height: "100%"}}>

                          <Text
                                  numberOfLines={2}
                                  style={{
                                            fontSize: 20,
                                            fontWeight: "bold",
                                            textAlign: "left",
                                            color: "#227100",
                                            width: "80%",
                                            paddingRight: 10
                                       }}>
                                 Đặt bàn
                          </Text>
                   </View>
             </View>
             <View style={ orderStyle.count }>
                  <Text style={ orderStyle.text } >Name:</Text>
                  <Text style={{...orderStyle.text, color: 'black'}}>{this.state.nameCus}</Text>
             </View>

             <View style={ orderStyle.count }>
                  <Text style={ orderStyle.text } >Amount:</Text>
                  <Text style={{...orderStyle.text, color: 'black'}}>{this.state.Quantity}</Text>
             </View>
             <View style={ orderStyle.count }>
                  <Text style={ orderStyle.text } >Total Charge:</Text>
                  <Text style={{...orderStyle.text, color: 'black'}}>{this.state.ChargeTotal}</Text>
             </View>
             <View style={ orderStyle.count }>
                  <Text style={ orderStyle.text } >Time Order:</Text>
                  <Text style={{...orderStyle.text, color: 'black'}}>{this.state.TimeOrder}</Text>
             </View>
             <View style={ orderStyle.count }>
                <Text style={ orderStyle.text }>Time to receive:</Text>
                <Text style ={{...orderStyle.text, color: 'black'}}>{this.state.TimeReceive}</Text>

             </View>

             <View style={ orderStyle.count }>
                  <Text style={ orderStyle.text } >Phone number:</Text>
                  <Text style={{...orderStyle.text, color: 'black'}}>{this.state.PhoneNumber}</Text>
             </View>
             {button}
      </ScrollView>
      );
    }
  }
}
