import { FC } from 'react';
import { IVarBaseInputProps } from './VarBase';
export interface IVarImageProps extends IVarBaseInputProps<{
    src: HTMLImageElement | string | null;
    type?: string;
    extension?: string;
}> {
    path?: string;
    value?: {
        src: HTMLImageElement | string | null;
        type?: string;
        extension?: string;
    };
}
/**
 * A simple component that displays a string or a numeric value.
 */
export declare const VarImage: FC<IVarImageProps>;
