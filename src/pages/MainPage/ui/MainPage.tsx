import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { collection } from 'firebase/firestore';
import { Page } from '@/widgets/Page';

import { firestore } from '../../../../json-server/firebase';

// const comments = [
//     {
//         id: 'a1b2c3d',
//         text: 'This article is great!',
//         articleId: '1',
//         user: {
//             id: 'J3aB11HdHTZW6udzrrw2ymBhIOz1',
//             username: 'mainAdmin',
//             firstname: 'Maryna',
//             lastname: 'Shavlak',
//             email: 'mainAdmin@gmail.com',
//             avatar: 'https://drive.google.com/thumbnail?id=1RD0jSAm8kdTLKa-Vr0daeE8T9-QcfPCa&sz=w1000',
//         },
//     },
//     {
//         id: 'e4f5g6h',
//         text: 'I totally agree with this.',
//         articleId: '2',
//         user: {
//             id: 'J3aB11HdHTZW6udzrrw2ymBhIOz1',
//             username: 'mainAdmin',
//             firstname: 'Maryna',
//             lastname: 'Shavlak',
//             email: 'mainAdmin@gmail.com',
//             avatar: 'https://drive.google.com/thumbnail?id=1RD0jSAm8kdTLKa-Vr0daeE8T9-QcfPCa&sz=w1000',
//         },
//     },
//     {
//         id: 'i7j8k9l',
//         text: 'Interesting read!',
//         articleId: '3',
//         user: {
//             id: 'J3aB11HdHTZW6udzrrw2ymBhIOz1',
//             username: 'mainAdmin',
//             firstname: 'Maryna',
//             lastname: 'Shavlak',
//             email: 'mainAdmin@gmail.com',
//             avatar: 'https://drive.google.com/thumbnail?id=1RD0jSAm8kdTLKa-Vr0daeE8T9-QcfPCa&sz=w1000',
//         },
//     },
//     {
//         id: 'm1n2o3p',
//         text: 'I have a different opinion.',
//         articleId: '4',
//         user: {
//             id: 'J3aB11HdHTZW6udzrrw2ymBhIOz1',
//             username: 'mainAdmin',
//             firstname: 'Maryna',
//             lastname: 'Shavlak',
//             email: 'mainAdmin@gmail.com',
//             avatar: 'https://drive.google.com/thumbnail?id=1RD0jSAm8kdTLKa-Vr0daeE8T9-QcfPCa&sz=w1000',
//         },
//     },
//     {
//         id: 'q4r5s6t',
//         text: 'Thanks for sharing!',
//         articleId: '5',
//         user: {
//             id: 'J3aB11HdHTZW6udzrrw2ymBhIOz1',
//             username: 'mainAdmin',
//             firstname: 'Maryna',
//             lastname: 'Shavlak',
//             email: 'mainAdmin@gmail.com',
//             avatar: 'https://drive.google.com/thumbnail?id=1RD0jSAm8kdTLKa-Vr0daeE8T9-QcfPCa&sz=w1000',
//         },
//     },
//     {
//         id: 'u7v8w9x',
//         text: 'Well written article!',
//         articleId: '6',
//         user: {
//             id: 'J3aB11HdHTZW6udzrrw2ymBhIOz1',
//             username: 'mainAdmin',
//             firstname: 'Maryna',
//             lastname: 'Shavlak',
//             email: 'mainAdmin@gmail.com',
//             avatar: 'https://drive.google.com/thumbnail?id=1RD0jSAm8kdTLKa-Vr0daeE8T9-QcfPCa&sz=w1000',
//         },
//     },
//     {
//         id: 'y1z2a3b',
//         text: 'Loved the insights.',
//         articleId: '7',
//         user: {
//             id: 'J3aB11HdHTZW6udzrrw2ymBhIOz1',
//             username: 'mainAdmin',
//             firstname: 'Maryna',
//             lastname: 'Shavlak',
//             email: 'mainAdmin@gmail.com',
//             avatar: 'https://drive.google.com/thumbnail?id=1RD0jSAm8kdTLKa-Vr0daeE8T9-QcfPCa&sz=w1000',
//         },
//     },
//     {
//         id: 'c4d5e6f',
//         text: 'Couldn’t agree more!',
//         articleId: '9',
//         user: {
//             id: 'J3aB11HdHTZW6udzrrw2ymBhIOz1',
//             username: 'mainAdmin',
//             firstname: 'Maryna',
//             lastname: 'Shavlak',
//             email: 'mainAdmin@gmail.com',
//             avatar: 'https://drive.google.com/thumbnail?id=1RD0jSAm8kdTLKa-Vr0daeE8T9-QcfPCa&sz=w1000',
//         },
//     },
//     {
//         id: 'g7h8i9j',
//         text: 'Not sure about this.',
//         articleId: '9',
//         user: {
//             id: 'nwPyI60mR9XWY3ozVuRGItx08PY2',
//             username: 'testuser',
//             firstname: 'Test',
//             lastname: 'lastnameUser',
//
//             email: 'testuser@gmail.com',
//
//             avatar: 'https://s1.1zoom.ru/big3/992/367659-alexfas01.jpg',
//         },
//     },
//     {
//         id: 'k1l2m3n',
//         text: 'Fantastic explanation!',
//         articleId: '9',
//         user: {
//             id: 'hdkjUiQhjoPIVMqfORNbvEHm4Wg1',
//             username: 'testuser2',
//             firstname: 'Test2',
//             lastname: 'User2',
//
//             email: 'testuser2@gmail.com',
//             avatar: 'FRGDHJ',
//         },
//     },
//     {
//         id: 'o4p5q6r',
//         text: 'More details, please.',
//         articleId: '11',
//         user: {
//             id: 'J3aB11HdHTZW6udzrrw2ymBhIOz1',
//             username: 'mainAdmin',
//             firstname: 'Maryna',
//             lastname: 'Shavlak',
//             email: 'mainAdmin@gmail.com',
//             avatar: 'https://drive.google.com/thumbnail?id=1RD0jSAm8kdTLKa-Vr0daeE8T9-QcfPCa&sz=w1000',
//         },
//     },
//     {
//         id: 's7t8u9v',
//         text: 'This was insightful.',
//         articleId: '12',
//         user: {
//             id: 'J3aB11HdHTZW6udzrrw2ymBhIOz1',
//             username: 'mainAdmin',
//             firstname: 'Maryna',
//             lastname: 'Shavlak',
//             email: 'mainAdmin@gmail.com',
//             avatar: 'https://drive.google.com/thumbnail?id=1RD0jSAm8kdTLKa-Vr0daeE8T9-QcfPCa&sz=w1000',
//         },
//     },
//     {
//         id: 'w1x2y3z',
//         text: 'I learned something new.',
//         articleId: '13',
//         user: {
//             id: 'zM4UyVgfKNf2vrf5sXmBIxA5QOl2',
//             username: 'mainManager',
//             firstname: 'Maxim',
//             lastname: 'Shavlak',
//             email: 'mainManager@gmail.com',
//             avatar: 'https://st3.depositphotos.com/1071184/13782/v/450/depositphotos_137825710-stock-illustration-business-person-analyzing-financial-statistics.jpg',
//         },
//     },
//     {
//         id: 'a4b5c6d',
//         text: 'This needs more sources.',
//         articleId: '14',
//         user: {
//             id: 'zM4UyVgfKNf2vrf5sXmBIxA5QOl2',
//             username: 'mainManager',
//             firstname: 'Maxim',
//             lastname: 'Shavlak',
//             email: 'mainManager@gmail.com',
//             avatar: 'https://st3.depositphotos.com/1071184/13782/v/450/depositphotos_137825710-stock-illustration-business-person-analyzing-financial-statistics.jpg',
//         },
//     },
//     {
//         id: 'e7f8g9h',
//         text: 'Brilliant write-up!',
//         articleId: '11',
//         user: {
//             id: 'hdkjUiQhjoPIVMqfORNbvEHm4Wg1',
//             username: 'testuser2',
//             firstname: 'Test2',
//             lastname: 'User2',
//
//             email: 'testuser2@gmail.com',
//             avatar: 'FRGDHJ',
//         },
//     },
//     {
//         id: 'i1j2k3l',
//         text: 'Very thought-provoking.',
//         articleId: '16',
//         user: {
//             id: 'J3aB11HdHTZW6udzrrw2ymBhIOz1',
//             username: 'mainAdmin',
//             firstname: 'Maryna',
//             lastname: 'Shavlak',
//             email: 'mainAdmin@gmail.com',
//             avatar: 'https://drive.google.com/thumbnail?id=1RD0jSAm8kdTLKa-Vr0daeE8T9-QcfPCa&sz=w1000',
//         },
//     },
//     {
//         id: 'm4n5o6p',
//         text: 'I have some concerns.',
//         articleId: '9',
//         user: {
//             id: 'vvfdFnPQMLVkrnCBjsTZcPsUq9U2',
//             username: 'mainUser',
//             firstname: 'Tetiana',
//             lastname: 'Shavlak',
//
//             email: 'mainUser@gmail.com',
//
//             avatar: 'https://drive.google.com/thumbnail?id=1J1xUPYYkJeOsBTpDuf36vsV7UfxlM2uG&sz=w1000',
//         },
//     },
//     {
//         id: 'u1v2w3x',
//         text: 'Needs better editing.',
//         articleId: '19',
//         user: {
//             id: 'hdkjUiQhjoPIVMqfORNbvEHm4Wg1',
//             username: 'testuser2',
//             firstname: 'Test2',
//             lastname: 'User2',
//
//             email: 'testuser2@gmail.com',
//             avatar: 'FRGDHJ',
//         },
//     },
//     {
//         id: 'y4z5a6b',
//         text: 'I liked the examples.',
//         articleId: '20',
//         user: {
//             id: 'hdkjUiQhjoPIVMqfORNbvEHm4Wg1',
//             username: 'testuser2',
//             firstname: 'Test2',
//             lastname: 'User2',
//
//             email: 'testuser2@gmail.com',
//             avatar: 'FRGDHJ',
//         },
//     },
//     {
//         id: 'c7d8e9f',
//         text: 'I found this helpful.',
//         articleId: '6',
//         user: {
//             id: 'J3aB11HdHTZW6udzrrw2ymBhIOz1',
//             username: 'mainAdmin',
//             firstname: 'Maryna',
//             lastname: 'Shavlak',
//             email: 'mainAdmin@gmail.com',
//             avatar: 'https://drive.google.com/thumbnail?id=1RD0jSAm8kdTLKa-Vr0daeE8T9-QcfPCa&sz=w1000',
//         },
//     },
//     {
//         id: 'g1h2i3j',
//         text: 'Good perspective.',
//         articleId: '2',
//         user: {
//             id: 'vvfdFnPQMLVkrnCBjsTZcPsUq9U2',
//             username: 'mainUser',
//             firstname: 'Tetiana',
//             lastname: 'Shavlak',
//
//             email: 'mainUser@gmail.com',
//
//             avatar: 'https://drive.google.com/thumbnail?id=1J1xUPYYkJeOsBTpDuf36vsV7UfxlM2uG&sz=w1000',
//         },
//     },
//     {
//         id: 'k4l5m6n',
//         text: 'Disagree with some points.',
//         articleId: '3',
//         user: {
//             id: 'zM4UyVgfKNf2vrf5sXmBIxA5QOl2',
//             username: 'mainManager',
//             firstname: 'Maxim',
//             lastname: 'Shavlak',
//             email: 'mainManager@gmail.com',
//             avatar: 'https://st3.depositphotos.com/1071184/13782/v/450/depositphotos_137825710-stock-illustration-business-person-analyzing-financial-statistics.jpg',
//         },
//     },
//     {
//         id: 'o7p8q9r',
//         text: 'Very informative!',
//         articleId: '4',
//         user: {
//             id: 'nwPyI60mR9XWY3ozVuRGItx08PY2',
//             username: 'testuser',
//             firstname: 'Test',
//             lastname: 'lastnameUser',
//
//             email: 'testuser@gmail.com',
//
//             avatar: 'https://s1.1zoom.ru/big3/992/367659-alexfas01.jpg',
//         },
//     },
//     {
//         id: 's1t2u3v',
//         text: 'This was confusing.',
//         articleId: '5',
//         user: {
//             id: 'hdkjUiQhjoPIVMqfORNbvEHm4Wg1',
//             username: 'testuser2',
//             firstname: 'Test2',
//             lastname: 'User2',
//
//             email: 'testuser2@gmail.com',
//             avatar: 'FRGDHJ',
//         },
//     },
//     {
//         id: 'w4x5y6z',
//         text: 'Can you clarify this?',
//         articleId: '6',
//         user: {
//             id: 'J3aB11HdHTZW6udzrrw2ymBhIOz1',
//             username: 'mainAdmin',
//             firstname: 'Maryna',
//             lastname: 'Shavlak',
//             email: 'mainAdmin@gmail.com',
//             avatar: 'https://drive.google.com/thumbnail?id=1RD0jSAm8kdTLKa-Vr0daeE8T9-QcfPCa&sz=w1000',
//         },
//     },
//     {
//         id: 'a7b8c9d',
//         text: 'I support this view.',
//         articleId: '7',
//         user: {
//             id: 'vvfdFnPQMLVkrnCBjsTZcPsUq9U2',
//             username: 'mainUser',
//             firstname: 'Tetiana',
//             lastname: 'Shavlak',
//
//             email: 'mainUser@gmail.com',
//
//             avatar: 'https://drive.google.com/thumbnail?id=1J1xUPYYkJeOsBTpDuf36vsV7UfxlM2uG&sz=w1000',
//         },
//     },
//     {
//         id: 'e1f2g3h',
//         text: 'This is a good point.',
//         articleId: '12',
//         user: {
//             id: 'nwPyI60mR9XWY3ozVuRGItx08PY2',
//             username: 'testuser',
//             firstname: 'Test',
//             lastname: 'lastnameUser',
//
//             email: 'testuser@gmail.com',
//
//             avatar: 'https://s1.1zoom.ru/big3/992/367659-alexfas01.jpg',
//         },
//     },
//     {
//         id: 'i4j5k6l',
//         text: 'Please expand on this.',
//         articleId: '9',
//         user: {
//             id: 'nwPyI60mR9XWY3ozVuRGItx08PY2',
//             username: 'testuser',
//             firstname: 'Test',
//             lastname: 'lastnameUser',
//
//             email: 'testuser@gmail.com',
//
//             avatar: 'https://s1.1zoom.ru/big3/992/367659-alexfas01.jpg',
//         },
//     },
//     {
//         id: 'm7n8o9p',
//         text: 'Fascinating article!',
//         articleId: '2',
//         user: {
//             id: 'hdkjUiQhjoPIVMqfORNbvEHm4Wg1',
//             username: 'testuser2',
//             firstname: 'Test2',
//             lastname: 'User2',
//
//             email: 'testuser2@gmail.com',
//             avatar: 'FRGDHJ',
//         },
//     },
//     {
//         id: 'q1r2s3t',
//         text: 'Could use more detail.',
//         articleId: '11',
//         user: {
//             id: 'J3aB11HdHTZW6udzrrw2ymBhIOz1',
//             username: 'mainAdmin',
//             firstname: 'Maryna',
//             lastname: 'Shavlak',
//             email: 'mainAdmin@gmail.com',
//             avatar: 'https://drive.google.com/thumbnail?id=1RD0jSAm8kdTLKa-Vr0daeE8T9-QcfPCa&sz=w1000',
//         },
//     },
//     {
//         id: 'u4v5w6x',
//         text: 'Very well explained.',
//         articleId: '12',
//         user: {
//             id: 'hdkjUiQhjoPIVMqfORNbvEHm4Wg1',
//             username: 'testuser2',
//             firstname: 'Test2',
//             lastname: 'User2',
//
//             email: 'testuser2@gmail.com',
//             avatar: 'FRGDHJ',
//         },
//     },
//     {
//         id: 'y7z8a9b',
//         text: 'I have a different view.',
//         articleId: '17',
//         user: {
//             id: 'nwPyI60mR9XWY3ozVuRGItx08PY2',
//             username: 'testuser',
//             firstname: 'Test',
//             lastname: 'lastnameUser',
//
//             email: 'testuser@gmail.com',
//
//             avatar: 'https://s1.1zoom.ru/big3/992/367659-alexfas01.jpg',
//         },
//     },
//     {
//         id: 'c1d2e3f',
//         text: 'This is very useful.',
//         articleId: '10',
//         user: {
//             id: 'nwPyI60mR9XWY3ozVuRGItx08PY2',
//             username: 'testuser',
//             firstname: 'Test',
//             lastname: 'lastnameUser',
//
//             email: 'testuser@gmail.com',
//
//             avatar: 'https://s1.1zoom.ru/big3/992/367659-alexfas01.jpg',
//         },
//     },
//     {
//         id: 'g4h5i6j',
//         text: 'I liked this approach.',
//         articleId: '15',
//         user: {
//             id: 'hdkjUiQhjoPIVMqfORNbvEHm4Wg1',
//             username: 'testuser2',
//             firstname: 'Test2',
//             lastname: 'User2',
//
//             email: 'testuser2@gmail.com',
//             avatar: 'FRGDHJ',
//         },
//     },
//     {
//         id: 'k7l8m9n',
//         text: 'Very engaging content.',
//         articleId: '16',
//         user: {
//             id: 'J3aB11HdHTZW6udzrrw2ymBhIOz1',
//             username: 'mainAdmin',
//             firstname: 'Maryna',
//             lastname: 'Shavlak',
//             email: 'mainAdmin@gmail.com',
//             avatar: 'https://drive.google.com/thumbnail?id=1RD0jSAm8kdTLKa-Vr0daeE8T9-QcfPCa&sz=w1000',
//         },
//     },
//     {
//         id: 'o1p2q3r',
//         text: 'I agree completely.',
//         articleId: '17',
//         user: {
//             id: 'vvfdFnPQMLVkrnCBjsTZcPsUq9U2',
//             username: 'mainUser',
//             firstname: 'Tetiana',
//             lastname: 'Shavlak',
//
//             email: 'mainUser@gmail.com',
//
//             avatar: 'https://drive.google.com/thumbnail?id=1J1xUPYYkJeOsBTpDuf36vsV7UfxlM2uG&sz=w1000',
//         },
//     },
//     {
//         id: 's4t5u6v',
//         text: 'This was poorly written.',
//         articleId: '18',
//         user: {
//             id: 'nwPyI60mR9XWY3ozVuRGItx08PY2',
//             username: 'testuser',
//             firstname: 'Test',
//             lastname: 'lastnameUser',
//
//             email: 'testuser@gmail.com',
//
//             avatar: 'https://s1.1zoom.ru/big3/992/367659-alexfas01.jpg',
//         },
//     },
//     {
//         id: 'w7x8y9z',
//         text: 'Good research!',
//         articleId: '19',
//         user: {
//             id: 'nwPyI60mR9XWY3ozVuRGItx08PY2',
//             username: 'testuser',
//             firstname: 'Test',
//             lastname: 'lastnameUser',
//
//             email: 'testuser@gmail.com',
//
//             avatar: 'https://s1.1zoom.ru/big3/992/367659-alexfas01.jpg',
//         },
//     },
//     {
//         id: 'a1b2c3e',
//         text: 'I am not convinced.',
//         articleId: '20',
//         user: {
//             id: 'hdkjUiQhjoPIVMqfORNbvEHm4Wg1',
//             username: 'testuser2',
//             firstname: 'Test2',
//             lastname: 'User2',
//
//             email: 'testuser2@gmail.com',
//             avatar: 'FRGDHJ',
//         },
//     },
//     {
//         id: 'f4g5h6i',
//         text: 'Loved the structure.',
//         articleId: '1',
//         user: {
//             id: 'nwPyI60mR9XWY3ozVuRGItx08PY2',
//             username: 'testuser',
//             firstname: 'Test',
//             lastname: 'lastnameUser',
//
//             email: 'testuser@gmail.com',
//
//             avatar: 'https://s1.1zoom.ru/big3/992/367659-alexfas01.jpg',
//         },
//     },
//     {
//         id: 'n1o2p3q',
//         text: 'This was eye-opening.',
//         articleId: '3',
//         user: {
//             id: 'nwPyI60mR9XWY3ozVuRGItx08PY2',
//             username: 'testuser',
//             firstname: 'Test',
//             lastname: 'lastnameUser',
//
//             email: 'testuser@gmail.com',
//
//             avatar: 'https://s1.1zoom.ru/big3/992/367659-alexfas01.jpg',
//         },
//     },
//     {
//         id: 'r4s5t6u',
//         text: 'I expected more detail.',
//         articleId: '4',
//         user: {
//             id: 'nwPyI60mR9XWY3ozVuRGItx08PY2',
//             username: 'testuser',
//             firstname: 'Test',
//             lastname: 'lastnameUser',
//
//             email: 'testuser@gmail.com',
//
//             avatar: 'https://s1.1zoom.ru/big3/992/367659-alexfas01.jpg',
//         },
//     },
//     {
//         id: 'v7w8x9y',
//         text: 'Well thought out.',
//         articleId: '5',
//         user: {
//             id: 'hdkjUiQhjoPIVMqfORNbvEHm4Wg1',
//             username: 'testuser2',
//             firstname: 'Test2',
//             lastname: 'User2',
//
//             email: 'testuser2@gmail.com',
//             avatar: 'FRGDHJ',
//         },
//     },
//     {
//         id: 'z1a2b3c',
//         text: 'This is quite helpful.',
//         articleId: '6',
//         user: {
//             id: 'J3aB11HdHTZW6udzrrw2ymBhIOz1',
//             username: 'mainAdmin',
//             firstname: 'Maryna',
//             lastname: 'Shavlak',
//             email: 'mainAdmin@gmail.com',
//             avatar: 'https://drive.google.com/thumbnail?id=1RD0jSAm8kdTLKa-Vr0daeE8T9-QcfPCa&sz=w1000',
//         },
//     },
//     {
//         id: 'd4e5f6g',
//         text: 'Can you give examples?',
//         articleId: '7',
//         user: {
//             id: 'vvfdFnPQMLVkrnCBjsTZcPsUq9U2',
//             username: 'mainUser',
//             firstname: 'Tetiana',
//             lastname: 'Shavlak',
//
//             email: 'mainUser@gmail.com',
//
//             avatar: 'https://drive.google.com/thumbnail?id=1J1xUPYYkJeOsBTpDuf36vsV7UfxlM2uG&sz=w1000',
//         },
//     },
//     {
//         id: 'h7i8j9k',
//         text: 'Great point here.',
//         articleId: '8',
//         user: {
//             id: 'nwPyI60mR9XWY3ozVuRGItx08PY2',
//             username: 'testuser',
//             firstname: 'Test',
//             lastname: 'lastnameUser',
//
//             email: 'testuser@gmail.com',
//
//             avatar: 'https://s1.1zoom.ru/big3/992/367659-alexfas01.jpg',
//         },
//     },
//     {
//         id: 'l1m2n3o',
//         text: 'Very concise!',
//         articleId: '9',
//         user: {
//             id: 'nwPyI60mR9XWY3ozVuRGItx08PY2',
//             username: 'testuser',
//             firstname: 'Test',
//             lastname: 'lastnameUser',
//
//             email: 'testuser@gmail.com',
//
//             avatar: 'https://s1.1zoom.ru/big3/992/367659-alexfas01.jpg',
//         },
//     },
//     {
//         id: 'p4q5r6s',
//         text: 'Engaging from start to end.',
//         articleId: '9',
//         user: {
//             id: 'hdkjUiQhjoPIVMqfORNbvEHm4Wg1',
//             username: 'testuser2',
//             firstname: 'Test2',
//             lastname: 'User2',
//
//             email: 'testuser2@gmail.com',
//             avatar: 'FRGDHJ',
//         },
//     },
//     {
//         id: 't7u8v9w',
//         text: 'This was disappointing.',
//         articleId: '11',
//         user: {
//             id: 'J3aB11HdHTZW6udzrrw2ymBhIOz1',
//             username: 'mainAdmin',
//             firstname: 'Maryna',
//             lastname: 'Shavlak',
//             email: 'mainAdmin@gmail.com',
//             avatar: 'https://drive.google.com/thumbnail?id=1RD0jSAm8kdTLKa-Vr0daeE8T9-QcfPCa&sz=w1000',
//         },
//     },
//     {
//         id: 'x1y2z3a',
//         text: 'Clear and insightful.',
//         articleId: '12',
//         user: {
//             id: 'vvfdFnPQMLVkrnCBjsTZcPsUq9U2',
//             username: 'mainUser',
//             firstname: 'Tetiana',
//             lastname: 'Shavlak',
//
//             email: 'mainUser@gmail.com',
//
//             avatar: 'https://drive.google.com/thumbnail?id=1J1xUPYYkJeOsBTpDuf36vsV7UfxlM2uG&sz=w1000',
//         },
//     },
//     {
//         id: 'b4c5d6e',
//         text: 'Nice perspective shared.',
//         articleId: '17',
//         user: {
//             id: 'zM4UyVgfKNf2vrf5sXmBIxA5QOl2',
//             username: 'mainManager',
//             firstname: 'Maxim',
//             lastname: 'Shavlak',
//             email: 'mainManager@gmail.com',
//             avatar: 'https://st3.depositphotos.com/1071184/13782/v/450/depositphotos_137825710-stock-illustration-business-person-analyzing-financial-statistics.jpg',
//         },
//     },
//     {
//         id: 'f7g8h9i',
//         text: 'This deserves more attention.',
//         articleId: '14',
//         user: {
//             id: 'nwPyI60mR9XWY3ozVuRGItx08PY2',
//             username: 'testuser',
//             firstname: 'Test',
//             lastname: 'lastnameUser',
//
//             email: 'testuser@gmail.com',
//
//             avatar: 'https://s1.1zoom.ru/big3/992/367659-alexfas01.jpg',
//         },
//     },
//     {
//         id: 'j1k2l3m',
//         text: 'Excellent analysis!',
//         articleId: '15',
//         user: {
//             id: 'hdkjUiQhjoPIVMqfORNbvEHm4Wg1',
//             username: 'testuser2',
//             firstname: 'Test2',
//             lastname: 'User2',
//
//             email: 'testuser2@gmail.com',
//             avatar: 'FRGDHJ',
//         },
//     },
//     {
//         id: 'n4o5p6q',
//         text: 'Well written, thanks!',
//         articleId: '16',
//         user: {
//             id: 'J3aB11HdHTZW6udzrrw2ymBhIOz1',
//             username: 'mainAdmin',
//             firstname: 'Maryna',
//             lastname: 'Shavlak',
//             email: 'mainAdmin@gmail.com',
//             avatar: 'https://drive.google.com/thumbnail?id=1RD0jSAm8kdTLKa-Vr0daeE8T9-QcfPCa&sz=w1000',
//         },
//     },
//     {
//         id: 'r7s8t9u',
//         text: 'I’m not sure I agree.',
//         articleId: '17',
//         user: {
//             id: 'vvfdFnPQMLVkrnCBjsTZcPsUq9U2',
//             username: 'mainUser',
//             firstname: 'Tetiana',
//             lastname: 'Shavlak',
//
//             email: 'mainUser@gmail.com',
//
//             avatar: 'https://drive.google.com/thumbnail?id=1J1xUPYYkJeOsBTpDuf36vsV7UfxlM2uG&sz=w1000',
//         },
//     },
//     {
//         id: 'v1w2x3y',
//         text: 'This was a bit unclear.',
//         articleId: '18',
//         user: {
//             id: 'zM4UyVgfKNf2vrf5sXmBIxA5QOl2',
//             username: 'mainManager',
//             firstname: 'Maxim',
//             lastname: 'Shavlak',
//             email: 'mainManager@gmail.com',
//             avatar: 'https://st3.depositphotos.com/1071184/13782/v/450/depositphotos_137825710-stock-illustration-business-person-analyzing-financial-statistics.jpg',
//         },
//     },
//     {
//         id: 'z4a5b6c',
//         text: 'Good references.',
//         articleId: '19',
//         user: {
//             id: 'nwPyI60mR9XWY3ozVuRGItx08PY2',
//             username: 'testuser',
//             firstname: 'Test',
//             lastname: 'lastnameUser',
//
//             email: 'testuser@gmail.com',
//
//             avatar: 'https://s1.1zoom.ru/big3/992/367659-alexfas01.jpg',
//         },
//     },
//     {
//         id: 'd7e8f9g',
//         text: 'I’d love a follow-up.',
//         articleId: '20',
//         user: {
//             id: 'hdkjUiQhjoPIVMqfORNbvEHm4Wg1',
//             username: 'testuser2',
//             firstname: 'Test2',
//             lastname: 'User2',
//
//             email: 'testuser2@gmail.com',
//             avatar: 'FRGDHJ',
//         },
//     },
//     {
//         id: 'h1i2j3k',
//         text: 'I can relate to this.',
//         articleId: '2',
//         user: {
//             id: 'J3aB11HdHTZW6udzrrw2ymBhIOz1',
//             username: 'mainAdmin',
//             firstname: 'Maryna',
//             lastname: 'Shavlak',
//             email: 'mainAdmin@gmail.com',
//             avatar: 'https://drive.google.com/thumbnail?id=1RD0jSAm8kdTLKa-Vr0daeE8T9-QcfPCa&sz=w1000',
//         },
//     },
//     {
//         id: 'l4m5n6o',
//         text: 'Clear arguments made.',
//         articleId: '2',
//         user: {
//             id: 'vvfdFnPQMLVkrnCBjsTZcPsUq9U2',
//             username: 'mainUser',
//             firstname: 'Tetiana',
//             lastname: 'Shavlak',
//
//             email: 'mainUser@gmail.com',
//
//             avatar: 'https://drive.google.com/thumbnail?id=1J1xUPYYkJeOsBTpDuf36vsV7UfxlM2uG&sz=w1000',
//         },
//     },
//     {
//         id: 'p7q8r9s',
//         text: 'Good counterpoints.',
//         articleId: '4',
//         user: {
//             id: 'zM4UyVgfKNf2vrf5sXmBIxA5QOl2',
//             username: 'mainManager',
//             firstname: 'Maxim',
//             lastname: 'Shavlak',
//             email: 'mainManager@gmail.com',
//             avatar: 'https://st3.depositphotos.com/1071184/13782/v/450/depositphotos_137825710-stock-illustration-business-person-analyzing-financial-statistics.jpg',
//         },
//     },
//     {
//         id: 't1u2v3w',
//         text: 'Would like more data.',
//         articleId: '4',
//         user: {
//             id: 'nwPyI60mR9XWY3ozVuRGItx08PY2',
//             username: 'testuser',
//             firstname: 'Test',
//             lastname: 'lastnameUser',
//
//             email: 'testuser@gmail.com',
//
//             avatar: 'https://s1.1zoom.ru/big3/992/367659-alexfas01.jpg',
//         },
//     },
//     {
//         id: 'x4y5z6a',
//         text: 'Good mix of views.',
//         articleId: '5',
//         user: {
//             id: 'hdkjUiQhjoPIVMqfORNbvEHm4Wg1',
//             username: 'testuser2',
//             firstname: 'Test2',
//             lastname: 'User2',
//
//             email: 'testuser2@gmail.com',
//             avatar: 'FRGDHJ',
//         },
//     },
//     {
//         id: 'b7c8d9e',
//         text: 'This was too brief.',
//         articleId: '6',
//         user: {
//             id: 'J3aB11HdHTZW6udzrrw2ymBhIOz1',
//             username: 'mainAdmin',
//             firstname: 'Maryna',
//             lastname: 'Shavlak',
//             email: 'mainAdmin@gmail.com',
//             avatar: 'https://drive.google.com/thumbnail?id=1RD0jSAm8kdTLKa-Vr0daeE8T9-QcfPCa&sz=w1000',
//         },
//     },
//     {
//         id: 'f1g2h3i',
//         text: 'I enjoyed reading this.',
//         articleId: '7',
//         user: {
//             id: 'vvfdFnPQMLVkrnCBjsTZcPsUq9U2',
//             username: 'mainUser',
//             firstname: 'Tetiana',
//             lastname: 'Shavlak',
//
//             email: 'mainUser@gmail.com',
//
//             avatar: 'https://drive.google.com/thumbnail?id=1J1xUPYYkJeOsBTpDuf36vsV7UfxlM2uG&sz=w1000',
//         },
//     },
//     {
//         id: 'j4k5l6m',
//         text: 'Not enough depth here.',
//         articleId: '8',
//         user: {
//             id: 'zM4UyVgfKNf2vrf5sXmBIxA5QOl2',
//             username: 'mainManager',
//             firstname: 'Maxim',
//             lastname: 'Shavlak',
//             email: 'mainManager@gmail.com',
//             avatar: 'https://st3.depositphotos.com/1071184/13782/v/450/depositphotos_137825710-stock-illustration-business-person-analyzing-financial-statistics.jpg',
//         },
//     },
//     {
//         id: 'n7o8p9q',
//         text: 'Solid writing!',
//         articleId: '9',
//         user: {
//             id: 'nwPyI60mR9XWY3ozVuRGItx08PY2',
//             username: 'testuser',
//             firstname: 'Test',
//             lastname: 'lastnameUser',
//
//             email: 'testuser@gmail.com',
//
//             avatar: 'https://s1.1zoom.ru/big3/992/367659-alexfas01.jpg',
//         },
//     },
//     {
//         id: 'r1s2t3u',
//         text: 'This changed my view.',
//         articleId: '10',
//         user: {
//             id: 'hdkjUiQhjoPIVMqfORNbvEHm4Wg1',
//             username: 'testuser2',
//             firstname: 'Test2',
//             lastname: 'User2',
//
//             email: 'testuser2@gmail.com',
//             avatar: 'FRGDHJ',
//         },
//     },
//     {
//         id: 'v4w5x6y',
//         text: 'Needs more context.',
//         articleId: '17',
//         user: {
//             id: 'J3aB11HdHTZW6udzrrw2ymBhIOz1',
//             username: 'mainAdmin',
//             firstname: 'Maryna',
//             lastname: 'Shavlak',
//             email: 'mainAdmin@gmail.com',
//             avatar: 'https://drive.google.com/thumbnail?id=1RD0jSAm8kdTLKa-Vr0daeE8T9-QcfPCa&sz=w1000',
//         },
//     },
//     {
//         id: 'z7a8b9c',
//         text: 'Thoroughly researched!',
//         articleId: '12',
//         user: {
//             id: 'vvfdFnPQMLVkrnCBjsTZcPsUq9U2',
//             username: 'mainUser',
//             firstname: 'Tetiana',
//             lastname: 'Shavlak',
//
//             email: 'mainUser@gmail.com',
//
//             avatar: 'https://drive.google.com/thumbnail?id=1J1xUPYYkJeOsBTpDuf36vsV7UfxlM2uG&sz=w1000',
//         },
//     },
//     {
//         id: 'd1e2f3g',
//         text: 'I didn’t expect this.',
//         articleId: '19',
//         user: {
//             id: 'zM4UyVgfKNf2vrf5sXmBIxA5QOl2',
//             username: 'mainManager',
//             firstname: 'Maxim',
//             lastname: 'Shavlak',
//             email: 'mainManager@gmail.com',
//             avatar: 'https://st3.depositphotos.com/1071184/13782/v/450/depositphotos_137825710-stock-illustration-business-person-analyzing-financial-statistics.jpg',
//         },
//     },
//     {
//         id: 'h4i5j6k',
//         text: 'Very engaging content.',
//         articleId: '14',
//         user: {
//             id: 'nwPyI60mR9XWY3ozVuRGItx08PY2',
//             username: 'testuser',
//             firstname: 'Test',
//             lastname: 'lastnameUser',
//
//             email: 'testuser@gmail.com',
//
//             avatar: 'https://s1.1zoom.ru/big3/992/367659-alexfas01.jpg',
//         },
//     },
//     {
//         id: 'l7m8n9o',
//         text: 'A fresh perspective.',
//         articleId: '11',
//         user: {
//             id: 'hdkjUiQhjoPIVMqfORNbvEHm4Wg1',
//             username: 'testuser2',
//             firstname: 'Test2',
//             lastname: 'User2',
//
//             email: 'testuser2@gmail.com',
//             avatar: 'FRGDHJ',
//         },
//     },
//     {
//         id: 'p1q2r3s',
//         text: 'Needs more explanation.',
//         articleId: '11',
//         user: {
//             id: 'J3aB11HdHTZW6udzrrw2ymBhIOz1',
//             username: 'mainAdmin',
//             firstname: 'Maryna',
//             lastname: 'Shavlak',
//             email: 'mainAdmin@gmail.com',
//             avatar: 'https://drive.google.com/thumbnail?id=1RD0jSAm8kdTLKa-Vr0daeE8T9-QcfPCa&sz=w1000',
//         },
//     },
//     {
//         id: 't4u5v6w',
//         text: 'Very well summarized.',
//         articleId: '11',
//         user: {
//             id: 'vvfdFnPQMLVkrnCBjsTZcPsUq9U2',
//             username: 'mainUser',
//             firstname: 'Tetiana',
//             lastname: 'Shavlak',
//
//             email: 'mainUser@gmail.com',
//
//             avatar: 'https://drive.google.com/thumbnail?id=1J1xUPYYkJeOsBTpDuf36vsV7UfxlM2uG&sz=w1000',
//         },
//     },
//     {
//         id: 'x7y8z9a',
//         text: 'I have some doubts.',
//         articleId: '10',
//         user: {
//             id: 'zM4UyVgfKNf2vrf5sXmBIxA5QOl2',
//             username: 'mainManager',
//             firstname: 'Maxim',
//             lastname: 'Shavlak',
//             email: 'mainManager@gmail.com',
//             avatar: 'https://st3.depositphotos.com/1071184/13782/v/450/depositphotos_137825710-stock-illustration-business-person-analyzing-financial-statistics.jpg',
//         },
//     },
//     {
//         id: 'b1c2d3e',
//         text: 'I’ll need to read again.',
//         articleId: '19',
//         user: {
//             id: 'nwPyI60mR9XWY3ozVuRGItx08PY2',
//             username: 'testuser',
//             firstname: 'Test',
//             lastname: 'lastnameUser',
//
//             email: 'testuser@gmail.com',
//
//             avatar: 'https://s1.1zoom.ru/big3/992/367659-alexfas01.jpg',
//         },
//     },
//     {
//         id: 'f4g5h6i',
//         text: 'Strong arguments here.',
//         articleId: '20',
//         user: {
//             id: 'hdkjUiQhjoPIVMqfORNbvEHm4Wg1',
//             username: 'testuser2',
//             firstname: 'Test2',
//             lastname: 'User2',
//
//             email: 'testuser2@gmail.com',
//             avatar: 'FRGDHJ',
//         },
//     },
// ];

const commentsCollection = collection(firestore, 'comments');

// async function uploadComments(comments: any) {
//     try {
//         // @ts-ignore
//         const promises = [];
//         // @ts-ignore
//         comments.forEach((comment) => {
//             const commentDoc = doc(commentsCollection);
//             promises.push(setDoc(commentDoc, comment));
//         });
//
//         // @ts-ignore
//         await Promise.all(promises); // Wait for all uploads to complete
//         console.log('comments uploaded successfully!');
//     } catch (error) {
//         console.error('Error uploading comments:', error);
//     }
// }

const MainPage = memo(() => {
    const { t } = useTranslation();
    // uploadComments(comments);
    return <Page data-testid="MainPage">{t('Головна сторінка')}</Page>;
});

export default MainPage;
