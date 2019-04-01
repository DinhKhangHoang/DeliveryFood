import React, { Component } from "react";
import { Text, View, FlatList, ImageBackground } from "react-native";
import {createStackNavigator, createAppContainer} from 'react-navigation';
import firebase from 'react-native-firebase';
import { Avatar } from "react-native-elements";
import { accountStyle } from '../Style/style';
import RoundButton from './roundButton';
import Login from './login';
import Register from './register';
import AnchorIcon from './anchorIcon';
import ChangeInfor from "./changeInformation";
import FManagement from "./FoodManagement";



// Define a home class for account that haven't logged in yet.
class HomeNotLogIn extends Component
{
    static navigationOptions = {
                    header: null
            };
  render()
  {
    return (
        <View style={accountStyle.Wrapper}>
        <ImageBackground source={require("../Media/wallpaper/homeNotLogIn.jpg")} style={[{width: "100%", height: "100%"}, accountStyle.Wrapper]} imageStyle={{opacity: 0.2}} >
          <Text style={accountStyle.notLogInHeading}>You have not logged in yet.</Text>
             <View style={{display: "flex", flexDirection: "row", padding: 10}}>
                <RoundButton
                      textColor="white"
                      text="Log in"
                      background="#014D40"
                      round={10}
                      boxStyle={{marginHorizontal: 5, width: "40%"}}
                      handleOnPress={()=>{ this.props.navigation.navigate("LogIn"); }}
                      underlayColor="#014D40"
                 />
                <RoundButton
                        textColor="#014D40"
                        text="Sign up"
                        background="#FFFFFF"
                        boxStyle={{marginHorizontal: 5, borderWidth: 1, borderColor: "black", width: "40%"}}
                        round={10}
                        handleOnPress={()=>{ this.props.navigation.navigate("SignUp"); }}
                        underlayColor="#D9E2EC"
                  />
             </View>
          </ImageBackground>
        </View>
    );
  }
}

//----------------------------------------------------------------------------
class AccountNotLogIn extends Component
{
    // Render functions and make navigation
    render()
    {
        const Nav = createAppContainer(createStackNavigator({
          Home: { screen: HomeNotLogIn },
          LogIn: { screen: Login },
          SignUp: { screen: Register }
        },
        {
          initialRouteName: "Home"
        }
      ));
      return (<Nav />);
    }
}

//----------------------------------------------------------------------------
class HomeLogIn extends Component
{
    static navigationOptions = {
                    header: null
            };
  render()
  {
    return (
      <View style={accountStyle.Wrapper}>
          <View style={accountStyle.title}>
              <Avatar
                  icon = {{type: "font-awesome", name: "user", color: "white"}}
                  rounded
                  activeOpacity={0.7}
                  size = "large"
                  showEditButton
                  onPress={ ()=>{} }
              />
              <View style={{display: "flex", alignItems: 'center', justifyContent: 'center', height: "35%"}}>
                <Text style={accountStyle.username} >{ firebase.auth().currentUser.email }</Text>
              </View>
          </View>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={[
              {key: "Personal Information", handleOnPress: ()=>{}, icon: {name: "persona", type: "zocial", color: "#3D4DB8", name: "PersonInfor"}},
              {key: "Food Management", handleOnPress: ()=>{}, icon: {name: "food", type: "material-community", color: "#89C440", name: "FoodManagement"}},
              {key: 'Log out', handleOnPress: ()=>firebase.auth().signOut(), icon: {name: "logout", type: "material-community", color: "#FF5606"} },
            ]}
            renderItem={({item}) => <AnchorIcon
                                      textStyle={ accountStyle.notLogInText }
                                      text={ item.key }
                                      handleOnPress={ item.handleOnPress }
                                      icon = { item.icon }/>
                        }
          />
        </View>);
   }
}


//----------------------------------------------------------------------------
class AccountLogIn extends Component
{
      // Making navigation
      render()
      {
          const Nav = createAppContainer(createStackNavigator({
            Home: { screen: HomeLogIn },
            PersonInfor: { screen: ChangeInfor },
            FoodManagement: { screen: Login }
          },
          {
            initialRouteName: "Home"
          }
        ));
        return (<Nav />);
      }
}


//----- Main Class -----------------------------------------------------------------------
export default class AccountPage extends Component
{
  constructor(props)
  {
    super(props);
    this.state = { user: null }
  }


  componentDidMount()
  {
    firebase.auth().onAuthStateChanged( (currentUser)=>this.setState({ ...this.state, user: currentUser }));
    const { currentUser } = firebase.auth();
    this.setState({...this.state, user: currentUser});
  }
  render()
  {
    if (this.state.user) { return ( <AccountLogIn /> ); }
    else { return ( < AccountNotLogIn />); }
  }
}
