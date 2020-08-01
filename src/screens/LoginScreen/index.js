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

const LoginScreen = (props) => {
  let [username, setUsername] = useState("ADMIN");
  let [password, setPassword] = useState("ADMIN");

  const btnLogin = async() => {
    let params = {
      username,
      password,
    };
    try{
      let respone = await props.actions.users.login(params)
      if(respone.success){
        props.navigation.navigate("MainStack")
    }
    }catch(err){
      console.log(err)
    }
  };

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
              <FontAwesome style={{ flex: 1 / 10 }} name={"user"} size={24} />
              <TextInput
                style={{
                  flex: 9 / 10,
                }}
                onChangeText={(value)=>setUsername(value)}
                placeholder={"Username"}
              />
            </View>
            <View style={style.viewInput}>
              <FontAwesome style={{ flex: 1 / 10 }} name={"lock"} size={24} />
              <TextInput
                style={{
                  flex: 9 / 10,
                }}
                secureTextEntry={true}
                onChangeText={(value)=>setPassword(value)}
                placeholder={"Password"}
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
              onPress={()=>btnLogin()}
            >
              <Text style={{ color: "#fff", fontWeight: "bold" }}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                alignItems: "center",
                alignSelf: "center",
                width: width - 42,
                padding: 5,
                marginTop: 10,
              }}
              onPress={() => props.navigation.navigate("RegisterScreen")}
            >
              <Text style={{ color: "#fff", fontWeight: "600" }}>
                Not a user? Register
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
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
});

export default connectRedux(null, React.memo(LoginScreen));
