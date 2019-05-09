import React, { Component } from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import { roundButtonIconStyle, roundButtonStyle } from '../Style/style.js';
import PropTypes from 'prop-types';
import { Icon } from 'react-native-elements';

export default class RoundButtonIcon extends Component
{
    render() {
      const {
        textColor = "black",
        text, background = "#1F9F5F",
        round = 20 ,
        iconStyle,
        underlayColor = "transparent",
        size = 40,
        disabled = false
      } = this.props;
      return(
          <TouchableHighlight
              underlayColor={underlayColor}
              style={
                   [{...this.props.style},
                      roundButtonStyle.general,
                    { borderRadius: round,
                      backgroundColor: background}]}
              onPress = { this.props.handleOnPress }
              activeOpacity={ this.props.activeOpacity} 
              disabled={ disabled }>
               <View style={roundButtonIconStyle.general}>
                  <Text style={[roundButtonStyle.text, roundButtonIconStyle.text, {color: textColor}]}>{ text }</Text>
                  <Icon {...iconStyle} size={size} iconStyle={roundButtonIconStyle.icon}/>
               </View>
          </TouchableHighlight>
      );
    }
}


RoundButtonIcon.propTypes = {
  textColor: PropTypes.string,
  text: PropTypes.string.isRequired,
  background: PropTypes.string,
  round: PropTypes.number,
  //handleOnPress: PropTypes.func.isRequired,
  iconStyle: PropTypes.object.isRequired,
};
