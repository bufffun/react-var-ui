import { FC } from 'react';
import { IVarBaseInputProps } from './VarBase';
export interface IVarVectorProps extends IVarBaseInputProps<number> {
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
}
/**
 * Integer/float number component. Accepts and provides numbers.
 */
export declare const VarVector: FC<IVarVectorProps>;
