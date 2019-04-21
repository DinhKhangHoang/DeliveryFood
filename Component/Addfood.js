import React, { Component } from "react";
import { Text, View, Image, FlatList, Modal, TextInput, TouchableHighlight, Alert, TouchableOpacity, Picker, ScrollView } from "react-native";
import { Icon } from "react-native-elements";
import ListViewMenu from "./ListViewMenu";
import { FoodManagement, accountStyle, modalAddFoodStyle, listViewMenuItemStyle} from "../Style/style";
import firebase from 'react-native-firebase';
export default class Addfood extends Component
{
  static navigationOptions = {
                    title: 'Add Food',
                    headerTitleStyle:  accountStyle.titleStyle
            };
  constructor(props){
    super(props);
    this.state = {
                  inputtitle: "",
                 inputprice: "",
                 inputdescription: "",
                 typefood: 'maincourse',
                  statefood: true,};
    this._onPressApply = this._onPressApply.bind(this);
    this.ref = firebase.firestore().collection('Food');
  }
  _onPressApply(){

    Alert.alert("Data saved!");
    this.props.navigation.goBack();
  }
  render(){
    const {goBack} = this.props.navigation;
    return(
      <ScrollView>
            <View style = {modalAddFoodStyle.image}>
               <Icon type ='font-awesome' name = "upload" size ={100}/>
            </View>
            <View style = {modalAddFoodStyle.wrappername}>
              <Text style={ modalAddFoodStyle.textname }>Name :</Text>
              <TextInput style = {modalAddFoodStyle.inputname}
                          onChangeText = {(text) => {this.setState({inputtitle : text})}}
                          value = {this.state.inputtitle}
                          underlineColorAndroid = {"light-gray"}
              />
            </View>
            <View style = {modalAddFoodStyle.wrappername}>
              <Text style={ modalAddFoodStyle.textname }>Price :</Text>
              <TextInput style = {modalAddFoodStyle.inputname}
                          onChangeText = {(text) => {this.setState({inputprice : text});}}
                          value = {this.state.inputprice}
                          underlineColorAndroid = {"light-gray"}
              />
            </View>
            <View style = {modalAddFoodStyle.wrappername}>
              <Text style={ modalAddFoodStyle.textname }>Description :</Text>
              <TextInput style = {modalAddFoodStyle.inputname}
                          onChangeText = {(text) => {this.setState({inputdescription : text})}}
                          value = {this.state.inputdescription}
                          underlineColorAndroid = {"light-gray"}
              />
            </View>
            <View style = {modalAddFoodStyle.wrappername}>
              <Text style={ modalAddFoodStyle.textname }>Type :</Text>
              <Picker
                 style = {modalAddFoodStyle.pickerType}
                 onValueChange = {(type)=>{this.setState({typefood: type});}}
                 selectedValue = {this.state.typefood}>
                 <Picker.Item label = "Main course" value = "maincourse"/>
                 <Picker.Item label = "Dessert" value = "dessert"/>
               </Picker>
            </View>
            <View style = {modalAddFoodStyle.wrappername}>
              <Text style={ modalAddFoodStyle.textname }>State :</Text>
              <Picker
                 style = {modalAddFoodStyle.pickerType}
                 onValueChange = {(type)=>{this.setState({statefood: type});}}
                 selectedValue = {this.state.statefood}>
                 <Picker.Item label = "On stock" value = {true}/>
                 <Picker.Item label = "Sold out" value = {false}/>
               </Picker>
            </View>
            <View style = {{justifyContent: 'center', flexDirection: 'row'}}>
              <TouchableHighlight
                onPress={this._onPressApply}
                style = {modalAddFoodStyle.apply}
                disabled = {!(this.state.inputtitle.length && this.state.inputprice.length && this.state.inputdescription.length)}
               >
                  <Text style = {{fontSize:24, fontWeight:"bold",color: 'white'}}>Add</Text>
              </TouchableHighlight>
            </View>
      </ScrollView>
    );
  }
}
