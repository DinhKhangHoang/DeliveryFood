import React, {Component} from 'react';
import { Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import firebase from 'react-native-firebase';
import SplashScreen from './Component/splashScreen';
import { MainScreen } from "./Component/mainScreen";
//--------------------------------------------------------------------
/*
import Login from './Component/login';
import Register from './Component/register';
import MySwiper from './Component/Swiper';
import AccountPage from "./Component/Account";
import ListView from "./Component/ListView";
import ComponentWithTitle from "./Component/ComponentWithTitle";
import DetailFood from "./Component/DetailFood";
import Booking from "./Component/Booking";
import BookingTable from "./Component/BookingTable";
import RestaurantInfor from "./Component/restaurantInfor";
import GridView from "./Component/GridView";
import { NotificationItem } from "./Component/Notification";
import Message from "./Component/Message";
import LikedFood from "./Component/LikeFood";
*/

import CartCustomer from "./Component/CartCustomer";
//---------------------------------------------------------------------

export default class App extends Component {
constructor(props)
{
  super(props);
  this.state = {
      isAuth: false,
      isLoaded: false,
      user: firebase.auth().currentUser,
  };
  this.ref = firebase.firestore();
  this.getInfoUser = this.getInfoUser.bind(this);
}


getInfoUser()
{
  // ---- Get user information --------------------------------------------------------------------------------------------------
   if (this.state.user)
     {
       // Get both customer and restaurant collections -------------------------------------------------------------------------
       const docCus = 	this.ref.collection("Customers").doc( firebase.auth().currentUser.uid );
       const docRes =   this.ref.collection("Restaurants").doc( firebase.auth().currentUser.uid );
       // --- Assume this is customer ------------------------------------------------------------------------------------------
         docCus.get().then(
             (info)=>{
               if (info.exists)
               {
                    global.info = { key: info.id, data: info.data() };
                    docCus.onSnapshot( docSnapshot=>global.info = { key: docSnapshot.id, data: docSnapshot.data() });
                    global.UserType = "Customer";
                }
             }
         );
        setTimeout(()=>{
          if (!global.info)
          {
                  docRes.get().then(
                      (info)=>{
                        if (info.exists)
                        {
                             global.info = { key: info.id, data: info.data() };
                             docRes.onSnapshot( docSnapshot=>global.info = { key: docSnapshot.id, data: docSnapshot.data() });
                             global.UserType = "Restaurant";
                         }
                      }
                  );
          }
        }, 50);
   }
   // ----- User is not logged in ----------------------------------------------------------------------------------------------
  else
    {
          global.UserType = "Customer"   // anonymous user
          global.info = null;
    }
// --------------------------------------------------------------------------------------------------------------------------------
}

 componentDidMount() {
 // --- Add listener to user changing ----------------------------------------------------------------------------------------------
    this.unsubscriber = firebase.auth().onAuthStateChanged((puser) => {
            this.setState({ user: puser });
            this.getInfoUser();
      });
  }


  render() {
    // -------- Loading and splashscreen -------------------------------------
    if (this.state.isLoaded === false)
    {
      // Load data from database...


      // Pseudo time-consuming function
      //this.setState({...this.state, isLoaded: true});
      setTimeout( ()=>this.setState({...this.state, isLoaded: true}), 1000);
      return (<SplashScreen />);
    }
    else
    {
      const Main = createAppContainer(MainScreen);
      return (
            <Main />
    )};
  }
}
