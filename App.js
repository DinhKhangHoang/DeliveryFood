import React, {Component} from 'react';
import { Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import firebase from 'react-native-firebase';
import SplashScreen from './Component/splashScreen';
import { MainScreen } from "./Component/mainScreen";
//--------------------------------------------------------------------
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
}


 componentDidMount() {

    this.unsubscriber = firebase.auth().onAuthStateChanged((puser) => {
            this.setState({ ...this.state, user: puser });
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

/*
   return (
     <Booking />
      );
*/
  }
}
