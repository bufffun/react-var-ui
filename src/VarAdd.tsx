import React, { FC, ReactNode } from 'react';

import { IVarBaseProps, VarBase } from './VarBase';
import { IconImageSelect } from './icons/IconImageSelect';

export interface IVarAddProps extends IVarBaseProps {
  /**
   * Called when the add button is clicked.
   */
  onClick?: () => void;

  content?: ReactNode;
}

/**
 * Button component. Only provides a onClick property.
 */
export const VarButton: FC<IVarAddProps> = ({
  label,
  onClick,
  disabled,
  className,
}) => {
  return (
    <VarBase label={label} disabled={disabled} className={className}>
      <div className="react-var-ui-add">
        <div className="react-var-ui-add-wrapper" onClick={onClick}>
            <IconImageSelect></IconImageSelect>
        </div>
      </div>
    </VarBase>
  );
};
