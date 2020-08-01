import React, { useState } from "react";
import {
  Text,
  FlatList,
  SafeAreaView,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  TextInput,
  ImageBackground,
  StyleSheet,
} from "react-native";
import Header from "@components/Header";
import ModalSelector from "@components/Modal";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import connectRedux from "@redux/connect";

const { width, height } = Dimensions.get("window");
const RegisterScreen = (props) => {

    let [username,setUsername] = useState('');
    let [password,setPassword] = useState('');
    let [rePassword,setRePassword] = useState('')
    const btnRegister = async()=>{
        console.log(props)
        let params = {
            username,
            password,
            repassword:rePassword
          };
          try{
            let respone = await props.actions.users.register(params)
            if(respone.success){
                props.navigation.goBack()
            }
          }catch(err){
          }
    }

  return (
    <React.Fragment>
      <SafeAreaView>
        <ImageBackground
          source={{
            uri:
              "https://www.ecopetit.cat/wpic/mpic/5-52214_45-beautiful-sky-iphone-wallpaper-sunset-iphone-wallpaper.jpg",
          }}
          resizeMode={"cover"}
          style={{
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View style={{}}>
            <View style={style.viewInput}>
              <FontAwesome
                style={{ flex: 1 / 10 }}
                name={"user"}
                size={24}
              />
              <TextInput
                style={{
                  flex: 9 / 10,
                }}
                placeholder={"Username"}
                onChangeText={value=>setUsername(value)}
              />
            </View>
            <View style={style.viewInput}>
              <FontAwesome
                style={{ flex: 1 / 10 }}
                name={"lock"}
                size={24}
              />
              <TextInput
                style={{
                  flex: 9 / 10,
                }}
                onChangeText={(value)=>setPassword(value)}
                placeholder={"Password"}
                secureTextEntry={true}
              />
            </View>

            <View style={style.viewInput}>
              <FontAwesome
                style={{ flex: 1 / 10 }}
                name={"lock"}
                size={24}
              />
              <TextInput
                style={{
                  flex: 9 / 10,
                }}
                onChangeText={value=>setRePassword(value)}
                placeholder={"Re-Password"}
                secureTextEntry={true}
              />
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: "#fb7635",
                padding: 10,
                width: width - 42,
                alignSelf: "center",
                alignItems: "center",
                borderRadius: 10,
              }}
              onPress={()=>btnRegister()}
            >
              <Text style={{ color: "#fff", fontWeight: "bold" }}>Register</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                alignItems: "center",
                alignSelf: "center",
                width: width - 42,
                padding: 5,
                marginTop: 10,
              }}
              onPress={()=>props.navigation.goBack()}

            >
              <Text style={{ color: "#fff", fontWeight: "600" }}>
                Have account? Login
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </SafeAreaView>
    </React.Fragment>
  );
};

const style = StyleSheet.create({
  viewInput: {
    backgroundColor: "#fff",
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 4,
    flexDirection: "row",
    width: width - 28,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:5
  },
});

export default connectRedux(null, React.memo(RegisterScreen));
