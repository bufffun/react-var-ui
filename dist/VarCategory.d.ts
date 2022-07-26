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
    /**
     * 是否在前面显示分隔符
     */
    showDash?: boolean;
}
/**
 * Category component for grouping inputs.
 */
export declare const VarCategory: FC<IVarCategoryProps>;
