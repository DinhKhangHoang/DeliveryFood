import React, { Component } from "react";
import { Alert, AppRegistry, Text, View, TextInput, StyleSheet, color, Button } from "react-native";
import { accountStyle } from "../Style/style";


export default class ChangeInformation_1 extends Component {
	static navigationOptions = {
		header: null
	};
	_onPressButton() {
		Alert.alert('Data is saved')
	}
	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.textMessage}>Users name:</Text>
				<TextInput style={styles.input}
					underlineColorAndroid="transparent"
					autoCapitalize="none"
				/>
				<Text style={styles.textMessage}>Phone Number:</Text>
				<TextInput style={styles.input}
					underlineColorAndroid="transparent"
					autoCapitalize="none"
				/>
				<Text style={styles.textMessage}>Address:</Text>
				<TextInput style={styles.input}
					underlineColorAndroid="transparent"
					autoCapitalize="none"
				/>
				<View style={{ width: "100%", marginTop: 20 }}>
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
