const ROLE_ADMIN = { id: 1, name: 'Admin', color: '#f77' };
const ROLE_USER = {
    id: 2,
    name: 'User',
    color: '#62de85',
};
const ROLE_MANAGER = { id: 3, name: 'Manager', color: '#5ed3f3' };
export const USER_ROLE_OPTIONS = [ROLE_ADMIN, ROLE_USER, ROLE_MANAGER];

const DATA = [
    {
        task: 'Add a New Feature',
        role: ROLE_ADMIN,
        due: new Date('2023/10/15'),
        notes: 'This is a note',
    },
    {
        task: 'Write Integration Tests',
        role: ROLE_USER,
        due: null,
        notes: 'Use Jest',
    },
    {
        task: 'Add Instagram Integration',
        role: ROLE_MANAGER,
        due: null,
        notes: '',
    },
    // {
    //     task: 'Cleanup Database',
    //     role: ROLE_MANAGER,
    //     // role: null,
    //     due: new Date('2023/02/15'),
    //     notes: 'Remove old data',
    // },
    // {
    //     task: 'Refactor API Endpoints',
    //     role: ROLE_MANAGER,
    //     due: null,
    //     notes: '',
    // },
    // {
    //     task: 'Add Documentation to API',
    //     role: ROLE_USER,
    //     // role: null,
    //     due: new Date('2023/09/12'),
    //     notes: 'Add JS Docs to all endpoints',
    // },
    // {
    //     task: 'Update NPM Packages',
    //     role: ROLE_USER,
    //     due: null,
    //     notes: 'Upgrade React & Chakra UI',
    // },
    // {
    //     task: 'Optimize Database Queries',
    //     role: ROLE_USER,
    //     due: null,
    //     notes: 'Optimize slow queries.',
    // },
    // {
    //     task: 'Implement User Authentication',
    //     role: ROLE_ADMIN,
    //     due: new Date('2023/11/08'),
    //     notes: 'OAuth2 and JWT auth.',
    // },
    // {
    //     task: 'Design User Interface Mockups',
    //     role: ROLE_USER,
    //     // role: null,
    //     due: new Date('2023/09/30'),
    //     notes: 'Create UI mockups.',
    // },
    // {
    //     task: 'Fix Cross-Browser Compatibility Issues',
    //     role: ROLE_USER,
    //     due: null,
    //     notes: 'Resolve browser issues.',
    // },
    // {
    //     task: 'Perform Security Audit',
    //     role: ROLE_USER,
    //     // role: null,
    //     due: new Date('2023/10/22'),
    //     notes: 'Security audit.',
    // },
    // {
    //     task: 'Create User Onboarding Tutorial',
    //     role: ROLE_ADMIN,
    //     due: new Date('2023/11/15'),
    //     notes: 'User onboarding guide.',
    // },
    // {
    //     task: 'Optimize Frontend Performance',
    //     role: ROLE_USER,
    //     due: null,
    //     notes: 'Improve performance.',
    // },
    // {
    //     task: 'Conduct Code Review',
    //     role: ROLE_ADMIN,
    //     // role: null,
    //     due: new Date('2023/10/05'),
    //     notes: 'Code review meeting.',
    // },
    // {
    //     task: 'Implement Continuous Integration',
    //     role: ROLE_ADMIN,
    //     due: new Date('2023/11/01'),
    //     notes: 'Set up CI/CD pipelines.',
    // },
    // {
    //     task: 'Migrate to Cloud Hosting',
    //     role: ROLE_USER,
    //     due: null,
    //     notes: 'Cloud migration.',
    // },
    // {
    //     task: 'Create User Feedback Survey',
    //     role: ROLE_USER,
    //     // role: null,
    //     due: new Date('2023/09/25'),
    //     notes: 'User feedback survey.',
    // },
    // {
    //     task: 'Update User Documentation',
    //     role: ROLE_MANAGER,
    //     due: null,
    //     notes: 'Revise documentation.',
    // },
    // {
    //     task: 'Bug Fixing and QA Testing',
    //     role: ROLE_USER,
    //     // role: null,
    //     due: new Date('2023/10/10'),
    //     notes: 'Fix bugs and QA.',
    // },
    // {
    //     task: 'Implement Mobile App Support',
    //     role: ROLE_USER,
    //     due: null,
    //     notes: 'Add mobile support.',
    // },
    // {
    //     task: 'Refine User Permission System',
    //     role: ROLE_USER,
    //     // role: null,
    //     due: new Date('2023/09/18'),
    //     notes: 'Enhance permissions.',
    // },
];

export default DATA;
