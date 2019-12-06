import React , { Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LoginComponent from './Component/LoginComponent';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import RegisterComponent from './Component/RegisterComponent';
import ChatroomComponent from './Component/ChatroomComponent';
import UpdateUserComponent from './Component/UpdateUserComponent';

const RootStack = createStackNavigator(
  {
    Login: LoginComponent,
    Register : RegisterComponent,
    Chatroom : ChatroomComponent,
    Update : UpdateUserComponent
  },
  {
    initialRouteName: 'Login',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends Component {
  render(){
    return(
     <AppContainer/>
    )
  }
}
