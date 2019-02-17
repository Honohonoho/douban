import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation';

import Mine from './components/Mine'
import MovieList from './components/MovieList'
import MovieSeek from './components/MovieSeek'

const TabNavigator = createBottomTabNavigator(
    {
        MovieHome: {
            screen: MovieList,
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