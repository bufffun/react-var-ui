import { FC } from 'react';
import { IVarBaseInputProps } from './VarBase';
export interface IVarSliderProps extends IVarBaseInputProps<number> {
    /**
     * Minimum value.
     */
    min: number;
    /**
     * Maximum value.
     */
    max: number;
    /**
     * Step.
     */
    step: number;
    /**
     * Should the end result be rounded to an integer value.
     */
    integer?: boolean;
    /**
     * If true will display an editable input, otherwise shows a read only value.
     */
    showInput?: boolean;
    /**
     * If true will display buttons that increase and decrease the value by step.
     */
    showButtons?: boolean;
}
/**
 * Integer/float slider component. Accepts and provides numbers.
 */
export declare const VarSlider: FC<IVarSliderProps>;
