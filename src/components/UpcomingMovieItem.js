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

export default class UpcomingMovieItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
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
    handleMovieItemPress() {
        this.props.navigation.navigate('MovieDetail')
    }
    render() {
        let item = this.props.data
        return (
            <TouchableHighlight underlayColor={'#bbbbbb'} onPress={this.handleMovieItemPress.bind(this)}>
                <View style={styles.movieItemContainer}>
                    <View style={styles.movieComingDateWrap}>
                        <Text style={styles.movieComingDate}>{item.year}</Text>
                    </View>
                    <View style={styles.movieItemWrap}>
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
                        <View style={styles.movieSubscribeWrap}>
                            <Text style={styles.movieSubscribeCount}>{this.formatViewCount(item.collect_count)}人想看</Text>
                            <View style={styles.subscribeButtonWrap}>
                                <Text style={styles.subscribeButton}>想看</Text>
                            </View>
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
    movieItemContainer: {

    },
    movieComingDateWrap: {
        paddingLeft: 15,
        paddingTop: 8,
        paddingBottom: 8,
        backgroundColor: '#eee'
    },
    movieComingDate: {
        fontSize: 14,
        lineHeight: 14,
        color: '#A6A6A6'
    },
    movieItemWrap: {
        height: 130,
        paddingLeft: 15,
        paddingRight: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
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