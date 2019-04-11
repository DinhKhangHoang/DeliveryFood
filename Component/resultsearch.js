import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';


type Props = {};
export default class resultsearch extends Component<Props> {
	render() {
		return (
			<View>
				<View style={styles.containImage}>
					<Image
						style={styles.imgLogo}
						resizeMode={'contain'}
						source={require('../Media/icon/chizza.png')}
					/>
					<View style={styles.containtext}>
						<Text style={styles.textMessage}>combo chizza</Text>
						<Text style={styles.textMessage}>Gia: 142000</Text>
					</View>
				</View>
				<View style={styles.containImage}>
					<Image
						style={styles.imgLogo}
						resizeMode={'contain'}
						source={require('../Media/icon/garan.png')}
					/>
					<View style={styles.containtext}>
						<Text style={styles.textMessage}>ga ran</Text>
						<Text style={styles.textMessage}>Gia: 50000</Text>
					</View>
				</View>
			</View>
		);
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
		justifyContent: 'flex-start'
	},
	imgLogo: {
		width: 100,
		height: 100,
		margin: 5
	},
	containtext: {
		flexDirection: 'column',
		justifyContent: 'flex-start'
	},
});
