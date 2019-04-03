import React, { Component } from "react";
import { Text, View, TouchableHighlight } from "react-native";
import { Icon } from "react-native-elements";
import PropTypes from 'prop-types';
import { anchorIconStyle } from '../Style/style.js';

export default class AnchorIcon extends Component
{
  render()
  {
    const { text, textStyle, wrapperStyle, icon } = this.props;
    return(
      <TouchableHighlight onPress={this.props.handleOnPress} style={[anchorIconStyle.wrapper, wrapperStyle]} underlayColor="rgba(0, 0, 0, 0.2)">
        <View style={{flex: 1,  flexDirection: "row", alignItems: 'center', justifyContent: 'flex-start'}}>
          <Icon name={icon.name} type={icon.type} color={icon.color} style={anchorIconStyle.icon} />
          <Text style={ [ textStyle, anchorIconStyle.text] }>{ text }</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

AnchorIcon.propTypes = {
  text: PropTypes.string.isRequired,
  textStyle: PropTypes.object,
  wrapperStyle: PropTypes.object,
  handleOnPress: PropTypes.func.isRequired,
  icon: PropTypes.object.isRequired
};
