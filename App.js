import React, {Component} from 'react';
import { Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import firebase from 'react-native-firebase';
import SplashScreen from './Component/splashScreen';
import { MainScreen } from "./Component/mainScreen";
import NetInfo from "@react-native-community/netinfo";
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
import CartCustomer from "./Component/CartCustomer";
*/
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
  this.getFoodData = this.getFoodData.bind(this);
  // ==================================================================

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
                    docCus.onSnapshot( docSnapshot => global.info = { key: docSnapshot.id, data: { name: docSnapshot.data().NameCUS }});
                    global.UserType = "Customer";
                }
        });

        setTimeout(()=>{
                    docRes.get().then(
                        (info)=>{
                             if (info.exists)
                             {
                               global.info = { key: info.id, data: info.data() };
                               docRes.onSnapshot( docSnapshot => global.info = { key: docSnapshot.id, data: { name: docSnapshot.data().NameRES }});
                               global.UserType = "Restaurant";
                             }
                        });
                }, 50);
   }
   // ----- User is not logged in ----------------------------------------------------------------------------------------------
  else
    {
          global.UserType = "Customer"   // anonymous user
          global.info = null;
    }
// --------------------------------------------------------------------------------------------------------------------------------
}  // -- end getInfoUser -------


 async getFoodData()
 {
       global.foodData = {
              swiper: [],
              dessert: [],
              main: [],
              grid: [],
              isFetchedData: false
       };
       // ===================================================================
      const isConnected = await NetInfo.isConnected.fetch();
      if (isConnected)
      {
                  const storageRef = firebase.storage().ref();
                  const firestore = firebase.firestore().collection("Food");
                  // =================================================================================================
                  firestore.where("rating", ">=", 0).orderBy("rating", "desc").limit(30).get().then(data => {
                          data.forEach(
                                function (i)
                                {
                                      const item = {
                                                        key: ' ',
                                                        id: i.id,
                                                        title: i.data().Name,
                                                        resID: i.data().ID_RES,
                                                        type: i.data().TypeOfFood,
                                                        rate: i.data().rating,
                                                        price: i.data().Price
                                                   };
                                     if (global.foodData.swiper.length < 6 && global.foodData.swiper.findIndex(obj => obj.id == item.id) == -1)
                                            global.foodData.swiper.push( item )
                                     else
                                     {
                                             if (item.type === "maincourse" && global.foodData.main.length < 6 && global.foodData.main.findIndex(obj => obj.id == item.id) == -1)
                                                    global.foodData.main.push( item );
                                            else if (item.type === "dessert" && global.foodData.dessert.length < 6 && global.foodData.dessert.findIndex(obj => obj.id == item.id) == -1)
                                                    global.foodData.dessert.push( item );
                                            else if ( global.foodData.grid.length < 10 && global.foodData.grid.findIndex(obj => obj.id == item.id) == -1) { global.foodData.grid.push( item ); }
                                    }
                           });
                  });

                  const sleep = (milliseconds) => { return new Promise(resolve => setTimeout(resolve, milliseconds)) }

                  while (true) {
                        await sleep(100);
                        if ( global.foodData.grid.length >= 5)
                        {
                              global.foodData.isFetchedData = true;
                              break;
                        }

                }
      }
 }


async componentDidMount()
{
      this.getInfoUser();
      this.unsubscriber = firebase.auth().onAuthStateChanged((puser) => {
              this.setState({ user: puser });
              this.getInfoUser();
        });
      global.foodLoading = this.getFoodData;
      global.getUser = this.getInfoUser();
      await this.getFoodData();
      this.setState({ isLoaded: true });
}

  render() {
    // -------- Loading and splashscreen -------------------------------------
    if (this.state.isLoaded === false)
      // Load data from database...
      return (<SplashScreen />);
    else
    {
      const Main = createAppContainer(MainScreen);
      return ( <Main /> );
    };
  }
}
