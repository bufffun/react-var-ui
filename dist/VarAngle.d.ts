import { FC } from 'react';
import { IVarBaseInputProps } from './VarBase';
export interface IVarAngleProps extends IVarBaseInputProps<number> {
}
/**
 * Angle picker component. Accepts and provides numbers (radians).
 */
export declare const VarAngle: FC<IVarAngleProps>;
