import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import SearchIcon from '@/shared/assets/icons/search.svg';
import { CommonFilterType } from '../UsersTable/TaskTable';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Input } from '@/shared/ui/redesigned/Input';
// import FilterPopover from './FilterPopover';

interface InputSearchProps {
    filterCategory: string;
    columnFilters: CommonFilterType;
    setColumnFilters: Dispatch<SetStateAction<CommonFilterType>>;
}

export const InputSearch = (props: InputSearchProps) => {
    const { columnFilters, setColumnFilters, filterCategory } = props;

    console.log('in InputSearch columnFilters', columnFilters);
    const { t } = useTranslation();

    const filter = columnFilters.find((f) => f.id === filterCategory);
    const query =
        filter && typeof filter.value === 'string' ? filter.value : '';

    const onFilterChange = (value: string) => {
        setColumnFilters((prevFilters) => {
            const existingFilter = prevFilters.find(
                (f) => f.id === filterCategory,
            );
            if (existingFilter) {
                return prevFilters.map((f) =>
                    f.id === filterCategory ? { ...f, value } : f,
                );
            }
            return [...prevFilters, { id: filterCategory, value }];
        });
    };

    // console.log('columnFilters', columnFilters);
    // console.log('filterCategory', filterCategory);

    return (
        <Input
            onChange={onFilterChange}
            value={query}
            placeholder={t('Пошук')}
            addonLeft={<Icon Svg={SearchIcon} />}
        />
    );
};

// {/*<InputGroup size="sm" maxW="12rem">*/}
// {/*    <InputLeftElement pointerEvents="none">*/}
// {/*        <Icon as={SearchIcon} />*/}
// {/*    </InputLeftElement>*/}
// {/*    <Input*/}
// {/*        type="text"*/}
// {/*        variant="filled"*/}
// {/*        placeholder="Task name"*/}
// {/*        borderRadius={5}*/}
// {/*        value={taskName}*/}
// {/*        onChange={(e) => onFilterChange('task', e.target.value)}*/}
// {/*    />*/}
// {/*</InputGroup>*/}
// // </HStack>
//
//
//
// {
//     /* <Input */
// }
// {
//     /*    onChange={onChangeSearch} */
// }
// {
//     /*    value={search} */
// }
// {
//     /*    placeholder={t('Пошук')} */
// }
// {
//     /*    addonLeft={<Icon Svg={SearchIcon} />} */
// }
// {
//     /*    data-testid="ArticlesPage.SearchInput" */
// }
// {
//     /* /> */
// }
//
// {
//     /* <FilterPopover */
// }
// {
//     /*    columnFilters={columnFilters} */
// }
// {
//     /*    setColumnFilters={setColumnFilters} */
// }
// {
//     /* /> */
// }
