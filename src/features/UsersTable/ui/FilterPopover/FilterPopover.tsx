import {
    Button,
    Icon,
    Popover,
    PopoverArrow,
    PopoverCloseButton,
    PopoverContent,
    PopoverBody,
    PopoverTrigger,
    Text,
    Flex,
    VStack,
} from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import FilterIcon from '@/shared/assets/icons/filter.svg';
import { CommonFilterType } from '../UsersTable/TaskTable';
import { USER_ROLE_OPTIONS } from '../data';
import { ColorIndicatorOptionItem } from '../ColorIndicatorOptionItem/ColorIndicatorOptionItem';
import { NotificationList } from '@/entities/Notification';
import { Popover as Custom } from '@/shared/ui/redesigned/Popups';
import { Button as ButtonCustom } from '@/shared/ui/redesigned/Button';
import { Icon as IconCustom } from '@/shared/ui/redesigned/Icon';

export interface Filter {
    id: string;
    value: string[];
}

interface FilterItemProps {
    option: { id: string; name: string; color: string };
    setColumnFilters: Dispatch<SetStateAction<CommonFilterType>>;
    isActive: boolean;
}

interface FilterPopoverProps {
    filterCategory: string;
    columnFilters: CommonFilterType;
    setColumnFilters: Dispatch<SetStateAction<CommonFilterType>>;
}

const FilterItem = (props: FilterItemProps) => {
    const { option, setColumnFilters, isActive } = props;
    return (
        <Flex
            align="center"
            cursor="pointer"
            borderRadius={5}
            fontWeight="bold"
            p={1.5}
            bg={isActive ? 'gray.800' : 'transparent'}
            _hover={{
                bg: 'gray.800',
            }}
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
        </Flex>
    );
};

export const FilterPopover = (props: FilterPopoverProps) => {
    const { t } = useTranslation();
    const { columnFilters, setColumnFilters, filterCategory } = props;
    const filteredOptions =
        columnFilters.find((f) => f.id === filterCategory)?.value ||
        ([] as string[]);
    const trigger = (
        <ButtonCustom
            size="m"
            variant="clear"
            addonLeft={<IconCustom width="20" height="20" Svg={FilterIcon} />}
            // onClick={onNavigateToList}
            // className={cls.ArticleListButton}
        >
            {t('Фільтр')}
        </ButtonCustom>
    );

    return (
        <>
            <Custom direction="bottom left" trigger={trigger}>
                <NotificationList />
            </Custom>
            <Popover isLazy>
                <PopoverTrigger>
                    <Button
                        size="sm"
                        color={filteredOptions.length > 0 ? 'blue.300' : ''}
                        leftIcon={<Icon as={FilterIcon} fontSize={18} />}
                    >
                        Filter
                    </Button>
                </PopoverTrigger>
                <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverBody>
                        <Text fontSize="md" fontWeight="bold" mb={4}>
                            Filter By:
                        </Text>
                        <Text fontWeight="bold" color="gray.400" mb={1}>
                            {filterCategory}
                        </Text>
                        <VStack align="flex-start" spacing={1}>
                            {USER_ROLE_OPTIONS.map((option) => {
                                return (
                                    <FilterItem
                                        option={option}
                                        isActive={filteredOptions.includes(
                                            option.id,
                                        )}
                                        setColumnFilters={setColumnFilters}
                                        key={option.id}
                                    />
                                );
                            })}
                        </VStack>
                    </PopoverBody>
                </PopoverContent>
            </Popover>
        </>
    );
};
