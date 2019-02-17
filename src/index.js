import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation';

import Mine from './components/Mine'

class HomeScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>movieList!</Text>
            </View>
        );
    }
}

class MovieSeek extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>MovieSeek!</Text>
            </View>
        );
    }
}

const TabNavigator = createBottomTabNavigator(
    {
        MovieHome: {
            screen: HomeScreen,
            navigationOptions: {
                tabBarLabel: '热映',
            }
        },
        MovieSeek: {
            screen: MovieSeek,
            navigationOptions: {
                tabBarLabel: '找片',
            }
        },
        Mine: {
            screen: Mine,
            navigationOptions: {
                tabBarLabel: '我的',
            }
        },
    },
    {
        tabBarOptions: {
            activeTintColor: '#494949',
            inactiveTintColor: '#999999',
            labelStyle: {
                fontSize: 12,
                marginBottom: 5,
            },
            style: {
                borderTopWidth: 1,
                borderTopColor: '#c3c3c3',
                height: 50,
                backgroundColor: '#fff'
            },
        }
    }
);

export default createAppContainer(TabNavigator);