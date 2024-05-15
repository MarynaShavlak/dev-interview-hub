import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ProfileCard } from 'entities/Profile';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import avatar from 'shared/assets/tests/storybook.jpg';

export default {
    title: 'entities/ProfileCard',
    component: ProfileCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ProfileCard>;

const Template: ComponentStory<typeof ProfileCard> = (args) => (
    <ProfileCard {...args} />
);
// export const Normal = Template.bind({});
// Normal.args = {
//     data: {
//         username: 'admin',
//         age: 27,
//         country: Country.Ukraine,s
//         lastname: 'Shavlak',
//         first: 'Maryna',
//         city: 'Kharkiv',
//         currency: Currency.USD,
//         avatar,
//     },
// };

export const withError = Template.bind({});
withError.args = {
    error: 'true',
};

export const Loading = Template.bind({});
Loading.args = {
    isLoading: true,
};
