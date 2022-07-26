import { FC } from 'react';
import { IVarBaseProps } from './VarBase';
export interface IVarAddProps extends IVarBaseProps {
    /**
     * Called when the add button is clicked.
     */
    didClick?: () => void;
}
/**
 * Button component. Only provides a onClick property.
 */
export declare const VarAdd: FC<IVarAddProps>;
