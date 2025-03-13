import { ComponentMeta, ComponentStory } from '@storybook/react';
import { AdditionalInfoContainer } from './AdditionalInfoContainer';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { withI18nDecorator } from '@/shared/config/storybook/withI18nDecorator/withI18nDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { UserRole } from '@/entities/User';
import { AdditionalInfoContainerSkeleton } from './AdditionalInfoContainerSkeleton/AdditionalInfoContainerSkeleton';

export default {
    title: 'pages/ArticleDetailsPage/AdditionalInfoContainer',
    component: AdditionalInfoContainer,
    decorators: [StoreDecorator({}), NewDesignDecorator, withI18nDecorator],
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    args: {
        id: '174',
    },
} as ComponentMeta<typeof AdditionalInfoContainer>;

const Template: ComponentStory<typeof AdditionalInfoContainer> = (args) => (
    <AdditionalInfoContainer {...args} />
);

export const Default = Template.bind({});

export const ForAdminAndAuthor = Template.bind({});
ForAdminAndAuthor.decorators = [
    StoreDecorator({ user: { authData: { roles: [UserRole.ADMIN] } } }),
];

export const Loading = Template.bind({});
Loading.decorators = [() => <AdditionalInfoContainerSkeleton />];
