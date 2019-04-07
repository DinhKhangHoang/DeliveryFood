import { StyleSheet, Dimensions } from 'react-native';


const { width, height } = Dimensions.get('window');
// This is style for splash screen
export const flexStyle = StyleSheet.create({
    wrapper:
    {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    }
});

export const splashStyle = StyleSheet.create({
  wrapper: {
    flex: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 20
  },
  icon: {
      width: 75,
      height: 75,
      marginBottom: 15
  },
  text: {
        fontSize: 30,
        color: '#1F9F5F',
        fontWeight: 'bold',
  },
  copyright:
  {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  textCopyright:
  {
    fontSize: 14,
    color: '#1F9F5F',
  },
    loading:
    {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white'
    },
});


// This is style for round button
export const roundButtonStyle = StyleSheet.create(
  {
      general: {
          display: 'flex',
          padding: 5,
      },
      text:
      {
          fontSize: 18,
          width: '100%',
          textAlign: 'center',
          fontWeight: 'bold',
          paddingHorizontal: 10,
          paddingVertical: 5
      }
  }
);

// This is style for button which has an icon
export const roundButtonIconStyle = StyleSheet.create({
  general: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  icon: {
    position: 'relative',
    zIndex: 9,
    right: 40
  }
});


// This is style for anchor
export const anchorStyle = StyleSheet.create({
  text: {
    width: '100%',
    textAlign: 'center',
    padding: 10
  }
});


export const anchorIconStyle = StyleSheet.create({
  wrapper:
  {
    display: "flex",
    width: "100%",
    marginHorizontal: 15,
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.2)"
  },
  text:
  {
    ...anchorStyle.text,
    textAlign: "left"
  },
  icon:
  {
      paddingHorizontal: 15,
  }
});

// This is style for login form
export const loginStyle = StyleSheet.create({
  wrapper: {
    backgroundColor: "transparent",
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: "absolute",
    height: height - 20,
    width
  },
  text:
  {
    fontSize: 12,
    textAlign: "right",
    marginTop: 10,
    color: "#014D40",
    fontWeight: "bold"
  },
  title:
  {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    color: "#014D40",
    fontSize: 40,
    fontWeight: "bold",
    marginTop: 50,
  },
  scrollView:
  {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
});

// Style for register component
export const registerStyle = StyleSheet.create({
  wrapper:
  {
      backgroundColor: "transparent",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      height,
      width
  },
  text:
  {
      fontSize: 40,
      color: '#014D40',
      textAlign: "center",
      width: "100%",
      justifyContent: "center",
      marginTop: 50,
      marginBottom: 70,
      fontWeight: "bold"
  },
  form:
  {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  picker:
  {
    display: "flex",
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5
  }
});


// Style for Account component
export const accountStyle = StyleSheet.create({
      Wrapper:
      {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
      },
      notLogInHeading:
      {
            fontSize: 22,
            padding: 10,
            fontWeight: "bold"
      },
      notLogInText:
      {
            fontSize: 16,
            padding: 5,
            color: "black"
      },
      titleStyle:
      {
        fontWeight: "bold",
        fontSize: 20
      },
      title:
      {
        display: "flex",
        flexDirection: "row",
        paddingHorizontal: 20,
        paddingBottom: 40,
        width,
        height: height * 0.2,
        backgroundColor: "#6733B9",
        alignItems: 'flex-end'
      },
      username:
      {
        color: "white",
        fontSize: 18,
        marginLeft: 30
      }
});


// Style for HomeCustomer component
export const homeStyle = StyleSheet.create({
      wrapper:
      {
        flex: 1,
        backgroundColor: "#EAEAEA"
      },
      scroll:
      {
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: 'flex-start',
          alignItems: "center"
      },
});

// Style for swiper component
export const swiperStyle = StyleSheet.create({
    container:
    {
      display: "flex",
      backgroundColor: "white",
    },
    swiperItem:
    {
      display: "flex",
      justifyContent: "center",
      width,
      height: height * 0.4,
    },
    textOnSwiper:
    {
          fontSize: 30,
          width,
          fontWeight: "bold",
          color: "white",
          position: 'absolute',
          top: height * 0.2 + 40,
          paddingVertical: 30,
          paddingHorizontal: 20,
          backgroundColor: "rgba(0, 0, 0, 0.5)"

    },
    imageOnSwiper:
    {
          width:  width,
          height: height * 0.4,
    }
});

// Style for header component
export const headerStyle = StyleSheet.create({
      wrapper:
      {
        backgroundColor: "#5B9642",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: 60,
        flexDirection: "row"
      }
});


// Style for listView component
export const listViewStyle = StyleSheet.create({
    item:
    {
          height: 200,
          width: 150,
          margin: 5,
          paddingBottom: 10,
          backgroundColor: "white",
          borderWidth: 1,
          borderColor: "rgba(0, 0, 0, 0.2)",
          borderRadius: 4
    },
    wrapper:
    {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    image:
    {
        width: "100%",
        height: "70%",
        borderRadius: 3
    },
    text:
    {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 16,
        paddingVertical: 10
    },
    rateWrapper:
    {
      backgroundColor: "#227100",
      borderRadius: 40,
      display: "flex",
      flexDirection: "row",
      width: "30%",
      justifyContent: "center",
      alignItems: "center",
      padding: 3
    },
    wrapperRateAndPrice:
    {
      display: "flex",
      flexDirection: "row",
      width: "100%",
      height: "10%",
      justifyContent: "center",
      alignItems: "center"
    },
    priceWrapper:
    {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      width: "60%",
    }
});


export const PersonalInfor = StyleSheet.create({

});


export const FoodManagement = StyleSheet.create({

});


export const  CartStyle = StyleSheet.create({

});


export const detailFood = StyleSheet.create({
    wrapper:
    {
          width: "100%",
          height: "100%",
          display: "flex",
          position: 'relative'
    },
    image:
    {
          width: "100%",
    },
    title:
    {
          fontSize: 20,
          padding: 5,
          marginVertical: 5,
          textAlign: "center",
          fontWeight: "bold"
    },
    price:
    {
          width: "40%",
          fontSize: 18,
          color: "#5B9642",
          fontWeight: "bold",
          paddingLeft: 20,
          textAlign: "left",
    },
    foodInfor:
    {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 5,
        paddingTop: 0,
        marginBottom: 10,
        shadowOffset: { width: 10, height: 10 },
        shadowColor: 'black',
        shadowOpacity: 0.3,
        elevation: 3,
        backgroundColor: "white",
        width: "100%"

    },
    statusFood:
    {
        width: "90%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        paddingBottom: 5
    },
    titleAndPrice:
    {
        width: "90%"
    },
    textOnStatus:
    {
      fontSize: 14,
      textAlign: "left",
      width: "80%",
      padding: 5
    },
    wrapperItemStatus:
    {
      width: "40%",
      display: "flex",
      justifyContent: 'space-between',
      alignItems: "center",
      flexDirection: "row"
    }
});

export const resInfor = StyleSheet.create({
  wrapper:
  {
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "white",
  },
  name:
  {
      width: "65%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row"
  },
  locate:
  {
      width: "95%",
      marginLeft: 5,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row"
  },
  banner:
  {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
  },
  statistics:
  {
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      marginTop: 15,
      marginBottom: 5,
      backgroundColor: "#F2FDE0",
      borderRadius: 10,
      paddingVertical: 15,
  },
  statisticsWrapper:
  {
    width: "30%",
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  firstText:
  {
        fontSize: 16,
        fontWeight: "bold",
        color:"#227100",
        textAlign: "center"
  },
  secondText:
  {
        fontSize: 14,
        textAlign: "center"
  }
});

export const commentStyle = StyleSheet.create({
    wrapper:
    {
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderBottomWidth: 1,
          borderBottomColor: "rgba(0, 0, 0, 0.2)"
    },
    avatarAndName:
    {
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: 'row'
    },
    nameAndTime:
    {
          width: "70%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
    },
    content:
    {
          width: "80%",
          fontSize: 14,
          padding: 5,
          marginVertical: 10

    },
    nameText:
    {
        fontSize: 14,
        padding: 5,
        paddingLeft: 20,
        fontWeight: "bold",
        textAlign: "left",
        width: "100%"
    },
    timeText:
    {
          fontSize: 12,
          textAlign: "left",
          width: "80%",
          paddingLeft: 5
    },
    anchorWrapper:
    {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexDirection: "row",
      width: "20%"
    },
    time:
    {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      flexDirection: "row",
      paddingLeft: 6

    },
    inputWrapper:
    {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        marginVertical: 10,
        marginLeft: "5%"
    }
});


export const componentWithTitle = StyleSheet.create({
      wrapper:
      {
        width: "100%",
        backgroundColor: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        shadowOffset: { width: 10, height: 10 },
        shadowColor: 'black',
        shadowOpacity: 0.3,
        elevation: 3,
        paddingBottom: 5

      },
      header:
      {
          width: "90%",
          display: "flex",
          flexDirection: 'row',
          justifyContent: "center",
          alignItems: "center",
          padding: 5,
          borderBottomWidth: 1,
          borderBottomColor: "rgba(0, 0, 0, 0.2)",
          marginBottom: 5

      },
      body:
      {
          width: "90%",
          padding: 5,
          marginBottom: 5
      },
      wrapperSnd:
      {
            width: "30%",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "flex-end"
      },
      title:
      {
            fontSize: 16,
            textAlign: "left",
            fontWeight: "bold"
      },
      text:
      {
            width: "100%",
            textAlign: 'right',
            fontSize: 12,
      }
});


export const bookingStyle = StyleSheet.create({
  container:
  {
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
  },
  wrapper:
  {
        width: "85%",
        height: "70%",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        shadowOffset: { width: 10, height: 10 },
        shadowColor: 'black',
        shadowOpacity: 0.3,
        elevation: 3,
        backgroundColor: "white",
        padding: 10,
        borderRadius: 10,

  },
  image:
  {
          width: 100,
          height: 100,
          borderRadius: 50,
          marginLeft: 10
  },
  name:
  {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          backgroundColor: "#F2FDE0",
          borderRadius: 50,
          marginTop: 20
  },
  count:
  {
        marginVertical: 5,
        marginHorizontal: 4,
        width: "100%"

  },
  address:
  {
      marginVertical: 5,
      marginHorizontal: 4,
      width: "100%"
  },
  confirm:
  {
        borderTopWidth: 1,
        borderTopColor: "rgba(0, 0, 0, 0.2)",
        marginTop: 10,
        width: "100%",
        display: "flex",
        justifyContent: 'space-around',
        alignItems: "center",
        flexDirection: "row",
        paddingVertical: 10
  },
  adjustCount:
  {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          width: "60%",
          borderColor: "rgba(0, 0, 0, 0.2)",
          borderWidth: 1,
          borderRadius: 5,
          marginLeft: "20%"
  },
  text:
  {
    fontSize: 16,
    fontWeight: "bold",
    padding: 5,
    paddingVertical: 10,
    textAlign: 'left',
    width: "100%"
  },
  time:
  {
      marginVertical: 5,
      marginHorizontal: 4,
      width: "100%"
  },
  TouchableOpacity:
  {
    width: "30%",
    display: "flex",
    justifyContent: "center"
  },

  counting:
  {
     width: "40%",
     fontSize: 18,
     fontWeight: "bold",
     paddingVertical: 5,
     paddingHorizontal: 15,
     borderLeftWidth: 1,
     borderRightWidth: 1,
     borderColor: "rgba(0, 0, 0, 0.2)",
     textAlign: "center"
  }
});
