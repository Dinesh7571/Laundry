import React, { useState, useEffect } from 'react';
import { TouchableOpacity,StyleSheet, Text, View, Image, Alert, SafeAreaView, StatusBar, Platform, Pressable, TextInput } from 'react-native';
import * as Location from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import Carousel from '../components/Carousel';
import Services from '../components/Services';
import DressItem from '../components/DressItem';
import { ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../ProductReducer';
import { useNavigation } from '@react-navigation/native';



const HomeScreen = () => {
  const navigation = useNavigation();
  const cart = useSelector((state) => state.cart.cart);
  const total=cart.map((item)=>item.quantity * item.price).reduce((curr,prev)=>curr+prev,0);





  const [locationServiceEnabled, setLocationServiceEnabled] = useState(false);
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
    'Wait, we are fetching you location...'
  );

  useEffect(() => {
    CheckIfLocationEnabled();
  }, []);

  const CheckIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();

    if (!enabled) {
      Alert.alert(
        'Location Service not enabled',
        'Please enable your location services to continue',
        [{ text: 'OK' }],
        { cancelable: false }
      );
    } else {
      setLocationServiceEnabled(enabled);
    }
  };



  useEffect(() => {
    CheckIfLocationEnabled();
    GetCurrentLocation();
  }, []);

  // create the handler method

  const GetCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert(
        'Permission not granted',
        'Allow the app to use location service.',
        [{ text: 'OK' }],
        { cancelable: false }
      );
    }

    let { coords } = await Location.getCurrentPositionAsync();

    if (coords) {
      const { latitude, longitude } = coords;
      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude
      });

      for (let item of response) {
        let address = ` ${item.city},${item.name}, ${item.street}, ${item.postalCode}, `;

        setDisplayCurrentAddress(address);
      }
    }
  };


  const product = useSelector((state) => state.product.product);
  const dispatch = useDispatch();

  useEffect(() => {
    if (product.length > 0) return;

    const fetchProducts = () => {
      services.map((service) => dispatch(getProducts(service)));
    };
    fetchProducts();

  }, []);



  const services = [
    {
      id: "0",
      image: "https://cdn-icons-png.flaticon.com/128/4643/4643574.png",
      name: "shirt",
      quantity: 0,
      price: 10,
    },
    {
      id: "11",
      image: "https://cdn-icons-png.flaticon.com/128/892/892458.png",
      name: "T-shirt",
      quantity: 0,
      price: 10,
    },
    {
      id: "12",
      image: "https://cdn-icons-png.flaticon.com/128/9609/9609161.png",
      name: "dresses",
      quantity: 0,
      price: 10,
    },
    {
      id: "13",
      image: "https://cdn-icons-png.flaticon.com/128/599/599388.png",
      name: "jeans",
      quantity: 0,
      price: 10,
    },
    {
      id: "14",
      image: "https://cdn-icons-png.flaticon.com/128/9431/9431166.png",
      name: "Sweater",
      quantity: 0,
      price: 10,
    },
    {
      id: "15",
      image: "https://cdn-icons-png.flaticon.com/128/3345/3345397.png",
      name: "shorts",
      quantity: 0,
      price: 10,
    },
    {
      id: "16",
      image: "https://cdn-icons-png.flaticon.com/128/293/293241.png",
      name: "Sleeveless",
      quantity: 0,
      price: 10,
    },
  ];


  return (
    <>
      <ScrollView style={[styles.AndroidSafeArea,]} showsVerticalScrollIndicator={false}>

        {/* location and profile */}
        <View style={{ flexDirection: "row", alignItems: "center", padding: 8 }}>
          <MaterialIcons name="location-on" size={30} color="#fd5c63" />
          <View>
            <Text style={{ fontSize: 18, fontWeight: "600", marginLeft: 7 }} >Home</Text>
            <Text numberOfLines={1} style={{ width: 250 }}> {displayCurrentAddress}</Text>
          </View>
          <Pressable style={{ marginLeft: "auto", marginRight: 7 }}>
            <Image style={{ width: 40, height: 40, borderRadius: 20 }} source={{ uri: "https://tinyurl.com/4j33fs9d" }}></Image>
          </Pressable>
        </View>

        {/* searchbar */}

        <View style={{
          padding: 10,
          margin: 10, flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderWidth: 0.8,
          borderColor: "#c0c0c0",
          borderRadius: 7,

        }}>
          <TextInput placeholder='Search for more' />
          <Feather name="search" size={24} color="#fd5c63" />
        </View>

        {/* crousel component */}
        <Carousel />
        {/* services   */}
        <Services />

        {/* render all products */}

        {product.map((item, index) => (
          <DressItem item={item} key={index} />
        ))}


      </ScrollView>

      {/* total quantity and total price cart */}
      {total===0 ?(
       null
      ):(
        <Pressable style={{
          backgroundColor: '#088F8F',
          padding: 8,
          margin: 15,
          marginBottom: 10,
          marginTop:5,
          borderRadius: 4,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent:'space-between'
        }}>
          <View>
            <Text style={{fontSize:14,fontWeight:500,color:'white'}}>{cart.length} items | ₹{total}</Text>
            <Text style={{fontSize:14,fontWeight:300,color:'white',marginVertical:6}}>extra charges might apply</Text>
  
          </View>
          <TouchableOpacity onPress={()=>navigation.navigate("PickUp")}>
            <Text style={{fontSize:14,color:'white',fontWeight:500}}>Proceed to pickup  </Text>
          </TouchableOpacity>
        </Pressable>
      )}
     
    </>
  );
};
export default HomeScreen;


const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "#F0F0F0",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  }
});



