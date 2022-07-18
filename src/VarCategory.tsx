import React, { FC, ReactNode } from 'react';

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
export const VarCategory: FC<IVarCategoryProps> = ({
  label,
  className,
  showDash,
  children
}) => {
  return (
    <div className={'react-var-ui-category ' + (className ? className : '')}>
      <div className={'react-var-ui-category-title ' + (showDash ? 'react-var-ui-category-title-dash' : '' )}>{label}</div>
      {!!children && <div>{children}</div>}
    </div>
  );
};
