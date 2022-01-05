import { FC } from 'react';
import { IVarBaseInputProps } from './VarBase';
export declare type IVarXYValue = [number, number];
export interface IVarXYProps extends IVarBaseInputProps<IVarXYValue> {
    /**
     * Minimum value.
     */
    min?: IVarXYValue;
    /**
     * Maximum value.
     */
    max?: IVarXYValue;
    /**
     * Step.
     */
    step?: IVarXYValue;
}
/**
 * XY offset picker. Accepts and provides an array in form of [x, y].
 */
export declare const VarXY: FC<IVarXYProps>;
