import React, { Component } from "react";
import {View, TouchableOpacity, SectionList, Text} from "react-native";
import { Icon } from "react-native-elements";
import ListViewMenu from "./ListViewMenu";
import {NavigationEvents} from "react-navigation";
import { FoodManagement, accountStyle, listViewMenuItemStyle} from "../Style/style";
import firebase from "react-native-firebase";

export default class FManagement extends Component
{
    constructor(){
      super();
      this._onPressAdd = this._onPressAdd.bind(this);
      /*this.unsubscribe = null;
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
      this.ref = firebase.firestore().collection('Food');*/
    }
    static navigationOptions = ({navigation})=>{
      return{
                      title: 'Food Management',
                      headerTitleStyle: { ...accountStyle.titleStyle, color: "white" },
                      headerStyle:{
                        backgroundColor: "#227100",
                      },
                      headerRight: (
                        <TouchableOpacity style = {listViewMenuItemStyle.button}
                                          onPress = {navigation.getParam('_onPressAdd')}
                                          activeOpacity ={0.7}>
                          <View style = {{flexDirection: "column", flex: 1, justifyContent: 'center'} }>
                            <Icon
                              type = "font-awesome"
                              name ="plus"
                              color="white"
                              size ={30}
                              underlayColor="transparent"
                            />
                          </View>
                        </TouchableOpacity>
                      )
            };
    };
    componentWillMount(){
      this.props.navigation.setParams({_onPressAdd: this._onPressAdd});
      //this.unsubscribe = firebase.firestore().collection('Food').where('ID_RES' , '==', firebase.auth().currentUser.uid).onSnapshot(this.onCollectionUpdate);
    }
    _onPressAdd(){
      this.props.navigation.navigate('Addfood');

    }
    render(){
      return(
        <View>
          <ListViewMenu/>
        </View>
      );
    }
    /*componentDidMount() {
      this.focusListner = this.props.navigation.addListener("didFocus",
        this.ref.where('ID_RES' , '==', firebase.auth().currentUser.uid).onSnapshot(this.onCollectionUpdate));
      this.unsubscribe = this.ref.where('ID_RES' , '==', firebase.auth().currentUser.uid).onSnapshot(this.onCollectionUpdate);
    }
    componentWillUnmount() {
      this.unsubscribe = null;
      this.focusListner.remove();
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
   }*/
}
