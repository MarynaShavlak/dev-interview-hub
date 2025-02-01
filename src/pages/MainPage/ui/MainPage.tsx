import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { collection, setDoc, doc } from 'firebase/firestore';
import { Page } from '@/widgets/Page';

import { firestore } from '../../../../json-server/firebase';

// const comments = [
//     {
//         id: 'a1b2c3d',
//         createdAt: new Date().toISOString(),
//         text: 'This article is great!',
//         articleId: '0RBxq9c23hOuXE8FK94d',
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
//         createdAt: new Date().toISOString(),
//         text: 'I totally agree with this.',
//         articleId: '0RBxq9c23hOuXE8FK94d',
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
//         createdAt: new Date().toISOString(),
//         text: 'Interesting read!',
//         articleId: '6r8uAgmMBP7zXxfb2dCy',
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
//         createdAt: new Date().toISOString(),
//         text: 'I have a different opinion.',
//         articleId: '19FW0BhZBVjGm983XzEX',
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
//         createdAt: new Date().toISOString(),
//         text: 'Thanks for sharing!',
//         articleId: '1F5E6nO8tLeZGeeJw8eq',
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
//         createdAt: new Date().toISOString(),
//         text: 'Well written article!',
//         articleId: '1mIJ9KHtKiOUxzjCn5tU',
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
//         createdAt: new Date().toISOString(),
//         text: 'Loved the insights.',
//         articleId: '21XeQ8bB1b8QCTVCywEH',
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
//         createdAt: new Date().toISOString(),
//         text: 'Couldn’t agree more!',
//         articleId: '2We9yZZTEqoReayUCgtl',
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
//         createdAt: new Date().toISOString(),
//         text: 'Not sure about this.',
//         articleId: '2We9yZZTEqoReayUCgtl',
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
//         createdAt: new Date().toISOString(),
//         text: 'Fantastic explanation!',
//         articleId: '2We9yZZTEqoReayUCgtl',
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
//         createdAt: new Date().toISOString(),
//         text: 'More details, please.',
//         articleId: '3ovieoltecbxiUObDwMm',
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
//         createdAt: new Date().toISOString(),
//         text: 'This was insightful.',
//         articleId: '4I8rqhWjmMzeAsRfOdT2',
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
//         createdAt: new Date().toISOString(),
//         text: 'I learned something new.',
//         articleId: '4NGOL3p2UGyUWaFtHomz',
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
//         createdAt: new Date().toISOString(),
//         text: 'This needs more sources.',
//         articleId: '4SegrOiPJv0kbsEla90b',
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
//         createdAt: new Date().toISOString(),
//         text: 'Brilliant write-up!',
//         articleId: '3ovieoltecbxiUObDwMm',
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
//         createdAt: new Date().toISOString(),
//         text: 'Very thought-provoking.',
//         articleId: '4psrL3te9yv5hop16cBW',
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
//         createdAt: new Date().toISOString(),
//         text: 'I have some concerns.',
//         articleId: '2We9yZZTEqoReayUCgtl',
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
//         createdAt: new Date().toISOString(),
//         text: 'Needs better editing.',
//         articleId: '5kUBgyuQ14ZrCxFQPcop',
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
//         createdAt: new Date().toISOString(),
//         text: 'I liked the examples.',
//         articleId: '6QFd8yYUAmNmMTV7A85P',
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
//         createdAt: new Date().toISOString(),
//         text: 'I found this helpful.',
//         articleId: '1mIJ9KHtKiOUxzjCn5tU',
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
//         createdAt: new Date().toISOString(),
//         text: 'Good perspective.',
//         articleId: '0RBxq9c23hOuXE8FK94d',
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
//         createdAt: new Date().toISOString(),
//         text: 'Disagree with some points.',
//         articleId: '6r8uAgmMBP7zXxfb2dCy',
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
//         createdAt: new Date().toISOString(),
//         text: 'Very informative!',
//         articleId: '19FW0BhZBVjGm983XzEX',
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
//         createdAt: new Date().toISOString(),
//         text: 'This was confusing.',
//         articleId: '1F5E6nO8tLeZGeeJw8eq',
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
//         createdAt: new Date().toISOString(),
//         text: 'Can you clarify this?',
//         articleId: '1mIJ9KHtKiOUxzjCn5tU',
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
//         createdAt: new Date().toISOString(),
//         text: 'I support this view.',
//         articleId: '21XeQ8bB1b8QCTVCywEH',
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
//         createdAt: new Date().toISOString(),
//         text: 'This is a good point.',
//         articleId: '4I8rqhWjmMzeAsRfOdT2',
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
//         createdAt: new Date().toISOString(),
//         text: 'Please expand on this.',
//         articleId: '2We9yZZTEqoReayUCgtl',
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
//         createdAt: new Date().toISOString(),
//         text: 'Fascinating article!',
//         articleId: '0RBxq9c23hOuXE8FK94d',
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
//         createdAt: new Date().toISOString(),
//         text: 'Could use more detail.',
//         articleId: '3ovieoltecbxiUObDwMm',
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
//         createdAt: new Date().toISOString(),
//         text: 'Very well explained.',
//         articleId: '4I8rqhWjmMzeAsRfOdT2',
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
//         createdAt: new Date().toISOString(),
//         text: 'I have a different view.',
//         articleId: '5IfrSJQZsWTlYx13N2s0',
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
//         createdAt: new Date().toISOString(),
//         text: 'This is very useful.',
//         articleId: '2bbQ8NduyUqRFyHnmmlT',
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
//         createdAt: new Date().toISOString(),
//         text: 'I liked this approach.',
//         articleId: '4hYoI0VS1lAkKB6gZ2ph',
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
//         createdAt: new Date().toISOString(),
//         text: 'Very engaging content.',
//         articleId: '4psrL3te9yv5hop16cBW',
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
//         createdAt: new Date().toISOString(),
//         text: 'I agree completely.',
//         articleId: '5IfrSJQZsWTlYx13N2s0',
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
//         createdAt: new Date().toISOString(),
//         text: 'This was poorly written.',
//         articleId: '5JNi7i463FWIRCaMdkES',
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
//         createdAt: new Date().toISOString(),
//         text: 'Good research!',
//         articleId: '5kUBgyuQ14ZrCxFQPcop',
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
//         createdAt: new Date().toISOString(),
//         text: 'I am not convinced.',
//         articleId: '6QFd8yYUAmNmMTV7A85P',
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
//         createdAt: new Date().toISOString(),
//         text: 'Loved the structure.',
//         articleId: '0RBxq9c23hOuXE8FK94d',
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
//         createdAt: new Date().toISOString(),
//         text: 'This was eye-opening.',
//         articleId: '6r8uAgmMBP7zXxfb2dCy',
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
//         createdAt: new Date().toISOString(),
//         text: 'I expected more detail.',
//         articleId: '19FW0BhZBVjGm983XzEX',
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
//         createdAt: new Date().toISOString(),
//         text: 'Well thought out.',
//         articleId: '1F5E6nO8tLeZGeeJw8eq',
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
//         createdAt: new Date().toISOString(),
//         text: 'This is quite helpful.',
//         articleId: '1mIJ9KHtKiOUxzjCn5tU',
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
//         createdAt: new Date().toISOString(),
//         text: 'Can you give examples?',
//         articleId: '21XeQ8bB1b8QCTVCywEH',
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
//         createdAt: new Date().toISOString(),
//         text: 'Great point here.',
//         articleId: '25EkbKCheAE5zzR5VUJr',
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
//         createdAt: new Date().toISOString(),
//         text: 'Very concise!',
//         articleId: '2We9yZZTEqoReayUCgtl',
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
//         createdAt: new Date().toISOString(),
//         text: 'Engaging from start to end.',
//         articleId: '2We9yZZTEqoReayUCgtl',
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
//         createdAt: new Date().toISOString(),
//         text: 'This was disappointing.',
//         articleId: '3ovieoltecbxiUObDwMm',
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
//         createdAt: new Date().toISOString(),
//         text: 'Clear and insightful.',
//         articleId: '4I8rqhWjmMzeAsRfOdT2',
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
//         createdAt: new Date().toISOString(),
//         text: 'Nice perspective shared.',
//         articleId: '5IfrSJQZsWTlYx13N2s0',
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
//         createdAt: new Date().toISOString(),
//         text: 'This deserves more attention.',
//         articleId: '4SegrOiPJv0kbsEla90b',
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
//         createdAt: new Date().toISOString(),
//         text: 'Excellent analysis!',
//         articleId: '4hYoI0VS1lAkKB6gZ2ph',
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
//         createdAt: new Date().toISOString(),
//         text: 'Well written, thanks!',
//         articleId: '4psrL3te9yv5hop16cBW',
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
//         createdAt: new Date().toISOString(),
//         text: 'I’m not sure I agree.',
//         articleId: '5IfrSJQZsWTlYx13N2s0',
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
//         createdAt: new Date().toISOString(),
//         text: 'This was a bit unclear.',
//         articleId: '5JNi7i463FWIRCaMdkES',
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
//         createdAt: new Date().toISOString(),
//         text: 'Good references.',
//         articleId: '5kUBgyuQ14ZrCxFQPcop',
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
//         createdAt: new Date().toISOString(),
//         text: 'I’d love a follow-up.',
//         articleId: '6QFd8yYUAmNmMTV7A85P',
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
//         createdAt: new Date().toISOString(),
//         text: 'I can relate to this.',
//         articleId: '0io1vmHt9xYH7hKE9Bxe',
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
//         createdAt: new Date().toISOString(),
//         text: 'Clear arguments made.',
//         articleId: '0RBxq9c23hOuXE8FK94d',
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
//         createdAt: new Date().toISOString(),
//         text: 'Good counterpoints.',
//         articleId: '19FW0BhZBVjGm983XzEX',
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
//         createdAt: new Date().toISOString(),
//         text: 'Would like more data.',
//         articleId: '19FW0BhZBVjGm983XzEX',
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
//         createdAt: new Date().toISOString(),
//         text: 'Good mix of views.',
//         articleId: '1F5E6nO8tLeZGeeJw8eq',
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
//         createdAt: new Date().toISOString(),
//         text: 'This was too brief.',
//         articleId: '1mIJ9KHtKiOUxzjCn5tU',
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
//         createdAt: new Date().toISOString(),
//         text: 'I enjoyed reading this.',
//         articleId: '21XeQ8bB1b8QCTVCywEH',
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
//         createdAt: new Date().toISOString(),
//         text: 'Not enough depth here.',
//         articleId: '25EkbKCheAE5zzR5VUJr',
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
//         createdAt: new Date().toISOString(),
//         text: 'Solid writing!',
//         articleId: '2We9yZZTEqoReayUCgtl',
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
//         createdAt: new Date().toISOString(),
//         text: 'This changed my view.',
//         articleId: '2bbQ8NduyUqRFyHnmmlT',
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
//         createdAt: new Date().toISOString(),
//         text: 'Needs more context.',
//         articleId: '5IfrSJQZsWTlYx13N2s0',
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
//         createdAt: new Date().toISOString(),
//         text: 'Thoroughly researched!',
//         articleId: '4I8rqhWjmMzeAsRfOdT2',
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
//         createdAt: new Date().toISOString(),
//         text: 'I didn’t expect this.',
//         articleId: '5kUBgyuQ14ZrCxFQPcop',
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
//         createdAt: new Date().toISOString(),
//         text: 'Very engaging content.',
//         articleId: '4SegrOiPJv0kbsEla90b',
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
//         createdAt: new Date().toISOString(),
//         text: 'A fresh perspective.',
//         articleId: '3ovieoltecbxiUObDwMm',
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
//         createdAt: new Date().toISOString(),
//         text: 'Needs more explanation.',
//         articleId: '3ovieoltecbxiUObDwMm',
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
//         createdAt: new Date().toISOString(),
//         text: 'Very well summarized.',
//         articleId: '3ovieoltecbxiUObDwMm',
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
//         createdAt: new Date().toISOString(),
//         text: 'I have some doubts.',
//         articleId: '2bbQ8NduyUqRFyHnmmlT',
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
//         createdAt: new Date().toISOString(),
//         text: 'I’ll need to read again.',
//         articleId: '5kUBgyuQ14ZrCxFQPcop',
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
//         createdAt: new Date().toISOString(),
//         text: 'Strong arguments here.',
//         articleId: '6QFd8yYUAmNmMTV7A85P',
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

async function uploadComments(comments: any) {
    try {
        // @ts-ignore
        const promises = [];
        // @ts-ignore
        comments.forEach((comment) => {
            const commentDoc = doc(commentsCollection);
            promises.push(setDoc(commentDoc, comment));
        });

        // @ts-ignore
        await Promise.all(promises); // Wait for all uploads to complete
        console.log('comments uploaded successfully!');
    } catch (error) {
        console.error('Error uploading comments:', error);
    }
}

const MainPage = memo(() => {
    const { t } = useTranslation();
    // uploadComments(comments);
    return <Page data-testid="MainPage">{t('Головна сторінка')}</Page>;
});

export default MainPage;
