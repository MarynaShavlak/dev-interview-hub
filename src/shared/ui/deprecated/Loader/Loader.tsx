import { classNames } from '@/shared/lib/classes/classNames/classNames';
import './Loader.scss';

interface LoaderProps {
    className?: string;
}
/**
 * Deprecated, use new component from directory redesigned
 * @deprecated
 */
export const Loader = ({ className }: LoaderProps) => (
    <div className={classNames('lds-ellipsis', {}, [className])}>
        <div />
        <div />
        <div />
        <div />
    </div>
);
