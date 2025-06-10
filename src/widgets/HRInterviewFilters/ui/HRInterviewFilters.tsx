import { useTranslation } from 'react-i18next';

import { SearchBox } from 'react-instantsearch';

import { memo } from 'react';

import { Icon } from '@/shared/ui/redesigned/Icon';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import cls from './HRInterviewFilters.module.scss';
import { Card } from '@/shared/ui/redesigned/Card';
import { VStack } from '@/shared/ui/common/Stack';
import SearchIcon from '@/shared/assets/icons/search.svg';
import CloseIcon from '@/shared/assets/icons/close.svg';
import { HRInterviewCategoryTabs } from '@/features/HRInterviewCategoryTabs';

const ResetIconComponent = memo(() => (
    <Icon Svg={CloseIcon} className={cls.ResetIcon} />
));

const SubmitIconComponent = memo(() => <Icon Svg={SearchIcon} />);

export interface HRInterviewFiltersProps {
    className?: string;
    // category: HRCategory;
    // search: string;
    // onChangeSearch: (value: string) => void;
    // onChangeCategory: (category: HRCategory) => void;
}

export const HRInterviewFilters = (props: HRInterviewFiltersProps) => {
    const { className } = props;
    const { t } = useTranslation();

    return (
        <Card
            className={classNames(cls.ArticlesFilters, {}, [className])}
            padding="24"
        >
            <VStack gap="32">
                <SearchBox
                    placeholder={t('Пошук')}
                    resetIconComponent={ResetIconComponent}
                    submitIconComponent={SubmitIconComponent}
                    data-testid="ArticlesPage.SearchInput"
                    classNames={{
                        submit: cls.SubmitSearchBtn,
                        reset: cls.ResetSearchBtn,
                        form: cls.SubmitInputWrapper,
                        input: cls.SearchInput,
                    }}
                />

                <HRInterviewCategoryTabs
                    // value={category}
                    // onChangeCategory={onChangeCategory}
                    className={cls.tabs}
                />
            </VStack>
        </Card>
    );
};
