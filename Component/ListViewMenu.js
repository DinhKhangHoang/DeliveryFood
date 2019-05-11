import React, { Component } from "react";
import { Text, View, Image, SectionList,Button,Alert,TouchableHighlight, Modal, TextInput,TouchableOpacity, ScrollView, Picker } from "react-native";
import { Icon } from "react-native-elements";
import Anchor from "./anchor.js";
import PropTypes from 'prop-types';
import { listViewMenuItemStyle, modalViewInfoStyle, modalEditInfoStyle, modalAddFoodStyle } from "../Style/style.js";
import firebase from 'react-native-firebase';
import { NavigationEvents } from 'react-navigation';
import {UploadImage} from './UploadImage.js';
import ImagePicker from 'react-native-image-picker';

var options = {
  title: 'Select Avatar',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};
class ListViewMenuItem extends Component
{
    constructor(props)
    {
      super(props);
      this._onPressProperty = this._onPressProperty.bind(this);
      this._onPressSave = this._onPressSave.bind(this);
      this._onPressDelete = this._onPressDelete.bind(this);
      this.state = {ViewInfovisible : false,
                    EditInfovisible : false,
                    title: '',
                    price: '',
                    rate: 0,
                    imgURL :'',
                    loading: true,
                    information: '',
                    typeOfFood:'',
                    State:'',

      };
      this.ref = firebase.firestore().collection('Food');
      this.unsubscribe = null;
    }
    componentDidMount() {
      this.unsubscribe = this.ref.doc(this.props.foodID).onSnapshot(this.onDocumentUpdate);
    }
    componentWillUnmount() {
      this.unsubscribe();
    }
    onDocumentUpdate = (DocumentSnapshot)=>{
      this.setState({title: DocumentSnapshot.get('Name'),
                      price: String(DocumentSnapshot.get('Price')),
                      rate: DocumentSnapshot.get('rating'),
                      information: DocumentSnapshot.get('Information'),
                      typeOfFood: DocumentSnapshot.get('TypeOfFood'),
                      State: DocumentSnapshot.get('State'),
                    });
      let ref = firebase.storage().ref('FoodImage');
      ref.child(`${this.props.foodID}.jpg`).getDownloadURL()
      .then((url)=>{
        //state[loading] = false;
        this.setState({imgURL: url, loading: false});
      });
    }
    _onPressProperty(){
      Alert.alert(
        this.state.title,
        'Select one',
        [
          {text: 'Delete', onPress: ()=>{
            Alert.alert("Delete data?","Select one",
            [
              {text: 'Delete', onPress: this._onPressDelete},
              {text: 'Cancel', onPress:()=>{}},
            ],
              {cancelable: true},
            )}},
          {
            text: 'View Information',
            onPress: ()=>{this.setState({ViewInfovisible : true})} ,
          },
          {text: 'Edit', onPress: () => {this.setState({EditInfovisible: true})}},
        ],
        {cancelable: true},
      );
    }
    _onPressDelete(){
      this.ref.doc(this.props.foodID).delete();
      firebase.storage().ref('FoodImage').child(`${this.props.foodID}.jpg`).delete();
      Alert.alert("Data deleted!");
    }
    _onPressSave(){
      this.ref.doc(this.props.foodID)
      .update({
        Name : this.state.title,
        Price: Number(this.state.price),
        Information: this.state.information,
        TypeOfFood: this.state.typeOfFood,
        State: this.state.State,
      });
      firebase.storage().ref('FoodImage').child(`${this.props.foodID}.jpg`)
      .delete()
      .then(()=>{
        UploadImage(this.state.imgURL.uri, this.props.foodID)
        .then(url=>this.setState({imgURL: url}))
        .then(()=>{
          Alert.alert("Data saved!");
          this.setState({EditInfovisible: false});
        })
      })


    }
    picker(){
      ImagePicker.showImagePicker(options, (response) => {
        if (response.didCancel) {

        } else if (response.error) {

        } else if (response.customButton) {

        } else {
          let source = { uri: response.uri };
          this.setState({
            imgURL: source,
          });
        }
      });
    }
    render()
    {
      const { foodID } = this.props;
      if(this.state.loading)
      return null;
      return (
        <View>
            <View style={ listViewMenuItemStyle.item }>
                  <Image
                      source={ {uri:this.state.imgURL} }
                      style={ listViewMenuItemStyle.image }
                      resizeMode='cover'
                  />
                  <View style = {{flex:1, flexDirection:"column"}}>
                    <Text style={ listViewMenuItemStyle.text }>{ this.state.title }</Text>
                    <View style={ listViewMenuItemStyle.wrapperRateAndPrice }>
                        <View style={ listViewMenuItemStyle.rateWrapper }>
                            <Icon name="star" type="antdesign" color="white" size={15} />
                            <Text style={{color: "white", fontSize: 10, marginLeft: 5}}>{ this.state.rate }</Text>
                        </View>
                        <View style={ listViewMenuItemStyle.priceWrapper }>
                            <Icon type="font-awesome" name="dollar" color="#227100" size={15} />
                            <Text style={{fontSize: 15, color: "#227100", marginLeft: 5, fontWeight: "bold"}}>{ this.state.price }</Text>
                        </View>
                    </View>
                  </View>
                  <TouchableOpacity style = {listViewMenuItemStyle.button} onPress = {this._onPressProperty} activeOpacity ={0.7}>
                    <View style = {{flexDirection: "column", flex: 1, justifyContent: 'center'}}>
                      <Icon type = "font-awesome" name ="ellipsis-v" color="#227100" size ={35}/>
                    </View>
                  </TouchableOpacity>
            </View>
            <Modal
              animationType="slide"
              transparent={false}
              visible={this.state.ViewInfovisible}
              onRequestClose={() => {
                this.setState({ViewInfovisible: false});
              }}>
              <View style={ modalViewInfoStyle.item }>
                  <Image
                      source={ {uri: this.state.imgURL} }
                      style={ modalViewInfoStyle.image }
                      resizeMode='cover'
                  />
                  <Text style={ modalViewInfoStyle.text }>{ this.state.title }</Text>
                  <View style={ modalViewInfoStyle.wrapperRateAndPrice }>
                      <View style={ modalViewInfoStyle.rateWrapper }>
                          <Icon name="star" type="antdesign" color="white" size={15} />
                          <Text style={{color: "white", fontSize: 10, marginLeft: 5}}>{ this.state.rate }</Text>
                      </View>
                      <View style={ modalViewInfoStyle.priceWrapper }>
                          <Icon type="font-awesome" name="dollar" color="#227100" size={15} />
                          <Text style={{fontSize: 15, color: "#227100", marginLeft: 5, fontWeight: "bold"}}>{ this.state.price }</Text>
                      </View>
                  </View>
              </View>
            </Modal>
            <Modal
              animationType="slide"
              transparent={false}
              visible={this.state.EditInfovisible}
              onRequestClose={() => {
                this.setState({EditInfovisible: false});
              }}>
              <ScrollView style = {{paddingVertical : 5}}>
                    <TouchableOpacity style = {modalAddFoodStyle.image}
                                      onPress = {this.picker}>
                      <Image source = {{uri: this.state.imgURL}} style = {{height: '80%', width: '100%'}}/>
                      <Text style = {{fontSize: 30, color: '#2196F3', justifyContent: 'center'}}>Change Image</Text>
                    </TouchableOpacity>

                      <Text style={ modalAddFoodStyle.textname }>Name :</Text>
                      <TextInput style = {modalAddFoodStyle.inputname}
                                  onChangeText = {(text) => {this.setState({title : text})}}
                                  value = {this.state.title}
                                  underlineColorAndroid = 'transparent'
                                  autoCapitalize = "none"
                      />

                      <Text style={ modalAddFoodStyle.textname }>Price :</Text>
                      <TextInput style = {modalAddFoodStyle.inputname}
                                  onChangeText = {(text) => {this.setState({price : text});}}
                                  value = {this.state.price}
                                  underlineColorAndroid = 'transparent'
                                  autoCapitalize = "none"
                      />

                      <Text style={ modalAddFoodStyle.textname }>Description :</Text>
                      <TextInput style = {modalAddFoodStyle.inputname}
                                  onChangeText = {(text) => {this.setState({information : text})}}
                                  value = {this.state.information}
                                  underlineColorAndroid = 'transparent'
                                  autoCapitalize = "none"
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

                    <View style = {{justifyContent: 'center', flexDirection: 'row'}}>
                      <TouchableHighlight
                        onPress={this._onPressSave}
                        style = {modalAddFoodStyle.apply}
                        disabled = {!(this.state.title.length != 0 && this.state.price.length != 0 && this.state.information.length != 0)}
                       >
                          <Text style = {{fontSize:24, fontWeight:"bold",color: 'white'}}>Save</Text>
                      </TouchableHighlight>
                    </View>
              </ScrollView>
            </Modal>
        </View>
      );
    }
}
export default class ListViewMenu extends Component
{
  constructor(props)
  {
    super(props);
    this.ref = firebase.firestore().collection('Food').where('ID_RES' , '==', firebase.auth().currentUser.uid);
    this.unsubscribe = null;
    this.state = {
      loading: true,
      food :
        [
          {title: "Dessert",
            data :[],
          },
          {title: "Main Course",
            data :[],
          }
        ]
    }
  }
  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }
  componentWillUnmount() {
    this.unsubscribe = null;
  }
  onCollectionUpdate = (querySnapshot) => {
    const Dessert = {
      title: "Dessert",
        data :[],
    },
    MainCourse=
    {title: "Main Course",
      data :[],
    };
    querySnapshot.forEach((doc)=> {
      if(doc.get('TypeOfFood') == "maincourse"){
        MainCourse.data.push({key :doc.get('FoodID')});
      }
      else if( doc.get('TypeOfFood') == "dessert"){
        Dessert.data.push({key :doc.get('FoodID')});
      }
    });
    const food = [Dessert, MainCourse];
    this.setState({
      food,
      loading : false,
    });
  }
  render()
  {
    if(this.state.loading)
    return null;
    //const { title } = this.props;
    return (
          <View style={{width: "100%"}}>
            <NavigationEvents onDidFocus={()=>this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)} />
            <NavigationEvents onWillBlur={()=>this.unsubscribe = null} />
            <SectionList
                sections={ this.state.food }
                showsVerticalScrollIndicator = {false}
                //keyExtractor={(item) => item.title }
                renderSectionHeader={({section}) => <Text
                                                        style={listViewMenuItemStyle.text}>{section.title}</Text>}
                renderItem={( {item} ) => <ListViewMenuItem
                                              foodID = {item.key}
                                          />  }
            />
          </View>
    );
  }
}
