import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SliderBox } from 'react-native-image-slider-box'

const Carousel = () => {

   const images= [
        "https://media.istockphoto.com/id/1247884083/vector/laundry-service-room-vector-illustration-washing-and-drying-machines-with-cleansers-on-shelf.jpg?s=612x612&w=0&k=20&c=myaNEKlqX7R--bzWGDoMI7PhdxG_zdQTKYEBlymJQGk=",
        "https://images.pexels.com/photos/5591581/pexels-photo-5591581.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://source.unsplash.com/1024x768/?girl",
        "https://source.unsplash.com/1024x768/?tree", // Network image
     //   require('./assets/images/girl.jpg'),          // Local image
      ]
  return (
    <View>
      <SliderBox images={images}  autoPlay circleloop dotColor={'#13274f'} inactiveDotColor={"#90A4AE"} ImageComponentStyle={{
        borderRadius:6,
        width:"94%",
      }}/>
    </View>
  )
}

export default Carousel

const styles = StyleSheet.create({})