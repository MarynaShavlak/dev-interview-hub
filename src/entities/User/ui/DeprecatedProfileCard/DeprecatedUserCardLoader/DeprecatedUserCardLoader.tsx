import { Loader } from '@/shared/ui/deprecated/Loader';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { HStack } from '@/shared/ui/common/Stack';
import cls from '../DeprecatedUserCard.module.scss';

export const DeprecatedUserCardLoader = () => {
    return (
        <HStack
            justify="center"
            max
            className={classNames(cls.UserCard, { [cls.loading]: true })}
        >
            <Loader />
        </HStack>
    );
};
