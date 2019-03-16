import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { StyleSheet, Text, View, Easing, Animated } from 'react-native';
import { createBottomTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation';

import Mine from './components/Mine'
import MovieList from './components/MovieList'
import Seek from './components/Seek'
import MovieDetail from './components/MovieDetail'

const TabNavigator = createBottomTabNavigator(
    {
        MovieHome: {
            screen: MovieList,
            navigationOptions: {
                tabBarLabel: '热映',
                tabBarIcon: ({ tintColor }) => (
                    <Icon name="ios-laptop" size={20} color={tintColor} />
                ),
            }
        },
        Seek: {
            screen: Seek,
            navigationOptions: {
                tabBarLabel: '找片',
                tabBarIcon: ({ tintColor }) => (
                    <Icon name="ios-eye" size={20} color={tintColor} />
                ),
            }
        },
        Mine: {
            screen: Mine,
            navigationOptions: {
                tabBarLabel: '我的',
                tabBarIcon: ({ tintColor }) => (
                    <Icon name="ios-person" size={20} color={tintColor} />
                ),
            }
        },
    },
    {
        initialRouteName: "MovieHome",
        tabBarOptions: {
            activeTintColor: '#494949',
            inactiveTintColor: '#999999',
            labelStyle: {
                fontSize: 12,
                marginBottom: 5,
            },
            style: {
                borderTopWidth: 1,
                borderTopColor: '#EFEFEF',
                height: 50,
                backgroundColor: '#fff'
            },
        }
    }
);
const MyApp = createStackNavigator(
    {
        // 主页
        Home: {
            screen: TabNavigator,
            navigationOptions: {
                header: null
            }
        },
        MovieDetail, // 电影详情页
    },
    {
        headerMode: 'screen',
        // headerMode: 'none',
        mode: 'modal',
        navigationOptions: {
            gesturesEnabled: false,
        },
        transitionConfig: () => ({
            transitionSpec: {
                duration: 300,
                easing: Easing.out(Easing.poly(4)),
                timing: Animated.timing,
            },
            screenInterpolator: sceneProps => {
                const { layout, position, scene } = sceneProps;
                const { index } = scene;

                const width = layout.initWidth;
                const translateX = position.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [width, 0, 0],
                });

                const opacity = position.interpolate({
                    inputRange: [index - 1, index - 0.99, index],
                    outputRange: [0, 1, 1],
                });

                return { opacity, transform: [{ translateX }] };
            },
        })
    }
)

export default createAppContainer(MyApp)