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
  TouchableWithoutFeedback,
} from "react-native";
import Header from "@components/Header";
import ModalSelector from "@components/Modal";
import Dash from "react-native-dash";
import connectRedux from "@redux/connect";
import FontAwesome from "react-native-vector-icons/FontAwesome";
const { width, height } = Dimensions.get("window");

const HomeScreen = (props) => {
  const [isModalAdd, setIsModalAdd] = useState(false);
  const [isProfile, setIsProfile] = useState(false);
  const [idUsersInvite, setIdUsersInvite] = useState("");

  const inviteUsers = async () => {
    try {
      let inviteMessage = await props.actions.message.inviteMessages(
        props.token,
        idUsersInvite
      );
      console.log(inviteMessage);
      if (inviteMessage.success) {
        setIsModalAdd(false);
        await props.actions.message.getListMessages(props.token);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    let fetchMessagesList = async () => {
      try {
        let messages = await props.actions.message.getListMessages(props.token);
        console.log(messages);
      } catch (err) {
        console.log(err);
      }
    };

    fetchMessagesList();
  }, []);

  useEffect(() => {
    let fetchUsers = async () => {
      try {
        let profile = await props.actions.users.fetchUserDetail(props.token);
        console.log(profile);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
  }, []);

  const updateMessagesDetail = async (id, status,idReceiver) => {
    try {
      await props.actions.message.updateMessagesDetail(props.token, id, status,idReceiver);
      await props.actions.message.getListMessages(props.token);
    } catch (err) {
      console.log(err);
    }
  };

  const renderModalAdd = (data) => {
    return (
      <View
        style={{
          backgroundColor: "#FFF",
          width: width - 32,
          height: "20%",
          paddingVertical: 12,
        }}
      >
        <View>
          <TextInput
            style={{
              paddingVertical: 10,
              paddingHorizontal: 12,
              borderColor: "rgba(97,97,97,0.3)",
              borderWidth: 1,
              borderRadius: 10,
              margin: 4,
            }}
            onChangeText={(val) => setIdUsersInvite(val)}
            placeholder={"Enter ID"}
          />
        </View>
        <View
          testID={"btn-Actions"}
          style={{
            flexDirection: "row",
            flex: 1,
            marginHorizontal: 16,
            marginVertical: 4,
          }}
        >
          <TouchableOpacity
            onPress={() => setIsModalAdd(!isModalAdd)}
            style={{
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
              backgroundColor: "#84b6eb",
              borderRadius: 10,
              marginHorizontal: 16,
            }}
            onPress={() => inviteUsers()}
          >
            <Text
              style={{
                color: "#fff",
              }}
            >
              Đồng ý
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setIsModalAdd(!isModalAdd)}
            style={{
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
              backgroundColor: "#cb2431",
              borderRadius: 10,
              marginHorizontal: 16,
            }}
          >
            <Text
              style={{
                color: "#fff",
              }}
            >
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderItemMessage = (item, index, navigation) => {
    let asd = item.users.filter(
      (val) => val.username != props.detailUsers.username
    );

    return (
      <View
        style={{
          marginVertical: 4,
        }}
        key={index}
      >
        <TouchableOpacity
          style={{
            paddingHorizontal: 16,
            paddingVertical: 8,
            flexDirection: "row",
          }}
          disabled={item.status == "WAITING-ACCEPT" || false}
          onPress={() => {
            navigation.navigate("MessageDetail", {
              messageOwner: asd,
              messageId: item.id,
            });
            props.actions.message.saveMessagesId(item.id);
          }}
        >
          <View>
            <Image
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
              }}
              source={{
                uri: "https://semantic-ui.com/images/wireframe/image.png",
              }}
              resizeMode="stretch"
            />
          </View>
          <View
            style={{
              justifyContent: "center",
              marginLeft: 13,
              width: width - 105,
            }}
          >
            {item.status != "WAITING-ACCEPT" && (
              <React.Fragment>
                <View
                  style={{
                    flexDirection: "row",
                    flex: 1,
                  }}
                >
                  <View style={{ flex: 1, justifyContent: "center" }}>
                    <Text
                      numberOfLines={1}
                      style={{
                        fontSize: 16,
                        fontWeight: "normal",
                      }}
                    >
                      {String(props.detailUsers?.username).toLowerCase() ==
                      String(item.name).toLowerCase()
                        ? asd[0].username
                        : item.name}
                    </Text>
                  </View>
                </View>
              </React.Fragment>
            )}

            {item.status == "WAITING-ACCEPT" && (
              <React.Fragment>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                    }}
                  >
                    <Text>
                      {props.detailUsers?.username == item.name
                        ? asd
                        : item.name}
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => updateMessagesDetail(item.id, "ACCEPT",item.ownerMessage)}
                      style={{
                        paddingVertical: 10,
                        paddingHorizontal: 10,
                        backgroundColor: "green",
                        marginHorizontal: 4,
                      }}
                    >
                      <Text style={{ color: "#fff", fontWeight: "600" }}>
                        Accept
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => updateMessagesDetail(item.id, "REJECT",item.ownerMessage)}
                      style={{
                        paddingVertical: 10,
                        paddingHorizontal: 10,
                        backgroundColor: "red",
                        marginHorizontal: 4,
                      }}
                    >
                      <Text style={{ color: "#fff", fontWeight: "600" }}>
                        Denide
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </React.Fragment>
            )}
          </View>
        </TouchableOpacity>

        <Dash
          style={{ flex: 1, marginHorizontal: 16 }}
          dashStyle={{ height: 1 }}
          dashGap={0}
          dashColor={"#979797"}
        />
      </View>
    );
  };

  const ModalDetailUser = () => {
    return (
      <View
        style={{
          backgroundColor: "#FFF",
          width: width - 32,
          height: "40%",
          paddingVertical: 12,
        }}
      >
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Image
            source={{
              uri:
                "https://developers.google.com/web/images/contributors/no-photo.jpg",
            }}
            style={{
              width: "35%",
              height: "50%",
              borderRadius: 100,
            }}
            resizeMode={"stretch"}
          />

          <View
            style={{
              marginVertical: 12,
              width: "100%",
              paddingHorizontal: 50,
              alignItems: "center",
            }}
          >
            <Text>{`ID: ${props.detailUsers?.id}` || "ID"}</Text>
            <TextInput
              style={{
                paddingVertical: 10,
                width: "100%",
                textAlign: "center",
                borderColor: "#979797",
                borderWidth: 1,
                borderRadius: 10,
                marginVertical: 4,
              }}
              defaultValue={props.detailUsers?.name || ""}
              placeholder={"Name..."}
            />

            <View
              style={{
                flexDirection: "row",
                width: "100%",
                marginTop: 4,
              }}
            >
              <TouchableOpacity
                style={{
                  flex: 1,
                  alignItems: "center",
                  backgroundColor: "#5db65f",
                  paddingVertical: 8,
                  marginHorizontal: 4,
                }}
                onPress={() => {
                  props.actions.app.logout();
                  props.navigation.navigate("Login_Register");
                }}
              >
                <Text style={{ color: "#fff", fontWeight: "600" }}>
                  Đăng xuất
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setIsProfile(false)}
                style={{
                  flex: 1,
                  alignItems: "center",
                  paddingVertical: 8,
                  marginHorizontal: 4,
                  backgroundColor: "#d8544f",
                }}
              >
                <Text style={{ color: "#fff", fontWeight: "600" }}>Hủy bỏ</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };
  return (
    <React.Fragment>
      <SafeAreaView
        style={{
          backgroundColor: "#fff",
        }}
      >
        <Header
          titleHeader={"Trang chủ"}
          childrenRight={
            <TouchableOpacity
              onPress={() => {
                setIsProfile(!isProfile);
              }}
            >
              <FontAwesome name={"user-circle-o"} size={24} />
            </TouchableOpacity>
          }
        />
        <View
          style={{
            height: "100%",
          }}
        >
          <View>
            <TouchableOpacity
              onPress={() => {
                setIsModalAdd(!isModalAdd);
              }}
              style={{
                alignSelf: "center",
                width: "50%",
                alignItems: "center",
                padding: 8,
                backgroundColor: "rgba(60,60,60,0.6)",
              }}
            >
              <Text style={{ color: "#fff" }}>Add friend</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={props.listMessage}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) =>
              renderItemMessage(item, index, props.navigation)
            }
          />
        </View>
      </SafeAreaView>

      {/* Modal */}

      <ModalSelector isVisibleModal={isModalAdd}>
        {renderModalAdd()}
      </ModalSelector>

      <ModalSelector isVisibleModal={isProfile}>
        {ModalDetailUser()}
      </ModalSelector>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.user.token,
    detailUsers: state.user.profile,
    listMessage: state.message.messageList,
  };
};

export default connectRedux(mapStateToProps, React.memo(HomeScreen));
