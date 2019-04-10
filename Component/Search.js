import React, { Component } from "react";
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { StackNavigator } from 'react-navigation';
import resultsearch from './resultsearch'

class Searchpage extends Component {
	render() {
		return (
			<View>
				<View style={styles.containImage}>
					<Image
						style={styles.imgLogo}
						resizeMode={'contain'}
						source={require('../Media/icon/KFC.png')}
					/>
					<View style={styles.containtext}>
						<Text style={styles.textMessage}>KFC</Text>
						<Text style={styles.textMessage}>123 Vo Van Ngan</Text>
					</View>
					<Button
						title="Menu"
						onPress={() => this.props.navigation.navigate('resultsearch')}
					color="blue"
	/>
				</View>
			</View>
		);
	}
}

export default class Search extends Component
{
  constructor(props)
  {
    super(props);
    this.state = {};
  }
  render()
  {
	  const Nav = createAppContainer(createStackNavigator({
		  Search: { screen: Searchpage },
		  resultsearch: { screen: resultsearch },
	  },
		  {
			  initialRouteName: "Search"
		  }
	  ));
	  return (<Nav />);
  }
}

const styles = StyleSheet.create({
	textMessage: {
		marginTop: 16,
		fontSize: 20,

	},
	containImage: {
		marginTop: 16,
		flexDirection: 'row',
		justifyContent: 'space-between'

	},
	imgLogo: {
		width: 100,
		height: 100,

	},
	containtext: {
		flexDirection: 'column',
		justifyContent: 'flex-start'
	},
});
