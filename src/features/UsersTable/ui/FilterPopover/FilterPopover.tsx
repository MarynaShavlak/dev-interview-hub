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
import FilterIcon from '@/shared/assets/icons/filter.svg';
import { CommonFilterType, Role } from '../UsersTable/TaskTable';
import { USER_ROLE_OPTIONS } from '../data';
import { ColorIcon } from '../OptionCell/OptionCell';

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

interface OptionItemProps {
    role: Role;
}

const OptionItem = ({ role }: OptionItemProps) => {
    return (
        <>
            <ColorIcon color={role.color} />
            {role.name}
        </>
    );
};

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
            <OptionItem role={option} />
        </Flex>
    );
};

export const FilterPopover = (props: FilterPopoverProps) => {
    const { columnFilters, setColumnFilters, filterCategory } = props;
    const filteredOptions =
        columnFilters.find((f) => f.id === filterCategory)?.value ||
        ([] as string[]);

    return (
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
    );
};
