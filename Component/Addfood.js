import React, { Component } from "react";
import { Text, View, Image, FlatList, Modal, TextInput, TouchableHighlight, Alert, TouchableOpacity, Picker, ScrollView, Platform } from "react-native";
import { Icon } from "react-native-elements";
import ImagePicker from 'react-native-image-picker';
import {UploadImage} from "./UploadImage.js"
import { FoodManagement, accountStyle, modalAddFoodStyle, listViewMenuItemStyle} from "../Style/style";
import firebase from 'react-native-firebase';
import { StackActions, NavigationActions } from 'react-navigation';
import Loader from './loader.js'

var options = {
  title: 'Select photo',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const resetAction = StackActions.reset({
  index: 1,
  actions: [
    NavigationActions.navigate({ routeName: 'Home' }),
    NavigationActions.navigate({ routeName: 'FoodManagement' }),
  ],
});

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
                  loading : false,
                  correctNumber: true,
                };
    this._onPressApply = this._onPressApply.bind(this);
    this.picker = this.picker.bind(this);
    this.ref = firebase.firestore().collection('Food');
  }
  async _onPressApply(){
    this.setState({loading: true});
    const ref = this.ref.doc();
     await ref.set({
          Name : this.state.inputtitle,
          Price: Number(this.state.inputprice),
          Information: this.state.inputdescription,
          TypeOfFood: this.state.typefood,
          State: this.state.statefood,
          rating: 0,
          FoodID: ref.id,
          numRate: 0,
          ID_RES: firebase.auth().currentUser.uid,
        }, {merge: true});

          await UploadImage(this.state.imageSource.uri, ref.id)
          .then(()=>{
            this.props.navigation.dispatch(resetAction);
            Alert.alert('Data saved!');
          })
          .catch(error=>console.log(error));



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
    let body, correct;
    if(this.state.correctNumber)
      correct = null;
    else
      correct = <Text style = {{fontSize: 10, color: 'red', marginLeft: 5}}>Please input a number...</Text>;
    if(this.state.imageSource == null)
      body = <Icon type = 'font-awesone' name = 'file-upload' color = 'gray' size = {100} />;
    else
      body = <Image source = {this.state.imageSource} style = {{height: '80%', width: '100%'}}/>
    if(this.state.loading)
    return(<Loader/>);
    else
    return(
      <ScrollView style = {{paddingVertical : 5}}>
            <TouchableOpacity style = {modalAddFoodStyle.image}
                              onPress = {this.picker}>
              {body}
              <Text style = {{fontSize: 30, color: '#2196F3', justifyContent: 'center', textAlign: 'center'}}>Upload Image</Text>
            </TouchableOpacity>

              <Text style={ modalAddFoodStyle.textname }>Name :</Text>
              <TextInput style = {{...modalAddFoodStyle.inputname, height: 40}}
                          onChangeText = {(text) => {this.setState({inputtitle : text})}}
                          value = {this.state.inputtitle}
                          underlineColorAndroid = 'transparent'
                          autoCapitalize = "none"


              />

              <Text style={ modalAddFoodStyle.textname }>Price :</Text>
              <TextInput style = {{...modalAddFoodStyle.inputname, height: 40}}
                          onChangeText = {(text) => {
                            this.setState({inputprice : text});
                            if(/^\d+$/.test(text))
                              this.setState({correctNumber: true});
                            else {
                              this.setState({correctNumber: false});
                            }
                          }}
                          value = {this.state.inputprice}
                          underlineColorAndroid = 'transparent'
                          autoCapitalize = "none"


              />
              {correct}

              <Text style={ modalAddFoodStyle.textname }>Description :</Text>
              <TextInput style = {{...modalAddFoodStyle.inputname, textAlignVertical: "top", height: 100}}
                          onChangeText = {(text) => {this.setState({inputdescription : text})}}
                          value = {this.state.inputdescription}
                          underlineColorAndroid = 'transparent'
                          autoCapitalize = "none"
                          multiline = {true}
                          editable = {true}
                          numberOfLines = {5}

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

            <View style = {{justifyContent: 'center', flexDirection: 'row', paddingTop: 30}}>
              <TouchableHighlight
                onPress={this._onPressApply}
                style = {modalAddFoodStyle.apply}
                disabled = {!(this.state.inputtitle.length != 0 && this.state.inputprice.length != 0 && this.state.inputdescription.length != 0 && this.state.imageSource.length != 0 && this.state.correctNumber)}
               >
                  <Text style = {{fontSize:24, fontWeight:"bold",color: 'white'}}>Add</Text>
              </TouchableHighlight>
            </View>
      </ScrollView>
    );
  }
}
