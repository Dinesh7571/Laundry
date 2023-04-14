import { Pressable, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { incrementQty, decrementQty } from '../ProductReducer';
import { incrementQuantity, decrementQuantity } from '../CartReducer';


const CartScreen = () => {
  const cart = useSelector((state) => state.cart.cart);
  const total = cart.map((item) => item.quantity * item.price).reduce((curr, prev) => curr + prev, 0);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();

  return (
    <>
     <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center',marginTop:25 }}>
            <Ionicons onPress={() => navigation.goBack()} name="arrow-back" size={24} color="black" />
            <Text style={{fontWeight:'bold'}}>Your Bucket</Text>
          </View>
    <ScrollView style={{ marginTop:10 }}>
      {total === 0 ? (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ marginTop: 40 }}>Your cart is empty</Text>
        </View>

      ) : (

        <>
          {/* <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons onPress={() => navigation.goBack()} name="arrow-back" size={24} color="black" />
            <Text style={{fontWeight:'bold'}}>Your Bucket</Text>
          </View> */}
          <Pressable style={{ backgroundColor: 'white', borderRadius: 12, marginLeft: 10, marginRight: 10, padding: 14 }}>
            {cart.map((item, index) => (
              <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 6 }}>
                <Text style={{ width: 80, fontSize: 16, fontWeight: "500" }}>{item.name}</Text>
                {/* - + button*/}

                <Pressable style={{
                  flexDirection: "row",
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  marginLeft: 20

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
                  <Pressable >
                    <Text
                      style={{
                        fontSize: 19,
                        color: "#088F8F",
                        paddingHorizontal: 8,
                        fontWeight: "600",
                        width: 40,

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

                <Text style={{ width: 100, fontSize: 16, fontWeight: "500", marginLeft: 80 }}>₹{item.price * item.quantity}</Text>

              </View>
            ))}
          </Pressable>
          <View style={{ padding: 8,marginTop:10 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold',marginStart:5}}>Billing details</Text>
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 7,
                padding:10,
                margin:3,
                marginTop:10,
              }}>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <Text style={{ fontSize: 18, fontWeight: '400', color: 'gray' }}>
                  Item Total
                </Text>
                <Text style={{ fontSize: 18, fontWeight: '400' }}>
                  ₹{total}
                </Text>

              </View>
              <View  style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginVertical: 10,
                }}>
                <Text style={{
                  fontSize: 18,
                  fontWeight: "400",
                  color: 'gray',
                }}>
                  Delivery Fee | 1.2KM
                </Text>
                <Text style={{
                  fontSize: 18,
                  fontWeight: "400",
                  color: '#088F8F',
                }}>
                  FREE
                </Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 18, fontWeight: '500', color: 'gray' }}>
                  Free Delivery on Your order
                </Text>
              </View>
              <View
                style={{
                  borderColor: 'gray',
                  height: 1,
                  borderWidth: 0.5,
                  marginTop: 10,
                }} />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginVertical: 10,
                }}
              >
                <Text style={{ fontSize: 18, fontWeight: '500', color: "gray" }}>selected Date</Text>
                <Text>
                  {/* {route.params.pickUpDate} */}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',

                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "500",
                    color: "gray"
                  }}
                >
                  No. Of Days
                </Text>
                <Text style={{
                  fontSize: 18,
                  fontWeight: "400",
                  color: '#088F8F',
                }}>
                  {route.params.no_Of_days}
                </Text>

              </View>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginVertical: 10,
              }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "500",
                    color: "gray"
                  }}
                >
                  selected Pick Up Time
                </Text>
                <Text style={{
                  fontSize: 18,
                  fontWeight: "400",
                  color: '#088F8F',
                }}>
                  {route.params.selectedTime}
                </Text>
              </View>
              <View
                style={{
                  borderColor: 'gray',
                  height: 1,
                  borderWidth: 0.5,
                  marginTop: 10,
                }}
              />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginVertical: 8,
                }}
              >
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>To Pay</Text>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>₹{total}</Text>

              </View>
            </View>
          </View>



        </>
      )}

     
    </ScrollView>
         {/* item cart box  */}
         {total===0 ?(
       null
      ):(
        <Pressable style={{
          backgroundColor: '#088F8F',
          padding: 8,
          margin: 15,
          marginBottom: 10,
          marginTop:'auto',
          borderRadius: 4,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent:'space-between'
        }}>
          <View>
            <Text style={{fontSize:14,fontWeight:500,color:'white'}}>{cart.length} items | ₹{total}</Text>
            <Text style={{fontSize:14,fontWeight:300,color:'white',marginVertical:6}}>extra charges might apply</Text>
  
          </View>
          <TouchableOpacity >
            <Text style={{fontSize:14,color:'white',fontWeight:500}}>Place order  </Text>
          </TouchableOpacity>
        </Pressable>
      )}
    </>
  )
}

export default CartScreen

const styles = StyleSheet.create({})