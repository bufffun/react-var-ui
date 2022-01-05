import { FC } from 'react';
import { IVarBaseInputProps } from './VarBase';
export interface IVarColorProps extends IVarBaseInputProps<string> {
    /**
     * Should allow picking alpha values?
     * If true, the result hex code will contain extra two characters representing the alpha value, from 00 to FF.
     */
    alpha?: boolean;
}
/**
 * Color picker component. Returns and accepts values in form of hex color strings.
 */
export declare const VarColor: FC<IVarColorProps>;
