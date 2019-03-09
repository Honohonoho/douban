// 即将上映电影列表
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList
} from 'react-native';
import UpcomingMovieItem from './UpcomingMovieItem'

export default class UpcomingMovieList extends Component {
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
        const UpcomingMovieList = 'https://api.douban.com/v2/movie/coming_soon'
        fetch(UpcomingMovieList)
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
        let movieList = this.state.movieList
        const month = new Date().getMonth() + 1
        return (
            <View style={styles.tabContainerWrap}>
                <View style={styles.sectionWrap}>
                    <View style={styles.leftSectionWrap}>
                        <Text style={styles.sectionText}>全部</Text>
                        <Text style={styles.sectionText}>{`${month}月`}</Text>
                        <Text style={styles.sectionText}>{`${month+1}月`}</Text>
                        <Text style={styles.sectionText}>{`${month+2}月`}</Text>
                    </View>
                    <View style={styles.rightSectionWrap}>
                        <Text style={styles.sectionText}>时间</Text>
                        <Text style={styles.sectionText}>热度</Text>
                    </View>
                </View>
                <View style={styles.movieListWrap}>
                    <FlatList
                        data={movieList}
                        keyExtractor={item => item.index.toString()}
                        renderItem={({item}) => {
                            return (
                                <UpcomingMovieItem data={item}></UpcomingMovieItem>
                            )
                        }}
                    >
                    </FlatList>
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
    sectionWrap: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
        paddingRight: 15,
        marginTop: 10,
        marginBottom: 10
    },
    leftSectionWrap: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    rightSectionWrap: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 3,
        paddingBottom: 3,
        paddingLeft: 10, 
        borderLeftWidth: 1,
        borderLeftColor: '#A6A6A6'
    },
    sectionText: {
        lineHeight: 16,
        color: '#A6A6A6',
        marginRight: 10,
    },
    sectionTextActive: {
        color: '#333'
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