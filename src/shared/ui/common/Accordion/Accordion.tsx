import * as RadixAccordion from '@radix-ui/react-accordion';
import { forwardRef, ReactNode } from 'react';
import cls from './Accordion.module.scss';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { toggleFeatures, ToggleFeaturesComponent } from '@/shared/lib/features';
import ArrowDownIcon from '@/shared/assets/icons/arrow-bottom.svg';
import { Icon } from '../../redesigned/Icon';
import { Icon as IconDeprecated } from '../../deprecated/Icon';

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
    ({ children, className, ...props }: TriggerProps, forwardedRef) => {
        const triggerMainClass = toggleFeatures({
            name: 'isAppRedesigned',
            on: () => cls.triggerRedesigned,
            off: () => cls.triggerDeprecated,
        });
        const iconMainClass = toggleFeatures({
            name: 'isAppRedesigned',
            on: () => cls.iconRedesigned,
            off: () => cls.iconDeprecated,
        });
        return (
            <RadixAccordion.Header className={cls.header}>
                <RadixAccordion.Trigger
                    className={classNames(cls.trigger, {}, [triggerMainClass])}
                    {...props}
                    ref={forwardedRef}
                >
                    {children}
                    <ToggleFeaturesComponent
                        feature="isAppRedesigned"
                        on={
                            <Icon
                                aria-hidden
                                Svg={ArrowDownIcon}
                                {...ICON_PROPS}
                                className={classNames(cls.icon, {}, [
                                    iconMainClass,
                                ])}
                            />
                        }
                        off={
                            <IconDeprecated
                                aria-hidden
                                Svg={ArrowDownIcon}
                                {...ICON_PROPS}
                                className={classNames(cls.icon, {}, [
                                    iconMainClass,
                                ])}
                            />
                        }
                    />
                </RadixAccordion.Trigger>
            </RadixAccordion.Header>
        );
    },
);

interface AccordionContentProps extends RadixAccordion.AccordionContentProps {
    className?: string;
    children?: React.ReactNode;
}

const AccordionContent = forwardRef<HTMLDivElement, AccordionContentProps>(
    ({ children, className, ...props }, forwardedRef) => {
        const contentMainClass = toggleFeatures({
            name: 'isAppRedesigned',
            on: () => cls.contentRedesigned,
            off: () => cls.contentDeprecated,
        });
        return (
            <RadixAccordion.Content
                className={classNames(cls.content, {}, [contentMainClass])}
                {...props}
                ref={forwardedRef}
            >
                <div className={cls.contentInner}>{children}</div>
            </RadixAccordion.Content>
        );
    },
);

export const Accordion = (props: AccordionInterface) => {
    const { items, type, defaultValue, collapsible, className } = props;

    const renderItems = () =>
        items.map((item, index) => {
            const itemValue = item.value || `item-${index + 1}`;
            const itemMainClass = toggleFeatures({
                name: 'isAppRedesigned',
                on: () => cls.itemRedesigned,
                off: () => cls.itemDeprecated,
            });
            return (
                <RadixAccordion.Item
                    key={itemValue}
                    className={classNames(cls.item, {}, [itemMainClass])}
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
