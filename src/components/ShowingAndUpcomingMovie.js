import React, { Component } from 'react';
import { View, Text } from 'react-native';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';


export default class ShowingAndUpcomingMovie extends Component {
    static navigationOptions = {
        header: null
    };
    render() {
        return (
            <View>
                <ScrollableTabView
                    renderTabBar={() => <DefaultTabBar />}
                    tabBarUnderlineStyle={{
                        backgroundColor: '#000',
                        height: 2
                    }}
                    tabBarBackgroundColor='#FFFFFF'
                    tabBarActiveTextColor='#000'
                    tabBarInactiveTextColor='#959595'
                    tabBarTextStyle={{ fontSize: 14 }}
                    locked={false}
                >
                    <View tabLabel='正在热映' style={{ marginBottom: 50 }}>
                    </View>
                    <View tabLabel='即将上映' style={{ marginBottom: 50 }}>
                    </View>
                </ScrollableTabView>
            </View>
        )
    }
}