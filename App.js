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
	Dimensions,
	Alert,
	Animated,
	SafeAreaView,
	Platform,
	ScrollView
} from 'react-native';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import { StatusBar } from 'react-native';
import Modal from 'react-native-modalbox';

//CUSTOM COMPONENTS//
import Mykeyboard from './assets/resources/keypad';

import bg from './assets/background.png';
import bg2 from './assets/background_2.png';
import bg3 from './assets/background_3.png';
import bg4 from './assets/background_4.png';
import bg5 from './assets/background_5.png';
import logo from './assets/logo.png';
import mykeyboard from './assets/resources/keypad';

var screensize = Dimensions.get('window');

class splash extends Component {
	componentDidMount() {
		setTimeout(() => {
			this.props.navigation.navigate('MAINLOGIN');
		}, 10000);
	}
	render() {
		return (
			<ImageBackground source={bg5} style={{ height: '100%', width: '100%' }} resizeMode="cover">
				<View style={styles.logocontainer}>
					<Image source={logo} style={{ width: 140, height: 150 }} />
					<Text style={{ fontSize: 30, color: 'black', elevation: 10 }}> SPCE </Text>
				</View>
			</ImageBackground>
		);
	}
}

class mainlogin extends Component {
	constructor(props) {
		super(props);
		this.state = { user: '', password: '' };
	}

	login = () => {
		const studentuser = 'student1';
		const studentpass = 'passwordst';

		const facultyuser = 'faculty1';
		const facultypass = 'passwordfc';

		if (this.state.user == studentuser && this.state.password == studentpass) {
			this.props.navigation.navigate('STUDENTUI');
		} else if (this.state.user == facultyuser && this.state.password == facultypass) {
			this.props.navigation.navigate('FACULTYUI');
		}
	};

	render() {
		return (
			<ImageBackground source={bg5} style={{ height: '100%', width: '100%' }} resizeMode="cover">
				<KeyboardAvoidingView behavior="position">
					<View style={styles.logocontainer}>
						<Image source={logo} style={{ height: 150, width: 140 }} />
					</View>
					<View style={{ paddingTop: 10 }}>
						<TextInput
							placeholder="Username"
							style={styles.input1}
							onChangeText={(user) => this.setState({ user })}
						/>
					</View>

					<View>
						<TextInput
							placeholder="Password"
							style={styles.input2}
							onChangeText={(password) => this.setState({ password })}
						/>
					</View>

					<TouchableOpacity onPress={this.login}>
						<View style={styles.logbutton}>
							<Text style={styles.logtextstyle}>ENTER</Text>
						</View>
					</TouchableOpacity>
				</KeyboardAvoidingView>
			</ImageBackground>
		);
	}
}

class faculty extends Component {
	opentake = () => {
		this.props.navigation.navigate('TAKE');
	};

	openview = () => {
		this.props.navigation.navigate('VIEW');
	};

	openedit = () => {
		this.props.navigation.navigate('EDIT');
	};

	openemanage = () => {
		this.props.navigation.navigate('MANAGE');
	};

	render() {
		return (
			<View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
				<StatusBar hidden={true} />
				<ImageBackground source={bg2} style={{ height: '100%', width: '100%' }} resizeMode="cover">
					<View style={styles.container}>
						<View style={{ flexDirection: 'row' }}>
							<TouchableOpacity onPress={this.opentake} style={styles.card}>
								<Text style={styles.text}>Take Attendance</Text>
							</TouchableOpacity>

							<TouchableOpacity onPress={this.openview} style={styles.card}>
								<Text style={styles.text}>View Attendance</Text>
							</TouchableOpacity>
						</View>
						<View style={{ flexDirection: 'row' }}>
							<TouchableOpacity onPress={this.openedit} style={styles.card}>
								<Text style={styles.text}>Edit Attendance</Text>
							</TouchableOpacity>

							<TouchableOpacity onPress={this.openemanage} style={styles.card}>
								<Text style={styles.text}>Manage Attendance</Text>
							</TouchableOpacity>
						</View>
					</View>
				</ImageBackground>
			</View>
		);
	}
}

class take extends Component {
	constructor(props) {
		super(props);
		this.state = {
			date: '',
			isOpen: false,
			isDisabled: false,
			swipeToClose: true,
			sliderValue: 0.3,
			currentRoll: ''
		};
	}
	componentDidMount() {
		var that = this;
		var d = new Date().getDate();
		var month = new Date().getMonth();
		var year = new Date().getFullYear();

		that.setState({
			date: 'Date : ' + d + '/' + month + '/' + year
		});
	}

	_menu = null;

	setMenuRef = (ref) => {
		this._menu = ref;
	};

	showMenu = () => {
		this._menu.show();
	};
	m1 = () => {
		this.setState({
			item: 'OOPC'
		});
		this._menu.hide();
	};

	m2 = () => {
		this.setState({
			item: 'DFS'
		});
		this._menu.hide();
	};

	m3 = () => {
		this.setState({
			item: 'AEM'
		});
		this._menu.hide();
	};
	m4 = () => {
		this.setState({
			item: 'CN'
		});
		this._menu.hide();
	};
	m5 = () => {
		this.setState({
			item: 'DE'
		});
		this._menu.hide();
	};

	_menu2 = null;

	setMenu2Ref = (ref2) => {
		this._menu2 = ref2;
	};

	showMenu2 = () => {
		this._menu2.show();
	};

	c1 = () => {
		this.setState({
			class: 'COMPUTER'
		});
		this._menu2.hide();
		this.refs.modal1.open();
	};

	c2 = () => {
		this.setState({
			class: 'IT'
		});
		this._menu2.hide();
		this.refs.modal1.open();
	};

	//FOR DEBUGGING ./.'//

	upload = () => {
		Alert.alert(this.state.date + ' ' + this.state.item + ' ' + this.state.class);
	};

	render() {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<StatusBar hidden={true} />
				<ImageBackground source={bg3} style={{ height: '100%', width: '100%' }} resizeMode="cover">
					<View style={{ position: 'absolute', top: 25, left: 35 }}>
						<Text style={styles.mainTextV2}>Welcome,</Text>
					</View>
					<View
						style={{
							paddingTop: 90,
							flex: 1,
							alignItems: 'center',
							flexDirection: 'column'
						}}
					>
						<Text style={styles.mainText}>{this.state.date}</Text>
						<View style={{ paddingTop: 15 }}>
							<Menu
								ref={this.setMenuRef}
								button={
									<Icon
										onPress={this.showMenu}
										name="ios-menu"
										size={50}
										color="white"
										raised={true}
									/>
								}
							>
								<MenuItem onPress={this.m1}>OOPC</MenuItem>
								<MenuItem onPress={this.m2}>DFS</MenuItem>
								<MenuItem onPress={this.m3}>AEM</MenuItem>
								<MenuItem onPress={this.m4}>CN</MenuItem>
								<MenuItem onPress={this.m5}>DE</MenuItem>
							</Menu>
						</View>
						<View style={{ paddingTop: 15 }}>
							<Menu
								ref={this.setMenu2Ref}
								button={
									<Icon
										onPress={this.showMenu2}
										name="logo-buffer"
										size={50}
										color="white"
										raised={true}
									/>
								}
							>
								<MenuItem onPress={this.c1}>COMPUTER</MenuItem>
								<MenuItem onPress={this.c2}>IT</MenuItem>
							</Menu>
						</View>
					</View>

					<Modal
						ref={'modal1'}
						style={{
							justifyContent: 'center',
							alignItems: 'center',
							// height: 400,
							// width: screensize.width - 80,
							// borderRadius: 20,
							 elevation: 5,
							 backgroundColor:'#DDDDDD',
							 opacity:20
						}}
						position={'center'}
					>
						<KeyboardAvoidingView behavior="position">
							<View style={{alignItems:'center'}}>
								<Text style={styles.text}>SUBJECT: {this.state.item}</Text>
								<Text style={styles.text}>CLASS : {this.state.class}</Text>
								<Text style={styles.text}>ENTER ROLL NO</Text>
								<View style={{ flexDirection: 'column' }}>
									<View style={{ flexDirection: 'row' }}>
										<TouchableOpacity style={styles.button2}>
											<Text style={styles.text2}>1</Text>
										</TouchableOpacity>
										<TouchableOpacity style={styles.button2}>
											<Text style={styles.text2}>2</Text>
										</TouchableOpacity>
										<TouchableOpacity style={styles.button2}>
											<Text style={styles.text2}>3</Text>
										</TouchableOpacity>
									</View>
									<View style={{ flexDirection: 'row' }}>
										<TouchableOpacity style={styles.button2}>
											<Text style={styles.text2}>4</Text>
										</TouchableOpacity>
										<TouchableOpacity style={styles.button2}>
											<Text style={styles.text2}>5</Text>
										</TouchableOpacity>
										<TouchableOpacity style={styles.button2}>
											<Text style={styles.text2}>6</Text>
										</TouchableOpacity>
									</View>
									<View style={{ flexDirection: 'row' }}>
										<TouchableOpacity style={styles.button2}>
											<Text style={styles.text2}>7</Text>
										</TouchableOpacity>
										<TouchableOpacity style={styles.button2}>
											<Text style={styles.text2}>8</Text>
										</TouchableOpacity>
										<TouchableOpacity style={styles.button2}>
											<Text style={styles.text2}>9</Text>
										</TouchableOpacity>
									</View>
									<View style={{ flexDirection: 'row' }}>
										<TouchableOpacity style={styles.button2}>
											<Text style={styles.text2}>>></Text>
										</TouchableOpacity>
										<TouchableOpacity style={styles.button2}>
											<Text style={styles.text2}>0</Text>
										</TouchableOpacity>
										<TouchableOpacity style={styles.button2}>
											<Text style={styles.text2}>OK</Text>
										</TouchableOpacity>
									</View>
								</View>
							</View>
						</KeyboardAvoidingView>
					</Modal>

					<View
						style={{
							position: 'absolute',
							bottom: 60,
							right: 40
						}}
					>
						<Icon name="md-cloud-upload" size={80} onPress={this.upload} color="#8cf1eb" />
					</View>
				</ImageBackground>
			</View>
		);
	}
}

class view extends Component {
	handleViewRef = (ref) => (this.view = ref);
	handleTextRef = (ref) => (this.text = ref);

	fade = () => {
		this.view.transitionTo({ opacity: 0 });
		this.text.transitionTo({ opacity: 1 });
	};
	render() {
		return (
			<ImageBackground source={bg} style={{ height: '100%', width: '100%' }} resizeMode="cover">
				<View style={{ position: 'absolute', top: 200, left: 170 }}>
					<Animatable.View
						ref={this.handleViewRef}
						style={{ width: 50, height: 50, backgroundColor: 'black' }}
					/>
				</View>
				<View style={{ position: 'absolute', top: 200, left: 200 }}>
					<Animatable.Text ref={this.handleTextRef} style={{ color: 'black', opacity: 0 }}>
						Fade me!
					</Animatable.Text>
				</View>
				<View style={{ justifyContent: 'center', alignContent: 'center' }}>
					<Button onPress={this.fade} title="fade" />
				</View>
			</ImageBackground>
		);
	}
}

class edit extends Component {
	constructor() {
		super();
		this.state = {
			isOpen: false,
			isDisabled: false,
			swipeToClose: true,
			sliderValue: 0.3
		};
	}
	render() {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<StatusBar hidden={true} />
				<ImageBackground source={bg} style={{ height: '100%', width: '100%' }} resizeMode="cover">
					{/* <Modal
						ref={'modal1'}
						style={{
							justifyContent: 'center',
							alignItems: 'center',
							height: 300,
							width: screensize.width - 80,
							borderRadius: 20
						}}
						position={'center'}
					>
						<View>
							<Text style={styles.text}>SUBJECT : DFS</Text>
							<Text style={styles.text}>CLASS : IT</Text>
							<Text style={styles.text}>ENTER ROLL NO</Text>
					
							<TextInput
								placeholder=" Enter Roll No"
								style={{
									height: 50,
									width: 200,
									backgroundColor: '#DDDDDD',
									marginTop: 16,
									borderRadius: 20,
									color: 'black'
								}}
							/>
						</View>
					</Modal>

					<TouchableOpacity style={styles.button} onPress={() => this.refs.modal1.open()}>
						<Text style={styles.buttonText}>Open Modal with Input + Keyboard</Text>
					</TouchableOpacity> */}
				</ImageBackground>
			</View>
		);
	}
}

class manage extends Component {
	render() {
		return (
			<ImageBackground source={bg} style={{ height: '100%', width: '100%' }} resizeMode="cover">
				<View style={styles.container} />
			</ImageBackground>
		);
	}
}

class student extends Component {
	render() {
		return (
			<ImageBackground source={bg} style={{ height: '100%', width: '100%' }} resizeMode="cover">
				<View style={styles.container}>
					<Text>Student interface</Text>
				</View>
			</ImageBackground>
		);
	}
}

const rootstack = createStackNavigator(
	{
		SPLASH: {
			screen: splash,
			navigationOptions: {
				header: null
			}
		},
		MAINLOGIN: {
			screen: mainlogin,
			navigationOptions: {
				header: null
			}
		},
		FACULTYUI: {
			screen: faculty,
			navigationOptions: {
				title: 'FACULTY UI'
			}
		},
		STUDENTUI: {
			screen: student,
			navigationOptions: {
				header: null
			}
		},
		TAKE: {
			screen: take,
			navigationOptions: {
				title: 'Take Attendance',
				headerStyle: {
					borderEndWidth: 2,
					borderEndColor: 'black',
					backgroundColor: '#ffff'
				},
				headerTitleStyle: {
					justifyContent: 'center',
					color: 'black',
					fontFamily: 'Roboto',
					textShadowColor: 'silver',
					textShadowOffset: { width: 1, height: 1 },
					textShadowRadius: 3
				}
			}
		},
		VIEW: {
			screen: view
		},
		EDIT: {
			screen: edit,
			navigationOptions: {
				header: null
			}
		},
		MANAGE: {
			screen: manage,
			navigationOptions: {
				header: null
			}
		}
	},
	{
		initialRouteName: 'TAKE'
	}
);

const AppContainer = createAppContainer(rootstack);

export default class App extends Component {
	render() {
		return <AppContainer />;
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	mainText: {
		fontSize: 40,
		color: 'white',
		fontFamily: 'Roboto',
		textShadowColor: 'black',
		textShadowOffset: { width: 1, height: 1 },
		textShadowRadius: 4,
		fontWeight: 'bold'
	},
	mainTextV2: {
		fontSize: 20,
		color: 'white',
		fontFamily: 'Roboto',
		textShadowColor: 'black',
		textShadowOffset: { width: 1, height: 1 },
		textShadowRadius: 2,
		fontWeight: 'normal',
		fontStyle: 'italic'
	},
	logincontainer: {
		paddingTop: 300,
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		marginVertical: 80
	},
	input1: {
		width: 305,
		height: 35,
		borderRadius: 25,
		fontSize: 16,
		marginHorizontal: 25,
		backgroundColor: 'black',
		paddingLeft: 25,
		marginVertical: 25,
		color: 'white'
	},
	input2: {
		width: 305,
		height: 35,
		borderRadius: 25,
		fontSize: 16,
		marginHorizontal: 25,
		backgroundColor: 'black',
		paddingLeft: 25,
		color: 'white'
	},
	logbutton: {
		width: 300,
		height: 45,
		alignSelf: 'center',
		borderRadius: 25,
		backgroundColor: 'black',
		borderColor: 'white',
		marginTop: 25
	},
	logtextstyle: {
		fontSize: 16,
		color: 'white',
		marginTop: 10,
		textAlign: 'center'
	},
	logo: {
		// width: 120,
		// height: 120,
		fontSize: 100,
		color: 'black',
		elevation: 40,
		marginBottom: 50
	},
	logocontainer: {
		alignItems: 'center',
		paddingTop: '60%'
	},
	wrapper: {
		paddingTop: 50,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	modal: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	modal2: {
		height: 230,
		backgroundColor: 'orange'
	},
	modal3: {
		height: 300,
		width: 300
	},
	modal4: {
		height: 300
	},
	text: {
		color: 'white',
		fontSize: 20,
		textAlign: 'center',
		paddingVertical: 4,
		fontWeight:'bold'
	},
	button: {
		backgroundColor: 'green',
		width: 300,
		marginTop: 16,
		textAlign: 'center',
		marginLeft: 10,
		marginRight: 10
	},
	buttonText: {
		fontSize: 16,
		fontWeight: 'bold',
		textAlign: 'center',
		margin: 10,
		color: '#d0d0d0'
	},
	card: {
		width: 130,
		height: 80,
		elevation: 5,
		backgroundColor: 'white',
		marginHorizontal: 5,
		marginVertical: 8
	},
	button2: {
		width: 60,
		height: 60,
		elevation: 10,
		backgroundColor: 'white',
		marginHorizontal: 5,
		marginVertical: 5,
		borderRadius:30
	},
	text2: {
		color: 'black',
		fontSize: 40,
		textAlign: 'center',
		paddingVertical: 8
	}
});
