import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ScrollToolbar } from './ScrollToolbar';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

export default {
    title: 'features/ScrollToolbar',
    component: ScrollToolbar,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [StoreDecorator({})],
} as ComponentMeta<typeof ScrollToolbar>;

const Template: ComponentStory<typeof ScrollToolbar> = (args) => (
    <ScrollToolbar {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
