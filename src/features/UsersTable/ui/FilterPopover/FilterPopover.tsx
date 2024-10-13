import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import FilterIcon from '@/shared/assets/icons/filter.svg';
import { CommonFilterType } from '../UsersTable/TaskTable';
import { Popover } from '@/shared/ui/redesigned/Popups';
import { Button } from '@/shared/ui/redesigned/Button';
import { Icon as IconCustom } from '@/shared/ui/redesigned/Icon';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import cls from './FilterPopover.module.scss';
import { VStack } from '@/shared/ui/common/Stack';
import {
    ColorIndicatorOptionItem,
    ColorOption,
} from '../ColorIndicatorOptionItem/ColorIndicatorOptionItem';

export interface Filter {
    id: string;
    value: string[];
}

interface FilterItemProps {
    option: ColorOption;
    setColumnFilters: Dispatch<SetStateAction<CommonFilterType>>;
    isActive: boolean;
}

interface FilterPopoverProps {
    filterCategory: string;
    columnFilters: CommonFilterType;
    setColumnFilters: Dispatch<SetStateAction<CommonFilterType>>;
    allOptions: ColorOption[];
}

const FilterItem = (props: FilterItemProps) => {
    const { option, setColumnFilters, isActive } = props;
    return (
        <VStack
            max
            className={classNames(
                cls.filterItem,
                { [cls.active]: isActive },
                [],
            )}
            onClick={() =>
                setColumnFilters((prev) => {
                    console.log('prev', prev);
                    const roles = prev.find(
                        (filter) => filter.id === 'role',
                    )?.value;

                    console.log('roles', roles);
                    if (!roles) {
                        return prev.concat({
                            id: 'role',
                            value: [option.id],
                        });
                    }

                    return prev.map((f) =>
                        f.id === 'role'
                            ? {
                                  ...f,
                                  // eslint-disable-next-line no-nested-ternary
                                  value: Array.isArray(roles)
                                      ? isActive
                                          ? roles.filter((r) => r !== option.id)
                                          : roles.concat(option.id)
                                      : [option.id],
                              }
                            : f,
                    );
                })
            }
        >
            <ColorIndicatorOptionItem option={option} />
        </VStack>
    );
};

interface FilterMenuProps {
    allOptions: ColorOption[];
    filteredOptions: string | string[];
    setColumnFilters: Dispatch<SetStateAction<CommonFilterType>>;
}

const FilterMenu = ({
    allOptions,
    setColumnFilters,
    filteredOptions,
}: FilterMenuProps) => {
    return (
        <VStack max>
            {allOptions.map((option) => {
                return (
                    <FilterItem
                        option={option}
                        isActive={filteredOptions.includes(option.id)}
                        setColumnFilters={setColumnFilters}
                        key={option.id}
                    />
                );
            })}
        </VStack>
    );
};

export const FilterPopover = (props: FilterPopoverProps) => {
    const { t } = useTranslation();
    const { columnFilters, setColumnFilters, filterCategory, allOptions } =
        props;
    const filteredOptions =
        columnFilters.find((f) => f.id === filterCategory)?.value ||
        ([] as string[]);

    const isFilterActive = filteredOptions.length > 0;
    const trigger = (
        <Button
            size="m"
            variant="clear"
            addonLeft={<IconCustom width="20" height="20" Svg={FilterIcon} />}
            // onClick={onNavigateToList}
            className={classNames(
                cls.filterIcon,
                { [cls.isFilterActive]: isFilterActive },
                [],
            )}
        >
            {t('Фільтр')}
        </Button>
    );

    return (
        <Popover
            direction="bottom left"
            trigger={trigger}
            noPadding
            className={cls.filterPopover}
        >
            <FilterMenu
                allOptions={allOptions}
                filteredOptions={filteredOptions}
                setColumnFilters={setColumnFilters}
            />
        </Popover>
    );
};

// <VStack
//     max
// align="center"
// cursor="pointer"
// borderRadius={5}
// fontWeight="bold"
// p={1.5}
// bg={isActive ? 'gray.800' : 'transparent'}
// _hover={{
//     bg: 'gray.800',
// }}
// onClick={() =>
//     setColumnFilters((prev) => {
//         console.log('prev', prev);
//         const roles = prev.find(
//             (filter) => filter.id === 'role',
//         )?.value;
//
//         console.log('roles', roles);
//         if (!roles) {
//             return prev.concat({
//                 id: 'role',
//                 value: [option.id],
//             });
//         }
//
//         return prev.map((f) =>
//             f.id === 'role'
//                 ? {
//                       ...f,
//                       // eslint-disable-next-line no-nested-ternary
//                       value: Array.isArray(roles)
//                           ? isActive
//                               ? roles.filter((r) => r !== option.id)
//                               : roles.concat(option.id)
//                           : [option.id],
//                   }
//                 : f,
//         );
//     })
// }
// >

{
    /* <Popover isLazy> */
}
{
    /*    <PopoverTrigger> */
}
{
    /*        <Button */
}
{
    /*            size="sm" */
}
{
    /*            color={filteredOptions.length > 0 ? 'blue.300' : ''} */
}
{
    /*            leftIcon={<Icon as={FilterIcon} fontSize={18} />} */
}
{
    /*        > */
}
{
    /*            Filter */
}
{
    /*        </Button> */
}
{
    /*    </PopoverTrigger> */
}
{
    /*    <PopoverContent> */
}
{
    /*        <PopoverArrow /> */
}
{
    /*        <PopoverCloseButton /> */
}
{
    /*        <PopoverBody> */
}
{
    /*            <Text fontSize="md" fontWeight="bold" mb={4}> */
}
{
    /*                Filter By: */
}
{
    /*            </Text> */
}
{
    /*            <Text fontWeight="bold" color="gray.400" mb={1}> */
}
{
    /*                {filterCategory} */
}
{
    /*            </Text> */
}
{
    /*            <VStack align="flex-start" spacing={1}> */
}
{
    /*                {USER_ROLE_OPTIONS.map((option) => { */
}
{
    /*                    return ( */
}
{
    /*                        <FilterItem */
}
{
    /*                            option={option} */
}
{
    /*                            isActive={filteredOptions.includes( */
}
{
    /*                                option.id, */
}
{
    /*                            )} */
}
{
    /*                            setColumnFilters={setColumnFilters} */
}
{
    /*                            key={option.id} */
}
{
    /*                        /> */
}
{
    /*                    ); */
}
{
    /*                })} */
}
{
    /*            </VStack> */
}
{
    /*        </PopoverBody> */
}
{
    /*    </PopoverContent> */
}
{
    /* </Popover> */
}

// const FilterItem = (props: FilterItemProps) => {
//     const { option, setColumnFilters, isActive } = props;
//     return (
//         <Flex
//             align="center"
//             cursor="pointer"
//             borderRadius={5}
//             fontWeight="bold"
//             p={1.5}
//             bg={isActive ? 'gray.800' : 'transparent'}
//             _hover={{
//                 bg: 'gray.800',
//             }}
//             onClick={() =>
//                 setColumnFilters((prev) => {
//                     console.log('prev', prev);
//                     const roles = prev.find(
//                         (filter) => filter.id === 'role',
//                     )?.value;
//
//                     console.log('roles', roles);
//                     if (!roles) {
//                         return prev.concat({
//                             id: 'role',
//                             value: [option.id],
//                         });
//                     }
//
//                     return prev.map((f) =>
//                         f.id === 'role'
//                             ? {
//                                 ...f,
//                                 // eslint-disable-next-line no-nested-ternary
//                                 value: Array.isArray(roles)
//                                     ? isActive
//                                         ? roles.filter((r) => r !== option.id)
//                                         : roles.concat(option.id)
//                                     : [option.id],
//                             }
//                             : f,
//                     );
//                 })
//             }
//         >
//             <ColorIndicatorOptionItem option={option} />
//         </Flex>
//     );
// };
