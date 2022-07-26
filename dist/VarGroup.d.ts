import { FC } from 'react';
import { IVarBaseProps } from './VarBase';
export interface IVarGroupProps extends IVarBaseProps {
    /**
     * 删除
     */
    onDelete?: () => void;
}
/**
 * Category component for grouping inputs.
 */
export declare const VarGroup: FC<IVarGroupProps>;
