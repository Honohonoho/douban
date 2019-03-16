import React, { Component } from 'react';
import { Dimensions, View, Text } from 'react-native';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';

import SeekMovie from './SeekMovie'
import SeekTV from './SeekTV'

const { width, height } = Dimensions.get('window');

class Seek extends Component {
    static navigationOptions = {
        header: null
    };
    render() {
        return (
            <View style={{ width: width, height: height, paddingTop: 25, backgroundColor: '#fff' }}>
                {/* <SearchInput
                    city={false}
                    navigation={this.props.navigation}
                /> */}
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
                    locked={true}
                >
                    <View tabLabel='电影' style={{ marginBottom: 50 }}>
                        <SeekMovie navigation={this.props.navigation} state={this.props.state}></SeekMovie>
                    </View>
                    <View tabLabel='电视' style={{ marginBottom: 50 }}>
                        <SeekTV navigation={this.props.navigation}></SeekTV>
                    </View>
                </ScrollableTabView>
            </View>
        );
    }
}

export default Seek