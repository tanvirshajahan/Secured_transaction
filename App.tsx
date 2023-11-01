import { StyleSheet } from 'react-native';
import { TransactionHistory } from './src/screens/TransactionHistory';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { DetailScreen } from './src/screens/DetailScreen';


const switchNavigator = createSwitchNavigator({
  homeStack: {
    screen: createStackNavigator(
      {
        transaction: TransactionHistory,
        transactionDetails: DetailScreen
        // search address screen
      },
      {
        defaultNavigationOptions: {
          headerShown: false,
        },
      }
    ),
  }
});

const AppNavigation =createAppContainer (switchNavigator);

export default function App() {
  return (
   <AppNavigation/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
