import { HRInterviewQACategory } from '../types/hrInterviewQA';

export const HRInterviewQACategories: HRInterviewQACategory[] = [
    {
        key: 'introductionAndPersonalTraits',
        label: 'Introduction and Personal Traits',
        subcategories: [
            { key: 'describeYourself', label: 'Describe yourself' },
            {
                key: 'strengthsWeaknesses',
                label: 'Strengths, weaknesses, superpower, uniqueness',
            },
        ],
    },
    {
        key: 'motivationAndCareerFit',
        label: 'Motivation and Career Fit',
        subcategories: [
            { key: 'whyIT', label: 'Why IT?' },
            {
                key: 'aboutCompany',
                label: 'About the company, reasons for applying',
            },
        ],
    },
    {
        key: 'roleAndContribution',
        label: 'Role and Contribution',
        subcategories: [
            {
                key: 'contributionToRole',
                label: 'Your contribution to the role and company',
            },
            { key: 'goalsPlans', label: 'Goals and plans' },
        ],
    },
    {
        key: 'experienceAndGrowth',
        label: 'Experience and Growth',
        subcategories: [
            { key: 'achievementsMistakes', label: 'Achievements and mistakes' },
            { key: 'myDevelopment', label: 'My development' },
        ],
    },
    {
        key: 'teamworkAndLeadership',
        label: 'Teamwork and Leadership',
        subcategories: [
            { key: 'initiative', label: 'Initiative' },
            { key: 'teamLeadership', label: 'Team and leadership' },
        ],
    },
    {
        key: 'challengesAndAdaptability',
        label: 'Challenges and Adaptability',
        subcategories: [
            { key: 'criticismFeedback', label: 'Criticism, feedback' },
            {
                key: 'stressAndUnexpected',
                label: 'Stress, pressure, flexibility, unexpected challenges',
            },
        ],
    },
    {
        key: 'workEnvironmentAndRelationships',
        label: 'Work Environment and Relationships',
        subcategories: [
            {
                key: 'conflictWithBoss',
                label: 'Conflicts and disagreements with boss',
            },
            { key: 'coworker', label: 'Coworkers' },
        ],
    },
    {
        key: 'externalPerceptionAndCareer',
        label: 'External Perception and Career',
        subcategories: [
            { key: 'previousWork', label: 'Previous work' },
            {
                key: 'othersOpinion',
                label: "Another people's opinion about you",
            },
        ],
    },
    {
        key: 'miscellaneous',
        label: 'Miscellaneous',
        subcategories: [
            { key: 'customersClients', label: 'Customers and clients' },
            { key: 'interestingQuestions', label: 'Interesting questions' },
            { key: 'generalQuestions', label: 'General questions' },
            { key: 'salaryExpectations', label: 'Salary expectations' },
        ],
    },
];
