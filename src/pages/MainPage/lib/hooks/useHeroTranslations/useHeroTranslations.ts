import { useTranslation } from 'react-i18next';

export const useHeroTranslations = () => {
    const { t } = useTranslation('main');

    const entryButtonText = t('Get started');
    const slogan = t('Опановуй співбесіду — здобувай роботу!');

    const problemText = t(
        // eslint-disable-next-line max-len
        'Підготовка до співбесід може бути виснажливою — нескінченні нотатки, розкидані закладки, хаотичні сторінки в Notion, безлад у Google Docs та непослідовні ресурси.',
    );
    const appSolutionText = t(
        "<span>Dev Interview Hub</span> об'єднує всю твою підготовку до співбесід в одному зручному місці.",
    );
    const subtext1 = t(
        'Більше ніяких загублених нотаток. Більше ніяких сотень відкритих вкладок.',
    );
    const subtext2 = t(
        'Один зручний хаб — і ти на крок ближче до своєї нової роботи.',
    );
    const heroImageDesc = t("Чоловік сидить за столом із комп'ютером");

    return {
        entryButtonText,
        slogan,
        problemText,
        appSolutionText,
        subtext1,
        subtext2,
        heroImageDesc,
    };
};
