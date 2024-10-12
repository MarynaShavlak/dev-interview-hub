import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import SearchIcon from '@/shared/assets/icons/search.svg';
import { Filter } from '../UsersTable/TaskTable';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Input } from '@/shared/ui/redesigned/Input';
// import FilterPopover from './FilterPopover';

interface FiltersProps {
    filterCategory: string;
    columnFilters: Filter[];
    setColumnFilters: Dispatch<SetStateAction<Filter[]>>;
}

export const Filters = (props: FiltersProps) => {
    const { columnFilters, setColumnFilters, filterCategory } = props;
    const { t } = useTranslation();

    const taskName =
        columnFilters.find((f) => f.id === filterCategory)?.value || '';

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

    console.log('columnFilters', columnFilters);
    console.log('filterCategory', filterCategory);

    return (
        <Input
            onChange={onFilterChange}
            value={taskName}
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
