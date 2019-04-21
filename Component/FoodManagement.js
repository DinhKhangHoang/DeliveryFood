import React, { Component } from "react";
import {View, Icon, TouchableOpacity} from "react-native";
import { Icon } from "react-native-elements";
import ListViewMenu from "./ListViewMenu";
import { FoodManagement, accountStyle, listViewMenuItemStyle} from "../Style/style";

export default class FManagement extends Component
{
    constructor(){
      super();
      //this.state = {AddFoodvisible: false,
      //              inputtitle: "",
    //                inputprice: "",
    //                inputdescription: "",
      //              typefood: 'maincourse',
      //              statefood: true,};
      this._onPressAdd = this._onPressAdd.bind(this);
    //  this._onPressApply = this._onPressApply.bind(this);
      //this.ref = firebase.firestore().collection('Food');
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
                                          onPress = {()=>{navigation.navigate("Addfood")}}
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
    //componentWillMount() {
    //  this.props.navigation.setParams({ _onPressAdd: this._onPressAdd });
    //}
    _onPressAdd(){
    //  this.setState({AddFoodvisible: true});
      //Alert.alert("Hello");
      this.props.navigation.navigate("Addfood");
    }
  //  _onPressApply(){
      //doc = this.ref.add({
        //    Name : this.state.inputtitle,
        //    Price: this.state.inputprice,
        //    Information: this.state.inputdescription,
        //    TypeOfFood: this.state.typefood,
        //    State: this.state.statefood,
        //    rating: 0,
        //  });
    //  Alert.alert("Data saved!");
    //  this.setState({AddFoodvisible: false,});
  //  }
    render()
    {
      return (
          <View>
           <ListViewMenu/>
          </View>
       );
   }
}
