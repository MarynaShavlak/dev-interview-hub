export function getItemCountPerRow(
    containerWidth: number,
    itemWidth: number,
    gap: number,
): number {
    return Math.floor((containerWidth + gap) / (itemWidth + gap));
}
