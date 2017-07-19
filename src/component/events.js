// https://www.eventbriteapi.com/v3/users/me/?token=SESXYS4X3FJ5LHZRWGKQ

import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    ListView,
    Image,
    TextInput,
    TouchableOpacity,
} from 'react-native';

import Geocoder from 'react-native-geocoder';

const  API_KEY   = 'Bearer IZV34UMD6PUBJ2QJJWIW';
const  API_URL = 'https://www.eventbriteapi.com/v3/events/search/';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class Events extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataSource: ds.cloneWithRows([
                {
                    name: {
                        text: 'Event 1'
                    },
                    url: 'www.bullshit.com',
                    logo: {}
                }
            ]),
            city: '',
            event: ''
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
                    this.setState({
                        dataSource: ds.cloneWithRows(resJson.events)
                    })
                })
        });
    }

    onMoreDetails(eventData) {
        this.props.navigation.navigate('EventDetails', {...eventData});
    }

    renderRow(data) {
        const defaultImg = 'https://c1.staticflickr.com/4/3532/3755130245_d3c61ac90a_b.jpg';
        const img = data.logo !== null ? data.logo.url : defaultImg;
        return(
            <View style={styles.row}>
                <Image
                    style={styles.logo}
                    source={{uri: img}}
                />
                <View style={styles.details}>
                    <Text>
                        {data.name.text.length > 30 ? `${data.name.text.substring(0, 30)}...` : data.name.text}
                    </Text>
                    <TouchableOpacity onPress={() => this.onMoreDetails(data)}>
                        <Text style={{color: 'blue'}}>
                            more details
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.title}>
                    this is shit
                </Text>
                <View style={styles.form}>
                    <TextInput
                        multiline
                        style={styles.input}
                        placeholder="enter type of event..."
                        underlineColorAndroid='rgba(0,0,0,0)'
                        onChangeText={(text) => this.setState({event: text})}
                    />
                    <TextInput
                        multiline
                        style={styles.input}
                        placeholder="enter city..."
                        underlineColorAndroid='rgba(0,0,0,0)'
                        onChangeText={(text) => this.setState({city: text})}
                    />
                    <TouchableOpacity
                        style={styles.buttonWrapper}
                        onPress={() => this.getSearch(this.state.event, this.state.city)}
                    >
                        <Text style={styles.button}>
                            Search
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.list}>
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={(data) => this.renderRow(data)}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        flex: 1,
        margin: 20,
        fontSize: 18,
        marginTop: 60,
        textAlign: 'center'

    },
    list: {
        flex: 9,
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        padding: 5

    },
    logo: {
        flex: 1,
        width: 50,
        height: 50,
        borderColor: 'black',
        borderWidth: 1
    },
    details: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    form: {
        flex: 4
    },
    input: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        borderColor: 'black',
        borderRadius: 9,
        borderWidth: 1,
        margin: 5,
        textAlign: 'center',
        fontSize: 16,
        paddingTop: 12

    },
    buttonWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'blue',
        borderWidth: 1,
        borderRadius: 9,
        margin: 5,
        paddingTop: 5
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        paddingTop: 5

    }

});