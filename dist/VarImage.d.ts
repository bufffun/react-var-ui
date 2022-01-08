import { FC } from 'react';
import { IVarBaseInputProps } from './VarBase';
export interface IVarImageProps extends IVarBaseInputProps<HTMLImageElement | string | null> {
    path?: string;
    value?: HTMLImageElement | string | null;
}
/**
 * A simple component that displays a string or a numeric value.
 */
export declare const VarImage: FC<IVarImageProps>;
