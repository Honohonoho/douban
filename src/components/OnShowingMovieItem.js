// 正在上映电影列表
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight
} from 'react-native';

import RateStar from './RateStar'

export default class OnShowingMovieItem extends Component {
    constructor(props) {
        super(props)
        this.state= {
            activeIndex: undefined
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
    handleMovieItemPress(id) {
        this.props.navigation.navigate('MovieDetail', {id: id})
    }
    render() {
        let item = this.props.data
        let total = this.props.total
        return (
            <TouchableHighlight underlayColor={'#bbbbbb'} onPress={this.handleMovieItemPress.bind(this, item.id)}>
                <View style={[styles.movieItemWrap, item.index + 1 === total && styles.movieItemWrapLast]}>
                    <View style={styles.movieThumbWrap}>
                        <Image source={{uri: item.images.large}} style={styles.movieThumb}></Image>
                    </View>
                    <View style={styles.movieInfoWrap}>
                        <Text style={styles.movieTitle}>{item.title}</Text>
                        <View style={styles.rateWrap}>
                            <RateStar rate={item.rating}></RateStar>
                            <Text style={styles.rateRecord}>{item.rating.average === 0 ? null : item.rating.average}</Text>
                        </View>
                        <Text style={styles.secondaryFont}>导演：{item.directors[0].name}</Text>
                        <Text style={styles.secondaryFont}>主演：{this.concatCastName(item.casts)}</Text>
                    </View>
                    <View style={styles.movieBuyTicketWrap}>
                        <Text style={styles.movieViewCount}>{this.formatViewCount(item.collect_count)}人看过</Text>
                        <View style={styles.buyTicketButtonWrap}>
                            <Text style={styles.buyTicketButton}>购票</Text>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
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
        borderBottomColor: '#EFEFEF',
        backgroundColor: '#ffffff'
    },
    movieItemWrapLast: {
        borderBottomWidth: 0
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
    rateWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    rateRecord: {
        color: '#A6A6A6',
        fontSize: 10,
        marginLeft: 5
    },
    movieBuyTicketWrap: {
        width: 80,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 'auto'
    },
    buyTicketButtonWrap: {
        width: 60,
        height: 30,
        marginTop: 3,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#ff4d64',
        borderRadius: 5,
        fontSize: 12,
    },
    movieViewCount: {
        lineHeight: 16,
        fontSize: 10,
        color: '#ff4d64'
    },
    buyTicketButton: {
        color: '#FF4E65',
        fontSize: 14,
        fontWeight: '600',
    }
})