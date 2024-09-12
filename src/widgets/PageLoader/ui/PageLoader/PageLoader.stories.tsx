import { ComponentMeta, ComponentStory } from '@storybook/react';
import { PageLoader } from './PageLoader';
import { AlignCenterDecorator } from '@/shared/config/storybook/AlignDecorator/AlignCenterDecorator';

export default {
    title: 'features/PageLoader',
    component: PageLoader,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [AlignCenterDecorator],
} as ComponentMeta<typeof PageLoader>;

const Template: ComponentStory<typeof PageLoader> = (args) => (
    <PageLoader {...args} />
);

export const Default = Template.bind({});
Default.args = {};
