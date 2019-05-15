import React, { Component } from "react";
import { Text, View } from "react-native";
import { componentWithTitle } from "../Style/style";
import Anchor from "./anchor";
import PropTypes from 'prop-types';



export default class ComponentWithTitle extends Component
{
  render()
  {
    const { data, title = "This is no title", sndText = null, handleOnPressSndText = ()=>{} , containerStyle, dataStyle } = this.props;
    return (
      <View style={[componentWithTitle.wrapper, containerStyle]}>
          <View style={componentWithTitle.header}>
              <Text style={ [componentWithTitle.title, {width: (sndText === null ? "100%" : "70%")}] }>{ title }</Text>
              { sndText === null ? null : <Anchor
                  title=""
                  text={sndText}
                  textStyle={ componentWithTitle.text }
                  handleOnPress={handleOnPressSndText}
                  wrapperStyle={componentWithTitle.wrapperSnd}
              /> }
          </View>
          <View style={ [componentWithTitle.body, dataStyle] }>
              { data }
          </View>
      </View>
    );
  }
}

Anchor.propTypes = {
    //Data: du lieu phan body
    title: PropTypes.string.isRequired,
    sndText: PropTypes.string,
    handleOnPressSndText: PropTypes.func,
    containerStyle: PropTypes.object,
    dataStyle: PropTypes.object
};
