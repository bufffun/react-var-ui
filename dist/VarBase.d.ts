import { FC, ReactChild, ReactNode } from 'react';
export interface IVarBaseProps {
    /**
     * Label to be shown left to the input.
     */
    label?: ReactChild;
    /**
     * Additional class names on the wrapping div element.
     */
    className?: string;
    /**
     * Should the component be disabled.
     */
    disabled?: boolean;
    /**
     * Children. Only rendered when provided directly to the VarBase component.
     */
    children?: ReactNode;
}
export interface IVarBaseInputProps<T> extends IVarBaseProps {
    /**
     * Variable path in the data object.
     */
    path?: string;
    /**
     * Current value (only used if context and path aren't available).
     * In most cases you aren't going to need this.
     */
    value?: T;
    /**
     * Default value for components that support resetting (on double click for example).
     */
    defaultValue?: T;
    /**
     * On change event, called with the new value if provided.
     * In most cases you aren't going to need this.
     */
    onChange?: (path: string | undefined, value: T) => void;
}
/**
 * Base VarUI input component. Doesn't do anything besides displaying the label.
 * Used to construct other components from.
 */
export declare const VarBase: FC<IVarBaseProps>;
