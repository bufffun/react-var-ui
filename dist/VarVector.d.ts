import { FC } from 'react';
import { IVarBaseInputProps } from './VarBase';
export declare type IVarVectorValue = [number, number, number];
export interface IVarVectorProps extends IVarBaseInputProps<IVarVectorValue> {
    /**
     * Minimum value.
     */
    min?: IVarVectorValue;
    /**
     * Maximum value.
     */
    max?: IVarVectorValue;
    /**
     * Step.
     */
    step?: IVarVectorValue;
    /**
     * Should the end result be rounded to an integer value.
     */
    integer?: boolean;
}
/**
 * Integer/float number component. Accepts and provides numbers.
 */
export declare const VarVector: FC<IVarVectorProps>;
