// 正在上映电影列表
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button
} from 'react-native';

import OnShowingMovieItem from './OnShowingMovieItem'

export default class OnShowingMovieList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            movieList: []
        }
        this.fetchData = this.fetchData.bind(this)
    }
    componentDidMount() {
        this.fetchData()
    }
    fetchData() {
        const OnShowingMovieListAPI = 'https://api.douban.com/v2/movie/in_theaters'
        fetch(OnShowingMovieListAPI)
            .then((response) => {
                return response.json()
            })
            .then((res) => {
                let movieListData = res.subjects
                movieListData.map((item, index) => {
                    item.index = index
                })
                console.log(res)
                this.setState({
                    movieList: movieListData
                })
            })
            .catch((error) => {
                console.error(error)
            })
    }
    alert() {
        console.log(this)
        this.props.navigation.navigate('MovieDetail')
    }
    render() {
        let movieList = this.state.movieList
        return (
            <View style={styles.movieListWrap}>
            <Button
                title="Go to Details"
                onPress={this.alert.bind(this)}
                />
                <FlatList
                    data={movieList}
                    keyExtractor={item => item.index.toString()}
                    renderItem={({item}) => {
                        return (
                            <OnShowingMovieItem data={item}></OnShowingMovieItem>
                        )
                    }}
                >
                </FlatList>
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
    movieListWrap: {

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