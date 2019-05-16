import React, { Component } from "react";
import { Alert, AppRegistry, Text, View, TextInput, StyleSheet, color, Button, ScrollView, Dimensions } from "react-native";
import { Avatar } from "react-native-elements";
import { accountStyle } from "../Style/style";
import firebase from 'react-native-firebase';


const {height, width} = Dimensions.get('window');
export default class ChangeInformation_1 extends Component {
	static navigationOptions = {
		header: null
	};

	constructor(props)
	{
				super(props);
				this.state = { name: '',
                        PhoneNumber:'',
                        Email:'',
                        Address:'',
                        Birthday:'',
        };
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
							PhoneNumber:this.state.PhoneNumber,
              Email:this.state.Email,
              Address:this.state.Address,
					};
		else
					item = {
						NameCUS: this.state.name,
            Birthday:this.state.Birthday,
            PhoneNumber:this.state.PhoneNumber,
            Email:this.state.Email,
            Address:this.state.Address,
					};
		firebase.firestore().collection( global.UserType + "s" ).doc( firebase.auth().currentUser.uid).update({ ...item });
		Alert.alert('Data is saved',
								'',
							 	[{text: 'Ok', onPress: () => this.props.navigation.goBack()}] )
	}
	render() {
    if (global.UserType == "Restaurant") {
		return (
        	<ScrollView contentContainerStyle={{paddingVertical : 20}} showsVerticalScrollIndicator={false}>
        <View style={{width: "100%", height: "30%", display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <Avatar
                        icon = {{type: "font-awesome", name: "user", color: "white"}}
                        rounded
                        activeOpacity={0.7}
                        size = {120}
                    />
        </View>
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
          onChangeText={ (text)=>this.setState({PhoneNumber: text }) }
        	value={ this.state.PhoneNumber }
					underlineColorAndroid="transparent"
					autoCapitalize="none"
				/>
				<Text style={styles.textMessage}>Email:</Text>
				<TextInput style={styles.input}
          onChangeText={ (text)=>this.setState({Email: text }) }
          value={ this.state.Email }
					underlineColorAndroid="transparent"
					autoCapitalize="none"
				/>
        <Text style={styles.textMessage}>Address:</Text>
				<TextInput style={styles.input}
          onChangeText={ (text)=>this.setState({Address: text }) }
          value={ this.state.Address }
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
      			</ScrollView>
		);}
    else {
      return(
        	<ScrollView contentContainerStyle={{paddingVertical : 20}} showsVerticalScrollIndicator={false}>
          <View style={{width: "100%", height: "30%", display: "flex", justifyContent: "center", alignItems: "center"}}>
                      <Avatar
                          icon = {{type: "font-awesome", name: "user", color: "white"}}
                          rounded
                          activeOpacity={0.7}
                          size = {120}
                      />
          </View>
			 <View style={styles.container}>
				<Text style={styles.textMessage}>Users name:</Text>
				<TextInput
					style={styles.input}
					onChangeText={ (text)=>this.setState({ name: text }) }
					value={ this.state.name }
					underlineColorAndroid="transparent"
					autoCapitalize="none"
				/>
        <Text style={styles.textMessage}>Birthday:</Text>
        <TextInput style={styles.input}
          onChangeText={ (text)=>this.setState({Birthday: text }) }
          value={ this.state.Birthday }
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
				<Text style={styles.textMessage}>Phone Number:</Text>
				<TextInput style={styles.input}
          onChangeText={ (text)=>this.setState({PhoneNumber: text }) }
        	value={ this.state.PhoneNumber }
					underlineColorAndroid="transparent"
					autoCapitalize="none"
				/>
				<Text style={styles.textMessage}>Email:</Text>
				<TextInput style={styles.input}
          onChangeText={ (text)=>this.setState({Email: text }) }
          value={ this.state.Email }
					underlineColorAndroid="transparent"
					autoCapitalize="none"
				/>
        <Text style={styles.textMessage}>Address:</Text>
				<TextInput style={styles.input}
          onChangeText={ (text)=>this.setState({Address: text }) }
          value={ this.state.Address }
					underlineColorAndroid="transparent"
					autoCapitalize="none"
				/>
				<View style={{ width: "100%"}}>
					<Button
						title="Save"
						color="#0078D7"
						onPress={this._onPressButton}
					/>
				</View>
			</View>
    	</ScrollView>);}
	}
}

const styles = StyleSheet.create({
  container: {
			    flex: 1,
					paddingTop: 5,
			    width: "90%",
          height:0.9*height,
			    alignItems: "center",
					marginLeft: "5%",
					flexDirection: 'column',
	},
	input: {
		marginVertical: 10,
		height: 35,
		borderColor: 'gray',
		borderWidth: 1,
		borderRadius: 5,
		width: "80%"
	},
	textMessage: {
		marginTop: 10,
		fontSize: 16,
		fontWeight: "bold",
		paddingLeft: 15,
		color: '#0078D7',
		width: "90%"
	},
})
