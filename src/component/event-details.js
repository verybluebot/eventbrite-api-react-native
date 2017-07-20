import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    StyleSheet
} from 'react-native';


export default class EeventDetails extends Component {

    render() {
        let {logo, name,  description } = this.props.navigation.state.params;

        let img = logo ? logo.url : 'https://c1.staticflickr.com/4/3532/3755130245_d3c61ac90a_b.jpg';
        return (
            <View style={styles.container}>
                <View style={styles.eventLogoWrapper}>
                    <Image
                        source={{uri: img}}
                        style={styles.eventLogo}
                    />
                </View>
                <View style={styles.descriptionWrapper}>
                    <Text style={styles.header}>
                        {name.text}
                    </Text>
                    <ScrollView >
                        <Text style={styles.description}>
                            {description.text}
                        </Text>
                    </ScrollView>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    eventLogoWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    eventLogo: {
        marginTop: 20,
        width: 200,
        height: 200,
        borderRadius: 100,
        borderColor: 'black',
        borderWidth: 1,
    },

    header: {
        margin: 10,
        marginTop: 20,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    descriptionWrapper: {
        padding: 20,
        flex: 2,
    },
    description: {
        lineHeight: 25
    }

});