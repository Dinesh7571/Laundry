import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native';
import { Pressable } from 'react-native';

const Services = () => {

  const services = [
    {
      id: "0",
      image: "https://cdn-icons-png.flaticon.com/128/3003/3003984.png",
      name: "Washing",
    },
    {
      id: "11",
      image: "https://cdn-icons-png.flaticon.com/128/2975/2975175.png",
      name: "Laundry",
    },
    {
      id: "12",
      image: "https://cdn-icons-png.flaticon.com/128/9753/9753675.png",
      name: "Wash & Iron",
    },
    {
      id: "13",
      image: "https://cdn-icons-png.flaticon.com/128/995/995016.png",
      name: "Cleaning",
    },
  ];

  return (
    <View style={{ padding: 10, }}>
      <Text style={{ fontSize: 16, fontWeight: 600, marginBottom: 7 }}>Services Available</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {services.map((services, index) => (
          <Pressable key={index} style={{ margin: 5,backgroundColor: "white", padding: 20, borderRadius: 7, elevation: 1 }}>
            <Image source={{ uri: services.image }} style={{ width: 70, height: 70 }} />
            <Text style={{ textAlign: "center", marginTop: 10 }}>{services.name}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  )
}

export default Services

const styles = StyleSheet.create({})