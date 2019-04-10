import React, { Component } from "react";
import { Alert, AppRegistry, Text, View, TextInput, StyleSheet, color, Button } from "react-native";
import { PersonalInfor, accountStyle } from "../Style/style";


export default class ChangeInfor extends Component
{
  static navigationOptions = {
                    title: 'Personal Information',
                    headerTitleStyle:  accountStyle.titleStyle
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
				placeholderTextColor="#00008b"
				autoCapitalize="none"
			/>	
			<Text style={styles.textMessage}>Phone Number:</Text>
			<TextInput style={styles.input}
				underlineColorAndroid="transparent"
				placeholder="0123456789"
				placeholderTextColor="#00008b"
				autoCapitalize="none"
			/>	
			<Text style={styles.textMessage}>Address:</Text>
			<TextInput style={styles.input}
				underlineColorAndroid="transparent"
				placeholder="Linh Trung,Thu Duc"
				placeholderTextColor="#00008b"
				autoCapitalize="none"
			/>	
			<Button
				title="Save"
				color="green"
				onPress={this._onPressButton}
			/>
		</View>
    );
  }
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		justifyContent: 'flex-start',
		paddingTop: 30
	},
	input: {
		margin: 15,
		height: 40,
		borderColor: '#7a42f4',
		borderWidth: 1
	},
	textMessage: {
		marginTop: 16,
		fontSize: 20,
		color: 'green'
	},
})

