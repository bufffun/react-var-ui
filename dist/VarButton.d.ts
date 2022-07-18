import { FC, ReactNode } from 'react';
import { IVarBaseProps } from './VarBase';
export interface IVarButtonProps extends IVarBaseProps {
    /**
     * Called when the button is clicked.
     */
    onClick?: () => void;
    /**
     * Text for the button.
     */
    buttonLabel: ReactNode;
    /**
     * Should the component be disabled.
     */
    disabled?: boolean;
}
/**
 * Button component. Only provides a onClick property.
 */
export declare const VarButton: FC<IVarButtonProps>;
