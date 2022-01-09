/// <reference types="react" />
export declare type VarUIObject = any;
export interface IVarUIContext {
    values: VarUIObject;
    getValue: (path?: string) => any;
    setValue: (path: string, value: any) => void;
}
export declare const VarUIContext: import("react").Context<IVarUIContext | undefined>;
/**
 * Simple function used for custom input components.
 * @param path
 * @param fallbackValue
 * @param onChange
 * @returns [value: T, setValue: (value: T) => void]
 */
export declare function useVarUIValue<T>(path?: string, fallbackValue?: T, onChange?: (path: string | undefined, value: T) => void): [T, (value: T) => void];
