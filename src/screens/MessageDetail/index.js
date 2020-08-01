import React, { useState, useEffect } from "react";
import {
  Text,
  FlatList,
  SafeAreaView,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import Header from "@components/Header";
import ModalSelector from "@components/Modal";
import Dash from "react-native-dash";
import connectRedux from "@redux/connect";
import Ionicons from "react-native-vector-icons/Ionicons";
const { width, height } = Dimensions.get("window");

const MessageDetail = (props) => {
  const [content, setContent] = useState("");

  const fetchMessageDetail = async () => {
    try {
      let data = await props.actions.message.fetchDetailMessage(
        props.token,
        props.navigation.state.params.messageId || ""
      );
      // let copyStateChatData = Object.assign([], props.messageList.data);
      // copyStateChatData.splice(0, 0, data);
      // copyStateChatData.join();
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };

  useEffect(() => {
    fetchMessageDetail();
    console.log(props.navigation)
  }, []);

  const sendMessage = async () => {
    console.log(content);
    let params = {
      content,
      messageId: props.navigation.state.params.messageId || "",
      idReceiver:props.navigation.state.params.messageOwner[0].id|""
    };

    try {
      let data = await props.actions.message.sendMessage(props.token, params);
      console.log("data",data);
      if (data.success) {
        setContent("");
        fetchMessageDetail();
      }
      // let copyStateChatData = Object.assign([], props.messageList.data);
      // copyStateChatData.splice(0, 0, data);
      // copyStateChatData.join();
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };

  const _renderChatLine = (item, type) => {
    return (
      <React.Fragment>
        <View
          style={{
            width: "100%",
            alignItems: type == 1 ? "flex-start" : "flex-end",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              // width: "70%",
              borderRadius: 8,
              marginTop: 10,
            }}
          >
            {type == 1 && (
              <View
                style={{
                  marginHorizontal: 10,
                  width: 25,
                  height: 25,
                  flexDirection: "row",
                }}
              >
                <Image
                  style={{
                    width: 25,
                    height: 25,
                    borderRadius: 12,
                  }}
                  source={{
                    uri: "https://semantic-ui.com/images/wireframe/image.png",
                  }}
                  resizeMode={"stretch"}
                />
              </View>
            )}

            <View>
              <View
                style={{
                  marginBottom: 5,
                  flexDirection: "row",
                  justifyContent: type == 1 ? "flex-start" : "flex-end",
                  flexWrap: "wrap",
                }}
              >
                <Text
                  style={{
                    color: "#545454",
                    fontSize: 12,
                    alignSelf: "center",
                  }}
                >
                  {item.sender}
                </Text>
                {type == 0 && (
                  <View
                    style={{
                      marginHorizontal: 10,
                      width: 25,
                      height: 25,
                      alignSelf: "center",
                    }}
                  >
                    <Image
                      style={{
                        width: 25,
                        height: 25,
                        borderRadius: 12,
                      }}
                      source={{
                        uri:
                          "https://semantic-ui.com/images/wireframe/image.png",
                      }}
                      resizeMode={"stretch"}
                    />
                  </View>
                )}
              </View>

              <View
                style={{
                  backgroundColor: type == 1 ? "#FFF5E0" : "blue",
                  padding: 8,
                  borderRadius: 5,
                  flexDirection: "row",
                  marginHorizontal: type == 1 ? 0 : 15,
                  alignSelf: type == 1 ? "flex-start" : "flex-end",
                }}
              >
                <Text
                  style={{
                    color: type == 1 ? "#989898" : "#fff",
                  }}
                >
                  {item.content.trim()}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </React.Fragment>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <View>
        <Header viewBack={true} titleHeader={props.navigation.state.params.messageOwner[0]?.username || ""} goBack={() => props.navigation.goBack()} />
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={{
          flex: 1,
        }}
      >
        <View style={{ flex: 1 }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            inverted
            // extraData={props.messageList}
            contentContainerStyle={{ width: "100%" }}
            data={props.messageList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => {
              if (String(props.detailUsers?.username).toLowerCase() == String(item.sender).toLowerCase()) {
                return (
                  <View style={{ alignItems: "flex-end", width: "100%" }}>
                    {_renderChatLine(item, 0, index + 1)}
                  </View>
                );
              }
              return (
                <View
                  style={{
                    width: "100%",
                    alignItems: "flex-start",
                  }}
                >
                  {_renderChatLine(item, 1, index + 1)}
                </View>
              );
            }}
            // onEndReached={() => this.loadMoreData()}
          />
        </View>

        <View
          style={{
            marginHorizontal: 16,
            borderRadius: 30,
            borderWidth: 1,
            borderColor: "rgba(97,97,97,0.3)",
            paddingVertical: Platform.OS == "ios" ? 10 : 0,
            paddingLeft: 24,
            paddingRight: 14,
            flexDirection: "row",
            marginVertical: 20,
          }}
        >
          <TextInput
            multiline
            placeholder="Type your message here"
            style={{
              flex: 1,
              fontSize: 13,
              color: "#979798",
            }}
            value={content}
            onChangeText={(val) => {
              setContent(val);
            }}
          />
          <TouchableOpacity
            style={{ alignItems: "center", justifyContent: "center" }}
            onPress={() => {
              sendMessage();
            }}
          >
            <Ionicons
              style={{
                marginLeft: 24,
              }}
              name={"md-send"}
              size={24}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    messageList: state.message.detalMessage?.data,
    detailUsers: state.user.profile,
    token: state.user.token,
  };
};

export default connectRedux(mapStateToProps, React.memo(MessageDetail));
