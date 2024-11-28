import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { collection, setDoc, doc } from 'firebase/firestore';
import { Page } from '@/widgets/Page';
import { ArticleRating } from '@/widgets/StatisticsCharts';
import { firestore } from '../../../../json-server/firebase';

const ratingsCollection = collection(firestore, 'ratings');

const ratings = [
    {
        user: {
            id: 'J3aB11HdHTZW6udzrrw2ymBhIOz1',
            username: 'mainAdmin',
            firstname: 'Maryna',
            lastname: 'Shavlak',
            email: 'mainAdmin@gmail.com',
            avatar: 'https://drive.google.com/thumbnail?id=1RD0jSAm8kdTLKa-Vr0daeE8T9-QcfPCa&sz=w1000',
        },
        articleId: '40',
        rate: 5,
        id: '101',
    },
    {
        user: {
            id: 'vvfdFnPQMLVkrnCBjsTZcPsUq9U2',
            username: 'mainUser',
            firstname: 'Tetiana',
            lastname: 'Shavlak',
            email: 'mainUser@gmail.com',
            avatar: 'https://drive.google.com/thumbnail?id=1J1xUPYYkJeOsBTpDuf36vsV7UfxlM2uG&sz=w1000',
        },
        articleId: '40',
        rate: 4,
        id: '102',
    },
    {
        user: {
            id: 'zM4UyVgfKNf2vrf5sXmBIxA5QOl2',
            username: 'mainManager',
            firstname: 'Maxim',
            lastname: 'Shavlak',
            email: 'mainManager@gmail.com',
            avatar: 'https://st3.depositphotos.com/1071184/13782/v/450/depositphotos_137825710-stock-illustration-business-person-analyzing-financial-statistics.jpg',
        },
        articleId: '40',
        rate: 4,
        id: '103',
    },
    {
        user: {
            id: 'nwPyI60mR9XWY3ozVuRGItx08PY2',
            username: 'testuser',
            firstname: 'Test',
            lastname: 'lastnameUser',

            email: 'testuser@gmail.com',

            avatar: 'https://s1.1zoom.ru/big3/992/367659-alexfas01.jpg',
        },
        articleId: '40',
        rate: 3,
        id: '104',
    },
    {
        user: {
            id: 'hdkjUiQhjoPIVMqfORNbvEHm4Wg1',
            username: 'testuser2',
            firstname: 'Test2',
            lastname: 'User2',

            email: 'testuser2@gmail.com',
            avatar: 'FRGDHJ',
        },
        articleId: '40',
        rate: 5,
        id: '105',
    },
    {
        user: {
            id: 'meuKZ9Dc5ucUuMn72esjwMi9Azl2',
            username: 'markUser',
            firstname: 'Mark',
            lastname: 'Smith',
            email: 'markUser@gmail.com',
            avatar: 'https://example.com/avatar6.png',
        },
        articleId: '40',
        rate: 3,
        id: '106',
    },
    {
        user: {
            id: 'tfs04ij0b5anHdw2qt6LghQsEfC3',
            username: 'katyaAdmin',
            firstname: 'Katya',
            lastname: 'Ivanova',
            email: 'katyaAdmin@gmail.com',
            avatar: 'https://example.com/avatar7.jpg',
        },
        articleId: '40',
        rate: 4,
        id: '107',
    },
    {
        user: {
            id: 'd6RJwaIJmjbHTV2PdSg04DpPjWl1',
            username: 'johnManager',
            firstname: 'John',
            lastname: 'Doe',
            email: 'johnManager@gmail.com',
            avatar: 'https://example.com/avatar8.jpg',
        },
        articleId: '40',
        rate: 5,
        id: '108',
    },
    {
        user: {
            id: 'MqonEyICTeMapkAPyPFH7w1E5l52',
            username: 'annaUser',
            firstname: 'Anna',
            lastname: 'Koval',

            email: 'annaUser@gmail.com',

            avatar: 'https://example.com/avatar9.jpg',
        },
        articleId: '40',
        rate: 4,
        id: '109',
    },
    {
        user: {
            id: 'ObGe2X8MNTde2RSffQgE0Jpxek72',
            username: 'lucyAdmin',
            firstname: 'Lucy',
            lastname: 'Brown',

            email: 'lucyAdmin@gmail.com',

            avatar: 'https://example.com/avatar10.jpg',
        },
        articleId: '40',
        rate: 4,
        id: '110',
    },
    {
        user: {
            id: '4g1WI5M1XIZU6VKvIfJBG7TzMsD3',
            username: 'alexManager',
            firstname: 'Alex',
            lastname: 'Johnson',
            email: 'alexManager@gmail.com',
            avatar: 'https://example.com/avatar11.jpg',
        },
        articleId: '40',
        rate: 3,
        id: '111',
    },
    {
        user: {
            id: '4juq0tzGf5fNMCXCRFOa5mvFO5O2',
            username: 'leoUser',
            firstname: 'Leo',
            lastname: 'Mikhailov',

            email: 'leoUser@gmail.com',

            avatar: 'https://example.com/avatar12.jpg',
        },
        articleId: '40',
        rate: 4,
        id: '112',
    },
    {
        user: {
            id: '9Dpc2pFoeORLyQrxHlGIbe5wjbf2',
            username: 'janeAdmin',
            firstname: 'Jane',
            lastname: 'Williams',

            email: 'janeAdmin@gmail.com',

            avatar: 'https://example.com/avatar13.jpg',
        },
        articleId: '40',
        rate: 5,
        id: '113',
    },
    {
        user: {
            id: 'BrKES0pOcxcgYBUpKmZxBzqKFhl1',
            username: 'peterManager',
            firstname: 'Peter',
            lastname: 'Muller',

            email: 'peterManager@gmail.com',

            avatar: 'https://example.com/avatar14.jpg',
        },
        articleId: '40',
        rate: 3,
        id: '114',
    },
    {
        user: {
            id: 'Ue15ycXTpxVhCZ2eJoOVYaArKEa2',
            username: 'mariaUser',
            firstname: 'Maria',
            lastname: 'Petrova',

            email: 'mariaUser@gmail.com',

            avatar: 'https://example.com/avatar15.jpg',
        },
        articleId: '40',
        rate: 4,
        id: '115',
    },
    {
        user: {
            id: 'KXv8oUPLQeUXSzoXOWJV4nw47CG2',
            username: 'maxAdmin',
            firstname: 'Max',
            lastname: 'Gordon',

            email: 'maxAdmin@gmail.com',

            avatar: 'https://example.com/avatar16.jpg',
        },
        articleId: '40',
        rate: 4,
        id: '116',
    },
    {
        user: {
            id: '18zZBJnmEqWJNwGj2SvbNiNVXol1',
            username: 'nickManager',
            firstname: 'Nick',
            lastname: 'Garcia',

            email: 'nickManager@gmail.com',

            avatar: 'https://example.com/avatar17.jpg',
        },
        articleId: '40',
        rate: 5,
        id: '117',
    },
    {
        user: {
            id: 'mYX7XszmZJgEUSU9eeKDJYbP7P22',
            username: 'claraUser',
            firstname: 'Clara',
            lastname: 'Santos',

            email: 'claraUser@gmail.com',

            avatar: 'https://example.com/avatar18.jpg',
        },
        articleId: '40',
        rate: 4,
        id: '118',
    },
    {
        user: {
            id: 'Str49JTKBAOoaEhM8XeQLLLPPDp2',
            username: 'tomAdmin',
            firstname: 'Tom',
            lastname: 'Anderson',

            email: 'tomAdmin@gmail.com',

            avatar: 'https://example.com/avatar19.jpg',
        },
        articleId: '40',
        rate: 3,
        id: '119',
    },
    {
        user: {
            id: 'J3aB11HdHTZW6udzrrw2ymBhIOz1',
            username: 'mainAdmin',
            firstname: 'Maryna',
            lastname: 'Shavlak',
            email: 'mainAdmin@gmail.com',
            avatar: 'https://drive.google.com/thumbnail?id=1RD0jSAm8kdTLKa-Vr0daeE8T9-QcfPCa&sz=w1000',
        },
        articleId: '41',
        rate: 5,
        feedback: 'Another great article!',
        id: '120',
    },
    {
        user: {
            id: 'vvfdFnPQMLVkrnCBjsTZcPsUq9U2',
            username: 'mainUser',
            firstname: 'Tetiana',
            lastname: 'Shavlak',
            email: 'mainUser@gmail.com',
            avatar: 'https://drive.google.com/thumbnail?id=1J1xUPYYkJeOsBTpDuf36vsV7UfxlM2uG&sz=w1000',
        },
        articleId: '41',
        rate: 4,
        id: '121',
    },
    {
        user: {
            id: 'zM4UyVgfKNf2vrf5sXmBIxA5QOl2',
            username: 'mainManager',
            firstname: 'Maxim',
            lastname: 'Shavlak',
            email: 'mainManager@gmail.com',
            avatar: 'https://st3.depositphotos.com/1071184/13782/v/450/depositphotos_137825710-stock-illustration-business-person-analyzing-financial-statistics.jpg',
        },
        articleId: '41',
        rate: 4,
        id: '122',
    },
    {
        user: {
            id: 'nwPyI60mR9XWY3ozVuRGItx08PY2',
            username: 'testuser',
            firstname: 'Test',
            lastname: 'lastnameUser',

            email: 'testuser@gmail.com',

            avatar: 'https://s1.1zoom.ru/big3/992/367659-alexfas01.jpg',
        },
        articleId: '41',
        rate: 3,
        id: '123',
    },
    {
        user: {
            id: 'hdkjUiQhjoPIVMqfORNbvEHm4Wg1',
            username: 'testuser2',
            firstname: 'Test2',
            lastname: 'User2',

            email: 'testuser2@gmail.com',
            avatar: 'FRGDHJ',
        },
        articleId: '41',
        rate: 5,
        id: '124',
    },
    {
        user: {
            id: 'meuKZ9Dc5ucUuMn72esjwMi9Azl2',
            username: 'markUser',
            firstname: 'Mark',
            lastname: 'Smith',
            email: 'markUser@gmail.com',
            avatar: 'https://example.com/avatar6.png',
        },
        articleId: '41',
        rate: 4,
        id: '125',
    },
    {
        user: {
            id: 'tfs04ij0b5anHdw2qt6LghQsEfC3',
            username: 'katyaAdmin',
            firstname: 'Katya',
            lastname: 'Ivanova',
            email: 'katyaAdmin@gmail.com',
            avatar: 'https://example.com/avatar7.jpg',
        },
        articleId: '41',
        rate: 5,
        id: '126',
    },
    {
        user: {
            id: 'd6RJwaIJmjbHTV2PdSg04DpPjWl1',
            username: 'johnManager',
            firstname: 'John',
            lastname: 'Doe',
            email: 'johnManager@gmail.com',
            avatar: 'https://example.com/avatar8.jpg',
        },
        articleId: '41',
        rate: 3,
        id: '127',
    },
    {
        user: {
            id: 'MqonEyICTeMapkAPyPFH7w1E5l52',
            username: 'annaUser',
            firstname: 'Anna',
            lastname: 'Koval',

            email: 'annaUser@gmail.com',

            avatar: 'https://example.com/avatar9.jpg',
        },
        articleId: '41',
        rate: 4,
        id: '128',
    },
    {
        user: {
            id: 'ObGe2X8MNTde2RSffQgE0Jpxek72',
            username: 'lucyAdmin',
            firstname: 'Lucy',
            lastname: 'Brown',

            email: 'lucyAdmin@gmail.com',

            avatar: 'https://example.com/avatar10.jpg',
        },
        articleId: '41',
        rate: 4,
        id: '129',
    },
    {
        user: {
            id: '4g1WI5M1XIZU6VKvIfJBG7TzMsD3',
            username: 'alexManager',
            firstname: 'Alex',
            lastname: 'Johnson',
            email: 'alexManager@gmail.com',
            avatar: 'https://example.com/avatar11.jpg',
        },
        articleId: '41',
        rate: 5,
        id: '130',
    },
    {
        user: {
            id: '4juq0tzGf5fNMCXCRFOa5mvFO5O2',
            username: 'leoUser',
            firstname: 'Leo',
            lastname: 'Mikhailov',

            email: 'leoUser@gmail.com',

            avatar: 'https://example.com/avatar12.jpg',
        },
        articleId: '41',
        rate: 3,
        id: '131',
    },
    {
        user: {
            id: '9Dpc2pFoeORLyQrxHlGIbe5wjbf2',
            username: 'janeAdmin',
            firstname: 'Jane',
            lastname: 'Williams',

            email: 'janeAdmin@gmail.com',

            avatar: 'https://example.com/avatar13.jpg',
        },
        articleId: '41',
        rate: 4,
        id: '132',
    },
    {
        user: {
            id: 'BrKES0pOcxcgYBUpKmZxBzqKFhl1',
            username: 'peterManager',
            firstname: 'Peter',
            lastname: 'Muller',

            email: 'peterManager@gmail.com',

            avatar: 'https://example.com/avatar14.jpg',
        },
        articleId: '41',
        rate: 4,
        id: '133',
    },
    {
        user: {
            id: 'Ue15ycXTpxVhCZ2eJoOVYaArKEa2',
            username: 'mariaUser',
            firstname: 'Maria',
            lastname: 'Petrova',

            email: 'mariaUser@gmail.com',

            avatar: 'https://example.com/avatar15.jpg',
        },
        articleId: '41',
        rate: 5,
        id: '134',
    },
    {
        user: {
            id: 'KXv8oUPLQeUXSzoXOWJV4nw47CG2',
            username: 'maxAdmin',
            firstname: 'Max',
            lastname: 'Gordon',

            email: 'maxAdmin@gmail.com',

            avatar: 'https://example.com/avatar16.jpg',
        },
        articleId: '41',
        rate: 3,
        id: '135',
    },
    {
        user: {
            id: '18zZBJnmEqWJNwGj2SvbNiNVXol1',
            username: 'nickManager',
            firstname: 'Nick',
            lastname: 'Garcia',

            email: 'nickManager@gmail.com',

            avatar: 'https://example.com/avatar17.jpg',
        },
        articleId: '41',
        rate: 4,
        id: '136',
    },
    {
        user: {
            id: 'mYX7XszmZJgEUSU9eeKDJYbP7P22',
            username: 'claraUser',
            firstname: 'Clara',
            lastname: 'Santos',

            email: 'claraUser@gmail.com',

            avatar: 'https://example.com/avatar18.jpg',
        },
        articleId: '41',
        rate: 4,
        id: '137',
    },
    {
        user: {
            id: 'Str49JTKBAOoaEhM8XeQLLLPPDp2',
            username: 'tomAdmin',
            firstname: 'Tom',
            lastname: 'Anderson',

            email: 'tomAdmin@gmail.com',

            avatar: 'https://example.com/avatar19.jpg',
        },
        articleId: '41',
        rate: 3,
        id: '138',
    },
    {
        user: {
            id: 'J3aB11HdHTZW6udzrrw2ymBhIOz1',
            username: 'mainAdmin',
            firstname: 'Maryna',
            lastname: 'Shavlak',
            email: 'mainAdmin@gmail.com',
            avatar: 'https://drive.google.com/thumbnail?id=1RD0jSAm8kdTLKa-Vr0daeE8T9-QcfPCa&sz=w1000',
        },
        articleId: '62',
        rate: 5,
        id: '139',
    },
    {
        user: {
            id: 'vvfdFnPQMLVkrnCBjsTZcPsUq9U2',
            username: 'mainUser',
            firstname: 'Tetiana',
            lastname: 'Shavlak',
            email: 'mainUser@gmail.com',
            avatar: 'https://drive.google.com/thumbnail?id=1J1xUPYYkJeOsBTpDuf36vsV7UfxlM2uG&sz=w1000',
        },
        articleId: '62',
        rate: 4,
        id: '140',
    },
    {
        user: {
            id: 'zM4UyVgfKNf2vrf5sXmBIxA5QOl2',
            username: 'mainManager',
            firstname: 'Maxim',
            lastname: 'Shavlak',
            email: 'mainManager@gmail.com',
            avatar: 'https://st3.depositphotos.com/1071184/13782/v/450/depositphotos_137825710-stock-illustration-business-person-analyzing-financial-statistics.jpg',
        },
        articleId: '62',
        rate: 5,
        feedback: 'Loved the depth of this article',
        id: '141',
    },
    {
        user: {
            id: 'nwPyI60mR9XWY3ozVuRGItx08PY2',
            username: 'testuser',
            firstname: 'Test',
            lastname: 'lastnameUser',

            email: 'testuser@gmail.com',

            avatar: 'https://s1.1zoom.ru/big3/992/367659-alexfas01.jpg',
        },
        articleId: '62',
        rate: 4,
        id: '142',
    },
    {
        user: {
            id: 'hdkjUiQhjoPIVMqfORNbvEHm4Wg1',
            username: 'testuser2',
            firstname: 'Test2',
            lastname: 'User2',

            email: 'testuser2@gmail.com',
            avatar: 'FRGDHJ',
        },
        articleId: '62',
        rate: 3,
        id: '143',
    },
    {
        user: {
            id: 'meuKZ9Dc5ucUuMn72esjwMi9Azl2',
            username: 'markUser',
            firstname: 'Mark',
            lastname: 'Smith',
            email: 'markUser@gmail.com',
            avatar: 'https://example.com/avatar6.png',
        },
        articleId: '62',
        rate: 4,
        id: '144',
    },
    {
        user: {
            id: 'tfs04ij0b5anHdw2qt6LghQsEfC3',
            username: 'katyaAdmin',
            firstname: 'Katya',
            lastname: 'Ivanova',
            email: 'katyaAdmin@gmail.com',
            avatar: 'https://example.com/avatar7.jpg',
        },
        articleId: '62',
        rate: 3,
        id: '145',
    },
    {
        user: {
            id: 'd6RJwaIJmjbHTV2PdSg04DpPjWl1',
            username: 'johnManager',
            firstname: 'John',
            lastname: 'Doe',
            email: 'johnManager@gmail.com',
            avatar: 'https://example.com/avatar8.jpg',
        },
        articleId: '62',
        rate: 4,
        id: '146',
    },
    {
        user: {
            id: 'MqonEyICTeMapkAPyPFH7w1E5l52',
            username: 'annaUser',
            firstname: 'Anna',
            lastname: 'Koval',

            email: 'annaUser@gmail.com',

            avatar: 'https://example.com/avatar9.jpg',
        },
        articleId: '62',
        rate: 5,
        id: '147',
    },
    {
        user: {
            id: 'ObGe2X8MNTde2RSffQgE0Jpxek72',
            username: 'lucyAdmin',
            firstname: 'Lucy',
            lastname: 'Brown',

            email: 'lucyAdmin@gmail.com',

            avatar: 'https://example.com/avatar10.jpg',
        },
        articleId: '62',
        rate: 4,
        id: '148',
    },
    {
        user: {
            id: '4g1WI5M1XIZU6VKvIfJBG7TzMsD3',
            username: 'alexManager',
            firstname: 'Alex',
            lastname: 'Johnson',
            email: 'alexManager@gmail.com',
            avatar: 'https://example.com/avatar11.jpg',
        },
        articleId: '62',
        rate: 3,
        id: '149',
    },
    {
        user: {
            id: '4juq0tzGf5fNMCXCRFOa5mvFO5O2',
            username: 'leoUser',
            firstname: 'Leo',
            lastname: 'Mikhailov',

            email: 'leoUser@gmail.com',

            avatar: 'https://example.com/avatar12.jpg',
        },
        articleId: '62',
        rate: 4,
        id: '150',
    },
    {
        user: {
            id: '9Dpc2pFoeORLyQrxHlGIbe5wjbf2',
            username: 'janeAdmin',
            firstname: 'Jane',
            lastname: 'Williams',

            email: 'janeAdmin@gmail.com',

            avatar: 'https://example.com/avatar13.jpg',
        },
        articleId: '62',
        rate: 5,
        feedback: 'In-depth and insightful',
        id: '151',
    },
    {
        user: {
            id: 'BrKES0pOcxcgYBUpKmZxBzqKFhl1',
            username: 'peterManager',
            firstname: 'Peter',
            lastname: 'Muller',

            email: 'peterManager@gmail.com',

            avatar: 'https://example.com/avatar14.jpg',
        },
        articleId: '62',
        rate: 3,
        id: '152',
    },
    {
        user: {
            id: 'Ue15ycXTpxVhCZ2eJoOVYaArKEa2',
            username: 'mariaUser',
            firstname: 'Maria',
            lastname: 'Petrova',

            email: 'mariaUser@gmail.com',

            avatar: 'https://example.com/avatar15.jpg',
        },
        articleId: '62',
        rate: 4,
        id: '153',
    },
    {
        user: {
            id: 'KXv8oUPLQeUXSzoXOWJV4nw47CG2',
            username: 'maxAdmin',
            firstname: 'Max',
            lastname: 'Gordon',

            email: 'maxAdmin@gmail.com',

            avatar: 'https://example.com/avatar16.jpg',
        },
        articleId: '62',
        rate: 5,
        id: '154',
    },
    {
        user: {
            id: '18zZBJnmEqWJNwGj2SvbNiNVXol1',
            username: 'nickManager',
            firstname: 'Nick',
            lastname: 'Garcia',

            email: 'nickManager@gmail.com',

            avatar: 'https://example.com/avatar17.jpg',
        },
        articleId: '62',
        rate: 4,
        id: '155',
    },
    {
        user: {
            id: 'mYX7XszmZJgEUSU9eeKDJYbP7P22',
            username: 'claraUser',
            firstname: 'Clara',
            lastname: 'Santos',

            email: 'claraUser@gmail.com',

            avatar: 'https://example.com/avatar18.jpg',
        },
        articleId: '62',
        rate: 4,
        id: '156',
    },
    {
        user: {
            id: 'Str49JTKBAOoaEhM8XeQLLLPPDp2',
            username: 'tomAdmin',
            firstname: 'Tom',
            lastname: 'Anderson',

            email: 'tomAdmin@gmail.com',

            avatar: 'https://example.com/avatar19.jpg',
        },
        articleId: '62',
        rate: 3,
        id: '157',
    },
    {
        user: {
            id: 'J3aB11HdHTZW6udzrrw2ymBhIOz1',
            username: 'mainAdmin',
            firstname: 'Maryna',
            lastname: 'Shavlak',
            email: 'mainAdmin@gmail.com',
            avatar: 'https://drive.google.com/thumbnail?id=1RD0jSAm8kdTLKa-Vr0daeE8T9-QcfPCa&sz=w1000',
        },
        articleId: '141',
        rate: 5,
        id: '158',
    },
    {
        user: {
            id: 'vvfdFnPQMLVkrnCBjsTZcPsUq9U2',
            username: 'mainUser',
            firstname: 'Tetiana',
            lastname: 'Shavlak',
            email: 'mainUser@gmail.com',
            avatar: 'https://drive.google.com/thumbnail?id=1J1xUPYYkJeOsBTpDuf36vsV7UfxlM2uG&sz=w1000',
        },
        articleId: '141',
        rate: 4,
        id: '159',
    },
    {
        user: {
            id: 'zM4UyVgfKNf2vrf5sXmBIxA5QOl2',
            username: 'mainManager',
            firstname: 'Maxim',
            lastname: 'Shavlak',
            email: 'mainManager@gmail.com',
            avatar: 'https://st3.depositphotos.com/1071184/13782/v/450/depositphotos_137825710-stock-illustration-business-person-analyzing-financial-statistics.jpg',
        },
        articleId: '141',
        rate: 5,
        id: '160',
    },
    {
        user: {
            id: 'nwPyI60mR9XWY3ozVuRGItx08PY2',
            username: 'testuser',
            firstname: 'Test',
            lastname: 'lastnameUser',

            email: 'testuser@gmail.com',

            avatar: 'https://s1.1zoom.ru/big3/992/367659-alexfas01.jpg',
        },
        articleId: '141',
        rate: 3,
        id: '161',
    },
    {
        user: {
            id: 'hdkjUiQhjoPIVMqfORNbvEHm4Wg1',
            username: 'testuser2',
            firstname: 'Test2',
            lastname: 'User2',

            email: 'testuser2@gmail.com',
            avatar: 'FRGDHJ',
        },
        articleId: '141',
        rate: 4,
        id: '162',
    },
    {
        user: {
            id: 'meuKZ9Dc5ucUuMn72esjwMi9Azl2',
            username: 'markUser',
            firstname: 'Mark',
            lastname: 'Smith',
            email: 'markUser@gmail.com',
            avatar: 'https://example.com/avatar6.png',
        },
        articleId: '141',
        rate: 4,
        id: '163',
    },
    {
        user: {
            id: 'tfs04ij0b5anHdw2qt6LghQsEfC3',
            username: 'katyaAdmin',
            firstname: 'Katya',
            lastname: 'Ivanova',
            email: 'katyaAdmin@gmail.com',
            avatar: 'https://example.com/avatar7.jpg',
        },
        articleId: '141',
        rate: 3,
        id: '164',
    },
    {
        user: {
            id: 'd6RJwaIJmjbHTV2PdSg04DpPjWl1',
            username: 'johnManager',
            firstname: 'John',
            lastname: 'Doe',
            email: 'johnManager@gmail.com',
            avatar: 'https://example.com/avatar8.jpg',
        },
        articleId: '141',
        rate: 4,
        id: '165',
    },
    {
        user: {
            id: 'MqonEyICTeMapkAPyPFH7w1E5l52',
            username: 'annaUser',
            firstname: 'Anna',
            lastname: 'Koval',

            email: 'annaUser@gmail.com',

            avatar: 'https://example.com/avatar9.jpg',
        },
        articleId: '141',
        rate: 5,
        id: '166',
    },
    {
        user: {
            id: 'ObGe2X8MNTde2RSffQgE0Jpxek72',
            username: 'lucyAdmin',
            firstname: 'Lucy',
            lastname: 'Brown',

            email: 'lucyAdmin@gmail.com',

            avatar: 'https://example.com/avatar10.jpg',
        },
        articleId: '141',
        rate: 4,
        id: '167',
    },
    {
        user: {
            id: '4g1WI5M1XIZU6VKvIfJBG7TzMsD3',
            username: 'alexManager',
            firstname: 'Alex',
            lastname: 'Johnson',
            email: 'alexManager@gmail.com',
            avatar: 'https://example.com/avatar11.jpg',
        },
        articleId: '141',
        rate: 4,
        id: '168',
    },
    {
        user: {
            id: '4juq0tzGf5fNMCXCRFOa5mvFO5O2',
            username: 'leoUser',
            firstname: 'Leo',
            lastname: 'Mikhailov',

            email: 'leoUser@gmail.com',

            avatar: 'https://example.com/avatar12.jpg',
        },
        articleId: '141',
        rate: 4,
        id: '169',
    },
    {
        user: {
            id: '9Dpc2pFoeORLyQrxHlGIbe5wjbf2',
            username: 'janeAdmin',
            firstname: 'Jane',
            lastname: 'Williams',

            email: 'janeAdmin@gmail.com',

            avatar: 'https://example.com/avatar13.jpg',
        },
        articleId: '141',
        rate: 5,
        id: '170',
    },
    {
        user: {
            id: 'BrKES0pOcxcgYBUpKmZxBzqKFhl1',
            username: 'peterManager',
            firstname: 'Peter',
            lastname: 'Muller',

            email: 'peterManager@gmail.com',

            avatar: 'https://example.com/avatar14.jpg',
        },
        articleId: '141',
        rate: 3,
        id: '171',
    },
    {
        user: {
            id: 'Ue15ycXTpxVhCZ2eJoOVYaArKEa2',
            username: 'mariaUser',
            firstname: 'Maria',
            lastname: 'Petrova',

            email: 'mariaUser@gmail.com',

            avatar: 'https://example.com/avatar15.jpg',
        },
        articleId: '141',
        rate: 4,
        id: '172',
    },
    {
        user: {
            id: 'KXv8oUPLQeUXSzoXOWJV4nw47CG2',
            username: 'maxAdmin',
            firstname: 'Max',
            lastname: 'Gordon',

            email: 'maxAdmin@gmail.com',

            avatar: 'https://example.com/avatar16.jpg',
        },
        articleId: '141',
        rate: 3,
        id: '173',
    },
    {
        user: {
            id: '18zZBJnmEqWJNwGj2SvbNiNVXol1',
            username: 'nickManager',
            firstname: 'Nick',
            lastname: 'Garcia',

            email: 'nickManager@gmail.com',

            avatar: 'https://example.com/avatar17.jpg',
        },
        articleId: '141',
        rate: 5,
        id: '174',
    },
    {
        user: {
            id: 'mYX7XszmZJgEUSU9eeKDJYbP7P22',
            username: 'claraUser',
            firstname: 'Clara',
            lastname: 'Santos',

            email: 'claraUser@gmail.com',

            avatar: 'https://example.com/avatar18.jpg',
        },
        articleId: '141',
        rate: 4,
        id: '175',
    },
    {
        user: {
            id: 'Str49JTKBAOoaEhM8XeQLLLPPDp2',
            username: 'tomAdmin',
            firstname: 'Tom',
            lastname: 'Anderson',

            email: 'tomAdmin@gmail.com',

            avatar: 'https://example.com/avatar19.jpg',
        },
        articleId: '141',
        rate: 3,
        id: '176',
    },
    {
        user: {
            id: 'J3aB11HdHTZW6udzrrw2ymBhIOz1',
            username: 'mainAdmin',
            firstname: 'Maryna',
            lastname: 'Shavlak',
            email: 'mainAdmin@gmail.com',
            avatar: 'https://drive.google.com/thumbnail?id=1RD0jSAm8kdTLKa-Vr0daeE8T9-QcfPCa&sz=w1000',
        },
        articleId: '172',
        rate: 5,
        feedback: 'Outstanding piece!',
        id: '177',
    },
    {
        user: {
            id: 'vvfdFnPQMLVkrnCBjsTZcPsUq9U2',
            username: 'mainUser',
            firstname: 'Tetiana',
            lastname: 'Shavlak',
            email: 'mainUser@gmail.com',
            avatar: 'https://drive.google.com/thumbnail?id=1J1xUPYYkJeOsBTpDuf36vsV7UfxlM2uG&sz=w1000',
        },
        articleId: '172',
        rate: 4,
        id: '178',
    },
    {
        user: {
            id: 'zM4UyVgfKNf2vrf5sXmBIxA5QOl2',
            username: 'mainManager',
            firstname: 'Maxim',
            lastname: 'Shavlak',
            email: 'mainManager@gmail.com',
            avatar: 'https://st3.depositphotos.com/1071184/13782/v/450/depositphotos_137825710-stock-illustration-business-person-analyzing-financial-statistics.jpg',
        },
        articleId: '172',
        rate: 4,
        id: '179',
    },
    {
        user: {
            id: 'nwPyI60mR9XWY3ozVuRGItx08PY2',
            username: 'testuser',
            firstname: 'Test',
            lastname: 'lastnameUser',

            email: 'testuser@gmail.com',

            avatar: 'https://s1.1zoom.ru/big3/992/367659-alexfas01.jpg',
        },
        articleId: '172',
        rate: 3,
        id: '180',
    },
    {
        user: {
            id: 'hdkjUiQhjoPIVMqfORNbvEHm4Wg1',
            username: 'testuser2',
            firstname: 'Test2',
            lastname: 'User2',

            email: 'testuser2@gmail.com',
            avatar: 'FRGDHJ',
        },
        articleId: '172',
        rate: 4,
        id: '181',
    },
    {
        user: {
            id: 'meuKZ9Dc5ucUuMn72esjwMi9Azl2',
            username: 'markUser',
            firstname: 'Mark',
            lastname: 'Smith',
            email: 'markUser@gmail.com',
            avatar: 'https://example.com/avatar6.png',
        },
        articleId: '172',
        rate: 5,
        id: '182',
    },
    {
        user: {
            id: 'tfs04ij0b5anHdw2qt6LghQsEfC3',
            username: 'katyaAdmin',
            firstname: 'Katya',
            lastname: 'Ivanova',
            email: 'katyaAdmin@gmail.com',
            avatar: 'https://example.com/avatar7.jpg',
        },
        articleId: '172',
        rate: 4,
        id: '183',
    },
    {
        user: {
            id: 'd6RJwaIJmjbHTV2PdSg04DpPjWl1',
            username: 'johnManager',
            firstname: 'John',
            lastname: 'Doe',
            email: 'johnManager@gmail.com',
            avatar: 'https://example.com/avatar8.jpg',
        },
        articleId: '172',
        rate: 3,
        id: '184',
    },
    {
        user: {
            id: 'MqonEyICTeMapkAPyPFH7w1E5l52',
            username: 'annaUser',
            firstname: 'Anna',
            lastname: 'Koval',

            email: 'annaUser@gmail.com',

            avatar: 'https://example.com/avatar9.jpg',
        },
        articleId: '172',
        rate: 4,
        id: '185',
    },
    {
        user: {
            id: 'ObGe2X8MNTde2RSffQgE0Jpxek72',
            username: 'lucyAdmin',
            firstname: 'Lucy',
            lastname: 'Brown',

            email: 'lucyAdmin@gmail.com',

            avatar: 'https://example.com/avatar10.jpg',
        },
        articleId: '172',
        rate: 5,
        id: '186',
    },
    {
        user: {
            id: '4g1WI5M1XIZU6VKvIfJBG7TzMsD3',
            username: 'alexManager',
            firstname: 'Alex',
            lastname: 'Johnson',
            email: 'alexManager@gmail.com',
            avatar: 'https://example.com/avatar11.jpg',
        },
        articleId: '172',
        rate: 4,
        id: '187',
    },
    {
        user: {
            id: '4juq0tzGf5fNMCXCRFOa5mvFO5O2',
            username: 'leoUser',
            firstname: 'Leo',
            lastname: 'Mikhailov',

            email: 'leoUser@gmail.com',

            avatar: 'https://example.com/avatar12.jpg',
        },
        articleId: '172',
        rate: 3,
        id: '188',
    },
    {
        user: {
            id: '9Dpc2pFoeORLyQrxHlGIbe5wjbf2',
            username: 'janeAdmin',
            firstname: 'Jane',
            lastname: 'Williams',

            email: 'janeAdmin@gmail.com',

            avatar: 'https://example.com/avatar13.jpg',
        },
        articleId: '172',
        rate: 5,
        feedback: 'Really good content!',
        id: '189',
    },
    {
        user: {
            id: 'BrKES0pOcxcgYBUpKmZxBzqKFhl1',
            username: 'peterManager',
            firstname: 'Peter',
            lastname: 'Muller',

            email: 'peterManager@gmail.com',

            avatar: 'https://example.com/avatar14.jpg',
        },
        articleId: '172',
        rate: 4,
        id: '190',
    },
    {
        user: {
            id: 'Ue15ycXTpxVhCZ2eJoOVYaArKEa2',
            username: 'mariaUser',
            firstname: 'Maria',
            lastname: 'Petrova',

            email: 'mariaUser@gmail.com',

            avatar: 'https://example.com/avatar15.jpg',
        },
        articleId: '172',
        rate: 3,
        id: '191',
    },
    {
        user: {
            id: 'KXv8oUPLQeUXSzoXOWJV4nw47CG2',
            username: 'maxAdmin',
            firstname: 'Max',
            lastname: 'Gordon',

            email: 'maxAdmin@gmail.com',

            avatar: 'https://example.com/avatar16.jpg',
        },
        articleId: '172',
        rate: 4,
        id: '192',
    },
    {
        user: {
            id: '18zZBJnmEqWJNwGj2SvbNiNVXol1',
            username: 'nickManager',
            firstname: 'Nick',
            lastname: 'Garcia',

            email: 'nickManager@gmail.com',

            avatar: 'https://example.com/avatar17.jpg',
        },
        articleId: '172',
        rate: 5,
        id: '193',
    },
    {
        user: {
            id: 'mYX7XszmZJgEUSU9eeKDJYbP7P22',
            username: 'claraUser',
            firstname: 'Clara',
            lastname: 'Santos',

            email: 'claraUser@gmail.com',

            avatar: 'https://example.com/avatar18.jpg',
        },
        articleId: '172',
        rate: 4,
        id: '194',
    },
    {
        user: {
            id: 'Str49JTKBAOoaEhM8XeQLLLPPDp2',
            username: 'tomAdmin',
            firstname: 'Tom',
            lastname: 'Anderson',

            email: 'tomAdmin@gmail.com',

            avatar: 'https://example.com/avatar19.jpg',
        },
        articleId: '172',
        rate: 3,
        id: '195',
    },
    {
        user: {
            id: 'vvfdFnPQMLVkrnCBjsTZcPsUq9U2',
            username: 'mainUser',
            firstname: 'Tetiana',
            lastname: 'Shavlak',
            email: 'mainUser@gmail.com',
            avatar: 'https://drive.google.com/thumbnail?id=1J1xUPYYkJeOsBTpDuf36vsV7UfxlM2uG&sz=w1000',
        },
        articleId: '38',
        rate: 5,
        feedback: 'Very informative and well-structured',
        id: '201',
    },
    {
        user: {
            id: 'zM4UyVgfKNf2vrf5sXmBIxA5QOl2',
            username: 'mainManager',
            firstname: 'Maxim',
            lastname: 'Shavlak',
            email: 'mainManager@gmail.com',
            avatar: 'https://st3.depositphotos.com/1071184/13782/v/450/depositphotos_137825710-stock-illustration-business-person-analyzing-financial-statistics.jpg',
        },
        articleId: '38',
        rate: 4,
        id: '202',
    },
    {
        user: {
            id: 'nwPyI60mR9XWY3ozVuRGItx08PY2',
            username: 'testuser',
            firstname: 'Test',
            lastname: 'lastnameUser',

            email: 'testuser@gmail.com',

            avatar: 'https://s1.1zoom.ru/big3/992/367659-alexfas01.jpg',
        },
        articleId: '38',
        rate: 3,
        id: '203',
    },
    {
        user: {
            id: 'hdkjUiQhjoPIVMqfORNbvEHm4Wg1',
            username: 'testuser2',
            firstname: 'Test2',
            lastname: 'User2',

            email: 'testuser2@gmail.com',
            avatar: 'FRGDHJ',
        },
        articleId: '38',
        rate: 4,
        feedback: 'Good overview, could use more examples',
        id: '204',
    },
    {
        user: {
            id: 'meuKZ9Dc5ucUuMn72esjwMi9Azl2',
            username: 'markUser',
            firstname: 'Mark',
            lastname: 'Smith',
            email: 'markUser@gmail.com',
            avatar: 'https://example.com/avatar6.png',
        },
        articleId: '38',
        rate: 5,
        id: '205',
    },
    {
        user: {
            id: 'tfs04ij0b5anHdw2qt6LghQsEfC3',
            username: 'katyaAdmin',
            firstname: 'Katya',
            lastname: 'Ivanova',
            email: 'katyaAdmin@gmail.com',
            avatar: 'https://example.com/avatar7.jpg',
        },
        articleId: '38',
        rate: 4,
        id: '206',
    },
    {
        user: {
            id: 'd6RJwaIJmjbHTV2PdSg04DpPjWl1',
            username: 'johnManager',
            firstname: 'John',
            lastname: 'Doe',
            email: 'johnManager@gmail.com',
            avatar: 'https://example.com/avatar8.jpg',
        },
        articleId: '38',
        rate: 4,
        id: '207',
    },
    {
        user: {
            id: 'MqonEyICTeMapkAPyPFH7w1E5l52',
            username: 'annaUser',
            firstname: 'Anna',
            lastname: 'Koval',

            email: 'annaUser@gmail.com',

            avatar: 'https://example.com/avatar9.jpg',
        },
        articleId: '38',
        rate: 5,
        id: '208',
    },
    {
        user: {
            id: 'ObGe2X8MNTde2RSffQgE0Jpxek72',
            username: 'lucyAdmin',
            firstname: 'Lucy',
            lastname: 'Brown',

            email: 'lucyAdmin@gmail.com',

            avatar: 'https://example.com/avatar10.jpg',
        },
        articleId: '38',
        rate: 3,
        id: '209',
    },
    {
        user: {
            id: 'vvfdFnPQMLVkrnCBjsTZcPsUq9U2',
            username: 'mainUser',
            firstname: 'Tetiana',
            lastname: 'Shavlak',
            email: 'mainUser@gmail.com',
            avatar: 'https://drive.google.com/thumbnail?id=1J1xUPYYkJeOsBTpDuf36vsV7UfxlM2uG&sz=w1000',
        },
        articleId: '39',
        rate: 4,
        id: '210',
    },
    {
        user: {
            id: 'zM4UyVgfKNf2vrf5sXmBIxA5QOl2',
            username: 'mainManager',
            firstname: 'Maxim',
            lastname: 'Shavlak',
            email: 'mainManager@gmail.com',
            avatar: 'https://st3.depositphotos.com/1071184/13782/v/450/depositphotos_137825710-stock-illustration-business-person-analyzing-financial-statistics.jpg',
        },
        articleId: '39',
        rate: 5,
        id: '211',
    },
    {
        user: {
            id: 'nwPyI60mR9XWY3ozVuRGItx08PY2',
            username: 'testuser',
            firstname: 'Test',
            lastname: 'lastnameUser',

            email: 'testuser@gmail.com',

            avatar: 'https://s1.1zoom.ru/big3/992/367659-alexfas01.jpg',
        },
        articleId: '39',
        rate: 4,
        id: '212',
    },
    {
        user: {
            id: 'hdkjUiQhjoPIVMqfORNbvEHm4Wg1',
            username: 'testuser2',
            firstname: 'Test2',
            lastname: 'User2',

            email: 'testuser2@gmail.com',
            avatar: 'FRGDHJ',
        },
        articleId: '39',
        rate: 3,
        id: '213',
    },
    {
        user: {
            id: 'meuKZ9Dc5ucUuMn72esjwMi9Azl2',
            username: 'markUser',
            firstname: 'Mark',
            lastname: 'Smith',
            email: 'markUser@gmail.com',
            avatar: 'https://example.com/avatar6.png',
        },
        articleId: '39',
        rate: 4,
        feedback: 'Well explained, clear examples',
        id: '214',
    },
    {
        user: {
            id: 'tfs04ij0b5anHdw2qt6LghQsEfC3',
            username: 'katyaAdmin',
            firstname: 'Katya',
            lastname: 'Ivanova',
            email: 'katyaAdmin@gmail.com',
            avatar: 'https://example.com/avatar7.jpg',
        },
        articleId: '39',
        rate: 5,
        id: '215',
    },
    {
        user: {
            id: 'd6RJwaIJmjbHTV2PdSg04DpPjWl1',
            username: 'johnManager',
            firstname: 'John',
            lastname: 'Doe',
            email: 'johnManager@gmail.com',
            avatar: 'https://example.com/avatar8.jpg',
        },
        articleId: '39',
        rate: 3,
        id: '216',
    },
    {
        user: {
            id: 'MqonEyICTeMapkAPyPFH7w1E5l52',
            username: 'annaUser',
            firstname: 'Anna',
            lastname: 'Koval',

            email: 'annaUser@gmail.com',

            avatar: 'https://example.com/avatar9.jpg',
        },
        articleId: '39',
        rate: 5,
        id: '217',
    },
    {
        user: {
            id: 'ObGe2X8MNTde2RSffQgE0Jpxek72',
            username: 'lucyAdmin',
            firstname: 'Lucy',
            lastname: 'Brown',

            email: 'lucyAdmin@gmail.com',

            avatar: 'https://example.com/avatar10.jpg',
        },
        articleId: '39',
        rate: 4,
        feedback: 'Great insights, could cover more edge cases',
        id: '218',
    },
    {
        user: {
            id: 'vvfdFnPQMLVkrnCBjsTZcPsUq9U2',
            username: 'mainUser',
            firstname: 'Tetiana',
            lastname: 'Shavlak',
            email: 'mainUser@gmail.com',
            avatar: 'https://drive.google.com/thumbnail?id=1J1xUPYYkJeOsBTpDuf36vsV7UfxlM2uG&sz=w1000',
        },
        articleId: '61',
        rate: 4,
        id: '219',
    },
    {
        user: {
            id: 'zM4UyVgfKNf2vrf5sXmBIxA5QOl2',
            username: 'mainManager',
            firstname: 'Maxim',
            lastname: 'Shavlak',
            email: 'mainManager@gmail.com',
            avatar: 'https://st3.depositphotos.com/1071184/13782/v/450/depositphotos_137825710-stock-illustration-business-person-analyzing-financial-statistics.jpg',
        },
        articleId: '61',
        rate: 5,
        feedback: 'One of the best articles on this topic!',
        id: '220',
    },
    {
        user: {
            id: 'nwPyI60mR9XWY3ozVuRGItx08PY2',
            username: 'testuser',
            firstname: 'Test',
            lastname: 'lastnameUser',

            email: 'testuser@gmail.com',

            avatar: 'https://s1.1zoom.ru/big3/992/367659-alexfas01.jpg',
        },
        articleId: '61',
        rate: 4,
        id: '221',
    },
    {
        user: {
            id: 'hdkjUiQhjoPIVMqfORNbvEHm4Wg1',
            username: 'testuser2',
            firstname: 'Test2',
            lastname: 'User2',

            email: 'testuser2@gmail.com',
            avatar: 'FRGDHJ',
        },
        articleId: '61',
        rate: 3,
        id: '222',
    },
    {
        user: {
            id: 'meuKZ9Dc5ucUuMn72esjwMi9Azl2',
            username: 'markUser',
            firstname: 'Mark',
            lastname: 'Smith',
            email: 'markUser@gmail.com',
            avatar: 'https://example.com/avatar6.png',
        },
        articleId: '61',
        rate: 5,
        id: '223',
    },
    {
        user: {
            id: 'tfs04ij0b5anHdw2qt6LghQsEfC3',
            username: 'katyaAdmin',
            firstname: 'Katya',
            lastname: 'Ivanova',
            email: 'katyaAdmin@gmail.com',
            avatar: 'https://example.com/avatar7.jpg',
        },
        articleId: '61',
        rate: 4,
        id: '224',
    },
    {
        user: {
            id: 'd6RJwaIJmjbHTV2PdSg04DpPjWl1',
            username: 'johnManager',
            firstname: 'John',
            lastname: 'Doe',
            email: 'johnManager@gmail.com',
            avatar: 'https://example.com/avatar8.jpg',
        },
        articleId: '61',
        rate: 4,
        feedback: 'Solid article, well done',
        id: '225',
    },
    {
        user: {
            id: 'MqonEyICTeMapkAPyPFH7w1E5l52',
            username: 'annaUser',
            firstname: 'Anna',
            lastname: 'Koval',

            email: 'annaUser@gmail.com',

            avatar: 'https://example.com/avatar9.jpg',
        },
        articleId: '61',
        rate: 3,
        id: '226',
    },
    {
        user: {
            id: 'ObGe2X8MNTde2RSffQgE0Jpxek72',
            username: 'lucyAdmin',
            firstname: 'Lucy',
            lastname: 'Brown',

            email: 'lucyAdmin@gmail.com',

            avatar: 'https://example.com/avatar10.jpg',
        },
        articleId: '61',
        rate: 4,
        id: '227',
    },
    {
        user: {
            id: 'vvfdFnPQMLVkrnCBjsTZcPsUq9U2',
            username: 'mainUser',
            firstname: 'Tetiana',
            lastname: 'Shavlak',
            email: 'mainUser@gmail.com',
            avatar: 'https://drive.google.com/thumbnail?id=1J1xUPYYkJeOsBTpDuf36vsV7UfxlM2uG&sz=w1000',
        },
        articleId: '105',
        rate: 5,
        feedback: 'Excellent depth of coverage',
        id: '228',
    },
    {
        user: {
            id: 'zM4UyVgfKNf2vrf5sXmBIxA5QOl2',
            username: 'mainManager',
            firstname: 'Maxim',
            lastname: 'Shavlak',
            email: 'mainManager@gmail.com',
            avatar: 'https://st3.depositphotos.com/1071184/13782/v/450/depositphotos_137825710-stock-illustration-business-person-analyzing-financial-statistics.jpg',
        },
        articleId: '105',
        rate: 4,
        id: '229',
    },
    {
        user: {
            id: 'nwPyI60mR9XWY3ozVuRGItx08PY2',
            username: 'testuser',
            firstname: 'Test',
            lastname: 'lastnameUser',

            email: 'testuser@gmail.com',

            avatar: 'https://s1.1zoom.ru/big3/992/367659-alexfas01.jpg',
        },
        articleId: '105',
        rate: 4,
        id: '230',
    },
    {
        user: {
            id: 'hdkjUiQhjoPIVMqfORNbvEHm4Wg1',
            username: 'testuser2',
            firstname: 'Test2',
            lastname: 'User2',

            email: 'testuser2@gmail.com',
            avatar: 'FRGDHJ',
        },
        articleId: '105',
        rate: 3,
        id: '231',
    },
    {
        user: {
            id: 'meuKZ9Dc5ucUuMn72esjwMi9Azl2',
            username: 'markUser',
            firstname: 'Mark',
            lastname: 'Smith',
            email: 'markUser@gmail.com',
            avatar: 'https://example.com/avatar6.png',
        },
        articleId: '105',
        rate: 4,
        id: '232',
    },
    {
        user: {
            id: 'tfs04ij0b5anHdw2qt6LghQsEfC3',
            username: 'katyaAdmin',
            firstname: 'Katya',
            lastname: 'Ivanova',
            email: 'katyaAdmin@gmail.com',
            avatar: 'https://example.com/avatar7.jpg',
        },
        articleId: '105',
        rate: 5,
        id: '233',
    },
    {
        user: {
            id: 'd6RJwaIJmjbHTV2PdSg04DpPjWl1',
            username: 'johnManager',
            firstname: 'John',
            lastname: 'Doe',
            email: 'johnManager@gmail.com',
            avatar: 'https://example.com/avatar8.jpg',
        },
        articleId: '105',
        rate: 4,
        id: '234',
    },
    {
        user: {
            id: 'MqonEyICTeMapkAPyPFH7w1E5l52',
            username: 'annaUser',
            firstname: 'Anna',
            lastname: 'Koval',

            email: 'annaUser@gmail.com',

            avatar: 'https://example.com/avatar9.jpg',
        },
        articleId: '105',
        rate: 4,
        id: '235',
    },
    {
        user: {
            id: 'ObGe2X8MNTde2RSffQgE0Jpxek72',
            username: 'lucyAdmin',
            firstname: 'Lucy',
            lastname: 'Brown',

            email: 'lucyAdmin@gmail.com',

            avatar: 'https://example.com/avatar10.jpg',
        },
        articleId: '105',
        rate: 3,
        id: '236',
    },
    {
        user: {
            id: '4g1WI5M1XIZU6VKvIfJBG7TzMsD3',
            username: 'alexManager',
            firstname: 'Alex',
            lastname: 'Johnson',
            email: 'alexManager@gmail.com',
            avatar: 'https://example.com/avatar11.jpg',
        },
        articleId: '37',
        rate: 5,
        feedback: 'Excellent explanation and very detailed. Helped me a lot!',
        id: '237',
    },
    {
        user: {
            id: '4juq0tzGf5fNMCXCRFOa5mvFO5O2',
            username: 'leoUser',
            firstname: 'Leo',
            lastname: 'Mikhailov',

            email: 'leoUser@gmail.com',

            avatar: 'https://example.com/avatar12.jpg',
        },
        articleId: '37',
        rate: 4,
        feedback:
            'Great article, clear and concise. Could include more examples.',
        id: '238',
    },
    {
        user: {
            id: '9Dpc2pFoeORLyQrxHlGIbe5wjbf2',
            username: 'janeAdmin',
            firstname: 'Jane',
            lastname: 'Williams',

            email: 'janeAdmin@gmail.com',

            avatar: 'https://example.com/avatar13.jpg',
        },
        articleId: '37',
        rate: 5,
        feedback: 'Well-written and informative, definitely a must-read!',
        id: '239',
    },
    {
        user: {
            id: 'BrKES0pOcxcgYBUpKmZxBzqKFhl1',
            username: 'peterManager',
            firstname: 'Peter',
            lastname: 'Muller',

            email: 'peterManager@gmail.com',

            avatar: 'https://example.com/avatar14.jpg',
        },
        articleId: '37',
        rate: 4,
        feedback: 'Very useful content, but a bit advanced for beginners.',
        id: '240',
    },
    {
        user: {
            id: 'Ue15ycXTpxVhCZ2eJoOVYaArKEa2',
            username: 'mariaUser',
            firstname: 'Maria',
            lastname: 'Petrova',

            email: 'mariaUser@gmail.com',

            avatar: 'https://example.com/avatar15.jpg',
        },
        articleId: '37',
        rate: 5,
        feedback:
            'Superb article, provided great insights and helped improve my code.',
        id: '241',
    },
    {
        user: {
            id: 'KXv8oUPLQeUXSzoXOWJV4nw47CG2',
            username: 'maxAdmin',
            firstname: 'Max',
            lastname: 'Gordon',

            email: 'maxAdmin@gmail.com',

            avatar: 'https://example.com/avatar16.jpg',
        },
        articleId: '60',
        rate: 5,
        feedback:
            'Brilliant! The concepts are well explained with solid examples.',
        id: '242',
    },
    {
        user: {
            id: '18zZBJnmEqWJNwGj2SvbNiNVXol1',
            username: 'nickManager',
            firstname: 'Nick',
            lastname: 'Garcia',

            email: 'nickManager@gmail.com',

            avatar: 'https://example.com/avatar17.jpg',
        },
        articleId: '60',
        rate: 4,
        feedback:
            'Very clear and insightful. Would love to see more practical applications.',
        id: '243',
    },
    {
        user: {
            id: '4g1WI5M1XIZU6VKvIfJBG7TzMsD3',
            username: 'alexManager',
            firstname: 'Alex',
            lastname: 'Johnson',
            email: 'alexManager@gmail.com',
            avatar: 'https://example.com/avatar11.jpg',
        },
        articleId: '60',
        rate: 5,
        feedback:
            'Loved the structure of the article. Easy to follow and informative.',
        id: '244',
    },
    {
        user: {
            id: '4juq0tzGf5fNMCXCRFOa5mvFO5O2',
            username: 'leoUser',
            firstname: 'Leo',
            lastname: 'Mikhailov',

            email: 'leoUser@gmail.com',

            avatar: 'https://example.com/avatar12.jpg',
        },
        articleId: '60',
        rate: 4,
        feedback:
            'Good article, helped clarify some tough concepts. Could use more depth in some areas.',
        id: '245',
    },
    {
        user: {
            id: '9Dpc2pFoeORLyQrxHlGIbe5wjbf2',
            username: 'janeAdmin',
            firstname: 'Jane',
            lastname: 'Williams',

            email: 'janeAdmin@gmail.com',

            avatar: 'https://example.com/avatar13.jpg',
        },
        articleId: '104',
        rate: 5,
        feedback:
            'Fantastic explanation! One of the best articles on this topic I’ve read.',
        id: '246',
    },
    {
        user: {
            id: 'BrKES0pOcxcgYBUpKmZxBzqKFhl1',
            username: 'peterManager',
            firstname: 'Peter',
            lastname: 'Muller',

            email: 'peterManager@gmail.com',

            avatar: 'https://example.com/avatar14.jpg',
        },
        articleId: '104',
        rate: 4,
        feedback:
            'Good read, very helpful for understanding advanced concepts.',
        id: '247',
    },
    {
        user: {
            id: 'Ue15ycXTpxVhCZ2eJoOVYaArKEa2',
            username: 'mariaUser',
            firstname: 'Maria',
            lastname: 'Petrova',

            email: 'mariaUser@gmail.com',

            avatar: 'https://example.com/avatar15.jpg',
        },
        articleId: '104',
        rate: 5,
        feedback: 'Extremely useful and well-explained. Highly recommended!',
        id: '248',
    },
    {
        user: {
            id: 'KXv8oUPLQeUXSzoXOWJV4nw47CG2',
            username: 'maxAdmin',
            firstname: 'Max',
            lastname: 'Gordon',

            email: 'maxAdmin@gmail.com',

            avatar: 'https://example.com/avatar16.jpg',
        },
        articleId: '104',
        rate: 5,
        feedback: 'Clear, concise, and to the point. Great job!',
        id: '249',
    },
    {
        user: {
            id: '18zZBJnmEqWJNwGj2SvbNiNVXol1',
            username: 'nickManager',
            firstname: 'Nick',
            lastname: 'Garcia',

            email: 'nickManager@gmail.com',

            avatar: 'https://example.com/avatar17.jpg',
        },
        articleId: '120',
        rate: 5,
        feedback:
            'Top-notch article with great examples. Really helped me understand the topic.',
        id: '250',
    },
    {
        user: {
            id: '4g1WI5M1XIZU6VKvIfJBG7TzMsD3',
            username: 'alexManager',
            firstname: 'Alex',
            lastname: 'Johnson',
            email: 'alexManager@gmail.com',
            avatar: 'https://example.com/avatar11.jpg',
        },
        articleId: '120',
        rate: 4,
        feedback:
            'Well-written and easy to grasp. Would love more real-world applications.',
        id: '251',
    },
    {
        user: {
            id: '4juq0tzGf5fNMCXCRFOa5mvFO5O2',
            username: 'leoUser',
            firstname: 'Leo',
            lastname: 'Mikhailov',

            email: 'leoUser@gmail.com',

            avatar: 'https://example.com/avatar12.jpg',
        },
        articleId: '120',
        rate: 5,
        feedback:
            'Really insightful and clear explanations. Great for learners!',
        id: '252',
    },
    {
        user: {
            id: '9Dpc2pFoeORLyQrxHlGIbe5wjbf2',
            username: 'janeAdmin',
            firstname: 'Jane',
            lastname: 'Williams',

            email: 'janeAdmin@gmail.com',

            avatar: 'https://example.com/avatar13.jpg',
        },
        articleId: '139',
        rate: 5,
        feedback: 'A solid article with well-presented information. Loved it!',
        id: '253',
    },
    {
        user: {
            id: 'BrKES0pOcxcgYBUpKmZxBzqKFhl1',
            username: 'peterManager',
            firstname: 'Peter',
            lastname: 'Muller',

            email: 'peterManager@gmail.com',

            avatar: 'https://example.com/avatar14.jpg',
        },
        articleId: '139',
        rate: 5,
        feedback:
            'Great article! The explanations are very thorough and useful.',
        id: '254',
    },
    {
        user: {
            id: 'Ue15ycXTpxVhCZ2eJoOVYaArKEa2',
            username: 'mariaUser',
            firstname: 'Maria',
            lastname: 'Petrova',

            email: 'mariaUser@gmail.com',

            avatar: 'https://example.com/avatar15.jpg',
        },
        articleId: '139',
        rate: 4,
        feedback:
            'Very well-written and easy to follow. A bit more detail would be nice.',
        id: '255',
    },
    {
        user: {
            id: 'KXv8oUPLQeUXSzoXOWJV4nw47CG2',
            username: 'maxAdmin',
            firstname: 'Max',
            lastname: 'Gordon',

            email: 'maxAdmin@gmail.com',

            avatar: 'https://example.com/avatar16.jpg',
        },
        articleId: '139',
        rate: 5,
        feedback:
            'An amazing resource for this topic. Clear and comprehensive.',
        id: '256',
    },
    {
        user: {
            id: 'mYX7XszmZJgEUSU9eeKDJYbP7P22',
            username: 'claraUser',
            firstname: 'Clara',
            lastname: 'Santos',

            email: 'claraUser@gmail.com',

            avatar: 'https://example.com/avatar18.jpg',
        },
        articleId: '34',
        rate: 1,
        feedback:
            'The article lacks clarity and proper examples. Hard to follow.',
        id: '257',
    },
    {
        user: {
            id: 'Str49JTKBAOoaEhM8XeQLLLPPDp2',
            username: 'tomAdmin',
            firstname: 'Tom',
            lastname: 'Anderson',

            email: 'tomAdmin@gmail.com',

            avatar: 'https://example.com/avatar19.jpg',
        },
        articleId: '34',
        rate: 2,
        feedback: 'Not well-structured. The explanations are too vague.',
        id: '258',
    },
    {
        user: {
            id: 'qkcVyIbnjYeEbaYVKGhtZrny7GC3',
            username: 'sarahManager',
            firstname: 'Sarah',
            lastname: 'Cooper',

            email: 'sarahManager@gmail.com',

            avatar: 'https://example.com/avatar20.jpg',
        },
        articleId: '34',
        rate: 1,
        feedback:
            'Poorly written and difficult to understand. Needs a lot of improvement.',
        id: '259',
    },
    {
        user: {
            id: 'mYX7XszmZJgEUSU9eeKDJYbP7P22',
            username: 'claraUser',
            firstname: 'Clara',
            lastname: 'Santos',

            email: 'claraUser@gmail.com',

            avatar: 'https://example.com/avatar18.jpg',
        },
        articleId: '35',
        rate: 2,
        feedback:
            "The content is shallow and doesn't cover the topic in-depth.",
        id: '260',
    },
    {
        user: {
            id: 'Str49JTKBAOoaEhM8XeQLLLPPDp2',
            username: 'tomAdmin',
            firstname: 'Tom',
            lastname: 'Anderson',

            email: 'tomAdmin@gmail.com',

            avatar: 'https://example.com/avatar19.jpg',
        },
        articleId: '35',
        rate: 1,
        feedback: 'Disappointing. The article barely scratches the surface.',
        id: '261',
    },
    {
        user: {
            id: 'qkcVyIbnjYeEbaYVKGhtZrny7GC3',
            username: 'sarahManager',
            firstname: 'Sarah',
            lastname: 'Cooper',

            email: 'sarahManager@gmail.com',

            avatar: 'https://example.com/avatar20.jpg',
        },
        articleId: '35',
        rate: 1,
        feedback: 'Incomplete and poorly researched. Lacks useful information.',
        id: '262',
    },
    {
        user: {
            id: 'mYX7XszmZJgEUSU9eeKDJYbP7P22',
            username: 'claraUser',
            firstname: 'Clara',
            lastname: 'Santos',

            email: 'claraUser@gmail.com',

            avatar: 'https://example.com/avatar18.jpg',
        },
        articleId: '59',
        rate: 2,
        feedback:
            'The article is overly simplified. Needs more depth and examples.',
        id: '263',
    },
    {
        user: {
            id: 'Str49JTKBAOoaEhM8XeQLLLPPDp2',
            username: 'tomAdmin',
            firstname: 'Tom',
            lastname: 'Anderson',

            email: 'tomAdmin@gmail.com',

            avatar: 'https://example.com/avatar19.jpg',
        },
        articleId: '59',
        rate: 1,
        feedback: 'Not informative enough. The points are too general.',
        id: '264',
    },
    {
        user: {
            id: 'qkcVyIbnjYeEbaYVKGhtZrny7GC3',
            username: 'sarahManager',
            firstname: 'Sarah',
            lastname: 'Cooper',

            email: 'sarahManager@gmail.com',

            avatar: 'https://example.com/avatar20.jpg',
        },
        articleId: '59',
        rate: 2,
        feedback:
            'The article leaves a lot of questions unanswered. Needs improvement.',
        id: '265',
    },
    {
        user: {
            id: 'J3aB11HdHTZW6udzrrw2ymBhIOz1',
            username: 'mainAdmin',
            firstname: 'Maryna',
            lastname: 'Shavlak',
            email: 'mainAdmin@gmail.com',
            avatar: 'https://drive.google.com/thumbnail?id=1RD0jSAm8kdTLKa-Vr0daeE8T9-QcfPCa&sz=w1000',
        },
        articleId: '118',
        rate: 4,
        feedback:
            'Well-written, but could use more examples to clarify key points.',
        id: '266',
    },
    {
        user: {
            id: 'vvfdFnPQMLVkrnCBjsTZcPsUq9U2',
            username: 'mainUser',
            firstname: 'Tetiana',
            lastname: 'Shavlak',
            email: 'mainUser@gmail.com',
            avatar: 'https://drive.google.com/thumbnail?id=1J1xUPYYkJeOsBTpDuf36vsV7UfxlM2uG&sz=w1000',
        },
        articleId: '118',
        rate: 3,
        feedback: 'Good article overall, but lacks depth in some areas.',
        id: '267',
    },
    {
        user: {
            id: 'zM4UyVgfKNf2vrf5sXmBIxA5QOl2',
            username: 'mainManager',
            firstname: 'Maxim',
            lastname: 'Shavlak',
            email: 'mainManager@gmail.com',
            avatar: 'https://st3.depositphotos.com/1071184/13782/v/450/depositphotos_137825710-stock-illustration-business-person-analyzing-financial-statistics.jpg',
        },
        articleId: '118',
        rate: 4,
        feedback: 'Solid content, but a bit more detail would make it great.',
        id: '268',
    },
    {
        user: {
            id: 'J3aB11HdHTZW6udzrrw2ymBhIOz1',
            username: 'mainAdmin',
            firstname: 'Maryna',
            lastname: 'Shavlak',
            email: 'mainAdmin@gmail.com',
            avatar: 'https://drive.google.com/thumbnail?id=1RD0jSAm8kdTLKa-Vr0daeE8T9-QcfPCa&sz=w1000',
        },
        articleId: '131',
        rate: 3,
        feedback:
            "Decent article, but it doesn't cover all aspects of the topic.",
        id: '269',
    },
    {
        user: {
            id: 'vvfdFnPQMLVkrnCBjsTZcPsUq9U2',
            username: 'mainUser',
            firstname: 'Tetiana',
            lastname: 'Shavlak',
            email: 'mainUser@gmail.com',
            avatar: 'https://drive.google.com/thumbnail?id=1J1xUPYYkJeOsBTpDuf36vsV7UfxlM2uG&sz=w1000',
        },
        articleId: '131',
        rate: 4,
        feedback:
            'Good structure and flow, but more examples would be helpful.',
        id: '270',
    },
    {
        user: {
            id: 'zM4UyVgfKNf2vrf5sXmBIxA5QOl2',
            username: 'mainManager',
            firstname: 'Maxim',
            lastname: 'Shavlak',
            email: 'mainManager@gmail.com',
            avatar: 'https://st3.depositphotos.com/1071184/13782/v/450/depositphotos_137825710-stock-illustration-business-person-analyzing-financial-statistics.jpg',
        },
        articleId: '131',
        rate: 3,
        id: '271',
    },
    {
        user: {
            id: 'zM4UyVgfKNf2vrf5sXmBIxA5QOl2',
            username: 'mainManager',
            firstname: 'Maxim',
            lastname: 'Shavlak',
            email: 'mainManager@gmail.com',
            avatar: 'https://st3.depositphotos.com/1071184/13782/v/450/depositphotos_137825710-stock-illustration-business-person-analyzing-financial-statistics.jpg',
        },
        articleId: '30',
        rate: 5,
        feedback: 'Excellent explanation with detailed examples, very helpful.',
        id: '272',
    },
    {
        user: {
            id: 'nwPyI60mR9XWY3ozVuRGItx08PY2',
            username: 'testuser',
            firstname: 'Test',
            lastname: 'lastnameUser',

            email: 'testuser@gmail.com',

            avatar: 'https://s1.1zoom.ru/big3/992/367659-alexfas01.jpg',
        },
        articleId: '30',
        rate: 3,
        feedback:
            'The article is okay, but could benefit from more real-world examples.',
        id: '273',
    },
    {
        user: {
            id: 'hdkjUiQhjoPIVMqfORNbvEHm4Wg1',
            username: 'testuser2',
            firstname: 'Test2',
            lastname: 'User2',

            email: 'testuser2@gmail.com',
            avatar: 'FRGDHJ',
        },
        articleId: '30',
        rate: 4,
        feedback: 'Good content, but some sections need more clarity.',
        id: '274',
    },
    {
        user: {
            id: 'meuKZ9Dc5ucUuMn72esjwMi9Azl2',
            username: 'markUser',
            firstname: 'Mark',
            lastname: 'Smith',
            email: 'markUser@gmail.com',
            avatar: 'https://example.com/avatar6.png',
        },
        articleId: '30',
        rate: 2,
        feedback: 'The article was too brief and lacked in-depth explanations.',
        id: '275',
    },
    {
        user: {
            id: 'tfs04ij0b5anHdw2qt6LghQsEfC3',
            username: 'katyaAdmin',
            firstname: 'Katya',
            lastname: 'Ivanova',
            email: 'katyaAdmin@gmail.com',
            avatar: 'https://example.com/avatar7.jpg',
        },
        articleId: '30',
        rate: 5,
        feedback: 'Really insightful, covers the topic thoroughly.',
        id: '276',
    },
    {
        user: {
            id: 'zM4UyVgfKNf2vrf5sXmBIxA5QOl2',
            username: 'mainManager',
            firstname: 'Maxim',
            lastname: 'Shavlak',
            email: 'mainManager@gmail.com',
            avatar: 'https://st3.depositphotos.com/1071184/13782/v/450/depositphotos_137825710-stock-illustration-business-person-analyzing-financial-statistics.jpg',
        },
        articleId: '31',
        rate: 4,
        feedback:
            'Great article, but a few sections could use more elaboration.',
        id: '277',
    },
    {
        user: {
            id: 'nwPyI60mR9XWY3ozVuRGItx08PY2',
            username: 'testuser',
            firstname: 'Test',
            lastname: 'lastnameUser',

            email: 'testuser@gmail.com',

            avatar: 'https://s1.1zoom.ru/big3/992/367659-alexfas01.jpg',
        },
        articleId: '31',
        rate: 5,
        feedback: 'Very well-written and easy to understand, excellent job!',
        id: '278',
    },
    {
        user: {
            id: 'hdkjUiQhjoPIVMqfORNbvEHm4Wg1',
            username: 'testuser2',
            firstname: 'Test2',
            lastname: 'User2',

            email: 'testuser2@gmail.com',
            avatar: 'FRGDHJ',
        },
        articleId: '31',
        rate: 3,
        feedback: 'Not bad, but I feel it missed some key points.',
        id: '279',
    },
    {
        user: {
            id: 'meuKZ9Dc5ucUuMn72esjwMi9Azl2',
            username: 'markUser',
            firstname: 'Mark',
            lastname: 'Smith',
            email: 'markUser@gmail.com',
            avatar: 'https://example.com/avatar6.png',
        },
        articleId: '31',
        rate: 2,
        feedback: "Too basic, didn't provide enough depth on the subject.",
        id: '280',
    },
    {
        user: {
            id: 'tfs04ij0b5anHdw2qt6LghQsEfC3',
            username: 'katyaAdmin',
            firstname: 'Katya',
            lastname: 'Ivanova',
            email: 'katyaAdmin@gmail.com',
            avatar: 'https://example.com/avatar7.jpg',
        },
        articleId: '31',
        rate: 4,
        feedback: 'Solid article, useful for getting a quick overview.',
        id: '281',
    },
    {
        user: {
            id: 'hdkjUiQhjoPIVMqfORNbvEHm4Wg1',
            username: 'testuser2',
            firstname: 'Test2',
            lastname: 'User2',

            email: 'testuser2@gmail.com',
            avatar: 'FRGDHJ',
        },
        articleId: '56',
        rate: 4,
        feedback: 'Great insights, but some sections could use more examples.',
        id: '282',
    },
    {
        user: {
            id: 'meuKZ9Dc5ucUuMn72esjwMi9Azl2',
            username: 'markUser',
            firstname: 'Mark',
            lastname: 'Smith',
            email: 'markUser@gmail.com',
            avatar: 'https://example.com/avatar6.png',
        },
        articleId: '56',
        rate: 4,
        feedback: 'Well-written article, enjoyed the clarity of explanation.',
        id: '283',
    },
    {
        user: {
            id: 'hdkjUiQhjoPIVMqfORNbvEHm4Wg1',
            username: 'testuser2',
            firstname: 'Test2',
            lastname: 'User2',

            email: 'testuser2@gmail.com',
            avatar: 'FRGDHJ',
        },
        articleId: '88',
        rate: 4,
        feedback: 'Informative, but could be more detailed in certain areas.',
        id: '284',
    },
    {
        user: {
            id: 'meuKZ9Dc5ucUuMn72esjwMi9Azl2',
            username: 'markUser',
            firstname: 'Mark',
            lastname: 'Smith',
            email: 'markUser@gmail.com',
            avatar: 'https://example.com/avatar6.png',
        },
        articleId: '88',
        rate: 4,
        feedback: 'Solid content, found it useful for understanding the topic.',
        id: '285',
    },
    {
        user: {
            id: 'hdkjUiQhjoPIVMqfORNbvEHm4Wg1',
            username: 'testuser2',
            firstname: 'Test2',
            lastname: 'User2',

            email: 'testuser2@gmail.com',
            avatar: 'FRGDHJ',
        },
        articleId: '100',
        rate: 4,
        feedback: 'Nice overview, but I expected more depth.',
        id: '286',
    },
    {
        user: {
            id: 'meuKZ9Dc5ucUuMn72esjwMi9Azl2',
            username: 'markUser',
            firstname: 'Mark',
            lastname: 'Smith',
            email: 'markUser@gmail.com',
            avatar: 'https://example.com/avatar6.png',
        },
        articleId: '100',
        rate: 4,
        feedback:
            'Good article, but it could benefit from additional examples.',
        id: '287',
    },
    {
        user: {
            id: 'J3aB11HdHTZW6udzrrw2ymBhIOz1',
            username: 'mainAdmin',
            firstname: 'Maryna',
            lastname: 'Shavlak',
            email: 'mainAdmin@gmail.com',
            avatar: 'https://drive.google.com/thumbnail?id=1RD0jSAm8kdTLKa-Vr0daeE8T9-QcfPCa&sz=w1000',
        },
        articleId: '16',
        rate: 4,
        feedback: 'Very insightful article, learned a lot!',
        id: '288',
    },
    {
        user: {
            id: 'vvfdFnPQMLVkrnCBjsTZcPsUq9U2',
            username: 'mainUser',
            firstname: 'Tetiana',
            lastname: 'Shavlak',
            email: 'mainUser@gmail.com',
            avatar: 'https://drive.google.com/thumbnail?id=1J1xUPYYkJeOsBTpDuf36vsV7UfxlM2uG&sz=w1000',
        },
        articleId: '16',
        rate: 3,
        feedback: 'Good information, but it could be clearer.',
        id: '289',
    },
    {
        user: {
            id: 'zM4UyVgfKNf2vrf5sXmBIxA5QOl2',
            username: 'mainManager',
            firstname: 'Maxim',
            lastname: 'Shavlak',
            email: 'mainManager@gmail.com',
            avatar: 'https://st3.depositphotos.com/1071184/13782/v/450/depositphotos_137825710-stock-illustration-business-person-analyzing-financial-statistics.jpg',
        },
        articleId: '16',
        rate: 5,
        feedback: 'Excellent resource, highly recommend!',
        id: '290',
    },
    {
        user: {
            id: '18zZBJnmEqWJNwGj2SvbNiNVXol1',
            username: 'nickManager',
            firstname: 'Nick',
            lastname: 'Garcia',

            email: 'nickManager@gmail.com',

            avatar: 'https://example.com/avatar17.jpg',
        },
        articleId: '17',
        rate: 2,
        feedback: 'Not very engaging, needs improvement.',
        id: '291',
    },
    {
        user: {
            id: 'mYX7XszmZJgEUSU9eeKDJYbP7P22',
            username: 'claraUser',
            firstname: 'Clara',
            lastname: 'Santos',

            email: 'claraUser@gmail.com',

            avatar: 'https://example.com/avatar18.jpg',
        },
        articleId: '17',
        rate: 3,
        feedback: 'Decent read, but it felt rushed.',
        id: '292',
    },
    {
        user: {
            id: 'Str49JTKBAOoaEhM8XeQLLLPPDp2',
            username: 'tomAdmin',
            firstname: 'Tom',
            lastname: 'Anderson',

            email: 'tomAdmin@gmail.com',

            avatar: 'https://example.com/avatar19.jpg',
        },
        articleId: '17',
        rate: 4,
        feedback: 'Informative, but could use more examples.',
        id: '293',
    },
    {
        user: {
            id: 'J3aB11HdHTZW6udzrrw2ymBhIOz1',
            username: 'mainAdmin',
            firstname: 'Maryna',
            lastname: 'Shavlak',
            email: 'mainAdmin@gmail.com',
            avatar: 'https://drive.google.com/thumbnail?id=1RD0jSAm8kdTLKa-Vr0daeE8T9-QcfPCa&sz=w1000',
        },
        articleId: '18',
        rate: 5,
        feedback: 'Incredibly helpful, thank you!',
        id: '294',
    },
    {
        user: {
            id: 'vvfdFnPQMLVkrnCBjsTZcPsUq9U2',
            username: 'mainUser',
            firstname: 'Tetiana',
            lastname: 'Shavlak',
            email: 'mainUser@gmail.com',
            avatar: 'https://drive.google.com/thumbnail?id=1J1xUPYYkJeOsBTpDuf36vsV7UfxlM2uG&sz=w1000',
        },
        articleId: '18',
        rate: 4,
        feedback: 'Well structured and easy to follow.',
        id: '295',
    },
    {
        user: {
            id: 'zM4UyVgfKNf2vrf5sXmBIxA5QOl2',
            username: 'mainManager',
            firstname: 'Maxim',
            lastname: 'Shavlak',
            email: 'mainManager@gmail.com',
            avatar: 'https://st3.depositphotos.com/1071184/13782/v/450/depositphotos_137825710-stock-illustration-business-person-analyzing-financial-statistics.jpg',
        },
        articleId: '19',
        rate: 1,
        feedback: 'I found it lacking depth.',
        id: '296',
    },
    {
        user: {
            id: '18zZBJnmEqWJNwGj2SvbNiNVXol1',
            username: 'nickManager',
            firstname: 'Nick',
            lastname: 'Garcia',

            email: 'nickManager@gmail.com',

            avatar: 'https://example.com/avatar17.jpg',
        },
        articleId: '19',
        rate: 5,
        feedback: 'Fantastic insights, very informative!',
        id: '297',
    },
    {
        user: {
            id: 'mYX7XszmZJgEUSU9eeKDJYbP7P22',
            username: 'claraUser',
            firstname: 'Clara',
            lastname: 'Santos',

            email: 'claraUser@gmail.com',

            avatar: 'https://example.com/avatar18.jpg',
        },
        articleId: '20',
        rate: 4,
        feedback: 'Solid article, would love to see more!',
        id: '298',
    },
    {
        user: {
            id: 'Str49JTKBAOoaEhM8XeQLLLPPDp2',
            username: 'tomAdmin',
            firstname: 'Tom',
            lastname: 'Anderson',

            email: 'tomAdmin@gmail.com',

            avatar: 'https://example.com/avatar19.jpg',
        },
        articleId: '20',
        rate: 3,
        feedback: 'Good start, but could use more examples.',
        id: '299',
    },
    {
        user: {
            id: 'J3aB11HdHTZW6udzrrw2ymBhIOz1',
            username: 'mainAdmin',
            firstname: 'Maryna',
            lastname: 'Shavlak',
            email: 'mainAdmin@gmail.com',
            avatar: 'https://drive.google.com/thumbnail?id=1RD0jSAm8kdTLKa-Vr0daeE8T9-QcfPCa&sz=w1000',
        },
        articleId: '21',
        rate: 2,
        feedback: 'Not very clear, needed more detail.',
        id: '300',
    },
    {
        user: {
            id: 'vvfdFnPQMLVkrnCBjsTZcPsUq9U2',
            username: 'mainUser',
            firstname: 'Tetiana',
            lastname: 'Shavlak',
            email: 'mainUser@gmail.com',
            avatar: 'https://drive.google.com/thumbnail?id=1J1xUPYYkJeOsBTpDuf36vsV7UfxlM2uG&sz=w1000',
        },
        articleId: '21',
        rate: 5,
        feedback: 'Loved it! Very informative and clear.',
        id: '301',
    },
    {
        user: {
            id: 'zM4UyVgfKNf2vrf5sXmBIxA5QOl2',
            username: 'mainManager',
            firstname: 'Maxim',
            lastname: 'Shavlak',
            email: 'mainManager@gmail.com',
            avatar: 'https://st3.depositphotos.com/1071184/13782/v/450/depositphotos_137825710-stock-illustration-business-person-analyzing-financial-statistics.jpg',
        },
        articleId: '24',
        rate: 4,
        feedback: 'Great overview, thank you!',
        id: '302',
    },
    {
        user: {
            id: '18zZBJnmEqWJNwGj2SvbNiNVXol1',
            username: 'nickManager',
            firstname: 'Nick',
            lastname: 'Garcia',

            email: 'nickManager@gmail.com',

            avatar: 'https://example.com/avatar17.jpg',
        },
        articleId: '24',
        rate: 3,
        feedback: 'Helpful, but could use more examples.',
        id: '303',
    },
    {
        user: {
            id: 'mYX7XszmZJgEUSU9eeKDJYbP7P22',
            username: 'claraUser',
            firstname: 'Clara',
            lastname: 'Santos',

            email: 'claraUser@gmail.com',

            avatar: 'https://example.com/avatar18.jpg',
        },
        articleId: '25',
        rate: 2,
        feedback: 'Did not meet my expectations.',
        id: '304',
    },
    {
        user: {
            id: 'Str49JTKBAOoaEhM8XeQLLLPPDp2',
            username: 'tomAdmin',
            firstname: 'Tom',
            lastname: 'Anderson',

            email: 'tomAdmin@gmail.com',

            avatar: 'https://example.com/avatar19.jpg',
        },
        articleId: '25',
        rate: 4,
        feedback: 'Very useful, learned something new.',
        id: '305',
    },
    {
        user: {
            id: 'J3aB11HdHTZW6udzrrw2ymBhIOz1',
            username: 'mainAdmin',
            firstname: 'Maryna',
            lastname: 'Shavlak',
            email: 'mainAdmin@gmail.com',
            avatar: 'https://drive.google.com/thumbnail?id=1RD0jSAm8kdTLKa-Vr0daeE8T9-QcfPCa&sz=w1000',
        },
        articleId: '26',
        rate: 5,
        feedback: 'Fantastic article, very well written!',
        id: '306',
    },
    {
        user: {
            id: 'vvfdFnPQMLVkrnCBjsTZcPsUq9U2',
            username: 'mainUser',
            firstname: 'Tetiana',
            lastname: 'Shavlak',
            email: 'mainUser@gmail.com',
            avatar: 'https://drive.google.com/thumbnail?id=1J1xUPYYkJeOsBTpDuf36vsV7UfxlM2uG&sz=w1000',
        },
        articleId: '26',
        rate: 3,
        feedback: 'It was okay, but not what I expected.',
        id: '307',
    },
    {
        user: {
            id: 'zM4UyVgfKNf2vrf5sXmBIxA5QOl2',
            username: 'mainManager',
            firstname: 'Maxim',
            lastname: 'Shavlak',
            email: 'mainManager@gmail.com',
            avatar: 'https://st3.depositphotos.com/1071184/13782/v/450/depositphotos_137825710-stock-illustration-business-person-analyzing-financial-statistics.jpg',
        },
        articleId: '27',
        rate: 4,
        feedback: 'Well done, enjoyed reading it!',
        id: '308',
    },
    {
        user: {
            id: '18zZBJnmEqWJNwGj2SvbNiNVXol1',
            username: 'nickManager',
            firstname: 'Nick',
            lastname: 'Garcia',

            email: 'nickManager@gmail.com',

            avatar: 'https://example.com/avatar17.jpg',
        },
        articleId: '27',
        rate: 2,
        feedback: 'Could use significant improvement.',
        id: '309',
    },
    {
        user: {
            id: 'mYX7XszmZJgEUSU9eeKDJYbP7P22',
            username: 'claraUser',
            firstname: 'Clara',
            lastname: 'Santos',

            email: 'claraUser@gmail.com',

            avatar: 'https://example.com/avatar18.jpg',
        },
        articleId: '27',
        rate: 5,
        feedback: 'Highly informative, great job!',
        id: '310',
    },
    {
        user: {
            id: 'Str49JTKBAOoaEhM8XeQLLLPPDp2',
            username: 'tomAdmin',
            firstname: 'Tom',
            lastname: 'Anderson',

            email: 'tomAdmin@gmail.com',

            avatar: 'https://example.com/avatar19.jpg',
        },
        articleId: '27',
        rate: 3,
        feedback: 'Nice article, but I wanted more detail.',
        id: '311',
    },
    {
        user: {
            id: '4juq0tzGf5fNMCXCRFOa5mvFO5O2',
            username: 'leoUser',
            firstname: 'Leo',
            lastname: 'Mikhailov',

            email: 'leoUser@gmail.com',

            avatar: 'https://example.com/avatar12.jpg',
        },
        articleId: '6',
        rate: 4,
        feedback: 'Well written and easy to understand.',
        id: '312',
    },
    {
        user: {
            id: '9Dpc2pFoeORLyQrxHlGIbe5wjbf2',
            username: 'janeAdmin',
            firstname: 'Jane',
            lastname: 'Williams',

            email: 'janeAdmin@gmail.com',

            avatar: 'https://example.com/avatar13.jpg',
        },
        articleId: '6',
        rate: 3,
        feedback: 'Decent article but lacking depth.',
        id: '313',
    },
    {
        user: {
            id: 'BrKES0pOcxcgYBUpKmZxBzqKFhl1',
            username: 'peterManager',
            firstname: 'Peter',
            lastname: 'Muller',

            email: 'peterManager@gmail.com',

            avatar: 'https://example.com/avatar14.jpg',
        },
        articleId: '6',
        rate: 5,
        feedback: 'Fantastic insights, very helpful!',
        id: '314',
    },
    {
        user: {
            id: 'Ue15ycXTpxVhCZ2eJoOVYaArKEa2',
            username: 'mariaUser',
            firstname: 'Maria',
            lastname: 'Petrova',

            email: 'mariaUser@gmail.com',

            avatar: 'https://example.com/avatar15.jpg',
        },
        articleId: '46',
        rate: 4,
        feedback: 'Great overview of the topic.',
        id: '315',
    },
    {
        user: {
            id: 'KXv8oUPLQeUXSzoXOWJV4nw47CG2',
            username: 'maxAdmin',
            firstname: 'Max',
            lastname: 'Gordon',

            email: 'maxAdmin@gmail.com',

            avatar: 'https://example.com/avatar16.jpg',
        },
        articleId: '46',
        rate: 3,
        feedback: 'It was informative, but could be clearer.',
        id: '316',
    },
    {
        user: {
            id: '18zZBJnmEqWJNwGj2SvbNiNVXol1',
            username: 'nickManager',
            firstname: 'Nick',
            lastname: 'Garcia',

            email: 'nickManager@gmail.com',

            avatar: 'https://example.com/avatar17.jpg',
        },
        articleId: '46',
        rate: 5,
        feedback: 'Loved this article! Very engaging.',
        id: '317',
    },
    {
        user: {
            id: '4juq0tzGf5fNMCXCRFOa5mvFO5O2',
            username: 'leoUser',
            firstname: 'Leo',
            lastname: 'Mikhailov',

            email: 'leoUser@gmail.com',

            avatar: 'https://example.com/avatar12.jpg',
        },
        articleId: '9',
        rate: 4,
        feedback: 'Useful information, well structured.',
        id: '318',
    },
    {
        user: {
            id: '9Dpc2pFoeORLyQrxHlGIbe5wjbf2',
            username: 'janeAdmin',
            firstname: 'Jane',
            lastname: 'Williams',

            email: 'janeAdmin@gmail.com',

            avatar: 'https://example.com/avatar13.jpg',
        },
        articleId: '9',
        rate: 3,
        feedback: 'Average article, nothing new.',
        id: '319',
    },
    {
        user: {
            id: 'BrKES0pOcxcgYBUpKmZxBzqKFhl1',
            username: 'peterManager',
            firstname: 'Peter',
            lastname: 'Muller',

            email: 'peterManager@gmail.com',

            avatar: 'https://example.com/avatar14.jpg',
        },
        articleId: '11',
        rate: 5,
        feedback: 'Very comprehensive and well-researched.',
        id: '320',
    },
    {
        user: {
            id: 'Ue15ycXTpxVhCZ2eJoOVYaArKEa2',
            username: 'mariaUser',
            firstname: 'Maria',
            lastname: 'Petrova',

            email: 'mariaUser@gmail.com',

            avatar: 'https://example.com/avatar15.jpg',
        },
        articleId: '11',
        rate: 4,
        feedback: 'Good article, I learned something new!',
        id: '321',
    },
    {
        user: {
            id: 'KXv8oUPLQeUXSzoXOWJV4nw47CG2',
            username: 'maxAdmin',
            firstname: 'Max',
            lastname: 'Gordon',

            email: 'maxAdmin@gmail.com',

            avatar: 'https://example.com/avatar16.jpg',
        },
        articleId: '13',
        rate: 3,
        feedback: 'It could use more examples to illustrate points.',
        id: '322',
    },
    {
        user: {
            id: '18zZBJnmEqWJNwGj2SvbNiNVXol1',
            username: 'nickManager',
            firstname: 'Nick',
            lastname: 'Garcia',

            email: 'nickManager@gmail.com',

            avatar: 'https://example.com/avatar17.jpg',
        },
        articleId: '13',
        rate: 4,
        feedback: 'Helpful and well organized!',
        id: '323',
    },
    {
        user: {
            id: '4juq0tzGf5fNMCXCRFOa5mvFO5O2',
            username: 'leoUser',
            firstname: 'Leo',
            lastname: 'Mikhailov',

            email: 'leoUser@gmail.com',

            avatar: 'https://example.com/avatar12.jpg',
        },
        articleId: '15',
        rate: 5,
        feedback: 'Excellent read, very insightful!',
        id: '324',
    },
    {
        user: {
            id: '9Dpc2pFoeORLyQrxHlGIbe5wjbf2',
            username: 'janeAdmin',
            firstname: 'Jane',
            lastname: 'Williams',

            email: 'janeAdmin@gmail.com',

            avatar: 'https://example.com/avatar13.jpg',
        },
        articleId: '15',
        rate: 3,
        feedback: 'Informative, but felt a bit rushed.',
        id: '325',
    },
    {
        user: {
            id: 'BrKES0pOcxcgYBUpKmZxBzqKFhl1',
            username: 'peterManager',
            firstname: 'Peter',
            lastname: 'Muller',

            email: 'peterManager@gmail.com',

            avatar: 'https://example.com/avatar14.jpg',
        },
        articleId: '15',
        rate: 4,
        feedback: 'Great article! Would recommend to others.',
        id: '326',
    },
    {
        user: {
            id: 'tfs04ij0b5anHdw2qt6LghQsEfC3',
            username: 'katyaAdmin',
            firstname: 'Katya',
            lastname: 'Ivanova',
            email: 'katyaAdmin@gmail.com',
            avatar: 'https://example.com/avatar7.jpg',
        },
        articleId: '1',
        rate: 5,
        feedback: 'Outstanding article! Very informative and well-structured.',
        id: '401',
    },
    {
        user: {
            id: 'd6RJwaIJmjbHTV2PdSg04DpPjWl1',
            username: 'johnManager',
            firstname: 'John',
            lastname: 'Doe',
            email: 'johnManager@gmail.com',
            avatar: 'https://example.com/avatar8.jpg',
        },
        articleId: '1',
        rate: 4,
        feedback: 'Great insights, but could use more examples.',
        id: '402',
    },
    {
        user: {
            id: 'MqonEyICTeMapkAPyPFH7w1E5l52',
            username: 'annaUser',
            firstname: 'Anna',
            lastname: 'Koval',

            email: 'annaUser@gmail.com',

            avatar: 'https://example.com/avatar9.jpg',
        },
        articleId: '2',
        rate: 5,
        feedback: 'Exceptional writing! I learned a lot.',
        id: '403',
    },
    {
        user: {
            id: 'ObGe2X8MNTde2RSffQgE0Jpxek72',
            username: 'lucyAdmin',
            firstname: 'Lucy',
            lastname: 'Brown',

            email: 'lucyAdmin@gmail.com',

            avatar: 'https://example.com/avatar10.jpg',
        },
        articleId: '2',
        rate: 4,
        feedback: 'Very helpful, a must-read for beginners.',
        id: '404',
    },
    {
        user: {
            id: '4g1WI5M1XIZU6VKvIfJBG7TzMsD3',
            username: 'alexManager',
            firstname: 'Alex',
            lastname: 'Johnson',
            email: 'alexManager@gmail.com',
            avatar: 'https://example.com/avatar11.jpg',
        },
        articleId: '43',
        rate: 5,
        feedback: 'A brilliant piece! Covers everything in detail.',
        id: '405',
    },
    {
        user: {
            id: '4juq0tzGf5fNMCXCRFOa5mvFO5O2',
            username: 'leoUser',
            firstname: 'Leo',
            lastname: 'Mikhailov',

            email: 'leoUser@gmail.com',

            avatar: 'https://example.com/avatar12.jpg',
        },
        articleId: '43',
        rate: 4,
        feedback: 'Informative and well-researched. I appreciate the effort.',
        id: '406',
    },
    {
        user: {
            id: '9Dpc2pFoeORLyQrxHlGIbe5wjbf2',
            username: 'janeAdmin',
            firstname: 'Jane',
            lastname: 'Williams',

            email: 'janeAdmin@gmail.com',

            avatar: 'https://example.com/avatar13.jpg',
        },
        articleId: '3',
        rate: 5,
        feedback: 'Absolutely fantastic! I found it very engaging.',
        id: '407',
    },
    {
        user: {
            id: 'BrKES0pOcxcgYBUpKmZxBzqKFhl1',
            username: 'peterManager',
            firstname: 'Peter',
            lastname: 'Muller',

            email: 'peterManager@gmail.com',

            avatar: 'https://example.com/avatar14.jpg',
        },
        articleId: '3',
        rate: 4,
        feedback: 'Solid article! Clear explanations throughout.',
        id: '408',
    },
    {
        user: {
            id: 'tfs04ij0b5anHdw2qt6LghQsEfC3',
            username: 'katyaAdmin',
            firstname: 'Katya',
            lastname: 'Ivanova',
            email: 'katyaAdmin@gmail.com',
            avatar: 'https://example.com/avatar7.jpg',
        },
        articleId: '4',
        rate: 5,
        feedback: "One of the best articles I've read this month!",
        id: '409',
    },
    {
        user: {
            id: 'd6RJwaIJmjbHTV2PdSg04DpPjWl1',
            username: 'johnManager',
            firstname: 'John',
            lastname: 'Doe',
            email: 'johnManager@gmail.com',
            avatar: 'https://example.com/avatar8.jpg',
        },
        articleId: '4',
        rate: 4,
        feedback: 'Great content! Could benefit from more visuals.',
        id: '410',
    },
    {
        user: {
            id: 'MqonEyICTeMapkAPyPFH7w1E5l52',
            username: 'annaUser',
            firstname: 'Anna',
            lastname: 'Koval',

            email: 'annaUser@gmail.com',

            avatar: 'https://example.com/avatar9.jpg',
        },
        articleId: '44',
        rate: 5,
        feedback: 'Excellent resource! Very thorough and insightful.',
        id: '411',
    },
    {
        user: {
            id: 'ObGe2X8MNTde2RSffQgE0Jpxek72',
            username: 'lucyAdmin',
            firstname: 'Lucy',
            lastname: 'Brown',

            email: 'lucyAdmin@gmail.com',

            avatar: 'https://example.com/avatar10.jpg',
        },
        articleId: '44',
        rate: 4,
        feedback: 'Very well done! It really helped clarify things.',
        id: '412',
    },
    {
        user: {
            id: 'zM4UyVgfKNf2vrf5sXmBIxA5QOl2',
            username: 'mainManager',
            firstname: 'Maxim',
            lastname: 'Shavlak',
            email: 'mainManager@gmail.com',
            avatar: 'https://st3.depositphotos.com/1071184/13782/v/450/depositphotos_137825710-stock-illustration-business-person-analyzing-financial-statistics.jpg',
        },
        articleId: '76',
        rate: 4,
        feedback:
            'Very informative article! Helped me understand the topic better.',
        id: '413',
    },
    {
        user: {
            id: 'hdkjUiQhjoPIVMqfORNbvEHm4Wg1',
            username: 'testuser2',
            firstname: 'Test2',
            lastname: 'User2',

            email: 'testuser2@gmail.com',
            avatar: 'FRGDHJ',
        },
        articleId: '143',
        rate: 3,
        feedback: 'Decent read, but I expected more detailed examples.',
        id: '414',
    },
    {
        user: {
            id: 'tfs04ij0b5anHdw2qt6LghQsEfC3',
            username: 'katyaAdmin',
            firstname: 'Katya',
            lastname: 'Ivanova',
            email: 'katyaAdmin@gmail.com',
            avatar: 'https://example.com/avatar7.jpg',
        },
        articleId: '144',
        rate: 5,
        feedback: 'Exceptional insights! I learned a lot from this article.',
        id: '415',
    },
    {
        user: {
            id: 'MqonEyICTeMapkAPyPFH7w1E5l52',
            username: 'annaUser',
            firstname: 'Anna',
            lastname: 'Koval',

            email: 'annaUser@gmail.com',

            avatar: 'https://example.com/avatar9.jpg',
        },
        articleId: '145',
        rate: 4,
        feedback: 'Well-written and clear. Great resource for beginners!',
        id: '416',
    },
    {
        user: {
            id: '4g1WI5M1XIZU6VKvIfJBG7TzMsD3',
            username: 'alexManager',
            firstname: 'Alex',
            lastname: 'Johnson',
            email: 'alexManager@gmail.com',
            avatar: 'https://example.com/avatar11.jpg',
        },
        articleId: '146',
        rate: 5,
        feedback: 'Outstanding content! I appreciate the thoroughness.',
        id: '417',
    },
    {
        user: {
            id: '9Dpc2pFoeORLyQrxHlGIbe5wjbf2',
            username: 'janeAdmin',
            firstname: 'Jane',
            lastname: 'Williams',

            email: 'janeAdmin@gmail.com',

            avatar: 'https://example.com/avatar13.jpg',
        },
        articleId: '147',
        rate: 4,
        feedback: 'Good information, though some sections felt rushed.',
        id: '418',
    },
    {
        user: {
            id: 'Ue15ycXTpxVhCZ2eJoOVYaArKEa2',
            username: 'mariaUser',
            firstname: 'Maria',
            lastname: 'Petrova',

            email: 'mariaUser@gmail.com',

            avatar: 'https://example.com/avatar15.jpg',
        },
        articleId: '116',
        rate: 3,
        feedback: 'Average article. Some points were unclear.',
        id: '419',
    },
    {
        user: {
            id: '18zZBJnmEqWJNwGj2SvbNiNVXol1',
            username: 'nickManager',
            firstname: 'Nick',
            lastname: 'Garcia',

            email: 'nickManager@gmail.com',

            avatar: 'https://example.com/avatar17.jpg',
        },
        articleId: '129',
        rate: 5,
        feedback: 'Fantastic read! Very engaging and well-structured.',
        id: '420',
    },
    {
        user: {
            id: 'mYX7XszmZJgEUSU9eeKDJYbP7P22',
            username: 'claraUser',
            firstname: 'Clara',
            lastname: 'Santos',

            email: 'claraUser@gmail.com',

            avatar: 'https://example.com/avatar18.jpg',
        },
        articleId: '78',
        rate: 1,
        feedback: 'The content was lacking depth and clarity.',
        id: '601',
    },
    {
        user: {
            id: 'mYX7XszmZJgEUSU9eeKDJYbP7P22',
            username: 'claraUser',
            firstname: 'Clara',
            lastname: 'Santos',

            email: 'claraUser@gmail.com',

            avatar: 'https://example.com/avatar18.jpg',
        },
        articleId: '90',
        rate: 2,
        feedback: 'Not very useful, I expected more detailed information.',
        id: '602',
    },
    {
        user: {
            id: 'mYX7XszmZJgEUSU9eeKDJYbP7P22',
            username: 'claraUser',
            firstname: 'Clara',
            lastname: 'Santos',

            email: 'claraUser@gmail.com',

            avatar: 'https://example.com/avatar18.jpg',
        },
        articleId: '158',
        rate: 1,
        feedback: 'This article was confusing and poorly organized.',
        id: '603',
    },
    {
        user: {
            id: 'mYX7XszmZJgEUSU9eeKDJYbP7P22',
            username: 'claraUser',
            firstname: 'Clara',
            lastname: 'Santos',

            email: 'claraUser@gmail.com',

            avatar: 'https://example.com/avatar18.jpg',
        },
        articleId: '159',
        rate: 2,
        feedback: "Had potential, but it didn't deliver on the main points.",
        id: '604',
    },
    {
        user: {
            id: 'mYX7XszmZJgEUSU9eeKDJYbP7P22',
            username: 'claraUser',
            firstname: 'Clara',
            lastname: 'Santos',

            email: 'claraUser@gmail.com',

            avatar: 'https://example.com/avatar18.jpg',
        },
        articleId: '161',
        rate: 1,
        feedback: 'Very disappointing. The examples were irrelevant.',
        id: '605',
    },
    {
        user: {
            id: 'mYX7XszmZJgEUSU9eeKDJYbP7P22',
            username: 'claraUser',
            firstname: 'Clara',
            lastname: 'Santos',

            email: 'claraUser@gmail.com',

            avatar: 'https://example.com/avatar18.jpg',
        },
        articleId: '162',
        rate: 2,
        feedback: 'Could use significant improvements. Lacked engagement.',
        id: '606',
    },
    {
        user: {
            id: 'nwPyI60mR9XWY3ozVuRGItx08PY2',
            username: 'testuser',
            firstname: 'Test',
            lastname: 'lastnameUser',

            email: 'testuser@gmail.com',

            avatar: 'https://s1.1zoom.ru/big3/992/367659-alexfas01.jpg',
        },
        articleId: '83',
        rate: 5,
        feedback:
            'An excellent article! It provided great insights and was very well-written.',
        id: 701,
    },
    {
        user: {
            id: 'nwPyI60mR9XWY3ozVuRGItx08PY2',
            username: 'testuser',
            firstname: 'Test',
            lastname: 'lastnameUser',

            email: 'testuser@gmail.com',

            avatar: 'https://s1.1zoom.ru/big3/992/367659-alexfas01.jpg',
        },
        articleId: '95',
        rate: 4,
        feedback: 'Good content, very informative and easy to understand.',
        id: 702,
    },
    {
        user: {
            id: 'nwPyI60mR9XWY3ozVuRGItx08PY2',
            username: 'testuser',
            firstname: 'Test',
            lastname: 'lastnameUser',

            email: 'testuser@gmail.com',

            avatar: 'https://s1.1zoom.ru/big3/992/367659-alexfas01.jpg',
        },
        articleId: '111',
        rate: 5,
        feedback: 'Outstanding explanation of the topic. I learned a lot!',
        id: 703,
    },
    {
        user: {
            id: 'nwPyI60mR9XWY3ozVuRGItx08PY2',
            username: 'testuser',
            firstname: 'Test',
            lastname: 'lastnameUser',

            email: 'testuser@gmail.com',

            avatar: 'https://s1.1zoom.ru/big3/992/367659-alexfas01.jpg',
        },
        articleId: '126',
        rate: 4,
        feedback:
            'Well-structured and engaging. Would definitely recommend it.',
        id: 704,
    },
    {
        user: {
            id: 'nwPyI60mR9XWY3ozVuRGItx08PY2',
            username: 'testuser',
            firstname: 'Test',
            lastname: 'lastnameUser',

            email: 'testuser@gmail.com',

            avatar: 'https://s1.1zoom.ru/big3/992/367659-alexfas01.jpg',
        },
        articleId: '84',
        rate: 5,
        id: 705,
    },
    {
        user: {
            id: 'nwPyI60mR9XWY3ozVuRGItx08PY2',
            username: 'testuser',
            firstname: 'Test',
            lastname: 'lastnameUser',

            email: 'testuser@gmail.com',

            avatar: 'https://s1.1zoom.ru/big3/992/367659-alexfas01.jpg',
        },
        articleId: '96',
        rate: 5,
        id: 706,
    },
    {
        user: {
            id: 'nwPyI60mR9XWY3ozVuRGItx08PY2',
            username: 'testuser',
            firstname: 'Test',
            lastname: 'lastnameUser',

            email: 'testuser@gmail.com',

            avatar: 'https://s1.1zoom.ru/big3/992/367659-alexfas01.jpg',
        },
        articleId: '106',
        rate: 4,
        id: 707,
    },
    {
        user: {
            id: 'nwPyI60mR9XWY3ozVuRGItx08PY2',
            username: 'testuser',
            firstname: 'Test',
            lastname: 'lastnameUser',

            email: 'testuser@gmail.com',

            avatar: 'https://s1.1zoom.ru/big3/992/367659-alexfas01.jpg',
        },
        articleId: '112',
        rate: 5,
        feedback: 'Fantastic article! It was engaging and very informative.',
        id: 708,
    },
    {
        user: {
            id: 'nwPyI60mR9XWY3ozVuRGItx08PY2',
            username: 'testuser',
            firstname: 'Test',
            lastname: 'lastnameUser',

            email: 'testuser@gmail.com',

            avatar: 'https://s1.1zoom.ru/big3/992/367659-alexfas01.jpg',
        },
        articleId: '53',
        rate: 4,
        feedback:
            'Great insights! I will be using this information moving forward.',
        id: 709,
    },
    {
        user: {
            id: 'nwPyI60mR9XWY3ozVuRGItx08PY2',
            username: 'testuser',
            firstname: 'Test',
            lastname: 'lastnameUser',

            email: 'testuser@gmail.com',

            avatar: 'https://s1.1zoom.ru/big3/992/367659-alexfas01.jpg',
        },
        articleId: '73',
        rate: 5,
        feedback: 'Excellent content! Very well organized and clear.',
        id: 710,
    },
    {
        user: {
            id: 'nwPyI60mR9XWY3ozVuRGItx08PY2',
            username: 'testuser',
            firstname: 'Test',
            lastname: 'lastnameUser',

            email: 'testuser@gmail.com',

            avatar: 'https://s1.1zoom.ru/big3/992/367659-alexfas01.jpg',
        },
        articleId: '85',
        rate: 4,
        feedback: 'Informative and well-researched. I learned a lot!',
        id: 711,
    },
    {
        user: {
            id: 'nwPyI60mR9XWY3ozVuRGItx08PY2',
            username: 'testuser',
            firstname: 'Test',
            lastname: 'lastnameUser',

            email: 'testuser@gmail.com',

            avatar: 'https://s1.1zoom.ru/big3/992/367659-alexfas01.jpg',
        },
        articleId: '97',
        rate: 5,
        feedback:
            "This was one of the best articles I've read on this subject.",
        id: 712,
    },
    {
        user: {
            id: 'nwPyI60mR9XWY3ozVuRGItx08PY2',
            username: 'testuser',
            firstname: 'Test',
            lastname: 'lastnameUser',

            email: 'testuser@gmail.com',

            avatar: 'https://s1.1zoom.ru/big3/992/367659-alexfas01.jpg',
        },
        articleId: '74',
        rate: 5,
        feedback: 'Outstanding! The clarity of writing is impressive.',
        id: 713,
    },
    {
        user: {
            id: 'nwPyI60mR9XWY3ozVuRGItx08PY2',
            username: 'testuser',
            firstname: 'Test',
            lastname: 'lastnameUser',

            email: 'testuser@gmail.com',

            avatar: 'https://s1.1zoom.ru/big3/992/367659-alexfas01.jpg',
        },
        articleId: '86',
        rate: 4,
        feedback:
            'Good article with valuable insights. Keep up the great work!',
        id: 714,
    },
    {
        user: {
            id: 'nwPyI60mR9XWY3ozVuRGItx08PY2',
            username: 'testuser',
            firstname: 'Test',
            lastname: 'lastnameUser',

            email: 'testuser@gmail.com',

            avatar: 'https://s1.1zoom.ru/big3/992/367659-alexfas01.jpg',
        },
        articleId: '98',
        rate: 5,
        feedback: 'A must-read! It provided practical tips that I can apply.',
        id: 715,
    },
    {
        user: {
            id: 'nwPyI60mR9XWY3ozVuRGItx08PY2',
            username: 'testuser',
            firstname: 'Test',
            lastname: 'lastnameUser',

            email: 'testuser@gmail.com',

            avatar: 'https://s1.1zoom.ru/big3/992/367659-alexfas01.jpg',
        },
        articleId: '114',
        rate: 4,
        feedback: 'Very informative. I appreciate the thorough research.',
        id: 716,
    },
    {
        user: {
            id: 'd6RJwaIJmjbHTV2PdSg04DpPjWl1',
            username: 'johnManager',
            firstname: 'John',
            lastname: 'Doe',
            email: 'johnManager@gmail.com',
            avatar: 'https://example.com/avatar8.jpg',
        },
        articleId: '149',
        rate: 5,
        feedback:
            'Absolutely loved this article! It was insightful and well-written.',
        id: 801,
    },
    {
        user: {
            id: 'd6RJwaIJmjbHTV2PdSg04DpPjWl1',
            username: 'johnManager',
            firstname: 'John',
            lastname: 'Doe',
            email: 'johnManager@gmail.com',
            avatar: 'https://example.com/avatar8.jpg',
        },
        articleId: '164',
        rate: 4,
        feedback:
            'Great information presented clearly. I found it very helpful.',
        id: 802,
    },
    {
        user: {
            id: 'd6RJwaIJmjbHTV2PdSg04DpPjWl1',
            username: 'johnManager',
            firstname: 'John',
            lastname: 'Doe',
            email: 'johnManager@gmail.com',
            avatar: 'https://example.com/avatar8.jpg',
        },
        articleId: '150',
        rate: 5,
        feedback: 'Fantastic read! Engaging from start to finish.',
        id: 803,
    },
    {
        user: {
            id: 'd6RJwaIJmjbHTV2PdSg04DpPjWl1',
            username: 'johnManager',
            firstname: 'John',
            lastname: 'Doe',
            email: 'johnManager@gmail.com',
            avatar: 'https://example.com/avatar8.jpg',
        },
        articleId: '165',
        rate: 4,
        feedback: 'Well structured and informative. I learned a lot from it!',
        id: 804,
    },
    {
        user: {
            id: 'd6RJwaIJmjbHTV2PdSg04DpPjWl1',
            username: 'johnManager',
            firstname: 'John',
            lastname: 'Doe',
            email: 'johnManager@gmail.com',
            avatar: 'https://example.com/avatar8.jpg',
        },
        articleId: '113',
        rate: 5,
        feedback: 'Excellent insights! This is exactly what I needed.',
        id: 805,
    },
    {
        user: {
            id: 'd6RJwaIJmjbHTV2PdSg04DpPjWl1',
            username: 'johnManager',
            firstname: 'John',
            lastname: 'Doe',
            email: 'johnManager@gmail.com',
            avatar: 'https://example.com/avatar8.jpg',
        },
        articleId: '133',
        rate: 4,
        feedback: 'Good content and very easy to follow. Highly recommend.',
        id: 806,
    },
    {
        user: {
            id: 'd6RJwaIJmjbHTV2PdSg04DpPjWl1',
            username: 'johnManager',
            firstname: 'John',
            lastname: 'Doe',
            email: 'johnManager@gmail.com',
            avatar: 'https://example.com/avatar8.jpg',
        },
        articleId: '127',
        rate: 5,
        feedback: 'Very informative! I appreciate the depth of analysis.',
        id: 807,
    },
    {
        user: {
            id: 'd6RJwaIJmjbHTV2PdSg04DpPjWl1',
            username: 'johnManager',
            firstname: 'John',
            lastname: 'Doe',
            email: 'johnManager@gmail.com',
            avatar: 'https://example.com/avatar8.jpg',
        },
        articleId: '134',
        rate: 4,
        feedback: 'Solid article! It provides practical insights and tips.',
        id: 808,
    },
    {
        user: {
            id: 'd6RJwaIJmjbHTV2PdSg04DpPjWl1',
            username: 'johnManager',
            firstname: 'John',
            lastname: 'Doe',
            email: 'johnManager@gmail.com',
            avatar: 'https://example.com/avatar8.jpg',
        },
        articleId: '152',
        rate: 5,
        feedback: 'Outstanding! This article has become one of my favorites.',
        id: 809,
    },
    {
        user: {
            id: 'd6RJwaIJmjbHTV2PdSg04DpPjWl1',
            username: 'johnManager',
            firstname: 'John',
            lastname: 'Doe',
            email: 'johnManager@gmail.com',
            avatar: 'https://example.com/avatar8.jpg',
        },
        articleId: '167',
        rate: 4,
        feedback: 'Very well written! It covers the topic thoroughly.',
        id: 810,
    },
    {
        user: {
            id: 'd6RJwaIJmjbHTV2PdSg04DpPjWl1',
            username: 'johnManager',
            firstname: 'John',
            lastname: 'Doe',
            email: 'johnManager@gmail.com',
            avatar: 'https://example.com/avatar8.jpg',
        },
        articleId: '153',
        rate: 5,
        feedback: 'Loved it! The insights were very enlightening.',
        id: 811,
    },
    {
        user: {
            id: 'd6RJwaIJmjbHTV2PdSg04DpPjWl1',
            username: 'johnManager',
            firstname: 'John',
            lastname: 'Doe',
            email: 'johnManager@gmail.com',
            avatar: 'https://example.com/avatar8.jpg',
        },
        articleId: '168',
        rate: 4,
        feedback: 'Great content! I found it really useful for my research.',
        id: 812,
    },
    {
        user: {
            id: 'MqonEyICTeMapkAPyPFH7w1E5l52',
            username: 'annaUser',
            firstname: 'Anna',
            lastname: 'Koval',

            email: 'annaUser@gmail.com',

            avatar: 'https://example.com/avatar9.jpg',
        },
        articleId: '32',
        rate: 1,
        feedback:
            'I found this article to be poorly written and lacking depth.',
        id: 901,
    },
    {
        user: {
            id: 'MqonEyICTeMapkAPyPFH7w1E5l52',
            username: 'annaUser',
            firstname: 'Anna',
            lastname: 'Koval',

            email: 'annaUser@gmail.com',

            avatar: 'https://example.com/avatar9.jpg',
        },
        articleId: '33',
        rate: 2,
        feedback:
            'Not very helpful. The information provided was vague and unclear.',
        id: 902,
    },
    {
        user: {
            id: 'MqonEyICTeMapkAPyPFH7w1E5l52',
            username: 'annaUser',
            firstname: 'Anna',
            lastname: 'Koval',

            email: 'annaUser@gmail.com',

            avatar: 'https://example.com/avatar9.jpg',
        },
        articleId: '58',
        rate: 1,
        feedback:
            "Disappointed with this article. It didn't meet my expectations.",
        id: 903,
    },
    {
        user: {
            id: 'MqonEyICTeMapkAPyPFH7w1E5l52',
            username: 'annaUser',
            firstname: 'Anna',
            lastname: 'Koval',

            email: 'annaUser@gmail.com',

            avatar: 'https://example.com/avatar9.jpg',
        },
        articleId: '102',
        rate: 2,
        feedback: 'The content felt rushed and lacked proper structure.',
        id: 904,
    },
    {
        user: {
            id: 'MqonEyICTeMapkAPyPFH7w1E5l52',
            username: 'annaUser',
            firstname: 'Anna',
            lastname: 'Koval',

            email: 'annaUser@gmail.com',

            avatar: 'https://example.com/avatar9.jpg',
        },
        articleId: '36',
        rate: 1,
        feedback: 'Very uninformative. I expected more from this topic.',
        id: 905,
    },
    {
        user: {
            id: '4g1WI5M1XIZU6VKvIfJBG7TzMsD3',
            username: 'alexManager',
            firstname: 'Alex',
            lastname: 'Johnson',
            email: 'alexManager@gmail.com',
            avatar: 'https://example.com/avatar11.jpg',
        },
        articleId: '63',
        rate: 5,
        feedback:
            'Absolutely fantastic article! It provided great insights and was very well written.',
        id: 1101,
    },
    {
        user: {
            id: '4g1WI5M1XIZU6VKvIfJBG7TzMsD3',
            username: 'alexManager',
            firstname: 'Alex',
            lastname: 'Johnson',
            email: 'alexManager@gmail.com',
            avatar: 'https://example.com/avatar11.jpg',
        },
        articleId: '151',
        rate: 5,
        feedback:
            'A must-read! The content is very relevant and easy to understand.',
        id: 1102,
    },
    {
        user: {
            id: '4g1WI5M1XIZU6VKvIfJBG7TzMsD3',
            username: 'alexManager',
            firstname: 'Alex',
            lastname: 'Johnson',
            email: 'alexManager@gmail.com',
            avatar: 'https://example.com/avatar11.jpg',
        },
        articleId: '166',
        rate: 5,
        feedback:
            'This article exceeded my expectations! Great job on the details.',
        id: 1103,
    },
    {
        user: {
            id: '4g1WI5M1XIZU6VKvIfJBG7TzMsD3',
            username: 'alexManager',
            firstname: 'Alex',
            lastname: 'Johnson',
            email: 'alexManager@gmail.com',
            avatar: 'https://example.com/avatar11.jpg',
        },
        articleId: '64',
        rate: 5,
        feedback: 'Very informative and engaging. I learned a lot!',
        id: 1104,
    },
    {
        user: {
            id: '4g1WI5M1XIZU6VKvIfJBG7TzMsD3',
            username: 'alexManager',
            firstname: 'Alex',
            lastname: 'Johnson',
            email: 'alexManager@gmail.com',
            avatar: 'https://example.com/avatar11.jpg',
        },
        articleId: '76',
        rate: 5,
        feedback:
            'Incredible read! The author did a great job breaking down complex topics.',
        id: 1105,
    },
    {
        user: {
            id: '4g1WI5M1XIZU6VKvIfJBG7TzMsD3',
            username: 'alexManager',
            firstname: 'Alex',
            lastname: 'Johnson',
            email: 'alexManager@gmail.com',
            avatar: 'https://example.com/avatar11.jpg',
        },
        articleId: '143',
        rate: 5,
        feedback:
            "One of the best articles I've read on this subject. Highly recommended!",
        id: 1106,
    },
    {
        user: {
            id: '4g1WI5M1XIZU6VKvIfJBG7TzMsD3',
            username: 'alexManager',
            firstname: 'Alex',
            lastname: 'Johnson',
            email: 'alexManager@gmail.com',
            avatar: 'https://example.com/avatar11.jpg',
        },
        articleId: '144',
        rate: 5,
        feedback: 'Outstanding! Very well-researched and presented. Thank you!',
        id: 1107,
    },
    {
        user: {
            id: '4g1WI5M1XIZU6VKvIfJBG7TzMsD3',
            username: 'alexManager',
            firstname: 'Alex',
            lastname: 'Johnson',
            email: 'alexManager@gmail.com',
            avatar: 'https://example.com/avatar11.jpg',
        },
        articleId: '145',
        rate: 5,
        feedback:
            'Fantastic insights! I really appreciate the depth of information provided.',
        id: 1108,
    },
    {
        user: {
            id: '4g1WI5M1XIZU6VKvIfJBG7TzMsD3',
            username: 'alexManager',
            firstname: 'Alex',
            lastname: 'Johnson',
            email: 'alexManager@gmail.com',
            avatar: 'https://example.com/avatar11.jpg',
        },
        articleId: '146',
        rate: 5,
        feedback: 'Exceptional quality! This article is a valuable resource.',
        id: 1109,
    },
    {
        user: {
            id: '4g1WI5M1XIZU6VKvIfJBG7TzMsD3',
            username: 'alexManager',
            firstname: 'Alex',
            lastname: 'Johnson',
            email: 'alexManager@gmail.com',
            avatar: 'https://example.com/avatar11.jpg',
        },
        articleId: '147',
        rate: 5,
        feedback: 'Loved it! The clarity and detail are impressive.',
        id: 1110,
    },
    {
        user: {
            id: '4g1WI5M1XIZU6VKvIfJBG7TzMsD3',
            username: 'alexManager',
            firstname: 'Alex',
            lastname: 'Johnson',
            email: 'alexManager@gmail.com',
            avatar: 'https://example.com/avatar11.jpg',
        },
        articleId: '65',
        rate: 5,
        feedback:
            'Brilliantly written! This article provides all the necessary information.',
        id: 1111,
    },
    {
        user: {
            id: '4g1WI5M1XIZU6VKvIfJBG7TzMsD3',
            username: 'alexManager',
            firstname: 'Alex',
            lastname: 'Johnson',
            email: 'alexManager@gmail.com',
            avatar: 'https://example.com/avatar11.jpg',
        },
        articleId: '77',
        rate: 5,
        feedback: 'Absolutely loved this! Engaging and very informative.',
        id: 1112,
    },
    {
        user: {
            id: '4g1WI5M1XIZU6VKvIfJBG7TzMsD3',
            username: 'alexManager',
            firstname: 'Alex',
            lastname: 'Johnson',
            email: 'alexManager@gmail.com',
            avatar: 'https://example.com/avatar11.jpg',
        },
        articleId: '89',
        rate: 5,
        feedback:
            'Incredible content! Thank you for sharing such valuable information.',
        id: 1113,
    },
    {
        user: {
            id: '4g1WI5M1XIZU6VKvIfJBG7TzMsD3',
            username: 'alexManager',
            firstname: 'Alex',
            lastname: 'Johnson',
            email: 'alexManager@gmail.com',
            avatar: 'https://example.com/avatar11.jpg',
        },
        articleId: '156',
        rate: 5,
        feedback:
            'Highly insightful! This article really opened my eyes to new concepts.',
        id: 1114,
    },
    {
        user: {
            id: '4g1WI5M1XIZU6VKvIfJBG7TzMsD3',
            username: 'alexManager',
            firstname: 'Alex',
            lastname: 'Johnson',
            email: 'alexManager@gmail.com',
            avatar: 'https://example.com/avatar11.jpg',
        },
        articleId: '157',
        rate: 5,
        feedback: 'Superb article! I enjoyed every bit of it.',
        id: 1115,
    },
    {
        user: {
            id: '4g1WI5M1XIZU6VKvIfJBG7TzMsD3',
            username: 'alexManager',
            firstname: 'Alex',
            lastname: 'Johnson',
            email: 'alexManager@gmail.com',
            avatar: 'https://example.com/avatar11.jpg',
        },
        articleId: '160',
        rate: 5,
        feedback: 'Fantastic work! A truly enlightening read.',
        id: 1116,
    },
    {
        user: {
            id: '4g1WI5M1XIZU6VKvIfJBG7TzMsD3',
            username: 'alexManager',
            firstname: 'Alex',
            lastname: 'Johnson',
            email: 'alexManager@gmail.com',
            avatar: 'https://example.com/avatar11.jpg',
        },
        articleId: '163',
        rate: 5,
        feedback:
            'Excellent! The author did a great job explaining everything.',
        id: 1117,
    },
    {
        user: {
            id: 'J3aB11HdHTZW6udzrrw2ymBhIOz1',
            username: 'mainAdmin',
            firstname: 'Maryna',
            lastname: 'Shavlak',
            email: 'mainAdmin@gmail.com',
            avatar: 'https://drive.google.com/thumbnail?id=1RD0jSAm8kdTLKa-Vr0daeE8T9-QcfPCa&sz=w1000',
        },
        articleId: '45',
        rate: 1,
        feedback:
            'Very disappointing. The content was poorly organized and not informative.',
        id: 2001,
    },
    {
        user: {
            id: 'J3aB11HdHTZW6udzrrw2ymBhIOz1',
            username: 'mainAdmin',
            firstname: 'Maryna',
            lastname: 'Shavlak',
            email: 'mainAdmin@gmail.com',
            avatar: 'https://drive.google.com/thumbnail?id=1RD0jSAm8kdTLKa-Vr0daeE8T9-QcfPCa&sz=w1000',
        },
        articleId: '66',
        rate: 1,
        feedback:
            'I expected more depth. This article felt superficial and unhelpful.',
        id: 2002,
    },
    {
        user: {
            id: 'J3aB11HdHTZW6udzrrw2ymBhIOz1',
            username: 'mainAdmin',
            firstname: 'Maryna',
            lastname: 'Shavlak',
            email: 'mainAdmin@gmail.com',
            avatar: 'https://drive.google.com/thumbnail?id=1RD0jSAm8kdTLKa-Vr0daeE8T9-QcfPCa&sz=w1000',
        },
        articleId: '47',
        rate: 1,
        feedback:
            'This was a waste of time. The points made were irrelevant and confusing.',
        id: 2003,
    },
    {
        user: {
            id: 'J3aB11HdHTZW6udzrrw2ymBhIOz1',
            username: 'mainAdmin',
            firstname: 'Maryna',
            lastname: 'Shavlak',
            email: 'mainAdmin@gmail.com',
            avatar: 'https://drive.google.com/thumbnail?id=1RD0jSAm8kdTLKa-Vr0daeE8T9-QcfPCa&sz=w1000',
        },
        articleId: '48',
        rate: 1,
        feedback:
            "Extremely unhelpful. The explanations were lacking and didn't clarify anything.",
        id: 2004,
    },
    {
        user: {
            id: 'J3aB11HdHTZW6udzrrw2ymBhIOz1',
            username: 'mainAdmin',
            firstname: 'Maryna',
            lastname: 'Shavlak',
            email: 'mainAdmin@gmail.com',
            avatar: 'https://drive.google.com/thumbnail?id=1RD0jSAm8kdTLKa-Vr0daeE8T9-QcfPCa&sz=w1000',
        },
        articleId: '49',
        rate: 1,
        feedback:
            "The article was too vague. I couldn't find any useful information.",
        id: 2005,
    },
    {
        user: {
            id: 'J3aB11HdHTZW6udzrrw2ymBhIOz1',
            username: 'mainAdmin',
            firstname: 'Maryna',
            lastname: 'Shavlak',
            email: 'mainAdmin@gmail.com',
            avatar: 'https://drive.google.com/thumbnail?id=1RD0jSAm8kdTLKa-Vr0daeE8T9-QcfPCa&sz=w1000',
        },
        articleId: '50',
        rate: 1,
        feedback:
            'Not worth reading. The writing was unclear and disorganized.',
        id: 2006,
    },
    {
        user: {
            id: 'J3aB11HdHTZW6udzrrw2ymBhIOz1',
            username: 'mainAdmin',
            firstname: 'Maryna',
            lastname: 'Shavlak',
            email: 'mainAdmin@gmail.com',
            avatar: 'https://drive.google.com/thumbnail?id=1RD0jSAm8kdTLKa-Vr0daeE8T9-QcfPCa&sz=w1000',
        },
        articleId: '51',
        rate: 1,
        feedback:
            'Very poor quality. The author seems to lack expertise on the subject.',
        id: 2007,
    },
    {
        user: {
            id: 'J3aB11HdHTZW6udzrrw2ymBhIOz1',
            username: 'mainAdmin',
            firstname: 'Maryna',
            lastname: 'Shavlak',
            email: 'mainAdmin@gmail.com',
            avatar: 'https://drive.google.com/thumbnail?id=1RD0jSAm8kdTLKa-Vr0daeE8T9-QcfPCa&sz=w1000',
        },
        articleId: '52',
        rate: 1,
        feedback:
            "I was really disappointed with this article. It didn't cover the topic properly.",
        id: 2008,
    },
    {
        user: {
            id: 'J3aB11HdHTZW6udzrrw2ymBhIOz1',
            username: 'mainAdmin',
            firstname: 'Maryna',
            lastname: 'Shavlak',
            email: 'mainAdmin@gmail.com',
            avatar: 'https://drive.google.com/thumbnail?id=1RD0jSAm8kdTLKa-Vr0daeE8T9-QcfPCa&sz=w1000',
        },
        articleId: '22',
        rate: 1,
        feedback:
            'This article was frustrating to read. It offered no valuable insights.',
        id: 2009,
    },
    {
        user: {
            id: 'tfs04ij0b5anHdw2qt6LghQsEfC3',
            username: 'katyaAdmin',
            firstname: 'Katya',
            lastname: 'Ivanova',
            email: 'katyaAdmin@gmail.com',
            avatar: 'https://example.com/avatar7.jpg',
        },
        articleId: '68',
        rate: 2,
        feedback: 'The content was not very engaging and lacked depth.',
        id: 3001,
    },
    {
        user: {
            id: 'tfs04ij0b5anHdw2qt6LghQsEfC3',
            username: 'katyaAdmin',
            firstname: 'Katya',
            lastname: 'Ivanova',
            email: 'katyaAdmin@gmail.com',
            avatar: 'https://example.com/avatar7.jpg',
        },
        articleId: '80',
        rate: 2,
        feedback:
            'I found the article to be somewhat useful, but overall it missed key points.',
        id: 3002,
    },
    {
        user: {
            id: 'tfs04ij0b5anHdw2qt6LghQsEfC3',
            username: 'katyaAdmin',
            firstname: 'Katya',
            lastname: 'Ivanova',
            email: 'katyaAdmin@gmail.com',
            avatar: 'https://example.com/avatar7.jpg',
        },
        articleId: '92',
        rate: 2,
        feedback:
            "The explanations were unclear and didn't provide enough detail.",
        id: 3003,
    },
    {
        user: {
            id: 'tfs04ij0b5anHdw2qt6LghQsEfC3',
            username: 'katyaAdmin',
            firstname: 'Katya',
            lastname: 'Ivanova',
            email: 'katyaAdmin@gmail.com',
            avatar: 'https://example.com/avatar7.jpg',
        },
        articleId: '108',
        rate: 2,
        feedback:
            'It was a decent attempt, but it fell short of my expectations.',
        id: 3004,
    },
    {
        user: {
            id: 'tfs04ij0b5anHdw2qt6LghQsEfC3',
            username: 'katyaAdmin',
            firstname: 'Katya',
            lastname: 'Ivanova',
            email: 'katyaAdmin@gmail.com',
            avatar: 'https://example.com/avatar7.jpg',
        },
        articleId: '123',
        rate: 2,
        feedback: 'I appreciate the effort, but the execution was lacking.',
        id: 3005,
    },
    {
        user: {
            id: 'qkcVyIbnjYeEbaYVKGhtZrny7GC3',
            username: 'sarahManager',
            firstname: 'Sarah',
            lastname: 'Cooper',

            email: 'sarahManager@gmail.com',

            avatar: 'https://example.com/avatar20.jpg',
        },
        articleId: '121',
        rate: 2,
        feedback: 'The article was poorly structured and hard to follow.',
        id: 4001,
    },
    {
        user: {
            id: 'qkcVyIbnjYeEbaYVKGhtZrny7GC3',
            username: 'sarahManager',
            firstname: 'Sarah',
            lastname: 'Cooper',

            email: 'sarahManager@gmail.com',

            avatar: 'https://example.com/avatar20.jpg',
        },
        articleId: '140',
        rate: 2,
        feedback:
            'I expected more depth and insight; it felt very superficial.',
        id: 4002,
    },
    {
        user: {
            id: 'qkcVyIbnjYeEbaYVKGhtZrny7GC3',
            username: 'sarahManager',
            firstname: 'Sarah',
            lastname: 'Cooper',

            email: 'sarahManager@gmail.com',

            avatar: 'https://example.com/avatar20.jpg',
        },
        articleId: '174',
        rate: 2,
        feedback: "The content didn't meet my expectations and lacked clarity.",
        id: 4003,
    },
    {
        user: {
            id: 'ObGe2X8MNTde2RSffQgE0Jpxek72',
            username: 'lucyAdmin',
            firstname: 'Lucy',
            lastname: 'Brown',

            email: 'lucyAdmin@gmail.com',

            avatar: 'https://example.com/avatar10.jpg',
        },
        articleId: '103',
        rate: 4,
        feedback:
            'Great insights and well-researched content. I found it very informative!',
        id: 5001,
    },
    {
        user: {
            id: 'ObGe2X8MNTde2RSffQgE0Jpxek72',
            username: 'lucyAdmin',
            firstname: 'Lucy',
            lastname: 'Brown',

            email: 'lucyAdmin@gmail.com',

            avatar: 'https://example.com/avatar10.jpg',
        },
        articleId: '119',
        rate: 4,
        feedback: 'Good read! The examples provided were helpful and relevant.',
        id: 5002,
    },
    {
        user: {
            id: 'ObGe2X8MNTde2RSffQgE0Jpxek72',
            username: 'lucyAdmin',
            firstname: 'Lucy',
            lastname: 'Brown',

            email: 'lucyAdmin@gmail.com',

            avatar: 'https://example.com/avatar10.jpg',
        },
        articleId: '132',
        rate: 4,
        feedback:
            'Overall, a solid article. I appreciate the clear explanations.',
        id: 5003,
    },
    {
        user: {
            id: 'ObGe2X8MNTde2RSffQgE0Jpxek72',
            username: 'lucyAdmin',
            firstname: 'Lucy',
            lastname: 'Brown',

            email: 'lucyAdmin@gmail.com',

            avatar: 'https://example.com/avatar10.jpg',
        },
        articleId: '173',
        rate: 4,
        feedback: 'Well-written and engaging. It kept my attention throughout!',
        id: 5004,
    },
];

async function uploadRatings(ratings: ArticleRating[]) {
    try {
        // @ts-ignore
        const promises = [];
        ratings.forEach((rating) => {
            const ratingDoc = doc(ratingsCollection);
            promises.push(setDoc(ratingDoc, rating));
        });

        // @ts-ignore
        await Promise.all(promises); // Wait for all uploads to complete
        console.log('Ratings uploaded successfully!');
    } catch (error) {
        console.error('Error uploading ratings:', error);
    }
}

// async function uploadRatings(ratings: ArticleRating[]) {
//     try {
//         // @ts-ignore
//         const promises = [];
//         ratings.forEach((rating) => {
//             const ratingDoc = doc(ratingsCollection);
//             promises.push(setDoc(ratingDoc, rating));
//         });
//
//         // @ts-ignore
//         await Promise.all(promises); // Wait for all uploads to complete
//         console.log('Ratings uploaded successfully!');
//     } catch (error) {
//         console.error('Error uploading ratings:', error);
//     }
// }

const AboutPage = memo(() => {
    const { t } = useTranslation('about');
    // uploadUsers(users);
    // uploadRatings(ratings);
    return <Page data-testid="AboutPage">{t('Про сайт')}</Page>;
});

export default AboutPage;

// const users = [
//     {
//         id: 'J3aB11HdHTZW6udzrrw2ymBhIOz1',
//         username: 'mainAdmin',
//         firstname: 'Maryna',
//         lastname: 'Shavlak',
//         age: '30',
//         currency: Currency.EUR,
//         country: Country.Ukraine,
//         city: 'Kharkiv',
//         email: 'mainAdmin@gmail.com',
//         roles: [UserRole.ADMIN],
//         features: {
//             isArticleRatingEnabled: true,
//             isAppRedesigned: true,
//         },
//         jsonSettings: {
//             theme: Theme.ORANGE,
//             isFirstVisit: true,
//             settingsPageHasBeenOpen: false,
//             isArticlesPageWasOpened: true,
//         },
//         avatar: 'https://drive.google.com/thumbnail?id=1RD0jSAm8kdTLKa-Vr0daeE8T9-QcfPCa&sz=w1000',
//     },
//     {
//         id: 'vvfdFnPQMLVkrnCBjsTZcPsUq9U2',
//         username: 'mainUser',
//         firstname: 'Tetiana',
//         lastname: 'Shavlak',
//         age: '54',
//         currency: Currency.UAH,
//         country: Country.Ukraine,
//         city: 'Kyiv',
//         email: 'mainUser@gmail.com',
//         roles: [UserRole.USER],
//         features: {
//             isArticleRatingEnabled: false,
//             isAppRedesigned: false,
//         },
//         jsonSettings: {
//             isArticlesPageWasOpened: true,
//             theme: Theme.LIGHT,
//         },
//         avatar: 'https://drive.google.com/thumbnail?id=1J1xUPYYkJeOsBTpDuf36vsV7UfxlM2uG&sz=w1000',
//     },
//     {
//         id: 'zM4UyVgfKNf2vrf5sXmBIxA5QOl2',
//         username: 'mainManager',
//         firstname: 'Maxim',
//         lastname: 'Shavlak',
//         age: '27',
//         currency: Currency.EUR,
//         country: Country.Ukraine,
//         city: 'Kyiv',
//         email: 'mainManager@gmail.com',
//         roles: [UserRole.MANAGER],
//         features: {
//             isArticleRatingEnabled: false,
//             isAppRedesigned: false,
//         },
//         avatar: 'https://st3.depositphotos.com/1071184/13782/v/450/depositphotos_137825710-stock-illustration-business-person-analyzing-financial-statistics.jpg',
//     },
//     {
//         id: 'nwPyI60mR9XWY3ozVuRGItx08PY2',
//         username: 'testuser',
//         firstname: 'Test',
//         lastname: UserRole.USER,
//         age: '45',
//         currency: Currency.EUR,
//         country: Country.Ukraine,
//         city: 'Kharkiv',
//         email: 'testuser@gmail.com',
//         roles: [UserRole.ADMIN],
//         features: {
//             isArticleRatingEnabled: true,
//             isAppRedesigned: true,
//         },
//         jsonSettings: {
//             isArticlesPageWasOpened: true,
//             theme: Theme.ORANGE,
//         },
//         avatar: 'https://s1.1zoom.ru/big3/992/367659-alexfas01.jpg',
//     },
//     {
//         id: 'hdkjUiQhjoPIVMqfORNbvEHm4Wg1',
//         username: 'testuser2',
//         firstname: 'Test2',
//         lastname: 'User2',
//         age: '25',
//         currency: Currency.EUR,
//         country: Country.Ukraine,
//         city: 'Kharkiv',
//         email: 'testuser2@gmail.com',
//         roles: [UserRole.ADMIN],
//         features: {
//             isArticleRatingEnabled: false,
//             isAppRedesigned: false,
//         },
//         jsonSettings: {
//             isArticlesPageWasOpened: true,
//             theme: Theme.ORANGE,
//         },
//         avatar: 'https://example.com/avatar6.png',
//     },
//     {
//         id: 'meuKZ9Dc5ucUuMn72esjwMi9Azl2',
//         username: 'markUser',
//         firstname: 'Mark',
//         lastname: 'Smith',
//         age: '28',
//         currency: Currency.USD,
//         country: Country.Poland,
//         city: 'Warsaw',
//         email: 'markUser@gmail.com',
//         roles: [UserRole.USER],
//         features: {
//             isArticleRatingEnabled: false,
//             isAppRedesigned: false,
//         },
//         jsonSettings: {
//             isArticlesPageWasOpened: false,
//             theme: Theme.LIGHT,
//         },
//         avatar: 'https://example.com/avatar6.png',
//     },
//     {
//         id: 'tfs04ij0b5anHdw2qt6LghQsEfC3',
//         username: 'katyaAdmin',
//         firstname: 'Katya',
//         lastname: 'Ivanova',
//         age: '35',
//         currency: Currency.UAH,
//         country: Country.Ukraine,
//         city: 'Lviv',
//         email: 'katyaAdmin@gmail.com',
//         roles: [UserRole.ADMIN],
//         features: {
//             isArticleRatingEnabled: true,
//             isAppRedesigned: true,
//         },
//         jsonSettings: {
//             isArticlesPageWasOpened: true,
//             theme: Theme.DARK,
//         },
//         avatar: 'https://example.com/avatar7.jpg',
//     },
//     {
//         id: 'd6RJwaIJmjbHTV2PdSg04DpPjWl1',
//         username: 'johnManager',
//         firstname: 'John',
//         lastname: 'Doe',
//         age: '40',
//         currency: Currency.USD,
//         country: Country.Ireland,
//         city: 'Dublin',
//         email: 'johnManager@gmail.com',
//         roles: [UserRole.MANAGER],
//         features: {
//             isArticleRatingEnabled: false,
//             isAppRedesigned: false,
//         },
//         jsonSettings: {
//             isArticlesPageWasOpened: true,
//             theme: Theme.LIGHT,
//         },
//         avatar: 'https://example.com/avatar8.jpg',
//     },
//     {
//         id: 'MqonEyICTeMapkAPyPFH7w1E5l52',
//         username: 'annaUser',
//         firstname: 'Anna',
//         lastname: 'Koval',
//         age: '22',
//         currency: Currency.EUR,
//         country: Country.Germany,
//         city: 'Berlin',
//         email: 'annaUser@gmail.com',
//         roles: [UserRole.USER],
//         features: {
//             isArticleRatingEnabled: false,
//             isAppRedesigned: false,
//         },
//         jsonSettings: {
//             isArticlesPageWasOpened: true,
//             theme: Theme.ORANGE,
//         },
//         avatar: 'https://example.com/avatar9.jpg',
//     },
//     {
//         id: 'ObGe2X8MNTde2RSffQgE0Jpxek72',
//         username: 'lucyAdmin',
//         firstname: 'Lucy',
//         lastname: 'Brown',
//         age: '30',
//         currency: Currency.EUR,
//         country: Country.Poland,
//         city: 'Krakow',
//         email: 'lucyAdmin@gmail.com',
//         roles: [UserRole.ADMIN],
//         features: {
//             isArticleRatingEnabled: true,
//             isAppRedesigned: true,
//         },
//         jsonSettings: {
//             isArticlesPageWasOpened: true,
//             theme: Theme.LIGHT,
//         },
//         avatar: 'https://example.com/avatar10.jpg',
//     },
//     {
//         id: '4g1WI5M1XIZU6VKvIfJBG7TzMsD3',
//         username: 'alexManager',
//         firstname: 'Alex',
//         lastname: 'Johnson',
//         age: '37',
//         currency: Currency.USD,
//         country: Country.Croatia,
//         city: 'Zagreb',
//         email: 'alexManager@gmail.com',
//         roles: [UserRole.MANAGER],
//         features: {
//             isArticleRatingEnabled: false,
//             isAppRedesigned: false,
//         },
//         jsonSettings: {
//             isArticlesPageWasOpened: false,
//             theme: Theme.DARK,
//         },
//         avatar: 'https://example.com/avatar11.jpg',
//     },
//     {
//         id: '4juq0tzGf5fNMCXCRFOa5mvFO5O2',
//         username: 'leoUser',
//         firstname: 'Leo',
//         lastname: 'Mikhailov',
//         age: '29',
//         currency: Currency.UAH,
//         country: Country.Ukraine,
//         city: 'Odessa',
//         email: 'leoUser@gmail.com',
//         roles: [UserRole.USER],
//         features: {
//             isArticleRatingEnabled: true,
//             isAppRedesigned: false,
//         },
//         jsonSettings: {
//             isArticlesPageWasOpened: true,
//             theme: Theme.ORANGE,
//         },
//         avatar: 'https://example.com/avatar12.jpg',
//     },
//     {
//         id: '9Dpc2pFoeORLyQrxHlGIbe5wjbf2',
//         username: 'janeAdmin',
//         firstname: 'Jane',
//         lastname: 'Williams',
//         age: '33',
//         currency: Currency.USD,
//         country: Country.Ireland,
//         city: 'Cork',
//         email: 'janeAdmin@gmail.com',
//         roles: [UserRole.ADMIN],
//         features: {
//             isArticleRatingEnabled: true,
//             isAppRedesigned: true,
//         },
//         jsonSettings: {
//             isArticlesPageWasOpened: true,
//             theme: Theme.DARK,
//         },
//         avatar: 'https://example.com/avatar13.jpg',
//     },
//     {
//         id: 'BrKES0pOcxcgYBUpKmZxBzqKFhl1',
//         username: 'peterManager',
//         firstname: 'Peter',
//         lastname: 'Muller',
//         age: '42',
//         currency: Currency.EUR,
//         country: Country.Germany,
//         city: 'Hamburg',
//         email: 'peterManager@gmail.com',
//         roles: [UserRole.MANAGER],
//         features: {
//             isArticleRatingEnabled: false,
//             isAppRedesigned: false,
//         },
//         jsonSettings: {
//             isArticlesPageWasOpened: true,
//             theme: Theme.LIGHT,
//         },
//         avatar: 'https://example.com/avatar14.jpg',
//     },
//     {
//         id: 'Ue15ycXTpxVhCZ2eJoOVYaArKEa2',
//         username: 'mariaUser',
//         firstname: 'Maria',
//         lastname: 'Petrova',
//         age: '27',
//         currency: Currency.UAH,
//         country: Country.Ukraine,
//         city: 'Kyiv',
//         email: 'mariaUser@gmail.com',
//         roles: [UserRole.USER],
//         features: {
//             isArticleRatingEnabled: true,
//             isAppRedesigned: false,
//         },
//         jsonSettings: {
//             isArticlesPageWasOpened: true,
//             theme: Theme.ORANGE,
//         },
//         avatar: 'https://example.com/avatar15.jpg',
//     },
//     {
//         id: 'KXv8oUPLQeUXSzoXOWJV4nw47CG2',
//         username: 'maxAdmin',
//         firstname: 'Max',
//         lastname: 'Gordon',
//         age: '38',
//         currency: Currency.EUR,
//         country: Country.Poland,
//         city: 'Poznan',
//         email: 'maxAdmin@gmail.com',
//         roles: [UserRole.ADMIN],
//         features: {
//             isArticleRatingEnabled: true,
//             isAppRedesigned: true,
//         },
//         jsonSettings: {
//             isArticlesPageWasOpened: true,
//             theme: Theme.DARK,
//         },
//         avatar: 'https://example.com/avatar16.jpg',
//     },
//     {
//         id: '18zZBJnmEqWJNwGj2SvbNiNVXol1',
//         username: 'nickManager',
//         firstname: 'Nick',
//         lastname: 'Garcia',
//         age: '41',
//         currency: Currency.USD,
//         country: Country.Croatia,
//         city: 'Split',
//         email: 'nickManager@gmail.com',
//         roles: [UserRole.MANAGER],
//         features: {
//             isArticleRatingEnabled: false,
//             isAppRedesigned: false,
//         },
//         jsonSettings: {
//             isArticlesPageWasOpened: true,
//             theme: Theme.LIGHT,
//         },
//         avatar: 'https://example.com/avatar17.jpg',
//     },
//     {
//         id: 'mYX7XszmZJgEUSU9eeKDJYbP7P22',
//         username: 'claraUser',
//         firstname: 'Clara',
//         lastname: 'Santos',
//         age: '32',
//         currency: Currency.EUR,
//         country: Country.Germany,
//         city: 'Munich',
//         email: 'claraUser@gmail.com',
//         roles: [UserRole.USER],
//         features: {
//             isArticleRatingEnabled: true,
//             isAppRedesigned: false,
//         },
//         jsonSettings: {
//             isArticlesPageWasOpened: true,
//             theme: Theme.ORANGE,
//         },
//         avatar: 'https://example.com/avatar18.jpg',
//     },
//     {
//         id: 'Str49JTKBAOoaEhM8XeQLLLPPDp2',
//         username: 'tomAdmin',
//         firstname: 'Tom',
//         lastname: 'Anderson',
//         age: '36',
//         currency: Currency.USD,
//         country: Country.Ireland,
//         city: 'Galway',
//         email: 'tomAdmin@gmail.com',
//         roles: [UserRole.ADMIN],
//         features: {
//             isArticleRatingEnabled: true,
//             isAppRedesigned: true,
//         },
//         jsonSettings: {
//             isArticlesPageWasOpened: true,
//             theme: Theme.DARK,
//         },
//         avatar: 'https://example.com/avatar19.jpg',
//     },
//     {
//         id: 'qkcVyIbnjYeEbaYVKGhtZrny7GC3',
//         username: 'sarahManager',
//         firstname: 'Sarah',
//         lastname: 'Cooper',
//         age: '39',
//         currency: Currency.EUR,
//         country: Country.Croatia,
//         city: 'Rijeka',
//         email: 'sarahManager@gmail.com',
//         roles: [UserRole.MANAGER],
//         features: {
//             isArticleRatingEnabled: false,
//             isAppRedesigned: false,
//         },
//         jsonSettings: {
//             isArticlesPageWasOpened: true,
//             theme: Theme.LIGHT,
//         },
//         avatar: 'https://example.com/avatar20.jpg',
//     },
//     {
//         id: 'V4wTjlJxpYdllrdmfIaprloLcrG3',
//         username: 'danielUser',
//         firstname: 'Daniel',
//         lastname: 'Adams',
//         age: '29',
//         currency: Currency.USD,
//         country: Country.USA,
//         city: 'New York',
//         email: 'danielUser@gmail.com',
//         roles: [UserRole.USER],
//         features: {
//             isArticleRatingEnabled: false,
//             isAppRedesigned: false,
//         },
//         jsonSettings: {
//             isArticlesPageWasOpened: false,
//             theme: Theme.LIGHT,
//         },
//         avatar: 'https://example.com/avatar21.jpg',
//     },
//     {
//         id: 'lfhMI4VQqLZZmVv3fPq0yT27NLQ2',
//         username: 'victorAdmin',
//         firstname: 'Victor',
//         lastname: 'Johnson',
//         age: '42',
//         currency: Currency.EUR,
//         country: Country.England,
//         city: 'London',
//         email: 'victorAdmin@gmail.com',
//         roles: [UserRole.ADMIN],
//         features: {
//             isArticleRatingEnabled: true,
//             isAppRedesigned: true,
//         },
//         jsonSettings: {
//             isArticlesPageWasOpened: true,
//             theme: Theme.ORANGE,
//         },
//         avatar: 'https://example.com/avatar22.jpg',
//     },
//     {
//         id: 'KHODlvsuABMwBACybNV9FIIO07k1',
//         username: 'olgaManager',
//         firstname: 'Olga',
//         lastname: 'Ivanova',
//         age: '37',
//         currency: Currency.EUR,
//         country: Country.Germany,
//         city: 'Frankfurt',
//         email: 'olgaManager@gmail.com',
//         roles: [UserRole.MANAGER],
//         features: {
//             isArticleRatingEnabled: false,
//             isAppRedesigned: false,
//         },
//         jsonSettings: {
//             isArticlesPageWasOpened: true,
//             theme: Theme.LIGHT,
//         },
//         avatar: 'https://example.com/avatar23.jpg',
//     },
//     {
//         id: 'Hrsg32Jr4uQS7P4HusvSAQ7R8Zt2',
//         username: 'emmaUser',
//         firstname: 'Emma',
//         lastname: 'Anderson',
//         age: '26',
//         currency: Currency.USD,
//         country: Country.Canada,
//         city: 'Toronto',
//         email: 'emmaUser@gmail.com',
//         roles: [UserRole.USER],
//         features: {
//             isArticleRatingEnabled: true,
//             isAppRedesigned: false,
//         },
//         jsonSettings: {
//             isArticlesPageWasOpened: true,
//             theme: Theme.ORANGE,
//         },
//         avatar: 'https://example.com/avatar24.jpg',
//     },
//     {
//         id: 'hWB4U7cCG1VHNBWX8i7OQ0qqD0o2',
//         username: 'jasonAdmin',
//         firstname: 'Jason',
//         lastname: 'Gordon',
//         age: '45',
//         currency: Currency.USD,
//         country: Country.USA,
//         city: 'Los Angeles',
//         email: 'jasonAdmin@gmail.com',
//         roles: [UserRole.ADMIN],
//         features: {
//             isArticleRatingEnabled: true,
//             isAppRedesigned: true,
//         },
//         jsonSettings: {
//             isArticlesPageWasOpened: true,
//             theme: Theme.DARK,
//         },
//         avatar: 'https://example.com/avatar25.jpg',
//     },
//     {
//         id: 'bH4QePW3zDOYqHch98cXBLlpYK52',
//         username: 'lindaManager',
//         firstname: 'Linda',
//         lastname: 'Muller',
//         age: '33',
//         currency: Currency.EUR,
//         country: Country.Austria,
//         city: 'Vienna',
//         email: 'lindaManager@gmail.com',
//         roles: [UserRole.MANAGER],
//         features: {
//             isArticleRatingEnabled: false,
//             isAppRedesigned: false,
//         },
//         jsonSettings: {
//             isArticlesPageWasOpened: true,
//             theme: Theme.LIGHT,
//         },
//         avatar: 'https://example.com/avatar26.jpg',
//     },
//     {
//         id: 'jkoqxfXfRKUBgGQrvyL8J3QDDVm2',
//         username: 'henryUser',
//         firstname: 'Henry',
//         lastname: 'Williams',
//         age: '31',
//         currency: Currency.USD,
//         country: Country.USA,
//         city: 'San Francisco',
//         email: 'henryUser@gmail.com',
//         roles: [UserRole.USER],
//         features: {
//             isArticleRatingEnabled: false,
//             isAppRedesigned: false,
//         },
//         jsonSettings: {
//             isArticlesPageWasOpened: false,
//             theme: Theme.LIGHT,
//         },
//         avatar: 'https://example.com/avatar27.jpg',
//     },
// ];
// const usersCollection = collection(firestore, 'users');
//
// async function uploadUsers(users: User[]) {
//     try {
//         // @ts-ignore
//         const promises = [];
//         users.forEach((user) => {
//             const userDoc = doc(usersCollection);
//             promises.push(setDoc(userDoc, user));
//         });
//
//         // @ts-ignore
//         await Promise.all(promises); // Wait for all uploads to complete
//         console.log('Articles uploaded successfully!');
//     } catch (error) {
//         console.error('Error uploading articles:', error);
//     }
// }
