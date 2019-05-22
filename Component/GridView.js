import React, { Component } from "react";
import { Text, View, TouchableOpacity, Platform, Image, ActivityIndicator } from "react-native";
import { gridStyle } from "../Style/style";
import firebase from 'react-native-firebase';

class GridItem extends Component
{
  constructor(props)
  {
        super(props);
        this.state = { disabled: false, imgURL:  ' '  };
        this.handleOnPress = this.handleOnPress.bind(this);
  }
  // ================================================================================
  handleOnPress()
  {
    if (!this.state.disabled)
    {
            this.props.handleOnPress();
          setTimeout( ()=>this.setState( { disabled:false } ), 1000);
          this.setState( { disabled: true} );
    }
  }
 // ==================================================================================
   componentDidMount()
   {
           if (!this.props.loading && this.props.imgURL == ' ' &&  this.props.id)
           {
                 firebase.storage().ref().child("/FoodImage/" + this.props.id + ".jpg").getDownloadURL().then(url=>{
                        this.setState({ imgURL: url });
                  });
           }
   }

  render()
  {
    const { title = "", price = 0, loading = false } = this.props;

    if ( Platform.OS === 'android' ) {
            require('intl');
            require('intl/locale-data/jsonp/en');
    }
          return(
            <TouchableOpacity  onPress={ this.handleOnPress } activeOpacity={0.7} style={ gridStyle.wrapperItem }>
                  <Image
                          source={{uri: this.state.imgURL}}
                          style={ gridStyle.image }
                          resizeMethod="resize"
                  />
                  <View style={ gridStyle.inforItem }>
                        <Text numberOfLines={1} style={ gridStyle.titleItem }>{ title }</Text>
                        <Text style={ gridStyle.priceItem }>{ new Intl.NumberFormat('en').format( price )  + " đ"}</Text>
                  </View>
            </TouchableOpacity>
          );
  }
}




export default class GridView extends Component
{
  //====== Constructor =========================================================================================
  constructor(props)
  {
    super(props);
    this.state = {
      data: [ ],
    };
  }
  //====== Render function =========================================================================================
  render()
  {
    const { data, loading } = this.props;
    if ( loading )
    {
            return(
              <View style={ gridStyle.container }>
                    <View style={ gridStyle.wrapper }>
                        <View style={ gridStyle.titleWrapper }>
                              <Text style={ gridStyle.title }>{ this.props.title }</Text>
                        </View>
                        <View style={{width: "100%", height: 150, display: "flex", justifyContent: 'center', alignItems: 'center'}}>
                            <ActivityIndicator />
                        </View>
                    </View>
              </View>
            );
    }
    else
    {
            return(
              <View style={ gridStyle.container }>
                    <View style={ gridStyle.wrapper }>
                        <View style={ gridStyle.titleWrapper }>
                              <Text style={ gridStyle.title }>{ this.props.title }</Text>
                        </View>
                        <View style={ gridStyle.listWrapper }>
                              {
                                    data.map(  (item, index) => { return (
                                      <GridItem
                                            id={item.id}
                                            key={index}
                                            loading={false}
                                            imgURL={item.key}
                                            title={item.data.Name}
                                            price={item.data.Price}
                                            handleOnPress={ ()=>{ this.props.navigation.push( this.props.routename, { data: {id: item.id, title: item.data.Name } } ) }}
                                      />
                                 )} )
                            }
                        </View>
                    </View>
              </View>
            );
      }
  }
}
