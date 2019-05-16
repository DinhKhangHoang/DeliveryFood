import React, { Component } from "react";
import { Text,StyleSheet,View,ListView,TouchableHighlight,Dimensions,Image,Animated,TextInput, Alert } from 'react-native';
import { SearchBar, Icon } from 'react-native-elements';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { headerStyle } from "../Style/style.js";
import { StackNavigator } from 'react-navigation';
import data from './datasearch'
import DetailFood from './DetailFood';
import Anchor from "./anchor";

const {width, height} = Dimensions.get('window')

 export default class Search extends Component{
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
    // componentDidMount() { this.setState({ text: this.props.searchText }); }
    // componentDidUpdate(props)
    // {
    //       if (props.searchText != this.props.searchText)
    //       {
    //             this.setState({ text: this.props.searchText });
    //             this.filterSearch(this.state.text);
    //       }
    // }

    renderRow(rowData){
        return (
            <TouchableHighlight onPress={() =>  {this.props.navigation.push('Detail', { data: {id: rowData.id, title:rowData.Name}} )}}>
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
                            <Text style={styles.text}>{rowData.Name}</Text>
                            <Text style={[styles.text, styles.textTitle]}>{rowData.Price}</Text>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }
    filterSearch(text){
        const newData = data.filter(function(item){
            const itemData = item.Name.toUpperCase()
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
                <View style={{display: "flex", flexDirection: "row" }}>
                      <TextInput
                          style={styles.textInput}
                          placeholder = "Search here..."
                          onChangeText={(text) => this.filterSearch(text)}
                          value={this.state.text}
                      />
                      <Anchor
                            text="BACK"
                            textStyle={{fontWeight: "bold", width: "100%", textAlign: "center"}}
                            wrapperStyle={{width: "20%",  height: 50}}
                            handleOnPress={()=>this.props.navigation.goBack()}
                      />
                </View>
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
        marginHorizontal: 10,
        width: "70%"
    },
    content: {
        zIndex: 1
    },
    footerContainer: {
       flexDirection: 'row',
       paddingHorizontal: 10,
       paddingVertical: 10,
       backgroundColor: 'white'
    },
    imageAvatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 5
    },
    text: {
        fontSize:20,
        color: 'black'
    },
    containerCell: {
        marginBottom: 10
    },
    textTitle: {
        fontSize: 20
    },
})
