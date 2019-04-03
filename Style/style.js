import { StyleSheet, Dimensions } from 'react-native';


const { width, height } = Dimensions.get('window');
// This is style for splash screen
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

});


export const componentWithTitle = StyleSheet.create({
      wrapper:
      {
        width: "100%",
      },
      header:
      {

      },
      body:
      {

      },
      wrapperSnd:
      {

      },
      title:
      {

      },
      text:
      {

      }
});
