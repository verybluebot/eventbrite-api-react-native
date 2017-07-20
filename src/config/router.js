import React from 'react';
import {
    Button,
    Linking,
} from 'react-native';
import { StackNavigator } from 'react-navigation';

import Events from '../component/events';
import EventDetails from '../component/event-details';


export const Router = StackNavigator({
    Events: {
        screen: Events,
        navigationOptions: {
            title: 'Events'
        }
    },
    EventDetails: {
        screen: EventDetails,
        navigationOptions: ({ navigation }) => ({
            title: 'Event Details',
            headerRight: (
                <Button
                    title='More Info'
                    onPress={() => {
                        Linking.canOpenURL(navigation.state.params.url).then((supported) => {
                            if (supported) {
                                Linking.openURL(navigation.state.params.url)
                            } else {
                                alert('This event don\'t have a valid url');
                            }
                        });
                    }}
                >

                </Button>
            )
        })
    }
});