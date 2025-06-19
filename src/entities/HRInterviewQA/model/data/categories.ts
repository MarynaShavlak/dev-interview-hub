import { generateCategories } from '../../lib/utilities/generateCategories/generateCategories';

const labelsEng: Record<string, string> = {
    describeYourself: 'Describe yourself',
    reasonsToHire: 'Reasons to hire me',
    whyIT: 'Why IT?',
    motivationGeneral: 'Motivation',
    salaryExpectations: 'Salary',
    strengthsWeaknesses: 'Strengths, weaknesses, uniqueness',

    aboutCompany: 'Reasons for applying',
    initiative: 'Initiative',
    contributionToRole: 'Contribution to company',
    goalsPlans: 'Goals and plans',

    achievementsMistakes: 'Achievements and mistakes',
    myDevelopment: 'Development',
    teamLeadership: 'Team and leadership',
    criticismFeedback: 'Criticism, feedback',
    prioritizeTasks: 'Prioritize Tasks',
    conflicts: 'Conflicts',
    difficultSituations: 'Difficult situations',
    stressAndUnexpected: 'Stress, pressure, changes',
    idealWork: 'Ideal work',
    boringThings: 'Boring Tasks',
    hateThings: 'Things I hate',

    conflictWithBoss: 'Boss',
    coworker: 'Coworkers',
    customersClients: 'Clients',

    previousWork: 'Previous work',
    othersOpinion: "Others' opinion of you",

    interestingQuestions: 'Interesting questions',
    generalQuestions: 'General questions',
    hobbiesAndFamily: 'Hobbies and family',
    inspirations: 'Inspirations',
};

const labelsUkr: Record<string, string> = {
    describeYourself: 'Опишіть себе',
    reasonsToHire: 'Причини найняти мене',
    whyIT: 'Чому IT?',
    motivationGeneral: 'Мотивація',
    salaryExpectations: 'Зарплата',
    strengthsWeaknesses: 'Сильні та слабкі сторони, унікальність',

    aboutCompany: 'Причини подання заявки',
    initiative: 'Ініціатива',

    contributionToRole: 'Внесок у компанію',
    goalsPlans: 'Цілі та плани',

    achievementsMistakes: 'Досягнення та помилки',
    myDevelopment: 'Мій розвиток',

    teamLeadership: 'Команда та лідерство',

    criticismFeedback: 'Критика, фідбек',
    prioritizeTasks: 'Пріоритети завдань',
    conflicts: 'Конфлікти',
    difficultSituations: 'Складні ситуації',
    stressAndUnexpected: 'Стрес, тиск, зміни',

    idealWork: 'Ідеальна робота',
    boringThings: 'Нудні завдання',
    hateThings: 'Що я ненавиджу',

    conflictWithBoss: 'Керівник',
    coworker: 'Колеги',
    customersClients: 'Клієнти',

    previousWork: 'Попередня робота',
    othersOpinion: 'Думка інших про мене',

    interestingQuestions: 'Цікаві питання',
    generalQuestions: 'Загальні питання',
    hobbiesAndFamily: "Хобі та сім'я",
    inspirations: 'Натхнення ',
};

export const HRInterviewQACategoriesEng = generateCategories(labelsEng);
export const HRInterviewQACategoriesUkr = generateCategories(labelsUkr);
