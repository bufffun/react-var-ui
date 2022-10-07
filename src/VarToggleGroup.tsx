import React, { FC } from 'react';

import { useVarUIValue } from './common/VarUIContext';
import { IVarBaseInputProps, VarBase } from './VarBase';

export interface IVarToggleGroupProps extends IVarBaseInputProps<boolean> {
  /**
   * 关闭的时候隐藏children
   */
  toggleHidden?: boolean;
}

/**
 * Checkbox/toggle component. Accepts and returns a boolean (true/false).
 */
export const VarToggleGroup: FC<IVarToggleGroupProps> = ({
  label,
  path,
  value,
  onChange,
  disabled,
  className,
  children,
  toggleHidden,
}) => {
  const [currentValue, setCurrentValue] = useVarUIValue(path, value, onChange);

  return (
    <div>
      <VarBase label={label} disabled={disabled} className={className}>
        <span>
          <label className="react-var-ui-toggle" title="Toggle">
            <input
              type="checkbox"
              checked={currentValue || false}
              onChange={e => setCurrentValue(e.target.checked)}
            />
            <span className="react-var-ui-toggle-helper"></span>
          </label>
        </span>
      </VarBase>
      {!!children && !(toggleHidden && (!currentValue || false)) && (
        <div className="react-var-ui-group">{children}</div>
      )}
    </div>
  );
};
