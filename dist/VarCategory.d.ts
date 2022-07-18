import { FC, ReactNode } from 'react';
export interface IVarCategoryProps {
    /**
     * Category label.
     */
    label: ReactNode;
    /**
     * Additional class names on the wrapping div element.
     */
    className?: string;
}
/**
 * Category component for grouping inputs.
 */
export declare const VarCategory: FC<IVarCategoryProps>;
