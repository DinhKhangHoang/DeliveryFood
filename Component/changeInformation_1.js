import React, { Component } from "react";
import { Alert, AppRegistry, Text, View, TextInput, StyleSheet, color, Button } from "react-native";
import { accountStyle } from "../Style/style";
import firebase from 'react-native-firebase';

export default class ChangeInformation_1 extends Component {
	static navigationOptions = {
		header: null
	};

	constructor(props)
	{
				super(props);
				this.state = { name: '' /* Them thuoc tinh state ne */ };
				this._onPressButton = this._onPressButton.bind(this);
	}

	componentDidMount()
	{
				const data = this.props.navigation.getParam("data");
				this.setState({
						 name: data["Name" + global.UserType.substr(0, 3).toUpperCase() ]
				});
	}

	_onPressButton() {
		let item;
		if (global.UserType == "Restaurant")
					item = {
							NameRES: this.state.name,
							// Them day ne
					};
		else
					item = {
						NameCUS: this.state.name,
						// Them day ne
					};
		firebase.firestore().collection( global.UserType + "s" ).doc( firebase.auth().currentUser.uid).update({ ...item });
		Alert.alert('Data is saved',
								'',
							 	[{text: 'Ok', onPress: () => this.props.navigation.goBack()}] )
	}
	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.textMessage}>Users name:</Text>
				<TextInput
					style={styles.input}
					onChangeText={ (text)=>this.setState({ name: text }) }
					value={ this.state.name }
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
