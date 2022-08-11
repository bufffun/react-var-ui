import { FC } from 'react';
import { IVarBaseInputProps } from './VarBase';
export declare type IVarVector2Value = [number, number];
export interface IVarVector2Props extends IVarBaseInputProps<IVarVector2Value> {
    /**
     * Minimum value.
     */
    min?: IVarVector2Value;
    /**
     * Maximum value.
     */
    max?: IVarVector2Value;
    /**
     * Step.
     */
    step?: IVarVector2Value;
    /**
     * Should the end result be rounded to an integer value.
     */
    integer?: boolean;
}
/**
 * Integer/float number component. Accepts and provides numbers.
 */
export declare const VarVector2: FC<IVarVector2Props>;
