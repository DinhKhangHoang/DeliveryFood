import React, { Component } from "react";
import { Text, View, Image, SectionList,Button,Alert,TouchableHighlight, Modal, TextInput,TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import Anchor from "./anchor.js";
import PropTypes from 'prop-types';
import { listViewMenuItemStyle, modalViewInfoStyle, modalEditInfoStyle } from "../Style/style.js";
import firebase from 'react-native-firebase';

class ListViewMenuItem extends Component
{
    constructor(props)
    {
      super(props);
      this._onPressProperty = this._onPressProperty.bind(this);
      //this.renderModalViewinfo = this.renderModalViewInfo.bind(this);
      this.state = {ViewInfovisible : false,
                    EditInfovisible : false,
                    inputtitle : '',
                    inputprice : '',
                    title: '',
                    price: 0,
                    rate: 0,
                    imgURL :'',
                    loading: true,
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
                      price: DocumentSnapshot.get('Price'),
                      rate: DocumentSnapshot.get('rating'),
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
        this.props.title,
        'Select one',
        [
          {text: 'Delete', onPress: () => {}},
          {
            text: 'View Information',
            onPress: ()=>{this.setState({ViewInfovisible : true})} ,
          },
          {text: 'Edit', onPress: () => {this.setState({EditInfovisible: true})}},
        ],
        {cancelable: true},
      );
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
              <View style={ modalEditInfoStyle.item }>
                  <Image
                      source={ {uri : this.state.imgURL} }
                      style={ modalEditInfoStyle.image }
                      resizeMode='cover'
                  />
                  <View style = {modalEditInfoStyle.wrappername}>
                    <Text style={ modalEditInfoStyle.textname }>Name :</Text>
                    <TextInput style = {modalEditInfoStyle.inputname}
                                onChangeText = {(text) => {this.setState({inputtitle : text});}}
                                value = {this.state.inputtitle}
                                underlineColorAndroid = {"light-gray"}
                    />
                  </View>
                  <View style = {modalEditInfoStyle.wrappername}>
                    <Text style={ modalEditInfoStyle.textname }>Price :</Text>
                    <TextInput style = {modalEditInfoStyle.inputname}
                                onChangeText = {(text) => {this.setState({inputprice : text});}}
                                value = {this.state.inputprice}
                                underlineColorAndroid = {"light-gray"}
                    />
                  </View>
              </View>
              <View style = {{justifyContent: 'center', flexDirection: 'row', flex:1}}>
                <TouchableHighlight
                  onPress={() => {
                    this.setState({EditInfovisible: false});
                  }}
                  style = {modalEditInfoStyle.apply}>
                    <Text style = {{fontSize:24, fontWeight:"bold", color: 'white'}}>Apply</Text>
                </TouchableHighlight>
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
    /*this.state = {
      sections:
      [
        {title: "Dessert",
          data :
          [
            {key: require("../Media/listView/1.jpg"), title: "Title 1", rate: 4.5, price: "12.000"},
            {key: require("../Media/listView/2.jpg"), title: "Title 2", rate: 5, price: "40.000"},
            {key: require("../Media/listView/3.jpg"), title: "Title 3", rate: 3, price: "20.000"},
            {key: require("../Media/listView/4.jpg"), title: "Title 4", rate: 4.5, price: "23.000"},
            {key: require("../Media/listView/5.jpg"), title: "Title 5", rate: 4.5, price: "17.000"},
            {key: require("../Media/listView/6.jpg"), title: "Title 6", rate: 4.5, price: "6.000"}
          ]
        },
        {title: "Main Course",
          data :
          [
            {key: require("../Media/listView/1.jpg"), title: "Title 7", rate: 4.5, price: "12.000"},
            {key: require("../Media/listView/2.jpg"), title: "Title 8", rate: 5, price: "40.000"},
            {key: require("../Media/listView/3.jpg"), title: "Title 9", rate: 3, price: "20.000"},
            {key: require("../Media/listView/4.jpg"), title: "Title 10", rate: 4.5, price: "23.000"},
            {key: require("../Media/listView/5.jpg"), title: "Title 11", rate: 4.5, price: "17.000"},
            {key: require("../Media/listView/6.jpg"), title: "Title 12", rate: 4.5, price: "6.000"}
          ]
        }
      ]
    };*/
  }
  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }
  componentWillUnmount() {
    this.unsubscribe();
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
