import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

interface ForceUpdateContextProps {
    value: boolean;
    forceUpdate: () => void;
}

interface ForceUpdateProviderProps {
    children: ReactNode;
}

const ForceUpdateContext = createContext<ForceUpdateContextProps>({
    value: true,
    forceUpdate: () => {},
});

export const useForceUpdate = () => {
    const { forceUpdate } = useContext(ForceUpdateContext);

    return forceUpdate;
};

export function ForceUpdateProvider({ children }: ForceUpdateProviderProps) {
    const [value, setValue] = useState(true);

    const forceUpdate = () => {
        setValue((prev) => !prev);
        setTimeout(() => {
            setValue((prev) => !prev);
        }, 120);
    };

    const valueContext = useMemo(() => {
        return { value, forceUpdate };
    }, [value]);

    if (!value) {
        return null;
    }

    return (
        <ForceUpdateContext.Provider value={valueContext}>
            {children}
        </ForceUpdateContext.Provider>
    );
}
