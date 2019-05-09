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
            setTimeout(this.closed, 5000);
    }
  }

  componentDidMount()
  {
          this.open();
  }

  render()
  {
    const {
             round = 40,
             top = "90%",
             padding = 0,
             secondText = null,
             backgroundColor = "#3B3B3B",
             icon = {name: "closecircle", type: "antdesign", color: "white", onPress: this.closed },
             color = "white",
             textStyle
     } = this.props;
    return(
      <Animated.View style={ [messageStyle.wrapper, {opacity: this.fadeAnimation, borderRadius: round, backgroundColor: backgroundColor, top: top, padding: padding}] }>
          <View style={{ width: "85%" }}>
                <Text style={ [messageStyle.text, {color: color, ...textStyle }] }>{ this.props.text }</Text>
                { secondText }
          </View>
          <View style={{...flexStyle.wrapper, width: "15%"}}>
                <Icon
                      name={icon.name}
                      type={icon.type}
                      color={icon.color}
                      onPress={ icon.onPress }
                      underlayColor="transparent"
                  />
            </View>
      </Animated.View>
    );
  }
}
