import * as RadixAccordion from '@radix-ui/react-accordion';
import { forwardRef, ReactNode } from 'react';
import ArrowDownIcon from '@/shared/assets/icons/arrow-bottom.svg';
import cls from './Accordion.module.scss';
import { Icon } from '../../redesigned/Icon';
import { classNames } from '@/shared/lib/classes/classNames/classNames';

interface AccordionItem {
    trigger: ReactNode;
    content: ReactNode;
    value?: string;
}

interface AccordionSingleProps {
    type: 'single';
    defaultValue?: string;
    collapsible?: boolean;
    className?: string;
    items: AccordionItem[];
}

interface AccordionMultipleProps {
    type: 'multiple';
    defaultValue?: string[];
    collapsible?: boolean;
    className?: string;
    items: AccordionItem[];
}

const ICON_PROPS = {
    height: '32px',
    width: '32px',
};

type AccordionInterface = AccordionSingleProps | AccordionMultipleProps;

interface TriggerProps extends RadixAccordion.AccordionTriggerProps {
    className?: string;
    children?: ReactNode;
}

const AccordionTrigger = forwardRef<HTMLButtonElement, TriggerProps>(
    ({ children, className, ...props }: TriggerProps, forwardedRef) => (
        <RadixAccordion.Header className={cls.header}>
            <RadixAccordion.Trigger
                className={cls.trigger}
                {...props}
                ref={forwardedRef}
            >
                {children}
                <Icon
                    aria-hidden
                    Svg={ArrowDownIcon}
                    {...ICON_PROPS}
                    className={cls.icon}
                />
            </RadixAccordion.Trigger>
        </RadixAccordion.Header>
    ),
);

interface AccordionContentProps extends RadixAccordion.AccordionContentProps {
    className?: string;
    children?: React.ReactNode;
}

const AccordionContent = forwardRef<HTMLDivElement, AccordionContentProps>(
    ({ children, className, ...props }, forwardedRef) => (
        <RadixAccordion.Content
            className={cls.content}
            {...props}
            ref={forwardedRef}
        >
            <div className={cls.contentInner}>{children}</div>
        </RadixAccordion.Content>
    ),
);

export const Accordion = (props: AccordionInterface) => {
    const { items, type, defaultValue, collapsible, className } = props;

    const renderItems = () =>
        items.map((item, index) => {
            const itemValue = item.value || `item-${index + 1}`;
            return (
                <RadixAccordion.Item
                    key={itemValue}
                    className={cls.item}
                    value={itemValue}
                >
                    <AccordionTrigger>{item.trigger}</AccordionTrigger>
                    <AccordionContent>{item.content}</AccordionContent>
                </RadixAccordion.Item>
            );
        });

    return (
        <RadixAccordion.Root
            className={classNames(cls.root, {}, [className])}
            collapsible={collapsible}
            defaultValue={defaultValue as any}
            type={type}
        >
            {renderItems()}
        </RadixAccordion.Root>
    );
};
