import React, { Component } from "react";
import { Text, View, Image, SectionList,Button,Alert,TouchableHighlight, Modal, TextInput,TouchableOpacity, ScrollView, Picker } from "react-native";
import { listViewMenuItemStyle, modalViewInfoStyle, modalEditInfoStyle, modalAddFoodStyle, accountStyle } from "../Style/style.js";
import firebase from 'react-native-firebase';
import ImagePicker from 'react-native-image-picker';
import {UploadImage} from './UploadImage.js';
import Loader from './loader.js';

var options = {
  title: 'Select photo',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};
export default class EditFood extends Component
{
  static navigationOptions = {
                    title: 'Edit Food',
                    headerTitleStyle:  accountStyle.titleStyle
            };
  constructor(props){
    super(props);
    this.state ={
                  title: '',
                  price: '',
                  rate: 0,
                  imgURL :'',
                  imageSource: null,
                  loading: true,
                  information: '',
                  typeOfFood:'',
                  State:'',
                  foodID:'',
                  correctNumber: true,
    }
    this.ref = firebase.firestore().collection('Food');
    this.unsubscribe = null;
    this._onPressSave = this._onPressSave.bind(this);
    this.picker = this.picker.bind(this);
  }
  componentDidMount() {
    //let foodID = this.props.navigation.getParam('foodID','No-ID');
    //this.setState({foodID: foodID});
    this.unsubscribe = this.ref.doc(this.props.navigation.getParam('foodID')).onSnapshot(this.onDocumentUpdate);
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  onDocumentUpdate = (DocumentSnapshot)=>{
    let foodID = this.props.navigation.getParam('foodID','No-ID');
    this.setState({title: DocumentSnapshot.get('Name'),
                    price: String(DocumentSnapshot.get('Price')),
                    rate: DocumentSnapshot.get('rating'),
                    information: DocumentSnapshot.get('Information'),
                    typeOfFood: DocumentSnapshot.get('TypeOfFood'),
                    State: DocumentSnapshot.get('State'),
                  });
    let ref = firebase.storage().ref('FoodImage');
    ref.child(`${foodID}.jpg`).getDownloadURL()
    .then((url)=>{
      //state[loading] = false;
      this.setState({imgURL: url, loading: false});
    });
  }
  async _onPressSave(){
    this.setState({loading: true});
    await this.ref.doc(this.props.navigation.getParam('foodID'))
    .update({
        Name : this.state.title,
        Price: Number(this.state.price),
        Information: this.state.information,
        TypeOfFood: this.state.typeOfFood,
        State: this.state.State,
    })
    if(this.state.imageSource == null)
      this.props.navigation.goBack();
    else{
      await firebase.storage().ref('FoodImage').child(`${this.props.navigation.getParam('foodID')}.jpg`).delete();
      await UploadImage(this.state.imageSource.uri, this.props.navigation.getParam('foodID'))
        .then(url=>this.setState({imageSource: url}))
        .then(()=>{
          Alert.alert("Data saved!");
          this.props.navigation.goBack();
        })
        .catch(error=>console.log(error))
      }
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
    //const foodID = this.props.navigation.getParam('foodID','No-ID');

    const {goBack} = this.props.navigation;
    if(this.state.loading == true)
      return(<Loader/>);
    let body, correct;
    if(this.state.correctNumber)
      correct = null;
    else
      correct = <Text style = {{fontSize: 10, color: 'red', marginLeft: 5}}>Please input a number...</Text>;
    if(this.state.imageSource == null){
      body=<Image source = {{uri: this.state.imgURL}} style = {{height: '80%', width: '100%'}}/>;

    }
    else{
      body=<Image source = {this.state.imageSource} style = {{height: '80%', width: '100%'}}/>;

    }
    return(
      <ScrollView style = {{paddingVertical : 5}}>
            <TouchableOpacity style = {modalAddFoodStyle.image}
                              onPress = {this.picker}>
              {body}
              <Text style = {{fontSize: 30, color: '#2196F3', justifyContent: 'center', textAlign: 'center'}}>Change Image</Text>
            </TouchableOpacity>

              <Text style={ modalAddFoodStyle.textname }>Name :</Text>
              <TextInput style = {{...modalAddFoodStyle.inputname, height: 40}}
                          onChangeText = {(text) => {this.setState({title : text})}}
                          value = {this.state.title}
                          underlineColorAndroid = 'transparent'
                          autoCapitalize = "none"
              />

              <Text style={ modalAddFoodStyle.textname }>Price :</Text>
              <TextInput style = {{...modalAddFoodStyle.inputname, height: 40}}
                          onChangeText = {(text) => {
                            this.setState({price : text});
                            if(/^\d+$/.test(text))
                              this.setState({correctNumber: true});
                            else {
                              this.setState({correctNumber: false});
                            }
                          }}
                          value = {this.state.price}
                          underlineColorAndroid = 'transparent'
                          autoCapitalize = "none"
              />
              {correct}
              <Text style={ modalAddFoodStyle.textname }>Description :</Text>
              <TextInput style = {{...modalAddFoodStyle.inputname, textAlignVertical: "top", height: 100}}
                          onChangeText = {(text) => {this.setState({information : text})}}
                          value = {this.state.information}
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
                   onValueChange = {(type)=>{this.setState({typeOfFood: type});}}
                   selectedValue = {this.state.typeOfFood}>
                   <Picker.Item label = "Main course" value = "maincourse"/>
                   <Picker.Item label = "Dessert" value = "dessert"/>
                 </Picker>
               </View>
              <View style = {{flexDirection : 'row'}}>
                <Text style={ modalAddFoodStyle.textname }>State :</Text>
                <Picker
                   style = {modalAddFoodStyle.pickerType}
                   onValueChange = {(type)=>{this.setState({State: type});}}
                   selectedValue = {this.state.State}>
                   <Picker.Item label = "On stock" value = {true}/>
                   <Picker.Item label = "Sold out" value = {false}/>
                 </Picker>
              </View>

            <View style = {{paddingTop: 20,marginHorizontal: 70, paddingBottom: 30}}>
              <Button
                onPress={this._onPressSave}
                title = 'SAVE'
                disabled = {!(this.state.title.length != 0 && this.state.price.length != 0 && this.state.information.length != 0 && this.state.correctNumber)}
               />

            </View>
      </ScrollView>
    );

  }

}
