import React, { useEffect } from "react";
import { Alert } from "react-native";
import connectRedux from "@redux/connect";
// import firebase from "react-native-firebase";
import messaging from "@react-native-firebase/messaging";
import _ from "lodash";
import notifee from '@notifee/react-native';

// import { notifications } from "react-native-firebase-push-notifications";

class FirebaseConfig extends React.Component {
  componentDidUpdate(nextProps, nextState) {
    if (nextProps.token != undefined && nextProps.token != this.props.token) {
      // Get the device token
      messaging()
        .getToken()
        .then((tokenDevice) => {
          console.log(tokenDevice);
          if (this.props.token) {
            this.props.actions.message.initTokenDivice(
              this.props.token,
              tokenDevice
            );
          }
        });
    }
  }

  componentDidMount() {
    this.checkPermission();

    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log(
        "Notification caused app to open from background state:",
        remoteMessage.notification
      );
    });

    messaging().onMessage(async(remoteMessage) => {
      console.log("A new FCM message arrived!", JSON.stringify(remoteMessage));
      let { username, callBack } = remoteMessage.data;
      switch (callBack) {
        case "Message":
          this.props.actions.message.fetchDetailMessage(
            this.props.token,
            this.props.messageID
          );
          break;
        case "ACCEPT":
        case "INVITE_MESSAGE":
          this.props.actions.message.getListMessages(this.props.token);
          break;
      }

      const channelId = await notifee.createChannel({
        id: remoteMessage.messageId,
        name: 'Default Channel',
      });
    
      console.log(channelId)


       notifee.displayNotification({
        id: remoteMessage.messageId,
        title: remoteMessage.title,
        body: "bạn có 1 tin nhắn mới",
        android: {
          channelId,
        },
      });

      // const channelId = new firebase.notifications.Android.Channel(
      //   "Default",
      //   "Default",
      //   firebase.notifications.Android.Importance.High
      // );
      // firebase.notifications().android.createChannel(channelId);

      // const notifications = new firebase.notifications.Notification()
      //   .setNotificationId("notificationId")
      //   .setTitle(remoteMessage.title)
      //   .setBody(remoteMessage.body)
      //   .setData(remoteMessage);

      // if (Platform.OS == "android") {
      //   notifications.android
      //     .setPriority(firebase.notifications.Android.Priority.High)
      //     .android.setChannelId("Default")
      //     .android.setVibrate(1000)
      //     .android.setSmallIcon("@mipmap/ic_launcher")
      //     .android.setAutoCancel(true)
      //     .setData(remoteMessage);
      // }
      // firebase.notifications().displayNotification(notifications);
      //   setDisplayNotification()
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log(
            "Notification caused app to open from quit state:",
            remoteMessage.notification
          );
          //   setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
        }
        // setLoading(false);
      });

    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log("Message handled in the background!", remoteMessage);
    });

    // this.createNotificationListeners();
  }

  componentWillMount() {}

  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      // this.getToken();
    } else {
      this.requestPermission();
    }
  }

  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
    } catch (error) {}
  }

  // async createNotificationListeners() {
  //   this.notificationListener = firebase
  //     .notifications()
  //     .onNotification(async (notification) => {
  //       console.log(notification);
  //       try {
  //       } catch (err) {
  //         Alert.alert("Error", err.message);
  //       }

  //       const channelId = new firebase.notifications.Android.Channel(
  //         "Default",
  //         "Default",
  //         firebase.notifications.Android.Importance.High
  //       );
  //       firebase.notifications().android.createChannel(channelId);

  //       const notifications = new firebase.notifications.Notification()
  //         .setNotificationId("notificationId")
  //         .setTitle(notification.data.title)
  //         .setBody(notification.data.body)
  //         .setData(notification.data);

  //       console.log(notification);
  //       if (Platform.OS == "android") {
  //         notifications.android
  //           .setPriority(firebase.notifications.Android.Priority.High)
  //           .android.setChannelId("Default")
  //           .android.setVibrate(1000)
  //           .android.setSmallIcon("@mipmap/ic_launcher")
  //           .android.setAutoCancel(true)
  //           .setData(notification.data);
  //       }
  //       firebase.notifications().displayNotification(notifications);
  //     });

  //   /*
  //    * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
  //    * */
  //   this.notificationOpenedListener = firebase
  //     .notifications()
  //     .onNotificationOpened((notificationOpens) => {
  //       console.log("notificationOpens", notificationOpens);
  //       // const { data } = notificationOpens.notification;
  //       // this.displayNotification(data);
  //       // this.showAlert(data);
  //     });
  //   /*
  //    * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
  //    * */
  //   const notificationOpen = await firebase
  //     .notifications()
  //     .getInitialNotification();
  //   if (notificationOpen) {
  //     console.log("notificationOpen", notificationOpen);
  //     const { data } = notificationOpen.notification;
  //   }
  //   /*
  //    * Triggered for data only payload in foreground
  //    * */
  //   this.messageListener = firebase.messaging().onMessage(async (message) => {
  //     //process data message
  //     console.log(message);
  //     this.displayNotification(message.data);
  //     try {
  //     } catch (err) {
  //       Alert.alert("Error", err.message);
  //     }
  //   });
  // }

  displayNotification = (data) => {
    const channelId = new firebase.notifications.Android.Channel(
      "Default",
      "Default",
      firebase.notifications.Android.Importance.High
    );
    firebase.notifications().android.createChannel(channelId);

    const notifications = new firebase.notifications.Notification()
      .setNotificationId("notificationId")
      .setTitle(data.title)
      .setBody(data.body)
      .setData(data);

    if (Platform.OS == "android") {
      notifications.android
        .setPriority(firebase.notifications.Android.Priority.High)
        .android.setChannelId("Default")
        .android.setVibrate(1000)
        .android.setSmallIcon("@mipmap/ic_launcher")
        .android.setAutoCancel(true)
        .setData(data);
    }
    firebase.notifications().displayNotification(notifications);
  };

  render() {
    return null;
  }
}

// const FirebaseConfig = (props) => {

//     useEffect(() => {
//     // Get the device token
//     messaging()
//       .getToken()
//       .then((tokenDevice) => {
//         console.log(tokenDevice)
//         if (props.token) {
//           props.actions.message.initTokenDivice(props.token, tokenDevice);
//         }
//       });
//   }, [props.token]);

//   useEffect(() => {
//     requestUserPermission()
//   }, []);

//   useEffect(() => {
//     // Assume a message-notification contains a "type" property in the data payload of the screen to open
//     requestUserPermission();
//     messaging().onNotificationOpenedApp((remoteMessage) => {
//       console.log(
//         "Notification caused app to open from background state:",
//         remoteMessage.notification
//       );
//     });

//     messaging().onMessage((remoteMessage) => {
//       console.log("A new FCM message arrived!", JSON.stringify(remoteMessage));
//     //   setDisplayNotification()
//     });

//     // Check whether an initial notification is available
//     messaging()
//       .getInitialNotification()
//       .then((remoteMessage) => {
//         if (remoteMessage) {
//           console.log(
//             "Notification caused app to open from quit state:",
//             remoteMessage.notification
//           );
//           //   setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
//         }
//         // setLoading(false);
//       });

//       messaging().setBackgroundMessageHandler(async remoteMessage => {
//         console.log('Message handled in the background!', remoteMessage);
//       });

//   }, []);

//   async function requestUserPermission() {
//     const settings = await messaging().requestPermission();

//     if (settings) {
//       console.log("Permission settings:", settings);
//     }

//     await messaging().requestPermission({
//       sound: false,
//       announcement: true,
//     });
//   }

//   return null;
// };

const mapStateToProps = (state) => {
  return {
    token: state.user.token,
    messageID: state.message.messageID,
  };
};
export default connectRedux(mapStateToProps, FirebaseConfig);
