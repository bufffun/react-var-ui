import { FC } from 'react';
import { IVarBaseInputProps } from './VarBase';
export interface IVarToggleProps extends IVarBaseInputProps<boolean> {
}
/**
 * Checkbox/toggle component. Accepts and returns a boolean (true/false).
 */
export declare const VarToggle: FC<IVarToggleProps>;
