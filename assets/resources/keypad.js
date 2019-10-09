import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

export default class mykeyboard extends Component {
	render() {
		return (
			<View style={{ flexDirection: 'column' }}>
				<View style={{ flexDirection: 'row' }}>
					<TouchableOpacity style={styles.button}>
						<Text style={styles.text}>1</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.button}>
						<Text style={styles.text}>2</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.button}>
						<Text style={styles.text}>3</Text>
					</TouchableOpacity>
				</View>
				<View style={{ flexDirection: 'row' }}>
					<TouchableOpacity style={styles.button}>
						<Text style={styles.text}>4</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.button}>
						<Text style={styles.text}>5</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.button}>
						<Text style={styles.text}>6</Text>
					</TouchableOpacity>
				</View>
				<View style={{ flexDirection: 'row' }}>
					<TouchableOpacity style={styles.button}>
						<Text style={styles.text}>7</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.button}>
						<Text style={styles.text}>8</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.button}>
						<Text style={styles.text}>9</Text>
					</TouchableOpacity>
				</View>
				<View style={{ flexDirection: 'row' }}>
					<TouchableOpacity style={styles.button}>
						<Text style={styles.text}>>></Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.button}>
						<Text style={styles.text}>0</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.button}>
						<Text style={styles.text}>OK</Text>
					</TouchableOpacity>
				</View>
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
		marginHorizontal:3,
		marginVertical:3
	},
	text: {
		color: 'black',
		fontSize: 40,
		textAlign: 'center',
		paddingVertical: 10
	}
});
