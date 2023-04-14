import { StyleSheet, Text, View, Image,TouchableOpacity } from 'react-native'
import React from 'react'
import { Pressable } from 'react-native'
import { width } from 'deprecated-react-native-prop-types/DeprecatedImagePropType'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, decrementQuantity, incrementQuantity } from '../CartReducer'
import { decrementQty, incrementQty } from '../ProductReducer'

const DressItem = ({ item }) => {

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart)
  const addItemToCart = () => {
    dispatch(addToCart(item)) //cart
    dispatch(incrementQty(item)) //product
  }
  return (
    <View>
      <Pressable style={{ backgroundColor: "#F8F8F8", borderRadius: 8, padding: 10, flexDirection: "row", alignItems: "center", justifyContent: 'space-between', margin: 14, elevation: 1, marginTop: 2 }}>
        <View>
          <Image style={{ width: 70, height: 70 }} source={{ uri: item.image }} />
        </View>
        <View>
          <Text style={{ width: 83, fontSize: 17, fontWeight: 500, marginBottom: 7 }}>{item.name}</Text>
          <Text style={{ width: 60, color: "grey", fontSize: 15 }}>₹ {item.price}</Text>
        </View>
        {cart.some((c) => c.id === item.id) ? (
          <Pressable style={{
            flexDirection: "row",
            paddingHorizontal: 10,
            paddingVertical: 5,
          }}>
            <TouchableOpacity
              onPress={() => {
                dispatch(decrementQuantity(item));//cart
                dispatch(decrementQty(item));//product
              }}
              style={{
                width: 26,
                height: 26,
                borderRadius: 13,
                borderColor: "#BEBEBE",
                backgroundColor: "#E0E0E0",
                justifyContent: "center",
                alignContent: "center"
              }}>
              <Text
                style={{
                  fontSize: 20,
                  color: "#088F8F",
                  marginTop: -1,
                  fontWeight: "600",
                  textAlign: "center",
                }}>
                -</Text>
            </TouchableOpacity>
            <Pressable>
              <Text
                style={{
                  fontSize: 19,
                  color: "#088F8F",
                  paddingHorizontal: 8,
                  fontWeight: "600",
                }}>
                {item.quantity}
              </Text>
            </Pressable>

            <TouchableOpacity
              onPress={() => {
                dispatch(incrementQuantity(item));
                dispatch(incrementQty(item));
              }}
              style={{
                width: 26,
                height: 26,
                borderRadius: 13,
                borderColor: "#BEBEBE",
                backgroundColor: "#E0E0E0",
                justifyContent: "center",
                alignContent: "center"
              }}>
              <Text style={{
                fontSize: 20,
                color: "#088F8F",
                marginTop: -1,

                fontWeight: "600",
                textAlign: "center",
              }}>
                +</Text>

            </TouchableOpacity>
          </Pressable>
        ) : (
          <TouchableOpacity onPress={addItemToCart} style={{ width: 80 }}>
            <Text style={{
              borderColor: "grey",
              borderWidth: 0.8,
              borderRadius: 3,
              marginVertical: 10,
              color: "#088F8F",
              textAlign: "center",
              fontSize: 14,
              fontWeight: "bold",
              padding: 5
            }}>Add</Text>
          </TouchableOpacity>
        )}






      </Pressable>

    </View>
  )
}

export default DressItem

const styles = StyleSheet.create({})