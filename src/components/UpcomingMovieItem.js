// 正在上映电影列表
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

export default class UpcomingMovieItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            item: this.props.data
        }
    }
    componentDidMount() {
        
    }
    concatCastName(casts) {
        let nameString = casts.map((item) => {
            return item.name
        }).join(' / ')
        return nameString
    }
    formatViewCount(count) {
        return count > 10000 ? (count/10000).toFixed(1) + '万' : count
    }
    render() {
        let item = this.state.item
        return (
            <View style={styles.movieItemWrap}>
                <View style={styles.movieThumbWrap}>
                    <Image source={{uri: item.images.large}} style={styles.movieThumb}></Image>
                </View>
                <View style={styles.movieInfoWrap}>
                    <Text style={styles.movieTitle}>{item.title}</Text>
                    <Text style={styles.movieStar}>XXX</Text>
                    <Text style={styles.secondaryFont}>导演：{item.directors[0].name}</Text>
                    <Text style={styles.secondaryFont}>主演：{this.concatCastName(item.casts)}</Text>
                </View>
                <View style={styles.movieSubscribeWrap}>
                    <Text style={styles.movieSubscribeCount}>{this.formatViewCount(item.collect_count)}人想看</Text>
                    <View style={styles.subscribeButtonWrap}>
                        <Text style={styles.subscribeButton}>想看</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    secondaryFont: {
        lineHeight: 16,
        color: '#A6A6A6',
        fontSize: 10
    },
    movieItemWrap: {
        height: 130,
        paddingLeft: 15,
        paddingRight: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#EFEFEF'
    },  
    movieThumbWrap: {
        flex: 0
    },
    movieThumb: {
        width: 80,
        height: 100
    },
    movieInfoWrap: {
        height: 100,
        flex: 1,
        alignItems: 'flex-start',
        marginLeft: 15
    },
    movieTitle: {
        fontWeight: '600',
        fontSize: 16,
        color: '#333'
    },
    movieSubscribeWrap: {
        width: 80,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 'auto'
    },
    subscribeButtonWrap: {
        width: 60,
        height: 30,
        marginTop: 3,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#FFAE31',
        borderRadius: 5,
        fontSize: 12,
    },
    movieSubscribeCount: {
        lineHeight: 16,
        fontSize: 10,
        color: '#FFAE31'
    },
    subscribeButton: {
        color: '#FFAE31',
        fontSize: 14,
        fontWeight: '600',
    }
})