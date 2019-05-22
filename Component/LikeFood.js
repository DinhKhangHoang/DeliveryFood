import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity, SectionList, ActivityIndicator } from "react-native";
import { LikeFoodStyle, accountStyle } from "../Style/style";
import Message from "./Message";
import NetInfo from "@react-native-community/netinfo";
import firebase from 'react-native-firebase';

class LikedFoodItem extends Component
{
  constructor(props)
  {
       super(props);
       this.state = { imageURL: ' ', title: '', nameRes: '', isLoading: true };
  }

  componentDidMount()
  {
          if (this.props.imageURL == ' ')
                firebase.storage().ref().child("/FoodImage/" + this.props.id + ".jpg").getDownloadURL().then(url=>{
                      this.setState({ imageURL: url, isLoading: false });
                });
          else  this.setState({ imageURL: this.props.imageURL });

          firebase.firestore().collection("Food").doc( this.props.id ).get().then(async (food)=>{
                const res = await firebase.firestore().collection("Restaurants").doc(food.data().ID_RES).get();
                this.setState({ title: food.data().Name, nameRes: res.data().NameRES, isLoading: false });
          });

  }

  render()
  {
        const { handleOnPress } = this.props;
        if (this.state.isLoading)
            return (
              <View style={ [LikeFoodStyle.wrapperItem, {width: "90%", display: "flex", alignItems: "center", justifyContent: 'center'} ] }>
                    <View style={{width: "80%"}}>
                          <ActivityIndicator size="small" color="black" />
                    </View>
              </View> );
        else
            return(
                        <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={ handleOnPress }
                                style={ LikeFoodStyle.wrapperItem } >
                                <Image
                                      source={{uri: this.state.imageURL }}
                                      style={ LikeFoodStyle.image }
                                      resizeMode="cover" />
                            <View style={LikeFoodStyle.wrapTextItem}>
                                  <Text numberOfLines={1} style={ LikeFoodStyle.titleItem }>{ this.state.title }</Text>
                                  <Text style={ LikeFoodStyle.nameRes}>{ this.state.nameRes }</Text>
                            </View>
                        </TouchableOpacity>
                  );
    }
}


export default class LikedFood extends Component
{
  static navigationOptions = {
                    title: "Your favorite food",
                    headerTitleStyle:  { ...accountStyle.titleStyle, color: "white" },
                    headerStyle:{
                          backgroundColor: "#89C440",
                    },
  };

  constructor(props)
  {
    super(props);
    //---------------------------------------------------------------------------------------------------------
    this.state = {
          data: [ ],
          isEmpty: true,
          isLoading: true,
          isConnected: true
    };
    this.getData = this.getData.bind(this);
    this._isMount = false;
 }

async getData()
{
      const account = await firebase.firestore().collection( global.UserType + "s" ).doc( firebase.auth().currentUser.uid ).get();
      account.data().likeFood.split(" ").filter(i => i != "")
                             .map(item=>({ id: item.trim().substr(0, 20).trim(), time: item.trim().substr(21).trim() }))
                             .forEach((item)=>{
                                     // --- Get ref to database ------------------------------------------------------

                                     // --- Make new item --------------------------------------------------------------
                                     const newItem = {
                                               id: item["id"],
                                               key: ' ',
                                               time: item["time"]
                                        };
                                     //----------------------------------------------------------------------
                                     let index = this.state.data.findIndex(e => e.title == item.time);
                                     if (index == -1)
                                     {
                                           let temp = this.state.data;
                                           temp.push({ title: item.time, data: [newItem] });
                                           temp.sort((a, b)=>{
                                                if (new Date(a.title) > new Date(b.title)) return -1
                                                else if (new Date(a.title) == new Date(b.title)) return 0;
                                                else return 1;
                                           });
                                           this.setState({ data: temp, isEmpty: false });
                                     }
                                     else
                                     {
                                           let temp = this.state.data;
                                           temp[index].data.push(newItem);
                                           temp.sort((a, b)=>{
                                                if (new Date(a.title) > new Date(b.title)) return -1
                                                else if (new Date(a.title) == new Date(b.title)) return 0;
                                                else return 1;
                                           });
                                           this.setState({ data: temp, isEmpty: false });
                                     }
                          });
                this.setState({ isLoading: false });
}

async componentWillMount()
 {
      this._isMount = true;
      this.ref = NetInfo.addEventListener('connectionChange', async (data)=>{
               if (data.type === "unknown" || data.type === "none") {  this._isMount && this.setState({isConnected: false});  }
               else {
                        if (this.state.isEmpty && !this.state.isLoading && this._isMount)
                              this.getData();
                        this._isMount && this.setState({isConnected: true});
               }
         });
         // ---- Listen to change ---------------------------------------------------------------------------------
         firebase.firestore().collection(global.UserType + "s" ).where("UID_" + global.UserType.substr(0, 3).toUpperCase(), "==", firebase.auth().currentUser.uid).onSnapshot(async query=>{
               await this._isMount && this.setState({ data: [], isEmpty: true, isLoading: true });
               this._isMount && this.getData();
         });

         // ---- If have the internet -----------------------------------------------------------------------------
        const isConnected = await NetInfo.isConnected.fetch();
        if (!isConnected)
            this.setState({isEmpty: true});
 }

      componentWillUnmount()
      {
            NetInfo.removeEventListener("connectionChange", this.ref);
            this._isMount = false;
      } 


  render()
  {
    let message = null;
    if (!this.state.isConnected)
    {
         message = <Message
                      text="Something went wrong with internet connection."
                    />
    }
    if (this.state.isLoading)
    {
       return (
            <View style={{ display: "flex",justifyContent: 'center', alignItems: 'center', flex: 1}}>
                  <View style={{ height: "20%", backgroundColor: "white"}}>
                          <ActivityIndicator size="large" color='black' />
                          <Text style={{ width: "100%", fontWeight: "bold", fontSize: 18, textAlign: "center", color: "black", marginTop: 20}}>LOADING</Text>
                          { message }
                  </View>
             </View>
    )}
    else
    {
            if (this.state.isEmpty)
            {
                  return (
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <Image
                                  source={require("../Media/icon/Like.jpg")}
                                  style={{width: 150, height: 150}}
                            />
                            <Text style={{fontSize: 16, fontWeight: "bold"}}>You haven't like any food yet.</Text>
                            { message }
                    </View>
            )}
            else {
                    return(
                      <View style={ LikeFoodStyle.container }>
                            <SectionList
                                showsVerticalScrollIndicator={false}
                                sections={ this.state.data }
                                keyExtractor={(item, index) => item + index}
                                renderSectionHeader={({section: {title}}) => ( <Text style={ LikeFoodStyle.titleSection }>{title }</Text> )}
                                renderItem={( {item, index} ) => <LikedFoodItem
                                                                                  id={ item.id }
                                                                                  imageURL={item.key}
                                                                                  handleOnPress={()=>this.props.navigation.push("Detail", {data: {id: item.id, title: item.title}} )}
                                                                            />  }
                            />
                            { message }
                      </View>
              )}
      }
   }
}
