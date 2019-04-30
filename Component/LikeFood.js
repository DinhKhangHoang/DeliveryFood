import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity, SectionList } from "react-native";
import { LikeFoodStyle, accountStyle } from "../Style/style";
import Message from "./Message";
import NetInfo from "@react-native-community/netinfo";

class LikedFoodItem extends Component
{

  render()
  {
    const { imageURL, title, nameRes, handleOnPress } = this.props;
    return(
        <TouchableOpacity
                activeOpacity={0.7}
                onPress={ handleOnPress }
                style={ LikeFoodStyle.wrapperItem }
        >
                <Image
                      source={ imageURL }
                      style={ LikeFoodStyle.image }
                      resizeMode="cover"
                  />
            <View style={LikeFoodStyle.wrapTextItem}>
                  <Text numberOfLines={1} style={ LikeFoodStyle.titleItem }>{ title }</Text>
                  <Text style={ LikeFoodStyle.nameRes}>{ nameRes }</Text>
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
      data:
      [
       {title: "29 Apr 2019", data: [
                {key: require("../Media/listView/1.jpg"), title: "Title 1: test for long long long long text", rate: 4.5, price: 12000},
                {key: require("../Media/listView/2.jpg"), title: "Title 2", rate: 5, price: 40000}
        ]},
        {title: "28 Apr 2019", data: [
                {key: require("../Media/listView/3.jpg"), title: "Title 3", rate: 3, price: 20000},
                {key: require("../Media/listView/4.jpg"), title: "Title 4", rate: 4.5, price: 23000},
                {key: require("../Media/listView/5.jpg"), title: "Title 5", rate: 4.5, price: 17000},
                {key: require("../Media/listView/6.jpg"), title: "Title 6", rate: 4.5, price: 6000}
          ]},
        {title: "27 Apr 2019", data: [
                {key: require("../Media/listView/4.jpg"), title: "Title 4", rate: 4.5, price: 23000},
                {key: require("../Media/listView/5.jpg"), title: "Title 5", rate: 4.5, price: 17000},
                {key: require("../Media/listView/6.jpg"), title: "Title 6", rate: 4.5, price: 6000}
          ]}
      ],
          isEmpty: true,
          isConnected: true
      // Fetch data from database
      //----------------------------
      // Sort by time ---------
    };
 }

 componentDidMount()
 {
         NetInfo.addEventListener('connectionChange', (data)=>{
               if (data.type === "unknown" || data.type === "none")
               {
                       this.setState({isConnected: false});
               }
               else {
                       this.setState({isConnected: true});
               }
         });
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
          );
    }
    else {
            return(
              <View style={ LikeFoodStyle.container }>
                    <SectionList
                        showsVerticalScrollIndicator={false}
                        sections={ this.state.data }
                        keyExtractor={(item, index) => item + index}
                        renderSectionHeader={({section: {title}}) => ( <Text style={ LikeFoodStyle.titleSection }>{title}</Text> )}
                        renderItem={( {item, index, section} ) => <LikedFoodItem
                                                                          imageURL={item.key}
                                                                          title={item.title}
                                                                          nameRes="Name of restaurant"
                                                                          handleOnPress={ ()=>this.props.navigation.push("DetailFood", {data: item}) }
                                                                    />  }
                    />
                    { message }
              </View>
            );
       }
  }
}
