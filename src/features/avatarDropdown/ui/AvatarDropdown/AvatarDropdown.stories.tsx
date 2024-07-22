// import React from 'react';
// import { ComponentStory, ComponentMeta } from '@storybook/react';
// import { UserRole } from '@/entities/User';
// import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
// import avatar from '@/shared/assets/tests/avatar-dropdown.png';
//
// import { AvatarDropdown } from './AvatarDropdown';
//
// export default {
//     title: 'features/AvatarDropdown',
//     component: AvatarDropdown,
//     argTypes: {
//         backgroundColor: { control: 'color' },
//     },
// } as ComponentMeta<typeof AvatarDropdown>;
//
// const Template: ComponentStory<typeof AvatarDropdown> = (args) => (
//     <AvatarDropdown {...args} />
// );
//
// export const Normal = Template.bind({});
// Normal.args = {};
// Normal.decorators = [
//     StoreDecorator({
//         user: {
//             authData: {
//                 id: '1',
//                 avatar,
//                 roles: [],
//             },
//         },
//     }),
// ];
//
// export const Admin = Template.bind({});
// Admin.args = {};
// Admin.decorators = [
//     StoreDecorator({
//         user: {
//             authData: {
//                 id: '1',
//                 avatar,
//                 roles: [UserRole.ADMIN],
//             },
//         },
//     }),
// ];
//
// export const Manager = Template.bind({});
// Manager.args = {};
// Manager.decorators = [
//     StoreDecorator({
//         user: {
//             authData: {
//                 id: '1',
//                 avatar,
//                 roles: [UserRole.MANAGER],
//             },
//         },
//     }),
// ];
export function con() {
    console.log('stories');
}
