// https://www.eventbriteapi.com/v3/users/me/?token=SESXYS4X3FJ5LHZRWGKQ

import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet
} from 'react-native';

const  API_KEY   = 'Bearer IZV34UMD6PUBJ2QJJWIW';
const  API_URL = 'https://www.eventbriteapi.com/v3/events/search/';

export default class Main extends Component {
    componentDidMount() {
            this.getSearch('hackathon', 'New York')
    }

    getSearch(category, place) {
        const FULL_URL = API_URL + '?q=' + category + '&location.address=' + place;
        fetch(FULL_URL, {
            method: 'GET',
            headers: {
                'Authorization': API_KEY
            }
        })
            .then((res) => res.json())
            .then((resJson) => {
                console.log('this shit', resJson)
            })
    }

    render() {
        return(
            <View style={styles.container}>
                <Text>
                    this is shit
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});