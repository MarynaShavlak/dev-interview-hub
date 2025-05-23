export interface ChartDimensions {
    width?: string;
    height?: string;
}

export interface SkeletonDimensions {
    width: number;
    height: number;
}

export interface BaseChartProps extends ChartDimensions {
    title?: string;
    legendPosition?: 'top' | 'right' | 'bottom' | 'left';
    xAxisTitle?: string;
    yAxisTitle?: string;
    labels?: string[];
}
