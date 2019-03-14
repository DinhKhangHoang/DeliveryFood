import { StyleSheet, Dimensions } from 'react-native';

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
          fontSize: 20,
          width: '100%',
          textAlign: 'center',
          fontWeight: 'bold'
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


// This is style for login form
export const loginStyle = StyleSheet.create({
  wrapper: {
    backgroundColor: "#1F4C61",
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: "absolute",
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 24
  },
  text:
  {
    fontSize: 12,
    textAlign: "right",
    marginTop: 10,
    color: "white",
    fontWeight: "bold"
  }
});


export const registerStyle = StyleSheet.create({
  wrapper:
  {
      backgroundColor: "#364860",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height - 20
  },
  text:
  {
      fontSize: 35,
      color: 'white',
      textAlign: "center",
      width: "100%",
      flex: 1,
      justifyContent: "center",
      marginTop: 50
  },
  form:
  {
    flex: 10,
    width: "80%",
    justifyContent: "center",
    alignItems: "center"
  },
  picker:
  {
    display: "flex",
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  }
});
