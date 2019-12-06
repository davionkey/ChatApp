import React , { Component} from 'react';
import { Alert,Image,StyleSheet, Text, View, TextInput,FlatList,TouchableOpacity, SafeAreaView } from 'react-native';
import Button from 'react-native-button';
import * as ImagePicker from 'expo-image-picker';
import * as firebase from 'firebase';
import { Ionicons, Feather } from '@expo/vector-icons';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';


class FlatListItem extends Component{
    constructor(props){
        super(props)
        this.state={
            name:''
        }
    }
    componentDidMount(){
        let user = firebase.auth().currentUser
        this.setState({name:user.displayName})
    
    }
    render(){
        if(this.props.item.item.url==''){
        return(
           
            <View style={{
                flex:1,flexDirection: 'column', width: '100%', alignItems: this.props.item.item.userName===this.state.name?'flex-end':'flex-start',backgroundColor:'white',
            }} >
                
                <View style={{flex:9/10,flexDirection:'column'}}>
                    <Text style={{color:'gray', margin:5}}>{this.props.item.item.userName}</Text>    
                    <Text style={{color:'white',backgroundColor:'#365899',padding: 8, borderRadius: 20,marginBottom : 10,marginTop : 5,marginLeft : 5,marginRight : 5}}>{this.props.item.item.chatContent}</Text>
                    
                </View>
            </View>
        )} else {
            return(
                <View style={{
                    flex:1,flexDirection: 'column', width: '100%', alignItems: this.props.item.item.userName===this.state.name?'flex-end':'flex-start',backgroundColor:'white',
                }} >
                    
                    <View style={{flex:9/10,flexDirection:'column'}}>
                        <Text style={{color:'gray', margin:5}}>{this.props.item.item.userName}</Text>    
                        
                        <Image
              style={{width: 200, height: 200}}
              source={{uri: this.props.item.item.url}}
            />
                    </View>
                </View>
            )
        }
    }
}

export default class ChatRoomComponent extends Component{
    constructor(props){
        super(props)
        this.state = {
            chatData: [],
            chatInputContent: '',
            username: '',
            url: ''
        }
    };
    static navigationOptions = {
        title: 'Chat Room',
    }
    componentDidMount(){
            this.setState({url:''})
            this.getPermissionAsync();
            console.log('hi');
          }
        
          getPermissionAsync = async () => {
            if (Constants.platform.ios) {
              const { status } = await Permissions.askAsync(Permissions.CAMERA);
              if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
              }
            }
                 let user = firebase.auth().currentUser;
        this.setState({username:user.displayName})
        
        firebase.database().ref('/chatRoom').on("value",snapshot=>{
            if(snapshot.val()!==undefined && snapshot.val()!==null)
            {
                this.setState({
                    chatData:Object.values(snapshot.val())
                })
            }
        })
    }
    _sendMessage =()=>{
        firebase.database().ref('/chatRoom').push({
            userName: this.state.username,
            chatContent: this.state.chatInputContent,
            url : ''
        });
        this.setState({
            chatInputContent:''
        })
    }
    chooseImagePress = async () =>{
        let result = await ImagePicker.launchCameraAsync();
        // let result = await ImagePicker.launchImageLibraryAsync();
        if(!result.cancelled){
            this.uploadImage(result.uri,'test-image')
            .then(()=>{
                Alert.alert("Success");
            })
            .catch((error)=>{
                Alert.alert(error)
            })
        }
    }
    uploadImage= async (uri, imageName) => {
        const reponse = await fetch(uri);
        const blob = await reponse.blob();
        var ref = firebase.storage().ref().child("images/"+ imageName )
        await ref.put(blob);
        return ref.getDownloadURL()
        .then((url)=>{this.setState({url})
        firebase.database().ref('/chatRoom').push({
            userName: this.state.username,
            url : this.state.url,
            chatContent: ''
            
        });
        this.setState({
            url:''
        })            
    })
        .catch((error)=>{console.log(error)})
    }
    renderImage(){
        return(
            <View>
                <Image
          style={{width: 50, height: 50}}
          source={{uri: this.state.url}}
        />
            </View>
        )
    }
    render(){
        return(
            
            <View style={{flex:1, flexDirection:'column',justifyContent:"flex-start"}}>
                <View style={styles.container1}>
               
                    <FlatList data={this.state.chatData}
                              renderItem={(item,index)=>{
                                return (
                                    <FlatListItem item={item} index={index} parentFlatList={this}>
                
                                    </FlatListItem>)
                              }}  
                    />
                </View>
              
                <View style={{flex:1/10}}>
                    <View style={styles.container2}>
                        <View style={{flex:1/10}}>
                          <TouchableOpacity
                             onPress = {()=>this.chooseImagePress()}
                            >    
                            <Feather name="camera" size={32}  />
                          </TouchableOpacity>
                        </View>
                        <View style={{flex:8/10}}>
                            <TextInput
                                placeholder ='Enter Content'
                                onChangeText={(text)=>{this.setState({chatInputContent:text})}}
                                value ={this.state.chatInputContent}
                                style={styles.textInput}
                            />
                        </View>
                        <View style={{flex:1/10,justifyContent:'center', alignItems:'center'}}>
                        <TouchableOpacity onPress={() => this._sendMessage()} >
                            <Text style={{ color: '#0099ff', fontSize: 14, marginRight: 15 }} >
                                Gửi
                            </Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </View>
        )
    }
}
const styles = StyleSheet.create({
    container1 : {
        flex: 9/10,
        backgroundColor : 'white',
        flexDirection:'column',
        
    },
    container2 : {
        flexDirection:'row',
        backgroundColor:'white',
        width:'100%',
        height:100,
        justifyContent:'space-around',
        alignContent: 'center',
        marginLeft:2,
   },
   textInput: {
       height:100,
       fontSize:18
   },
   textbutton:{
        color : 'blue',
        fontSize:14,
        marginRight: 15
   }
})