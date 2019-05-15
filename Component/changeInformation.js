import React, { Component } from "react";
import { Alert, AppRegistry, Text, View, TextInput, StyleSheet, color, Button, ScrollView } from "react-native";
import { accountStyle } from "../Style/style";
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Avatar } from "react-native-elements";
import { StackNavigator } from 'react-navigation';
import ChangeInformation_1 from './changeInformation_1';
import firebase from 'react-native-firebase';


class MyText extends Component
{
	render()
	{
		const { containerStyle, title, value } = this.props;
		return(
			  <View style={ containerStyle }>
							<Text style={{width: "40%", fontWeight: "bold", color: "#0078D7", marginLeft: "5%"}}>{ title + ":"}</Text>
							<Text style={{width: "55%"}}>{ value }</Text>
				</View>
		);
	}
}


class ChangeInformation extends Component {
// ---- This is options for navigation tab bar -------------------------------------------------------------------------------
	static navigationOptions = {
		header: null
	};
// ---- Constructor -----------------------------------------------------------------------------------------------------------
constructor(props)
{
	super(props);
	this.state = { data: global.info.data, key: global.info.key }
}
// ---- After loading UI ------------------------------------------------------------------------------------------------------
componentDidMount()
{
	if (global.UserType === "Customer")
	  firebase.firestore().collection("Customers").doc( this.state.key ).onSnapshot( docSnapshot=> this.setState({ key: docSnapshot.id, data: docSnapshot.data() }) );
  else
	  firebase.firestore().collection("Restaurants").doc( this.state.key ).onSnapshot( docSnapshot=> this.setState({ key: docSnapshot.id, data: docSnapshot.data() }) );
}
// ---- Render function -------------------------------------------------------------------------------------------------------
	render() {
		const changeValue = ( global.UserType === "Restaurant" ?
						{
							"User name": "NameRES",
							"Phone number": "PhoneNumber",
							"Email": "Email",
							"Address": "Address"
						} : {
							"User name": "NameCUS",
							"Phone number": "PhoneNumber",
							"Birthday": "Birthday",
							"Email": "Email",
							"Address": "Address"
						}
			);
		return (
			<ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
							<View style={{width: "100%", height: "30%", display: "flex", justifyContent: "center", alignItems: "center"}}>
													<Avatar
															icon = {{type: "font-awesome", name: "user", color: "white"}}
															rounded
															activeOpacity={0.7}
															size = {120}
													/>
							</View>
							<View style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "90%"}}>
									{
													Object.keys(changeValue).map((name, index)=>{
														return (
																		<MyText
																						key={index}
																						containerStyle={ styles.textMessage }
																						title={ name }
																						value={ this.state.data[changeValue[name]] }
																		/>
														);
													})
									}
							</View>

						<View style={{ width: "90%", marginTop: "13%" }}>
										<Button
											title="Change Information"
											onPress={() => this.props.navigation.navigate('ChangeInformation_1')}
											color="blue"
										/>
						</View>
			</ScrollView>
		);
	}
}


export default class ChangeInfor extends Component
{
  static navigationOptions = {
                    title: "Detail Information",
                    headerTitleStyle:  { ...accountStyle.titleStyle, color: "white" },
                    headerStyle:{
                          backgroundColor: "#0078D7",
                    },
  };
  render()
  {
	  const Nav = createAppContainer(createStackNavigator({
		  ChangeInformation: { screen: ChangeInformation },
		  ChangeInformation_1: { screen: ChangeInformation_1 },
	  },
		  {
			  initialRouteName: "ChangeInformation"
		  }
	  ));
	  return (<Nav />);
  }
}

const styles = StyleSheet.create({
	container: {
			    flex: 1,
					paddingTop: 30,
			    width: "90%",
			    alignItems: "center",
					marginLeft: "5%",
					flexDirection: 'column',
	},
	textMessage: {
						marginTop: 16,
						fontSize: 50,
				    fontWeight: "bold",
						paddingLeft: 5,
						paddingVertical: 5,
						color: '#0078D7',
						width: "100%",
						flexDirection: 'row',
	},
})
