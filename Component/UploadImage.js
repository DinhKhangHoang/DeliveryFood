import React, {Component} from 'react';
import {Platform} from 'react-native';
import firebase from 'react-native-firebase';

export const UploadImage = (uri,sessionID, mime = 'application/octet-stream')=>{
  return new Promise((resolve, reject)=>{
    const uploadUri = Platform.OS==='ios' ? uri.replace('file://', ''):uri;
    const imageRef = firebase.storage().ref('FoodImage').child(sessionID+'.jpg');
    return imageRef.put(uri, {contentType: mime})
    .then(()=>{
      return imageRef.getDownloadURL();
    })
    .then((url)=>{
      resolve(url)
    })
    .catch((error)=>{
      reject(error)
    })
  })
}
