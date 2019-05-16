import React, { Component } from "react";
import { Text, View, Image, SectionList,Button,Alert,TouchableHighlight, Modal, TextInput,TouchableOpacity, ScrollView, Picker, ActivityIndicator } from "react-native";
import { Icon } from "react-native-elements";
import Anchor from "./anchor.js";
import PropTypes from 'prop-types';
import { listViewMenuItemStyle, modalViewInfoStyle, modalEditInfoStyle, modalAddFoodStyle } from "../Style/style.js";
import firebase from 'react-native-firebase';
import { NavigationEvents, NavigationActions } from 'react-navigation';
import {UploadImage} from './UploadImage.js';
import ImagePicker from 'react-native-image-picker';
import EditFood from './EditFood.js';
import NavigationService from './NavigationService.js';


class ListViewMenuItem extends Component
{
    constructor(props)
    {
      super(props);
      this._onPressProperty = this._onPressProperty.bind(this);
      this._onPressDelete = this._onPressDelete.bind(this);
      this.state = {ViewInfovisible : false,
                    EditInfovisible : false,
                    title: '',
                    price: '',
                    rate: 0,
                    imgURL :'',
                    imagesoure: '',
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
    /*componentWillUnmount() {
      this.unsubscribe();
    }*/

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
            onPress: ()=>{NavigationService.navigate('Detail',{data: {id: this.props.foodID, title: this.state.title }})} ,
          },
          {text: 'Edit', onPress: () => {NavigationService.navigate('EditFood',{foodID: this.props.foodID})}},
        ],
        {cancelable: true},
      );
    }
    _onPressDelete(){
      //this.ref.doc(this.props.foodID).delete();
      //firebase.storage().ref('FoodImage').child(`${this.props.foodID}.jpg`).delete();
      //await this.props.onDeleteFood();
      this.ref.doc(this.props.foodID)
      .update({
        isDeleted: true,
      })
      Alert.alert("Data deleted!");
    }

    render()
    {
      const { foodID } = this.props;
      let body = null;
      if(this.state.State == false){
        body = <Text style={{fontSize: 15, color: "red", marginLeft: 5, fontWeight: "bold"}}>Sold out</Text>;
      }
      if(this.state.loading)
      return (
        <View style = {listViewMenuItemStyle.loader}>
          <ActivityIndicator size = 'small' color = 'gray'/>
        </View>
      );
      return (
        <View>
        <NavigationEvents onDidFocus={()=>this.unsubscribe = this.ref.doc(this.props.foodID).onSnapshot(this.onDocumentUpdate)}
                          onWillBlur={()=>this.unsubscribe = null} />
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
                    {body}
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

        </View>
      );
    }
}
export default class ListViewMenu extends Component
{
  constructor(props)
  {
    super(props);
    this.ref = firebase.firestore().collection('Food');
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
    /*this.focusListner = NavigationActions.addListener("didFocus",
      this.ref.where('ID_RES' , '==', firebase.auth().currentUser.uid).onSnapshot(this.onCollectionUpdate));*/
    this.unsubscribe = this.ref.where('ID_RES' , '==', firebase.auth().currentUser.uid).where('isDeleted','==',false).onSnapshot(this.onCollectionUpdate);
}
  /*componentWillUnmount() {
    //this.focusListner.remove();
    this.unsubscribe = null;
  }*/
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
