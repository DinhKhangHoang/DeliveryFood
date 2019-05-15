import React, { Component } from "react";
import { Text, View, TouchableOpacity, Platform, Image } from "react-native";
import { gridStyle } from "../Style/style";
import ContentLoader from 'rn-content-loader';
import { Rect } from "react-native-svg";
import firebase from 'react-native-firebase';

class GridItem extends Component
{
  constructor(props)
  {
        super(props);
        this.state = { disabled: false, imgURL: ''  };
        this.handleOnPress = this.handleOnPress.bind(this);
  }
  // ================================================================================
  handleOnPress()
  {
    if (!this.state.disabled)
    {
          setTimeout( ()=>this.setState( { disabled:false } ), 1000);
          this.props.handleOnPress();
          this.setState( { disabled: true} );
    }
  }
 // ==================================================================================
   componentDidMount()
   {
           if (!this.props.loading && this.props.imgURL == '' &&  this.props.id)
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
    if ( loading)
    {
            return(
              <View style={ gridStyle.container }>
                    <View style={ gridStyle.wrapper }>
                        <View style={ gridStyle.titleWrapper }>
                              <Text style={ gridStyle.title }>{ this.props.title }</Text>
                        </View>
                        <View style={ gridStyle.listWrapper }>
                            <View style={{ width: "48%", height: 230}}>
                                <ContentLoader
                                       height={ gridStyle.cantLoading.height }
                                       width={ gridStyle.cantLoading.width }
                                       speed={2}>
                                    <Rect x="3%" y="0" rx="10" ry="10" width="90%" height="70%" />
                                    <Rect x="3%" y="75%" rx="5" ry="5" width="90%" height="5%" />
                                    <Rect x="3%" y="85%" rx="5" ry="5" width="50%" height="5%" />
                                    <Rect x="58%" y="85%" rx="5" ry="5" width="35%" height="5%" />
                                </ContentLoader>
                            </View>
                            <View style={{ width: "48%", height: 230}}>
                                <ContentLoader
                                       height={ gridStyle.cantLoading.height }
                                       width={ gridStyle.cantLoading.width }
                                       speed={2}>
                                    <Rect x="3%" y="0" rx="10" ry="10" width="90%" height="70%" />
                                    <Rect x="3%" y="75%" rx="5" ry="5" width="90%" height="5%" />
                                    <Rect x="3%" y="85%" rx="5" ry="5" width="50%" height="5%" />
                                    <Rect x="58%" y="85%" rx="5" ry="5" width="35%" height="5%" />
                                </ContentLoader>
                            </View>
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
                                            title={item.title}
                                            price={item.price}
                                            handleOnPress={ ()=>{ this.props.navigation.push( this.props.routename, { data: {id: item.id, title: item.title } } ) }}
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
