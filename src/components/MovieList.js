import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class MovieList extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View>
                <Text>
                    Movie List page
                </Text>
            </View>
        )
    }
}