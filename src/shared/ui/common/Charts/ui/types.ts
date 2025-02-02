export interface ChartDimensions {
    width?: string;
    height?: string;
}

export interface BaseChartProps extends ChartDimensions {
    title?: string;
    // width?: string;
    // height?: string;
    legendPosition?: 'top' | 'right' | 'bottom' | 'left';
    xAxisTitle?: string;
    yAxisTitle?: string;
    labels?: string[];
}
