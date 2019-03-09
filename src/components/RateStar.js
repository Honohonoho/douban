import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native';

export default class RateStar extends Component {
    constructor(props) {
        super(props)
    }
    static defaultProps = {
        stars: '00'
    }
    renderStar(rate) {
        let rateData = Object.assign({}, rate)
        let starsList = []
        let pushEmptyStar = false
        if (rateData.value) {
            rateData.stars = rateData.value
        }
        if (rateData.stars === '00') {
            return <Text style={styles.secondaryFont}>暂无评分</Text>
        } else {
            for (let i = 0; i < 5; i++) {
                if (i < Number(rateData.stars[0])) {
                    starsList.push(
                        <Image key={i} style={styles.star} source={require('../img/star-full.png')} />
                    )
                } else {
                    if (!pushEmptyStar && rateData.stars[1] === '5') {
                        pushEmptyStar = true
                        starsList.push(
                            <Image key={i} style={styles.star} source={require('../img/star-half.png')} />
                        )

                    } else {
                        starsList.push(
                            <Image key={i} style={styles.star} source={require('../img/star-empty.png')} />
                        )
                    }
                }
            }
            return starsList
        }
    }
    render() {
        return (
            <View style={styles.rateStarWrap}>
                {this.renderStar(this.props.rate)}
                <Text style={styles.rateRecord}>{this.props.rate.average}</Text>
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
    rateStarWrap: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    star: {
        width: 10,
        height: 10
    },
    rateRecord: {
        color: '#A6A6A6',
        fontSize: 10,
        marginLeft: 5
    }
})