import { FC, ReactText } from 'react';
import { IVarBaseInputProps } from './VarBase';
export interface IVarSelectOption {
    /**
     * Key for the option. Also used as value if `value` is not specified.
     */
    key: ReactText;
    /**
     * Option label.
     */
    label: string;
    /**
     * Option value. Key will be used if not specified.
     * Note: Will be serialized to JSON and deserialized when selected.
     */
    value?: any;
}
export interface IVarSelectProps extends IVarBaseInputProps<any> {
    /**
     * Options to be displayed.
     */
    options: IVarSelectOption[];
}
/**
 * Select component. Returns and accepts either `value` from option object or `key` when `value` is not provided.
 */
export declare const VarSelect: FC<IVarSelectProps>;
