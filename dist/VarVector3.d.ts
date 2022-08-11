import { FC } from 'react';
import { IVarBaseInputProps } from './VarBase';
export declare type IVarVector3Value = [number, number, number];
export interface IVarVector3Props extends IVarBaseInputProps<IVarVector3Value> {
    /**
     * Minimum value.
     */
    min?: IVarVector3Value;
    /**
     * Maximum value.
     */
    max?: IVarVector3Value;
    /**
     * Step.
     */
    step?: IVarVector3Value;
    /**
     * Should the end result be rounded to an integer value.
     */
    integer?: boolean;
}
/**
 * Integer/float number component. Accepts and provides numbers.
 */
export declare const VarVector3: FC<IVarVector3Props>;
