import {
    StyleSheet,
    Text,
    View,
    Button,
    Image,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import React, { Component } from 'react';
import { BoxShadow } from 'react-native-shadow'
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view'

import RateStar from './RateStar'

const { width, height } = Dimensions.get('window')
// react-native-shadow setting
const shadowOpt = {
    width: 85,
    height: 85,
    color: '#9B9B9B',
    border: 0,
    opacity: 0.1,
    x: 0,
    y: 0,
    style:{marginVertical:5}
}
const movieInfo = 'https://api.douban.com/v2/movie/subject';

export default class MovieDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            num: 3,
            data: {},
            ready: true,
        }
    }
    static navigationOptions = ({ navigation }) => ({
        headerTitle: '电影',
        headerRight: <Button title="分享" onPress={() => alert('点击了分享')} />,
        headerTintColor: '#fff',
        headerStyle: {
            backgroundColor: '#2A362C',
            opacity: 1,
        },
        headerTitleStyle: { // android 居中
            flex: 1,
            textAlign: 'center'
        }
    });
    componentDidMount() {
        const { state: { params: { id } } } = this.props.navigation;
        let formData = new FormData();
        formData.append('apikey', '0b2bdeda43b5688921839c8ecb20399b')
        formData.append('city', '北京')
        formData.append('client', 'something')
        formData.append('udid', 'dddddddddddddddddddddd')
        fetch(`${movieInfo}/${id}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            this.setState({
                ready: false,
                data: data,
            });
        })
    }

    render() {
        let data = this.state.data
        console.log(data)
        return (
            <ScrollView bounces={false} scrollEventThrottle={1} >
                {this.state.ready ? <ActivityIndicator size="large" style={{ marginTop: 100 }} /> :
                    <View style={{ backgroundColor: '#F4F9F5' }}>
                        <View style={styles.poster}>
                            <Image source={{ uri: data.images.large }} style={{
                                width: width / 2,
                                height: 280
                            }} />
                        </View>
                        <View style={styles.movieInfo}>
                            <View>
                                <Text style={styles.movieTitle}>{data.title}</Text>
                                <Text style={styles.secondaryFont}>{data.year} / {data.genres.join(' / ')}</Text>
                                <Text style={styles.secondaryFont}>原名: {data.original_title}</Text>
                                <Text style={styles.secondaryFont}>上映时间: {data.pubdates[data.pubdates.length-1]}</Text>
                                <Text style={styles.secondaryFont}>片长: {data.durations}</Text>
                            </View>
                            <BoxShadow setting={shadowOpt}>
                                <View style={styles.rateTip}>
                                    <Text style={styles.secondaryFont}>豆瓣评分</Text>
                                    <Text style={styles.rateRecord}>{data.rating.average}</Text>
                                    <View style={{ marginBottom: 3, marginTop: 2 }}>
                                        <RateStar rate={data.rating}></RateStar> 
                                    </View>
                                    <Text style={styles.secondaryFont}>{data.ratings_count}人</Text>
                                </View>
                            </BoxShadow>
                        </View>
                        <View style={{ marginTop: 30, flexDirection: 'row', justifyContent: 'space-around', paddingLeft: 10, paddingRight: 10 }}>
                            <TouchableOpacity style={{
                                padding: 10,
                                paddingLeft: 50,
                                paddingRight: 50,
                                borderColor: '#FFAE36',
                                borderWidth: 1,
                                borderRadius: 5,
                            }}>
                                <Text style={{ color: '#FFAE36' }}>想看</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{
                                padding: 10,
                                paddingLeft: 60,
                                paddingRight: 60,
                                borderColor: '#FFAE36',
                                borderWidth: 1,
                                borderRadius: 5,
                                flexDirection: 'row',
                            }}>
                                <Text style={{ color: '#FFAE36' }}>看过</Text>
                                <View style={{ marginTop: 2 }}>
                                    {/* <RateStar rate="50" width={10} height={10} /> */}
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{ paddingRight: 10, paddingLeft: 10 }}>
                            <View style={{ marginTop: 30, paddingBottom: 15, flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#DFDFDF' }}>
                                <Text>选座购票</Text>
                                <TouchableOpacity
                                    onPress={() => alert('点击了购买')}>
                                    <Text style={{ color: '#FF645A', fontSize: 10 }}>$33起></Text>
                                </TouchableOpacity>
                            </View>

                            <View>
                                <Text style={{ fontSize: 13, marginBottom: 12, marginTop: 20, color: '#9B9B9B', }}>剧情简介</Text>
                                <View>
                                    <Text style={styles.introduce} numberOfLines={this.state.num} ellipsizeMode='tail'
                                    >
                                        {data.summary}
                                    </Text>
                                    <TouchableOpacity onPress={() => {
                                        this.setState({ num: 0 });
                                    }}><Text style={{ color: "#2CBA48" }}>{this.state.num != 0 && '展开'}</Text></TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        <View name="performer" style={{ paddingRight: 10, paddingLeft: 10, paddingTop: 15 }}>
                            <View>
                                <Text style={{ fontSize: 12, color: '#9B9B9B' }}>影人</Text>
                            </View>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                <View style={{ marginTop: 15, marginBottom: 10, flexDirection: 'row' }}>
                                    {data.casts.map((x, i) => {
                                        return (
                                            <View
                                                style={{ width: 80, height: 160, justifyContent: 'center', alignItems: 'center', marginRight: 6 }}
                                                key={i}>
                                                <Image
                                                    source={{ uri: x.avatars.large }}
                                                    style={{ width: 80, height: 120 }} />
                                                <Text
                                                    style={{ lineHeight: 22 }}
                                                    numberOfLines={1}
                                                    ellipsizeMode='tail'>{x.name}</Text>
                                                <Text
                                                    style={{ fontSize: 12, color: '#9B9B9B' }}
                                                    numberOfLines={1}
                                                    ellipsizeMode='tail'></Text>
                                            </View>
                                        )
                                    })}
                                </View>
                            </ScrollView>
                        </View>

                        <View name="preview" style={{ paddingRight: 10, paddingLeft: 10, paddingTop: 15, paddingBottom: 15 }}>
                            <View>
                                <Text style={{ fontSize: 12, color: '#9B9B9B' }}>预告片/剧照</Text>
                            </View>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                <View style={{ marginTop: 15, flexDirection: 'row' }}>
                                    {data.photos.map((x, i) => {
                                        return (
                                            <View
                                                style={{ width: 140, height: 100, justifyContent: 'center', alignItems: 'center', marginRight: 6, backgroundColor: 'red' }}
                                                key={i}>
                                                <Image source={{ uri: x.image }} style={{ width: 140, height: 100 }} />
                                            </View>
                                        )
                                    })}
                                </View>
                            </ScrollView>
                        </View>
                        {/* 讨论区begin */}
                        <View style={{ width: width, height: height, paddingTop: 25, backgroundColor: '#fff' }}>
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
                                <View tabLabel='评论' style={{ marginBottom: 50, paddingLeft: 15, paddingRight: 15 }}>
                                    <View style={{ flexDirection: 'row', paddingTop: 20, justifyContent: 'space-between' }}>
                                        <Text>短评</Text>
                                        <TouchableOpacity style={{ borderWidth: 1, borderColor: '#3FAC00', borderRadius: 5, padding: 4 }} onPress={() => alert('你要写短评')}>
                                            <Text style={{ fontSize: 10, color: '#3FAC00' }}>写短评</Text>
                                        </TouchableOpacity>
                                    </View>

                                    {data.popular_comments.map((v, i) => {
                                        return (
                                            <View
                                                style={{ marginTop: 18, flexDirection: 'row', paddingRight: 20 }}
                                                key={i}>
                                                <View>
                                                    <Image source={{ uri: v.author.avatar }} style={{ width: 40, height: 40, borderRadius: 20 }} />
                                                </View>

                                                <View style={{ marginLeft: 10, flex: 1 }}>
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <Text style={{ lineHeight: 25 }}>{v.author.name}</Text>
                                                        <View style={{ marginTop: 8, marginLeft: 4 }}>
                                                            {/* <RateStar rate={v.rating.value + '0'} width={10} height={10} /> */}
                                                        </View>
                                                    </View>
                                                    <Text style={{ marginBottom: 8, color: '#3B3B3B' }}>{v.content}</Text>
                                                    <Text style={styles.secondaryFont}>4天前</Text>
                                                </View>

                                                <View style={{ position: 'absolute', right: 0, top: 0 }}>
                                                    <Text style={{ color: '#9B9B9B' }}>👍{v.useful_count}</Text>
                                                </View>
                                            </View>
                                        )
                                    })}
                                </View>
                                <View tabLabel='讨论区' style={{ marginBottom: 50, paddingLeft: 15, paddingRight: 15 }}>
                                    <View style={{ flexDirection: 'row', paddingTop: 20, justifyContent: 'space-between' }}>
                                        <Text>话题</Text>
                                        <TouchableOpacity style={{ borderWidth: 1, borderColor: '#3FAC00', borderRadius: 5, padding: 4 }} onPress={() => alert('你要写话题')}>
                                            <Text style={{ fontSize: 10, color: '#3FAC00' }}>写话题</Text>
                                        </TouchableOpacity>
                                    </View>

                                    {data.popular_comments.map((v, i) => {
                                        return (
                                            <View
                                                style={{ marginTop: 18, flexDirection: 'row', paddingRight: 20 }}
                                                key={i}>
                                                <View>
                                                    <Image source={{ uri: v.author.avatar }} style={{ width: 40, height: 40, borderRadius: 20 }} />
                                                </View>

                                                <View style={{ marginLeft: 10, flex: 1 }}>
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <Text style={{ lineHeight: 25 }}>{v.author.name}</Text>
                                                        <View style={{ marginTop: 8, marginLeft: 4 }}>
                                                            {/* <RateStar rate={v.rating.value + '0'} width={10} height={10} /> */}
                                                        </View>
                                                    </View>
                                                    <Text style={{ marginBottom: 8, color: '#3B3B3B' }}>{v.content}</Text>
                                                    <Text style={styles.secondaryFont}>4天前</Text>
                                                </View>

                                                <View style={{ position: 'absolute', right: 0, top: 0 }}>
                                                    <Text style={{ color: '#9B9B9B' }}>👍{v.useful_count}</Text>
                                                </View>
                                            </View>
                                        )
                                    })}
                                </View>
                            </ScrollableTabView>
                        </View>
                        {/* 讨论区end */}
                    </View>
                }
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    secondaryFont: {
        color: '#A6A6A6',
        fontSize: 10
    },
    poster: {
        backgroundColor: '#2A362C',
        height: 310,
        width: width,
        justifyContent: 'center',
        alignItems: 'center'

    },
    movieTitle: {
        fontSize: 22,
        fontWeight: '600',
        marginBottom: 5,
        color: '#333'
    },
    rateTip: {
        backgroundColor: '#FFFFFF',
        width: 85,
        height: 85,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#9B9B9B',
        shadowOffset: { height: 0, width: 0 },
        shadowOpacity: 0.1
    },
    rateRecord: {
        fontSize: 20,
        fontWeight: '600',
        color: '#333'
    },
    introduce: {
        color: '#343334',
    },
    movieInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 15
    },
})
