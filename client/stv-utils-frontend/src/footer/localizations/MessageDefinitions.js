import { defineMessages } from 'react-intl';

const messageDefinitions = defineMessages({
    contacts: {
        title: {
            id: 'footer.contacts.title',
            description: 'Title',
            defaultMessage: 'Suomen Tilaajavastuu Oy'
        },
        address1: {
            id: 'footer.contacts.address1',
            description: 'Address part one',
            defaultMessage: 'Tarvonsalmenkatu 17 B'
        },
        address2: {
            id: 'footer.contacts.address2',
            description: 'Address part two',
            defaultMessage: '02600 Espoo'
        },
        address3: {
            id: 'footer.contacts.address3',
            description: 'Address part three',
            defaultMessage: '+358 10 309 3589'
        }
    },
    service: {
        title: {
            id: 'footer.service.title',
            description: 'Title',
            defaultMessage: 'Customer Service'
        },
        email: {
            id: 'footer.service.email',
            description: 'Email address',
            defaultMessage: 'customerservice@tilaajavastuu.fi'
        },
        phone: {
            id: 'footer.service.phone',
            description: 'Service phone',
            defaultMessage: '0600 301 339'
        },
        time: {
            id: 'footer.service.time',
            description: 'Service time',
            defaultMessage: 'Weekdays 8am -4pm'
        }
    },
    menu: {
        termsOfUse: {
            id: 'footer.menu.termsOfUse',
            description: 'Menu item term of use',
            defaultMessage: 'Terms of use'
        },
        description: {
            id: 'footer.menu.description',
            description: 'Menu item description',
            defaultMessage: 'Description'
        },
        obligations: {
            id: 'footer.menu.obligations',
            description: 'Menu item obligations',
            defaultMessage: 'Obligations'
        },
        media: {
            id: 'footer.menu.media',
            description: 'Menu item media',
            defaultMessage: 'Media'
        }
    }
});

export default messageDefinitions;
