import { FC } from 'react';
import { IVarBaseInputProps } from './VarBase';
export interface IVarNumberProps extends IVarBaseInputProps<number> {
    /**
     * Minimum value.
     */
    min?: number;
    /**
     * Maximum value.
     */
    max?: number;
    /**
     * Step.
     */
    step?: number;
    /**
     * Should the end result be rounded to an integer value.
     */
    integer?: boolean;
    /**
     * If true will display buttons that increase and decrease the value by step.
     * Step must be set.
     */
    showButtons?: boolean;
}
/**
 * Integer/float number component. Accepts and provides numbers.
 */
export declare const VarNumber: FC<IVarNumberProps>;
