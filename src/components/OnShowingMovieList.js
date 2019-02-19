// 正在上映电影列表
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList
} from 'react-native';

export default class OnShowingMovieList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            movieList: []
        }
        // this.fetchData = this.fetchData.bind(this)
    }
    componentDidMount() {

    }
    render() {
        const resData = {
            thumb: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3226414784,104165376&fm=58&bpow=640&bpoh=1000',

        }
        return (
            <View style={styles.movieItemWrap}>
                <View style={styles.movieThumbWrap}>
                    <Image
                        source={{uri: resData.thumb}}
                        style={styles.movieThumb}
                    >
                    </Image>
                </View>
                <View style={styles.movieInfoWrap}>
                    <Text style={styles.movieTitle}>疯狂的外星人</Text>
                    <Text style={styles.secondaryFont}>导演：宁浩</Text>
                    <Text style={styles.secondaryFont}>主演：王宝强</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    secondaryFont: {
        lineHeight: 18,
        color: '#A6A6A6',
        fontSize: 10
    },
    movieItemWrap: {
        height: 130,
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#EFEFEF'
    },  
    movieThumbWrap: {
        flex: 1
    },
    movieThumb: {
        width: 80,
        height: 100
    },
    movieInfoWrap: {
        height: 100,
        flex: 2,
        alignItems: 'flex-start'
    },
    movieTitle: {
        fontWeight: '600',
        fontSize: 16
    }
    
})