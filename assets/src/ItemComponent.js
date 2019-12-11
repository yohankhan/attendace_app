import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
export default class ItemComponent extends Component {
	static propTypes = {
		items: PropTypes.array.isRequired
	};
	render() {
		return (
			<View style={styles.itemsList}>
				{this.props.items.map((item, index) => {
					return (
						<View key={index}>
							<Text color="#504f54" style={styles.itemtext}>
								{item.log}
							</Text>
						</View>
					);
				})}
			</View>
		);
	}
}
const styles = StyleSheet.create({
	itemsList: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-around'
	},
	itemtext: {
		fontWeight: 'bold',
		textAlign: 'center'
	}
});
