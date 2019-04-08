import React, {Component} from 'react';
import {Modal, Text, TouchableHighlight, View, Alert, Image} from 'react-native';
import {modalViewInfoStyle } from "../Style/style.js";
export default class ModalViewInfo extends Component {
  state = {
    modalVisible: true,
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  render(){
    const {imgURL, title = "", rate = 0, price} = this.props;
    return (
      <View style={{marginTop: 22, flexDirection: "column"}}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={ modalViewInfoStyle.item }>
              <Image
                  source={ imgURL }
                  style={ modalViewInfoStyle.image }
                  resizeMode='cover'
              />
              <Text style={ modalViewInfoStyle.text }>{ title }</Text>
              <View style={ modalViewInfoStyle.wrapperRateAndPrice }>
                  <View style={ modalViewInfoStyle.rateWrapper }>
                      <Icon name="star" type="antdesign" color="white" size={15} />
                      <Text style={{color: "white", fontSize: 10, marginLeft: 5}}>{ rate }</Text>
                  </View>
                  <View style={ modalViewInfoStyle.priceWrapper }>
                      <Icon type="font-awesome" name="dollar" color="#227100" size={15} />
                      <Text style={{fontSize: 15, color: "#227100", marginLeft: 5, fontWeight: "bold"}}>{ price }</Text>
                  </View>
              </View>
          </View>
        </Modal>
        <TouchableHighlight
          onPress={() => {
            this.setModalVisible(!this.state.modalVisible);
          }}>
          <Text>Hide Modal</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
