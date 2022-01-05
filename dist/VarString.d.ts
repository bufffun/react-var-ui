import { FC } from 'react';
import { IVarBaseInputProps } from './VarBase';
export interface IVarStringProps extends IVarBaseInputProps<string> {
    /**
     * Maximum length of the text.
     */
    maxLength?: number;
    /**
     * Should the field be a textarea?
     */
    multiline?: boolean;
    /**
     * Should the text field auto expand?
     * Only works with multiline instances.
     */
    autoexpand?: boolean;
}
/**
 * String input component. Accepts and provides a string value.
 */
export declare const VarString: FC<IVarStringProps>;
