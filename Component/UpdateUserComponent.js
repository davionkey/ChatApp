import React , { Component} from 'react';
import { StyleSheet, Text, View, TextInput,FlatList,TouchableOpacity, SafeAreaView } from 'react-native';
import Button from 'react-native-button'
import * as firebase from 'firebase'
export default class UpdateUserComponent extends Component{
    constructor(props){
        super(props)
        this.state ={
            displayName: ''
        }
    }
    joinroom = ()=>{
        firebase.auth().currentUser.updateProfile({
            displayName: this.state.displayName
        }).then(()=>{
            this.props.navigation.navigate('Chatroom')
        }).catch((error)=>{console.log(error)})
    }
    render(){
        return(
            <View style ={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <TextInput
                    placeholder = 'Enter Display Name'
                    onChangeText = {(text)=>this.setState({displayName:text})}
                    value = {this.state.displayName}
                />
                <Button
                onPress = {()=>this.joinroom()}
                >Join ChatRoom</Button>
            </View>
        )
    }
}