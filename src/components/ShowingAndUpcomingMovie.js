import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    Dimensions
} from 'react-native';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';

import OnShowingMovieList from './OnShowingMovie';

const { width, height } = Dimensions.get('window') // 获取设备宽高
export default class ShowingAndUpcomingMovie extends Component {
    static navigationOptions = {
        header: null
    };
    render() {
        return (
            <View style={styles.movieListWrap}>
                <ScrollableTabView
                    style={{marginTop: 10}}
                    renderTabBar={() => <DefaultTabBar />}
                    tabBarUnderlineStyle={{
                        backgroundColor: '#333',
                        height: 1,
                        marginBottom: -1
                    }}
                    tabBarBackgroundColor='#FFFFFF'
                    tabBarActiveTextColor='#333'
                    tabBarInactiveTextColor='#959595'
                    tabBarTextStyle={{ fontSize: 14 }}
                    locked={false}
                >
                    <View tabLabel='正在热映' style={styles.tabItemWrap}>
                        <OnShowingMovieList></OnShowingMovieList>
                    </View> 
                    <View tabLabel='即将上映' style={styles.tabItemWrap}>
                        <Text>即将上映</Text>
                    </View>
                </ScrollableTabView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    movieListWrap: {
        width: width,
        height: height,
        backgroundColor: '#ffffff'
    },
    tabBarWrap: {
        height: 50
    },
    tabItemWrap: {
        marginBottom: 100,
    }
})