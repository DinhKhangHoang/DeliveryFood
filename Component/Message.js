import React, { Component } from "react";
import { Animated, Text, View } from "react-native";
import { Icon } from "react-native-elements";
import { messageStyle, flexStyle } from "../Style/style";


export default class Message extends Component
{
  constructor(props)
  {
        super(props);
        this.state = { isClosed: true };
        this.fadeAnimation = new Animated.Value(0);
        this.closed = this.closed.bind(this);
        this.open = this.open.bind(this);
  }


  closed()
  {
    if (!this.state.isClosed)
    {
          Animated.timing(this.fadeAnimation, {
            toValue: 0,
            duration: 700,
            useNativeDriver: true,
          }).start();
          this.setState( {isClosed: true} );
  }
}

  open()
  {
    if (this.state.isClosed)
    {
            Animated.timing(this.fadeAnimation, {
              toValue: 1,
              duration: 700,
              useNativeDriver: true,
            }).start();
            this.setState( {isClosed: false} );
            setTimeout(this.closed, 15000);
    }
  }

  componentDidMount()
  {
          this.open();
  }

  render()
  {
    return(
      <Animated.View style={ [messageStyle.wrapper, {opacity: this.fadeAnimation}] }>
          <Text style={ messageStyle.text }>{ this.props.text }</Text>
          <View style={{...flexStyle.wrapper, width: "15%"}}>
                <Icon
                      name="closecircle"
                      type="antdesign"
                      color="white"
                      onPress={ this.closed }
                      underlayColor="transparent"
                  />
            </View>
      </Animated.View>
    );
  }
}
