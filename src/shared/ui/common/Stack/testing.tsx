import { Each } from '@/shared/lib/components/Each/Each';

export const InnerElements = () => (
    <>
        <div style={{ border: '1px solid black' }}>1</div>
        <div style={{ border: '1px solid black' }}>2</div>
        <div style={{ border: '1px solid black' }}>3</div>
        <div style={{ border: '1px solid black' }}>4</div>
    </>
);

export const InnerElementsLongList = () => (
    <Each
        of={Array.from({ length: 51 }, (_, index) => index)}
        render={(item, index) => (
            <div style={{ border: '1px solid black' }}> {index}</div>
        )}
    />
);
