import { ComponentMeta, ComponentStory } from '@storybook/react';
import { PageLoader } from './PageLoader';
import { AlignDecorator } from '@/shared/config/storybook/AlignDecorator/AlignDecorator';

export default {
    title: 'widgets/PageLoader',
    component: PageLoader,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [AlignDecorator('center')],
} as ComponentMeta<typeof PageLoader>;

const Template: ComponentStory<typeof PageLoader> = (args) => (
    <PageLoader {...args} />
);

export const Default = Template.bind({});
Default.args = {};
