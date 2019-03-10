import React, { Component } from 'react';
import { View, Text } from 'react-native';

import ShowingAndUpcomingMovie from './ShowingAndUpcomingMovie';
export default class MovieList extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View>
                <ShowingAndUpcomingMovie
                    navigation={this.props.navigation}
                >
                </ShowingAndUpcomingMovie>
            </View>
        )
    }
}