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
	Dimensions,
	Alert,
	ScrollView,
	BackHandler
} from 'react-native';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Menu, { MenuItem } from 'react-native-material-menu';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import { StatusBar } from 'react-native';
import Modal from 'react-native-modalbox';
import Firebase, { auth } from 'firebase';
import Animated from 'react-native-reanimated';

import bg from './assets/background.png';
import bg2 from './assets/background_2.png';
import bg3 from './assets/background_3.png';
import bg4 from './assets/background_4.png';
import bg5 from './assets/background_5.png';
import logo from './assets/logo.png';
import bg7 from './assets/background_7.png';
import slbg from './assets/sl_bg.png';

import main_bg from './assets/main_bg.png';

import { db } from './assets/src/config';
import ItemComponent from './assets/src/ItemComponent';
import ItemComponent2 from './assets/src/ItemComponent2';
import Bar from './assets/src/Bar';

console.disableYellowBox = true;

var screensize = Dimensions.get('window');
var input = '';
var presentroll = [];
var ret_list = [];

class splash extends Component {
	componentDidMount() {
		Firebase.auth().onAuthStateChanged((user) => {
			this.props.navigation.navigate(user ? 'FACULTYUI' : 'MAINSIGNUP');
		});

		// setTimeout(() => {
		// 	this.props.navigation.navigate('MAINLOGIN');
		// }, 5000);
	}
	componentDidUpdate() {
		Firebase.auth().onAuthStateChanged((user) => {
			this.props.navigation.navigate(user ? 'FACULTYUI' : 'MAINSIGNUP');
		});
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

	handlelogin = () => {
		const { user, password } = this.state;

		Firebase.auth()
			.signInWithEmailAndPassword(user, password)
			.then(() => this.props.navigation.navigate('FACULTYUI'))
			.catch(() => alert('Log In Problem', 'PLEASE PROVIDE PROPER INFORMATION'));
	};

	render() {
		return (
			<ImageBackground source={slbg} style={{ height: '100%', width: '100%' }} resizeMode="cover">
				<KeyboardAvoidingView behavior="position">
					<View style={styles.logocontainer}>
						<Image source={logo} style={{ height: 150, width: 140 }} />
					</View>
					<View style={{ paddingTop: 10 }}>
						<TextInput
							placeholder="Username"
							style={styles.input1}
							onChangeText={(user) => this.setState({ user })}
							value={this.state.user}
						/>
					</View>

					<View style={{ paddingTop: 10 }}>
						<TextInput
							placeholder="Password"
							style={styles.input2}
							onChangeText={(password) => this.setState({ password })}
							value={this.state.password}
						/>
					</View>

					<TouchableOpacity onPress={this.handlelogin}>
						<View style={styles.logbutton}>
							<Text style={styles.logtextstyle}>LOG IN</Text>
						</View>
					</TouchableOpacity>
				</KeyboardAvoidingView>
			</ImageBackground>
		);
	}
}

class mainsignup extends Component {
	state = { user: '', password: '', errormessage: null };

	handlesignup = () => {
		Firebase.auth()
			.createUserWithEmailAndPassword(this.state.user, this.state.password)
			.then(() => this.props.navigation.navigate('FACULTYUI'))
			.catch(() => alert('Sign Up Problem', 'Please Provide Proper Information'));
	};

	render() {
		return (
			<ImageBackground source={slbg} style={{ height: '100%', width: '100%' }} resizeMode="cover">
				<View style={styles.logocontainer}>
					<Image source={logo} style={{ height: 150, width: 140 }} />
				</View>
				<KeyboardAvoidingView behavior="position">
					<View style={{ paddingTop: 10 }}>
						<TextInput
							placeholder="Username"
							style={styles.input1}
							onChangeText={(user) => this.setState({ user })}
							value={this.state.user}
						/>
					</View>

					<View style={{ paddingTop: 10 }}>
						<TextInput
							placeholder="Password"
							style={styles.input2}
							onChangeText={(password) => this.setState({ password })}
							value={this.state.password}
						/>
					</View>

					<TouchableOpacity onPress={this.handlesignup}>
						<View style={styles.logbutton}>
							<Text style={styles.logtextstyle}>SIGN UP</Text>
						</View>
					</TouchableOpacity>

					<TouchableOpacity
						style={{ paddingTop: 25 }}
						onPress={() => this.props.navigation.navigate('MAINLOGIN')}
					>
						<Text style={{ color: '#504f54', fontWeight: 'bold', fontSize: 18, textAlign: 'center' }}>
							Already have an account then LOG IN
						</Text>
					</TouchableOpacity>

					{/* <TouchableOpacity onPress={() => this.props.navigation.navigate('MAINLOGIN')}>
						<View style={styles.logbutton}>
							<Text style={styles.logtextstyle}>LOG IN</Text>
						</View>
					</TouchableOpacity> */}
				</KeyboardAvoidingView>
			</ImageBackground>
		);
	}
}

class facultyui extends Component {
	constructor(props) {
		super(props);
		this.state = {
			log: '',
			clog: '',
			items: [],
			items_2: [],
			// take Components
			date: '',
			currentRoll: '',
			presentroll: [],
			// view Components
			day: '',
			month: '',
			year: '',
			asked_dat: '',
			asked_clas: 'CLASS',
			asked_su: 'SUBJECT'
		};
	}

	componentDidMount() {
		this.auto();
		this.auto_2();
		var that = this;
		var d = new Date().getDate();
		var month = new Date().getMonth();
		var year = new Date().getFullYear();
		that.setState({
			date: 'Date : ' + d + '/' + month + '/' + year
		});
		BackHandler.addEventListener('hardwareBackPress', function() {
			return true;
		});
	}

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
		this.refs.modal0.close();
		this.refs.modal1.open();
	};

	c2 = () => {
		this.setState({
			class: 'IT'
		});
		this._menu2.hide();
		this.refs.modal0.close();
		this.refs.modal1.open();
	};

	auto = () => {
		db.ref('/ACTIVITY LOG_MAIN').on('value', (snapshot) => {
			let data = snapshot.val();
			let items = Object.values(data);
			this.setState({
				items
			});
		});
	};

	auto_2 = () => {
		db.ref('/ACTIVITY LOG_CLASSES').on('value', (snapshot) => {
			let data_2 = snapshot.val();
			let items_2 = Object.values(data_2);
			this.setState({
				items_2
			});
		});
	};

	additem = (item) => {
		db.ref('/ACTIVITY LOG_MAIN').push({
			log: item
		});
	};

	additem_2 = (item2) => {
		db.ref('/ACTIVITY LOG_CLASSES').push({
			clog: item2
		});
	};

	handlesubmit = () => {
		this.additem(this.state.log);
		this.setState({ log: '' });
		alert('Announcement Saved');
	};

	handlesubmit2 = () => {
		this.additem_2(this.state.clog);
		this.setState({ clog: '' });
		alert('Announcement Saved');
	};

	submithandler = () => {
		var new_Roll = this.state.currentRoll;
		var array_roll = this.state.presentroll;
		array_roll.push(new_Roll);
		this.setState({
			presentroll: array_roll,
			currentRoll: ''
		});
	};

	add_data = (data) => {
		var d = new Date().getDate();
		var m = new Date().getMonth();
		var y = new Date().getFullYear();

		var current_date = d + '-' + m + '-' + y;

		var current_class = '/' + this.state.class + '/';

		var current_sub_name = this.state.item;

		db.ref('ATTENDANCE LOGS' + '/' + current_date + current_class + current_sub_name).set({
			PRESENT_ROLL_NO: data
		});
	};

	upload = () => {
		this.refs.modal1.close();
		this.add_data(this.state.presentroll);
		Alert.alert(
			'Saved',
			this.state.date + ' ' + this.state.class + ' ' + this.state.item + ' ' + this.state.presentroll
		);
	};

	_menu3 = null;

	setMenu3Ref = (ref3) => {
		this._menu3 = ref3;
	};

	showMenu3 = () => {
		this._menu3.show();
	};

	mm1 = () => {
		this.setState({
			asked_su: 'OOPC'
		});
		this._menu3.hide();
	};

	mm2 = () => {
		this.setState({
			asked_su: 'DFS'
		});
		this._menu3.hide();
	};

	mm3 = () => {
		this.setState({
			asked_su: 'AEM'
		});
		this._menu3.hide();
	};
	mm4 = () => {
		this.setState({
			asked_su: 'CN'
		});
		this._menu3.hide();
	};
	mm5 = () => {
		this.setState({
			asked_su: 'DE'
		});
		this._menu3.hide();
	};

	_menu4 = null;

	setMenu4Ref = (ref4) => {
		this._menu4 = ref4;
	};

	showMenu4 = () => {
		this._menu4.show();
	};

	cc1 = () => {
		this.setState({
			asked_clas: 'COMPUTER'
		});
		this._menu4.hide();
	};

	cc2 = () => {
		this.setState({
			asked_clas: 'IT'
		});
		this._menu4.hide();
	};

	set_date = () => {
		this.setState({
			asked_dat: this.state.day + '-' + this.state.month + '-' + this.state.year
		});
	};

	retrieve_data = () => {
		var asked_date = 'ATTENDANCE LOGS' + '/' + this.state.asked_dat;
		var asked_class = this.state.asked_clas + '/';
		var asked_sub = this.state.asked_su;
		var date_class = asked_date + '/' + asked_class;
		var sub_roll = asked_sub + '/' + 'PRESENT_ROLL_NO';

		console.log(date_class + sub_roll);

		db.ref(date_class).once('value', function(snapshot) {
			var roll_list = snapshot.child(sub_roll).val();
			var mainlist = JSON.stringify(roll_list);
			console.log(roll_list);
			var ml2 = mainlist.replace(/"/g, '');
			var ml3 = ml2.replace('[', '');
			var new_main_list = ml3.replace(']', '');
			{
				roll_list = null
					? Alert.alert('Please press Enter after entering the date')
					: Alert.alert('Present Roll No', new_main_list);
			}
		});
	};

	render() {
		return (
			<ImageBackground source={main_bg} style={{ height: '100%', width: '100%' }} resizeMode="cover">
				<StatusBar backgroundColor="#289eff" barStyle="light-content" />
				<KeyboardAvoidingView behavior="height">
					<ScrollView>
						<View style={{ flex: 1, alignItems: 'center', marginVertical: 15 }}>
							<View style={styles.announcer_card}>
								<View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start' }}>
									<Text color="#504f54" style={{ fontSize: 20, fontWeight: 'bold' }}>
										Activity Log
									</Text>
									<View style={{ flex: 1, flexDirection: 'row', paddingTop: 5 }}>
										<Icon name="md-send" size={30} style={{ marginLeft: 10 }} />
										<Text color="#504f54" style={{ marginLeft: 10, marginTop: 4 }}>
											MAIN
										</Text>
									</View>
								</View>
								<View style={{ flex: 2, flexDirection: 'column' }}>
									{this.state.items.length > 0 ? (
										<ItemComponent items={this.state.items} />
									) : (
										<Text>No items</Text>
									)}
								</View>
								<TextInput
									blurOnSubmit={false}
									placeholder="enter"
									onChangeText={(log) => this.setState({ log })}
									onSubmitEditing={this.handlesubmit}
									style={{ textAlign: 'center' }}
								/>
							</View>
							<View style={styles.announcer_card}>
								<View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start' }}>
									<Text color="#504f54" style={{ fontSize: 20, fontWeight: 'bold' }}>
										Activity Log
									</Text>
									<View style={{ flex: 1, flexDirection: 'row', paddingTop: 5 }}>
										<Icon name="md-send" size={30} style={{ marginLeft: 10 }} />
										<Text color="#504f54" style={{ marginLeft: 10, marginTop: 5 }}>
											CLASSES
										</Text>
									</View>
								</View>
								<View style={{ flex: 2, flexDirection: 'column' }}>
									{this.state.items_2.length > 0 ? (
										<ItemComponent2 items={this.state.items_2} />
									) : (
										<Text>No items</Text>
									)}
								</View>
								<TextInput
									blurOnSubmit={false}
									placeholder="enter"
									onChangeText={(clog) => this.setState({ clog })}
									onSubmitEditing={this.handlesubmit2}
									style={{ textAlign: 'center' }}
								/>
							</View>

							<View style={{ flexDirection: 'row', marginTop: 10, paddingVertical: 10 }}>
								<TouchableOpacity
									onPress={() => {
										this.refs.modal0.open();
									}}
									style={styles.card}
								>
									<Icon name="md-add-circle" size={30} style={{ marginLeft: 10 }} />
									<Text style={styles.text}>Take Attendance</Text>
								</TouchableOpacity>

								<TouchableOpacity
									onPress={() => {
										this.refs.modal2.open();
									}}
									style={styles.card}
								>
									<Icon name="md-search" size={30} style={{ marginLeft: 10 }} />
									<Text style={styles.text}>View Attendance</Text>
								</TouchableOpacity>
							</View>
							<View style={{ flexDirection: 'row' }}>
								<TouchableOpacity
									onPress={() => {
										this.props.navigation.navigate('EDIT');
									}}
									style={styles.card}
								>
									<Icon name="md-build" size={30} style={{ marginLeft: 10 }} />
									<Text style={styles.text}>Edit Attendance</Text>
								</TouchableOpacity>

								<TouchableOpacity
									onPress={() => {
										this.props.navigation.navigate('MANAGE');
									}}
									style={styles.card}
								>
									<Icon name="md-folder-open" size={30} style={{ marginLeft: 10 }} />
									<Text style={styles.text}>Manage Attendance</Text>
								</TouchableOpacity>
							</View>
							<TouchableOpacity
								onPress={() =>
									Firebase.auth().signOut().then(() => this.props.navigation.navigate('MAINSIGNUP'))}
								style={styles.card}
							>
								<Icon name="md-folder-open" size={30} style={{ marginLeft: 10 }} />
								<Text style={styles.text}>Sign Out</Text>
							</TouchableOpacity>
						</View>
						<View style={{ paddingVertical: 15, paddingHorizontal: 15 }} />
					</ScrollView>
				</KeyboardAvoidingView>
				<Bar />
				{/* modal part */}

				<Modal
					ref={'modal0'}
					style={{
						justifyContent: 'center',
						alignItems: 'center',
						height: 400,
						width: screensize.width - 80,
						elevation: 5,
						backgroundColor: 'white',
						opacity: 20
					}}
					position={'center'}
					swipeToClose={false}
				>
					<ImageBackground source={bg5} style={{ height: '100%', width: '100%' }} resizeMode="cover">
						<View style={{ paddingTop: 30, justifyContent: 'center', alignItems: 'center' }}>
							<Text
								style={{
									margin: 15,
									fontSize: 30,
									color: '#504f54',
									fontFamily: 'Roboto',
									fontWeight: 'bold'
								}}
							>
								{this.state.date}
							</Text>

							<Menu
								ref={this.setMenuRef}
								button={
									<Icon
										onPress={this.showMenu}
										name="ios-menu"
										size={50}
										color="black"
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
							<Menu
								ref={this.setMenu2Ref}
								button={
									<Icon
										onPress={this.showMenu2}
										name="logo-buffer"
										size={50}
										color="black"
										raised={true}
									/>
								}
							>
								<MenuItem onPress={this.c1}>COMPUTER</MenuItem>
								<MenuItem onPress={this.c2}>IT</MenuItem>
							</Menu>
						</View>
					</ImageBackground>
				</Modal>
				<Modal
					ref={'modal1'}
					style={{
						justifyContent: 'center',
						alignItems: 'center',
						height: 400,
						width: screensize.width - 80,
						borderRadius: 20,
						elevation: 5,
						backgroundColor: 'white',
						opacity: 20
					}}
					position={'center'}
					swipeToClose={false}
				>
					<ImageBackground source={bg4} style={{ height: '100%', width: '100%' }} resizeMode="cover">
						<KeyboardAvoidingView behavior="position">
							<View style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 30 }}>
								<View
									style={{
										backgroundColor: 'white',
										borderRadius: 15,
										elevation: 10,
										height: 90,
										width: 180
									}}
								>
									<Text style={styles.text2}>SUBJECT: {this.state.item}</Text>
									<Text style={styles.text2}>CLASS : {this.state.class}</Text>
								</View>
								<TextInput
									blurOnSubmit={false}
									placeholder=" Enter Roll No"
									style={{
										height: 50,
										width: 200,
										borderRadius: 25,
										fontSize: 16,
										marginHorizontal: 25,
										backgroundColor: 'white',
										paddingLeft: 25,
										marginTop: 16,
										color: 'black'
									}}
									keyboardType="number-pad"
									onChangeText={(currentRoll) => this.setState({ currentRoll })}
									value={this.state.currentRoll}
									onSubmitEditing={this.submithandler}
								/>
								<View style={{ marginHorizontal: 25 }}>
									<TouchableOpacity onPress={this.upload}>
										<Icon name="md-checkmark-circle" size={70} color="white" />
									</TouchableOpacity>
								</View>
							</View>
						</KeyboardAvoidingView>
					</ImageBackground>
				</Modal>
				<Modal
					ref={'modal2'}
					style={{
						justifyContent: 'center',
						alignItems: 'center',
						height: 400,
						width: screensize.width - 80,
						elevation: 5,
						backgroundColor: 'white',
						opacity: 20
					}}
					position={'center'}
					swipeToClose={false}
				>
					<ImageBackground source={bg4} style={{ height: '100%', width: '100%' }} resizeMode="cover">
						<View
							style={{ flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}
						>
							<Text
								style={{
									margin: 15,
									fontSize: 30,
									color: '#504f54',
									fontFamily: 'Roboto',
									fontWeight: 'bold'
								}}
							>
								DATE
							</Text>
							<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
								<TextInput
									placeholder="00"
									style={{
										height: 30,
										width: 30,
										fontSize: 16,
										marginVertical: 5,
										backgroundColor: 'white',
										textAlign: 'center',
										color: 'black',
										fontWeight: 'bold'
									}}
									keyboardType="number-pad"
									onChangeText={(day) => this.setState({ day })}
									onSubmitEditing={this.set_date}
								/>
								<TextInput
									placeholder="00"
									style={{
										height: 30,
										width: 40,
										fontSize: 16,
										marginVertical: 5,
										backgroundColor: 'white',
										color: 'black',
										textAlign: 'center',
										fontWeight: 'bold'
									}}
									keyboardType="number-pad"
									onChangeText={(month) => this.setState({ month })}
									onSubmitEditing={this.set_date}
								/>
								<TextInput
									placeholder="0000"
									style={{
										height: 30,
										width: 50,
										fontSize: 16,
										marginVertical: 5,
										backgroundColor: 'white',
										color: 'black',
										textAlign: 'center',
										fontWeight: 'bold'
									}}
									keyboardType="number-pad"
									onChangeText={(year) => this.setState({ year })}
									onSubmitEditing={this.set_date}
								/>
							</View>
							<Menu
								ref={this.setMenu3Ref}
								button={
									<TouchableOpacity onPress={this.showMenu3}>
										<Text
											style={{
												margin: 15,
												fontSize: 30,
												color: 'black',
												fontFamily: 'Roboto',
												fontWeight: 'bold'
											}}
										>
											{this.state.asked_su}
										</Text>
									</TouchableOpacity>
								}
							>
								<MenuItem onPress={this.mm1}>OOPC</MenuItem>
								<MenuItem onPress={this.mm2}>DFS</MenuItem>
								<MenuItem onPress={this.mm3}>AEM</MenuItem>
								<MenuItem onPress={this.mm4}>CN</MenuItem>
								<MenuItem onPress={this.mm5}>DE</MenuItem>
							</Menu>
							<Menu
								ref={this.setMenu4Ref}
								button={
									<TouchableOpacity onPress={this.showMenu4}>
										<Text
											style={{
												margin: 15,
												fontSize: 30,
												color: 'black',
												fontFamily: 'Roboto',
												fontWeight: 'bold'
											}}
										>
											{this.state.asked_clas}
										</Text>
									</TouchableOpacity>
								}
							>
								<MenuItem onPress={this.cc1}>COMPUTER</MenuItem>
								<MenuItem onPress={this.cc2}>IT</MenuItem>
							</Menu>
							<Icon name="md-download" size={50} onPress={this.retrieve_data} />
						</View>
					</ImageBackground>
				</Modal>
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
					<Bar />
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
		MAINSIGNUP: {
			screen: mainsignup,
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
		STUDENTUI: {
			screen: student,
			navigationOptions: {
				title: 'Student Centre',
				headerStyle: {
					backgroundColor: '#289eff',
					elevation: 5
				},
				headerTitleStyle: {
					color: '#F7F9FE',
					textAlign: 'center'
				}
			}
		},
		FACULTYUI: {
			screen: facultyui,
			navigationOptions: {
				headerLeft: null,
				title: 'HOME',
				headerStyle: {
					backgroundColor: '#289eff',
					elevation: 5
				},
				headerTitleStyle: {
					color: '#F7F9FE',
					textAlign: 'center'
				}
			}
		},
		EDIT: {
			screen: edit,
			navigationOptions: {
				title: 'Edit',
				headerStyle: {
					backgroundColor: '#289eff',
					elevation: 5
				},
				headerTitleStyle: {
					color: '#F7F9FE',
					textAlign: 'center'
				}
			}
		},
		MANAGE: {
			screen: manage,
			navigationOptions: {
				title: 'Manage',
				headerStyle: {
					backgroundColor: '#289eff',
					elevation: 5
				},
				headerTitleStyle: {
					color: '#F7F9FE',
					textAlign: 'center'
				}
			}
		}
	},
	{
		initialRouteName: 'FACULTYUI'
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
		margin: 15,
		fontSize: 20,
		color: 'white',
		fontFamily: 'Roboto',
		textShadowColor: 'black',
		textShadowRadius: 2,
		fontWeight: 'bold'
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
		backgroundColor: '#289eff',
		paddingLeft: 25,
		color: 'white',
		elevation: 10
	},
	input2: {
		width: 305,
		height: 35,
		borderRadius: 25,
		fontSize: 16,
		marginHorizontal: 25,
		backgroundColor: '#289eff',
		paddingLeft: 25,
		color: 'white',
		elevation: 10
	},
	logbutton: {
		width: 300,
		height: 45,
		alignSelf: 'center',
		borderRadius: 25,
		backgroundColor: 'darkblue',
		borderColor: 'white',
		marginTop: 25,
		elevation: 10
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
	modal3: {
		height: 300,
		width: 300
	},
	modal4: {
		height: 300
	},
	text: {
		color: 'black',
		fontSize: 18,
		textAlign: 'center',
		paddingVertical: 4
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
		elevation: 10,
		backgroundColor: 'white',
		marginHorizontal: 5,
		marginVertical: 8,
		borderRadius: 10
	},
	button2: {
		width: 60,
		height: 60,
		elevation: 10,
		backgroundColor: 'white',
		marginHorizontal: 5,
		marginVertical: 5,
		borderRadius: 30
	},
	text2: {
		color: 'black',
		fontSize: 20,
		textAlign: 'center',
		paddingVertical: 8
	},
	input3: {
		width: 300,
		height: 35,
		borderRadius: 25,
		fontSize: 25,
		marginHorizontal: 25,
		backgroundColor: 'black',
		marginVertical: 25,
		color: 'white',
		textAlign: 'center'
	},
	announcer_card: {
		width: 270,
		height: 220,
		elevation: 10,
		backgroundColor: 'white',
		marginVertical: 15,
		borderRadius: 10
	}
});
