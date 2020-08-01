import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
const Header = (props) => {
  return (
    <View style={[style.view_container, props.styleHeader]}>
      <View style={{ flex: 1, justifyContent: "center" }}>
        {props.viewBack && (
          <TouchableOpacity
            accessible={true}
            style={{ flex: 1, justifyContent: "center" }}
            accessibilityLabel={"Go back"}
            onPress={props.goBack}
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "flex-start",
                flexDirection: "row",
              }}
            >
              <Ionicons color="#1C1C1C" size={14} name="ios-arrow-back" />
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 14,
                  color: "#565554",
                }}
              >
                Back
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
      <View style={{ flex: 3 }}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              fontSize: 15,
              color: "#565554",
            }}
          >
            {props.titleHeader || ""}
          </Text>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "flex-end",
            flexDirection: "row",
            paddingRight: 10,
          }}
        >
          {props.childrenRight || null}
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  view_container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFF",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});
export default Header;
