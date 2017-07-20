import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';


export default class EeventDetails extends Component {


    render() {
        let {logo, name,  description, url} = this.props.navigation.state.params;

        return (
            <View>
                <Text>
                    {logo.url}
                </Text>
                <Text>
                    {name.text}
                </Text>
                <Text>
                    {description.text}
                </Text>
                <Text>
                    {url}
                </Text>
            </View>
        )
    }
}