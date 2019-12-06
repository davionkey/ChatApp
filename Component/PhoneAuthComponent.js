import React , { Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as firebase from 'firebase'
import auth from 'firebase/auth'
import PhoneInput from 'react-native-phone-input'

import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base'
async function confirmmation1(param) {
    
    const confirmation = await auth().signInWithPhoneNumber(param);
        return confirmation; 
    
}

export default class PhoneAuthComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            number :'',
            confirm: null 
            
        }
    }
    veryfiPhone = (number) =>{
       console.log (this.state.number)
        }
    
    render(){
        return(
                       
                       <Container style = {styles.container}>
                            <Form>
                             <PhoneInput style={{height: 50}} ref='phone'
                           onChangePhoneNumber = {(number)=>this.setState({number})}                          
                             />
                         <Button style = {{marginTop : 10}}
                           full
                           rounded
                           success
                           onPress = {()=> this.veryfiPhone(this.state.number)}
                         >
                           <Text> Gui Ma SMS </Text>
                         </Button>
                         
                       </Form>
                     </Container>
        )      
        
    }

}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      
      justifyContent: 'center',
    },
  });