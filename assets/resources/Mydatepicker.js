import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Menu, { MenuItem } from 'react-native-material-menu';

export default class Mydatepicker extends Component {
	constructor(props) {
		super(props);
		this.state = {
			date: ''
		};
	}

	_menu = null;

	setMenuRef = (ref) => {
		this._menu = ref;
	};

	showMenu = () => {
		this._menu.show();
	};


	fu1 = () => {
		for(let i =1; i<32; i++){
			return(
				<MenuItem onPress={this.test1}>
				{this.i}
				</MenuItem>
			);
			let cur = i;
		}
	}

	test1 = (cur) => {
		console.log(cur);
	};
	render() {
		return (
			<View style={{ flex: 1, flexDirection: 'row' }}>
				<Menu
					ref={this.setMenuRef}
					button={
					<TouchableOpacity onPress={this.showMenu}>
						<Text>
							DAY
						</Text>
					</TouchableOpacity>
					}
				>
					{this.fu1}
				</Menu>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	button: {
		width: 60,
		height: 60,
		elevation: 5,
		backgroundColor: 'white',
		marginHorizontal: 3,
		marginVertical: 3
	},
	text: {
		color: 'black',
		fontSize: 40,
		textAlign: 'center',
		paddingVertical: 10
	}
});
