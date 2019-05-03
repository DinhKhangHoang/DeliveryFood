import React, { Component } from "react";
import { Text,StyleSheet,View,ListView,TouchableHighlight,Dimensions,Image,Animated,TextInput, Alert } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { StackNavigator } from 'react-navigation';
import data from '../data'
import RestaurantInfor from './restaurantInfor'

const {width, height} = Dimensions.get('window')

 class Searchpage extends Component {
   	static navigationOptions = {	header: null	};
    constructor(props){
        super(props)
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        this.state = {
            isLoaded: false,
            dataSource: ds.cloneWithRows(data),
            rotateY: new Animated.Value(0),
            translateX: new Animated.Value(width),
            menuAnimation: new Animated.Value(0),
            text: ''
        }
    }
    renderRow(rowData){
        return (
            <TouchableHighlight onPress={() => this.props.navigation.navigate('RestaurantInfor')}>
            <View style={styles.containerCell}>
                    <View style={styles.footerContainer}>
                        <View
                            style={styles.imageUser}
                        >
                            <Image
                                style={styles.imageAvatar}
                                source={{uri: rowData.avatar}}
                            />
                        </View>
                        <View style={styles.footerTextContainer}>
                            <Text style={styles.text}>{rowData.Restaurant}</Text>
                            <Text style={[styles.text, styles.textTitle]}>{rowData.Address}</Text>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }
    filterSearch(text){
        const newData = data.filter(function(item){
            const itemData = item.Restaurant.toUpperCase()
            const textData = text.toUpperCase()
            return itemData.indexOf(textData) > -1
        })
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(newData),
            text: text
        })
    }
    render(){
        return (
            <View style={styles.container}>
               <Animated.View
                    style={[styles.content, {
                        width: width,
                        backgroundColor: 'white',
                        flex: 1,
                        transform: [
                            {
                                perspective: 450
                            },
                            {
                                translateX: this.state.translateX.interpolate({
                                    inputRange: [0, width],
                                    outputRange: [width, 0]
                                })
                            },
                            {
                                rotateY: this.state.rotateY.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: ['0deg', '-10deg']
                                })
                            }
                        ]
                    }]}
                >

                    <TextInput
                        style={styles.textInput}
                        onChangeText={(text) => this.filterSearch(text)}
                        value={this.state.text}
                    />
                    <ListView
                        enableEmptySections={true}
                        style={styles.listContainer}
                        renderRow={this.renderRow.bind(this)}
                        dataSource={this.state.dataSource}
                    />
                </Animated.View>
            </View>
        )
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
		  RestaurantInfor: { screen: RestaurantInfor },
	  },
		  {
			  initialRouteName: "Search"
		  }
	  ));
	  return (<Nav />);
  }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    textInput: {
        height: 50,
        borderWidth: 1,
        borderColor: '#cecece',
        marginBottom: 10,
        marginHorizontal: 10
    },
    content: {
        zIndex: 1
    },
    footerContainer: {
       flexDirection: 'row',
       paddingHorizontal: 10,
       paddingVertical: 10,
       backgroundColor: 'green'
    },
    imageAvatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 5
    },
    text: {
        fontSize:20,
        color: '#fff'
    },
    containerCell: {
        marginBottom: 10
    },
    textTitle: {
        fontSize: 20
    },
})
