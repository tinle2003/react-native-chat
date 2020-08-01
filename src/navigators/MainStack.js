import { HomeScreen,MessageDetail } from "@screens";
import { createStackNavigator } from 'react-navigation-stack';

console.disableYellowBox = true;
const MainStack = createStackNavigator(
  {
    HomeScreen,
    MessageDetail
  },
  {
    initialRouteName: "HomeScreen",
    headerMode: "none"
  }
);


export default MainStack;
