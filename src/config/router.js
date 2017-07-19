import React from 'react';
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
        navigationOptions: {
            title: 'Event Details'
        }
    }
});