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
import { Filter } from '../UsersTable/TaskTable';
import { USER_ROLE_OPTIONS } from '../data';

interface FilterItemProps {
    option: { id: string; name: string; color: string }; // Define status structure
    setColumnFilters: Dispatch<SetStateAction<Filter[]>>;
    isActive: boolean;
}

interface FilterPopoverProps {
    filterCategory: string;
    columnFilters: Filter[];
    setColumnFilters: Dispatch<SetStateAction<Filter[]>>;
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
            // onClick={() =>
            //     setColumnFilters((prev) => {
            //         const roles = prev.find(
            //             (filter) => filter.id === 'role',
            //         )?.value;
            //         if (!roles) {
            //             return prev.concat({
            //                 id: 'role',
            //                 value: [role.id],
            //             });
            //         }
            //
            //         return prev.map((f) =>
            //             f.id === 'role'
            //                 ? {
            //                       ...f,
            //                       value: isActive
            //                           ? roles.filter((s) => s !== role.id)
            //                           : roles.concat(role.id),
            //                   }
            //                 : f,
            //         );
            //     })
            // }
        >
            {/* <ColorIcon color={status.color} mr={3} /> */}
            {option.name}
        </Flex>
    );
};

export const FilterPopover = (props: FilterPopoverProps) => {
    const { columnFilters, setColumnFilters, filterCategory } = props;
    const filteredOptions =
        columnFilters.find((f) => f.id === filterCategory)?.value ||
        ([] as string[]);

    console.log('filteredOptions', filteredOptions);
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
                            console.log('option', option);

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
