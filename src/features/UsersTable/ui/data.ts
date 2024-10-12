const STATUS_ON_DECK = { id: 1, name: 'On Deck', color: 'blue' };
const STATUS_IN_PROGRESS = {
    id: 2,
    name: 'In Progress',
    color: 'yellow',
};
const STATUS_TESTING = { id: 3, name: 'Testing', color: 'pink' };
const STATUS_DEPLOYED = { id: 4, name: 'Deployed', color: 'green' };
export const STATUSES = [
    STATUS_ON_DECK,
    STATUS_IN_PROGRESS,
    STATUS_TESTING,
    STATUS_DEPLOYED,
];

const DATA = [
    {
        task: 'Add a New Feature',
        status: STATUS_ON_DECK,
        due: new Date('2023/10/15'),
        notes: 'This is a note',
    },
    {
        task: 'Write Integration Tests',
        status: STATUS_IN_PROGRESS,
        due: null,
        notes: 'Use Jest',
    },
    {
        task: 'Add Instagram Integration',
        status: STATUS_DEPLOYED,
        due: null,
        notes: '',
    },
    {
        task: 'Cleanup Database',
        status: STATUS_DEPLOYED,
        // status: null,
        due: new Date('2023/02/15'),
        notes: 'Remove old data',
    },
    {
        task: 'Refactor API Endpoints',
        status: STATUS_TESTING,
        due: null,
        notes: '',
    },
    {
        task: 'Add Documentation to API',
        status: STATUS_IN_PROGRESS,
        // status: null,
        due: new Date('2023/09/12'),
        notes: 'Add JS Docs to all endpoints',
    },
    {
        task: 'Update NPM Packages',
        status: STATUS_IN_PROGRESS,
        due: null,
        notes: 'Upgrade React & Chakra UI',
    },
    {
        task: 'Optimize Database Queries',
        status: STATUS_IN_PROGRESS,
        due: null,
        notes: 'Optimize slow queries.',
    },
    {
        task: 'Implement User Authentication',
        status: STATUS_ON_DECK,
        due: new Date('2023/11/08'),
        notes: 'OAuth2 and JWT auth.',
    },
    {
        task: 'Design User Interface Mockups',
        status: STATUS_IN_PROGRESS,
        // status: null,
        due: new Date('2023/09/30'),
        notes: 'Create UI mockups.',
    },
    {
        task: 'Fix Cross-Browser Compatibility Issues',
        status: STATUS_IN_PROGRESS,
        due: null,
        notes: 'Resolve browser issues.',
    },
    {
        task: 'Perform Security Audit',
        status: STATUS_IN_PROGRESS,
        // status: null,
        due: new Date('2023/10/22'),
        notes: 'Security audit.',
    },
    {
        task: 'Create User Onboarding Tutorial',
        status: STATUS_ON_DECK,
        due: new Date('2023/11/15'),
        notes: 'User onboarding guide.',
    },
    {
        task: 'Optimize Frontend Performance',
        status: STATUS_IN_PROGRESS,
        due: null,
        notes: 'Improve performance.',
    },
    {
        task: 'Conduct Code Review',
        status: STATUS_ON_DECK,
        // status: null,
        due: new Date('2023/10/05'),
        notes: 'Code review meeting.',
    },
    {
        task: 'Implement Continuous Integration',
        status: STATUS_ON_DECK,
        due: new Date('2023/11/01'),
        notes: 'Set up CI/CD pipelines.',
    },
    {
        task: 'Migrate to Cloud Hosting',
        status: STATUS_DEPLOYED,
        due: null,
        notes: 'Cloud migration.',
    },
    {
        task: 'Create User Feedback Survey',
        status: STATUS_DEPLOYED,
        // status: null,
        due: new Date('2023/09/25'),
        notes: 'User feedback survey.',
    },
    {
        task: 'Update User Documentation',
        status: STATUS_TESTING,
        due: null,
        notes: 'Revise documentation.',
    },
    {
        task: 'Bug Fixing and QA Testing',
        status: STATUS_DEPLOYED,
        // status: null,
        due: new Date('2023/10/10'),
        notes: 'Fix bugs and QA.',
    },
    {
        task: 'Implement Mobile App Support',
        status: STATUS_IN_PROGRESS,
        due: null,
        notes: 'Add mobile support.',
    },
    {
        task: 'Refine User Permission System',
        status: STATUS_DEPLOYED,
        // status: null,
        due: new Date('2023/09/18'),
        notes: 'Enhance permissions.',
    },
];

export default DATA;
