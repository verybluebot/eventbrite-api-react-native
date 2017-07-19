// https://www.eventbriteapi.com/v3/users/me/?token=SESXYS4X3FJ5LHZRWGKQ

import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    ListView
} from 'react-native';

import Geocoder from 'react-native-geocoder';

const  API_KEY   = 'Bearer IZV34UMD6PUBJ2QJJWIW';
const  API_URL = 'https://www.eventbriteapi.com/v3/events/search/';

export default class Main extends Component {
    constructor(props) {
        super(props);

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([
                {
                    name: {
                        text: 'Event 1'
                    },
                    url: 'www.bullshit.com'
                }
            ])
        }
    }

    componentDidMount() {
            this.getSearch('hackathon', 'New York')
    }

    getSearch(category, place) {
        Geocoder.geocodeAddress(place).then((res) => {
            if (res[0] === null) return;
            let position = res[0].position;

            const FULL_URL = `${API_URL}?q=${category}&location.latitude=${position.lat}&location.longitude=${position.lng}`
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
        });
    }

    renderRow(data) {
        return(
            <View>
                <Text>
                    {data.name.text}
                </Text>
                <Text>
                    {data.url}
                </Text>
            </View>
        )
    }

    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.title}>
                    this is shit
                </Text>
                <ListView
                    style={styles.list}
                    dataSource={this.state.dataSource}
                    renderRow={(data) => this.renderRow(data)}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        flex: 1,
        margin: 40
    },
    list: {
        flex: 1
    }

});