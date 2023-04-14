import { Alert ,Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import HorizontalDatepicker from '@awrminkhodaei/react-native-horizontal-datepicker';
import { useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PickUpScreen = () => {
    const cart = useSelector((state) => state.cart.cart);
    const total = cart.map((item) => item.quantity * item.price).reduce((curr, prev) => curr + prev, 0);

    const [selectedTime, setSelectedTime] = useState([]);
    const [selectedDate, setSelectedDate] = useState("");
    const [delivery, setDelivery] = useState([]);



    const current = new Date();
    const currentDate = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`;
    const endDate = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate() + 8}`;



    const deliveryTime = [

        {
            id: "0",
            name: "2-3 Days"
        },
        {
            id: "1",
            name: "3-4 Days"
        },
        {
            id: "2",
            name: "4-5 Days"
        },
        {
            id: "0",
            name: "5-6 Days"
        },
    ];

    const times = [
        {
            id: "0",
            time: "11:00 PM",
        },
        {
            id: "1",
            time: "12:00 PM",
        },
        {
            id: "2",
            time: "01:00 PM",
        },
        {
            id: "3",
            time: "02:00 PM",
        },
    ];
 const navigation =useNavigation();
    const proceedToCart=()=>{
        if(!selectedDate || !selectedTime ||!delivery){
            Alert.alert(
                "Empty or invalid",
                "Please select all fields",
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                  },
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: false }
              );
             
           }
           if(selectedDate && selectedTime && delivery){
            navigation.replace("Cart",{
                selectedTime:selectedTime,
                pickUpDate:selectedDate,
                no_Of_days:delivery,
            });
            

          }
    }
    return (
        <>
        <SafeAreaView>
            <Text style={{
                fontSize: 16,
                fontWeight: "500",
                marginHorizontal: 10,
                marginTop: 20
            }}>enter Address</Text>

            <TextInput style={{
                height: 150,
                paddingTop: 10,
                padding: 10,
                borderColor: 'gray',
                borderWidth: 1,
                borderRadius: 9,
                margin: 10,
            }} />

            <Text style={{
                fontSize: 16,
                fontWeight: "500",
                marginHorizontal: 10,
                marginTop: 2
            }}>Pick up Date</Text>
            {/* date picker */}

            <HorizontalDatepicker
                mode="gregorian"
                startDate={new Date(currentDate)}
                endDate={new Date(endDate)}
                initialSelectedDate={new Date(endDate)}
                onSelectedDateChange={(date) => setSelectedDate(date)}
                selectedItemWidth={170}
                unselectedItemWidth={38}
                itemHeight={38}
                itemRadius={10}
                selectedItemTextStyle={styles.selectedItemTextStyle}
                unselectedItemTextStyle={styles.selectedItemTextStyle}
                selectedItemBackgroundColor="#222831"
                unselectedItemBackgroundColor="#ececec"
                flatListContainerStyle={styles.flatListContainerStyle}
            />

            <Text style={{
                fontSize: 16,
                fontWeight: "500",
                marginHorizontal: 10,
                marginTop: 2
            }}>Pick Up time</Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {times.map((item, index) => (
                    <Pressable
                        key={index}
                        onPress={() => setSelectedTime(item.time)}
                        style={
                            selectedTime.includes(item.time) ? {
                                height: 38,
                                margin: 10,
                                borderRadius: 7,
                                padding: 8,
                                backgroundColor: "",
                                borderColor: "gray",
                                borderWidth: 1.5,
                                borderColor: "red"


                            } : {
                                height: 38,
                                margin: 10,
                                borderRadius: 7,
                                padding: 8,
                                textColor: "black",
                                backgroundColor: "#ececec",
                                borderColor: "gray",
                                borderWidth: 0.7,
                            }
                        }
                    >
                        <Text style={{ color: "black" }}>{item.time}</Text>
                    </Pressable>

                ))}

               


            </ScrollView>


            <Text style={{
                    fontSize: 16,
                    fontWeight: "500",
                    marginHorizontal: 10,
                    marginTop: 2
                }}>Pick Up time</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            
                {deliveryTime.map((item, i) => (
                    <Pressable 
                    onPress={() => setDelivery(item.name)} key={i}
                    style={
                        delivery.includes(item.name) ? {
                            height: 38,
                            margin: 10,
                            borderRadius: 7,
                            padding: 8,
                            backgroundColor: "",
                            borderColor: "gray",
                            borderWidth: 1.5,
                            borderColor: "red"


                        } : {
                            height: 38,
                            margin: 10,
                            borderRadius: 7,
                            padding: 8,
                            textColor: "black",
                            backgroundColor: "#ececec",
                            borderColor: "gray",
                            borderWidth: 0.7,
                        }
                    }>
                        <Text>{item.name}</Text>
                    </Pressable>
                ))}
            </ScrollView>

       

        </SafeAreaView>
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
          <TouchableOpacity onPress={proceedToCart}>
            <Text style={{fontSize:14,color:'white',fontWeight:500}}>Proceed to cart  </Text>
          </TouchableOpacity>
        </Pressable>
      )}
        </>
    )
}

export default PickUpScreen

const styles = StyleSheet.create({})