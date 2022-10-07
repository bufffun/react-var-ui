import { FC } from 'react';
import { IVarBaseInputProps } from './VarBase';
export interface IVarToggleGroupProps extends IVarBaseInputProps<boolean> {
    /**
     * 关闭的时候隐藏children
     */
    toggleHidden?: boolean;
}
/**
 * Checkbox/toggle component. Accepts and returns a boolean (true/false).
 */
export declare const VarToggleGroup: FC<IVarToggleGroupProps>;
