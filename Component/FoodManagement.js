import React, { Component } from "react";
import { Text, View, Image, FlatList, Modal, TextInput, TouchableHighlight, Alert, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import ListViewMenu from "./ListViewMenu";
import { FoodManagement, accountStyle, modalAddFoodStyle, listViewMenuItemStyle} from "../Style/style";

export default class FManagement extends Component
{
    constructor(){
      super();
      this.state = {AddFoodvisible: false,
                    inputtitle: "",
                    inputprice: ""};
      this._onPressAdd = this._onPressAdd.bind(this);
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
                                          onPress = {navigation.getParam("_onPressAdd")}
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
    componentWillMount() {
      this.props.navigation.setParams({ _onPressAdd: this._onPressAdd });
    }
    _onPressAdd(){
      this.setState({AddFoodvisible: true});
      //Alert.alert("Hello");
    }
    render()
    {
      return (
          <View>
           <ListViewMenu/>
           <Modal
             animationType="slide"
             transparent={false}
             visible={this.state.AddFoodvisible}
             onRequestClose={() => {
               this.setState({AddFoodvisible: false});
             }}>
             <View style={ modalAddFoodStyle.item }>
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
             </View>
             <View style = {{justifyContent: 'center', flexDirection: 'row'}}>
               <TouchableHighlight
                 onPress={() => {
                   this.setState({AddFoodvisible: false});
                 }}
                 style = {modalAddFoodStyle.apply}
                >
                   <Text style = {{fontSize:24, fontWeight:"bold",color: 'white'}}>Add</Text>
               </TouchableHighlight>
             </View>
           </Modal>
          </View>
       );
   }
}
