import React, { FC } from 'react';

import { IVarBaseProps, VarBase } from './VarBase';
import { IconDelete } from './icons/IconDelete';

export interface IVarGroupProps extends IVarBaseProps {
  /**
   * 删除
   */
  onDelete?: () => void;
}

/**
 * Category component for grouping inputs.
 */
export const VarGroup: FC<IVarGroupProps> = ({
  label,
  disabled,
  className,
  children,
  onDelete,
}) => {
  return (
    <div>
      <VarBase label={label} disabled={disabled} className={className}>
        <div className="react-var-ui-group-wrapper">
          <div className="react-var-ui-group-wrapper-icon">
            <div
              onClick={() => {
                onDelete?.();
              }}
            >
              <IconDelete></IconDelete>
            </div>
          </div>
        </div>
      </VarBase>
      {!!children && <div className="react-var-ui-group">{children}</div>}
    </div>
  );
};
