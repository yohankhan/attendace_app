import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Animated from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';

var screensize = Dimensions.get('window');

export default class Bar extends Component {
	constructor() {
		super();
		this.state = {
			size_A: 30,
			size_B: 30,
			size_C: 30,
			size_D: 30,
			size_E: 30
		};
	}
	sizer_A = () => {
		this.setState({
			size_A: 60,
			size_B: 30,
			size_C: 30,
			size_D: 30,
			size_E: 30
		});
	};

	sizer_B = () => {
		this.setState({
			size_A: 30,
			size_B: 60,
			size_C: 30,
			size_D: 30,
			size_E: 30
		});
	};

	sizer_C = () => {
		this.setState({
			size_A: 30,
			size_B: 30,
			size_C: 60,
			size_D: 30,
			size_E: 30
		});
	};

	sizer_D = () => {
		this.setState({
			size_A: 30,
			size_B: 30,
			size_C: 30,
			size_D: 60,
			size_E: 30
		});
	};

	sizer_E = () => {
		this.setState({
			size_A: 30,
			size_B: 30,
			size_C: 30,
			size_D: 30,
			size_E: 60
		});
	};

	render() {
		return (
			<View style={{ flex: 1, justifyContent: 'flex-end' }}>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-evenly',
						height: 50,
						width: screensize.width,
						backgroundColor: '#289eff',
						alignItems: 'center'
					}}
				>
					<TouchableOpacity onPress={this.sizer_A}>
						<Animated.View>
							<Icon name="md-add-circle" size={this.state.size_A} color="white" />
						</Animated.View>
					</TouchableOpacity>

					<TouchableOpacity onPress={this.sizer_B}>
						<Animated.View>
							<Icon name="md-search" size={this.state.size_B} color="white" />
						</Animated.View>
					</TouchableOpacity>

					<TouchableOpacity onPress={this.sizer_C}>
						<Animated.View>
							<Icon name="md-build" size={this.state.size_C} color="white" />
						</Animated.View>
					</TouchableOpacity>

					<TouchableOpacity onPress={this.sizer_D}>
						<Animated.View>
							<Icon name="md-folder-open" size={this.state.size_D} color="white" />
						</Animated.View>
					</TouchableOpacity>

					<TouchableOpacity onPress={this.sizer_E}>
						<Animated.View>
							<Icon name="md-arrow-round-back" size={this.state.size_E} color="white" />
						</Animated.View>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}
