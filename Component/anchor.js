import React, { Component } from 'react';
import {Text, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';
import { anchorStyle } from '../Style/style.js';

export default class Anchor extends Component
{
  render()
  {
    const { text, textStyle, wrapperStyle } = this.props;
    return(
      <TouchableHighlight onPress={this.props.handleOnPress} style={wrapperStyle} underlayColor="transparent">
          <Text style={ [ textStyle, anchorStyle.text] }>{ text }</Text>
      </TouchableHighlight>
    );
  }
}

Anchor.propTypes = {
  text: PropTypes.string.isRequired,
  textStyle: PropTypes.object,
  wrapperStyle: PropTypes.object,
  handleOnPress: PropTypes.func.isRequired
};
