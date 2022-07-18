import { FC, ReactText } from 'react';
import { IVarBaseProps } from './VarBase';
export interface IVarDisplayProps extends IVarBaseProps {
    /**
     * Variable path in the data object.
     */
    path?: string;
    /**
     * Current value (only used if context and path aren't available).
     * In most cases you aren't going to need this.
     */
    value?: ReactText;
}
/**
 * A simple component that displays a string or a numeric value.
 */
export declare const VarDisplay: FC<IVarDisplayProps>;
