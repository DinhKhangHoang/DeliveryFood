
import React, { Component } from "react";
import { Alert, AppRegistry, Text, View, TextInput, StyleSheet, color, Button } from "react-native";
import { accountStyle } from "../Style/style";


export default class ChangeInfor extends Component
{
  static navigationOptions = {
                    title: 'Personal Information',
                    headerTitleStyle:  { ...accountStyle.titleStyle, color: "white" },
                    headerStyle:{
                          backgroundColor: "#0078D7",
                    },
  };
	_onPressButton() {
		Alert.alert('Data is saved')
	}
  render()
  {
    return(
		<View style={styles.container}>
			<Text style={styles.textMessage}>Users name:</Text>
			<TextInput style={styles.input}
				underlineColorAndroid="transparent"
				placeholder="Nguyen Van A"
				placeholderTextColor="gray"
				autoCapitalize="none"
			/>
			<Text style={styles.textMessage}>Phone Number:</Text>
			<TextInput style={styles.input}
				underlineColorAndroid="transparent"
				placeholder="0123456789"
				placeholderTextColor="gray"
				autoCapitalize="none"
			/>
			<Text style={styles.textMessage}>Address:</Text>
			<TextInput style={styles.input}
				underlineColorAndroid="transparent"
				placeholder="Linh Trung,Thu Duc"
				placeholderTextColor="gray"
				autoCapitalize="none"
			/>
      <View style={{width: "100%", marginTop: 20}}>
      <Button
				title="Save"
				color="#0078D7"
				onPress={this._onPressButton}
			/>
      </View>
		</View>
    );
  }
}

const styles = StyleSheet.create({
	container: {
    flex: 1,
		paddingTop: 30,
    width: "90%",
    alignItems: "center",
    marginLeft: "5%"

	},
	input: {
		marginVertical: 15,
		height: 40,
		borderColor: 'gray',
		borderWidth: 1,
    borderRadius: 5,
    width: "80%"
	},
	textMessage: {
		marginTop: 16,
		fontSize: 16,
    fontWeight: "bold",
    paddingLeft: 15,
		color: '#0078D7',
    width: "100%"
	},
})

import React, { Component } from "react";
import { Alert, AppRegistry, Text, View, TextInput, StyleSheet, color, Button } from "react-native";
import { accountStyle } from "../Style/style";
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { StackNavigator } from 'react-navigation';
import ChangeInformation_1 from './changeInformation_1'

class ChangeInformation extends Component {
	static navigationOptions = {
		header: null
	};
	render() {
		return (
			<View style={styles.container}>
				<View style={styles.textMessage}>
					<Text> Users name: </Text> 
					<Text>Nguyen Van A</Text>
				</View>
				<View style={styles.textMessage}>
					<Text> Phone Number: </Text>
					<Text>0123456789</Text>
				</View>
				<View style={styles.textMessage}>
					<Text> Address: </Text>
					<Text>Ki tuc xa khu A</Text>
				</View>
				<View style={{ width: "100%", marginTop: 20 }}>
					<Button
						title="Change Information"
						onPress={() => this.props.navigation.navigate('ChangeInformation_1')}
						color="blue"
					/>
				</View>
			</View>
		);
	}
}


export default class ChangeInfor extends Component
{
  static navigationOptions = {
                    title: 'Personal Information',
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
	paddingLeft: 15,
	color: '#0078D7',
	width: "100%",
	flexDirection: 'row',
	},
})
