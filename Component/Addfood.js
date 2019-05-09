import React, { Component } from "react";
import { Text, View, Image, FlatList, Modal, TextInput, TouchableHighlight, Alert, TouchableOpacity, Picker, ScrollView, Platform } from "react-native";
import { Icon } from "react-native-elements";
import ImagePicker from 'react-native-image-picker';
import ListViewMenu from "./ListViewMenu";
import {UploadImage} from "./UploadImage.js"
import { FoodManagement, accountStyle, modalAddFoodStyle, listViewMenuItemStyle} from "../Style/style";
import firebase from 'react-native-firebase';

var options = {
  title: 'Select Avatar',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};



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
                  statefood: true,
                  imageSource: null,
                  
                };
    this._onPressApply = this._onPressApply.bind(this);
    this.picker = this.picker.bind(this);
    this.ref = firebase.firestore().collection('Food');
  }
  _onPressApply(){
    const ref = this.ref.doc();
    ref.set({
          Name : this.state.inputtitle,
          Price: Number(this.state.inputprice),
          Information: this.state.inputdescription,
          TypeOfFood: this.state.typefood,
          State: this.state.statefood,
          rating: 0,
          FoodID: ref.id,
          numRate: 0,
          ID_RES: firebase.auth().currentUser.uid,
          numRate: 0
        }, {merge: true});
    UploadImage(this.state.imageSource.uri, ref.id)
    .then(url=>this.setState({imageSource: url}))
    .catch(error=>console.log(error));
    Alert.alert("Data saved!");
    this.props.navigation.goBack();
  }
  picker(){
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {

      } else if (response.error) {

      } else if (response.customButton) {

      } else {
        let source = { uri: response.uri };
        this.setState({
          imageSource: source,
        });
      }
    });
  }
  render(){
    const {goBack} = this.props.navigation;
    return(
      <ScrollView style = {{paddingVertical : 5}}>
            <TouchableOpacity style = {modalAddFoodStyle.image}
                              onPress = {this.picker}>
              <Image source = {this.state.imageSource} style = {{height: '80%', width: '100%'}}/>
              <Text style = {{fontSize: 30, color: '#2196F3', justifyContent: 'center'}}>Upload Image</Text>
            </TouchableOpacity>

              <Text style={ modalAddFoodStyle.textname }>Name :</Text>
              <TextInput style = {modalAddFoodStyle.inputname}
                          onChangeText = {(text) => {this.setState({inputtitle : text})}}
                          value = {this.state.inputtitle}
                          underlineColorAndroid = 'transparent'
                          autoCapitalize = "none"
              />

              <Text style={ modalAddFoodStyle.textname }>Price :</Text>
              <TextInput style = {modalAddFoodStyle.inputname}
                          onChangeText = {(text) => {this.setState({inputprice : text});}}
                          value = {this.state.inputprice}
                          underlineColorAndroid = 'transparent'
                          autoCapitalize = "none"
              />

              <Text style={ modalAddFoodStyle.textname }>Description :</Text>
              <TextInput style = {modalAddFoodStyle.inputname}
                          onChangeText = {(text) => {this.setState({inputdescription : text})}}
                          value = {this.state.inputdescription}
                          underlineColorAndroid = 'transparent'
                          autoCapitalize = "none"
              />
              <View style = {{flexDirection : 'row'}}>
                <Text style={ modalAddFoodStyle.textname }>Type :</Text>
                <Picker
                   style = {modalAddFoodStyle.pickerType}
                   onValueChange = {(type)=>{this.setState({typefood: type});}}
                   selectedValue = {this.state.typefood}>
                   <Picker.Item label = "Main course" value = "maincourse"/>
                   <Picker.Item label = "Dessert" value = "dessert"/>
                 </Picker>
               </View>
              <View style = {{flexDirection : 'row'}}>
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
