import { FC, ReactNode } from 'react';
import { VarUIObject } from './common/VarUIContext';
export interface IVarUIProps {
    /**
     * A JavaScript object or array to be mutated by the input components.
     */
    values: VarUIObject;
    /**
     * The function to be called whenever an update is available.
     */
    updateValues: (values: VarUIObject) => void;
    /**
     * Additional class names for the wrapper object.
     */
    className?: string;
    /**
     * Input components (or any other children).
     */
    children?: ReactNode;
}
/**
 * This is the main component which provides a Context for other components.
 * It is not required to use this component - other components accept
 * `onChange` and `value` properties which provide a similar functionality.
 */
export declare const VarUI: FC<IVarUIProps>;
