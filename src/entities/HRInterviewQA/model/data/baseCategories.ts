import { BaseCategory } from '../types/baseCategory';

export const baseCategories: BaseCategory[] = [
    {
        key: 'introductionAndPersonalTraits',
        subcategories: [
            { key: 'describeYourself' },
            { key: 'strengthsWeaknesses' },
            { key: 'hobbiesAndFamily' },
        ],
    },
    {
        key: 'motivationAndCareerFit',
        subcategories: [
            { key: 'whyIT' },
            { key: 'aboutCompany' },
            { key: 'motivationGeneral' },
            { key: 'inspirations' },
        ],
    },
    {
        key: 'roleAndContribution',
        subcategories: [
            { key: 'contributionToRole' },
            { key: 'goalsPlans' },
            { key: 'reasonsToHire' },
        ],
    },
    {
        key: 'experienceAndGrowth',
        subcategories: [
            { key: 'achievementsMistakes' },
            { key: 'myDevelopment' },
        ],
    },
    {
        key: 'teamworkAndLeadership',
        subcategories: [{ key: 'initiative' }, { key: 'teamLeadership' }],
    },
    {
        key: 'challengesAndAdaptability',
        subcategories: [
            { key: 'criticismFeedback' },
            { key: 'prioritizeTasks' },
            { key: 'stressAndUnexpected' },
            { key: 'difficultSituations' },
        ],
    },
    {
        key: 'workEnvironment',
        subcategories: [
            { key: 'idealWork' },
            { key: 'boringThings' },
            { key: 'hateThings' },
        ],
    },
    {
        key: 'relationships',
        subcategories: [{ key: 'conflictWithBoss' }, { key: 'coworker' }],
    },
    {
        key: 'externalPerceptionAndCareer',
        subcategories: [{ key: 'previousWork' }, { key: 'othersOpinion' }],
    },
    {
        key: 'miscellaneous',
        subcategories: [
            { key: 'customersClients' },
            { key: 'interestingQuestions' },
            { key: 'generalQuestions' },
            { key: 'salaryExpectations' },
        ],
    },
];
