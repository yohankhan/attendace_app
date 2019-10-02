import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Image,
	ImageBackground,
	TextInput,
	TouchableOpacity,
	KeyboardAvoidingView,
	Button,
	Dimensions
} from 'react-native';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


class splash extends Component{
	componentDidMount(){
		setTimeout(() =>{
			this.props.navigaation.navigate('MAINLOGIN');
		}, 5000);
	}
  render(){
    return(
      <View styles={styles.container}> 
        <Text>
          splashscreen
        </Text>
        </View>
    );
  }
}

class mainlogin extends Component{
  render(){
    return(
      <View style={styles.container}>
        <Text>
          main login
        </Text>
      </View>
    );
  }
}

class faculty extends Component{
  render(){
    return(
      <View style={styles.container}>
        <Text>
          Faculty interface
        </Text>
      </View>
    );
  }
}

class student extends Component{
  render(){
    return(
      <View style={styles.container}>
        <Text>
          Student interface
        </Text>
      </View>
    );
  }
}

const rootstack = createStackNavigator(
  {
    SPLASH: {
      screen:splash,
      navigationOptions:{
        header:null
      }
    },
    MAINLOGIN:{
      screen:mainlogin,
      navigationOptions:{
        header:null
      }
    },
    FACULTYUI:{
      screen:faculty,
      navigationOptions:{
        header:null
      }
    },
    STUDENTUI:{
      screen:student,
      navigationOptions:{
        header:null
      }
    }
  },
  {
    initialRouteName:'SPLASH'
  }
);  

const AppContainer = createAppContainer(rootstack)

export default function App() {
	return (
		<View style={styles.container}>
			<Text>Open up App.js to start working on your app!</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	}
});
