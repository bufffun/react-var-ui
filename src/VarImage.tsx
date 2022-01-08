import React, { FC, useCallback } from 'react';
import { IconImageSelect } from './icons/IconImageSelect';

import { useVarUIValue } from './common/VarUIContext';
import { IVarBaseInputProps, VarBase } from './VarBase';

export interface IVarImageProps
  extends IVarBaseInputProps<HTMLImageElement | string | null> {
  path?: string;
  value?: HTMLImageElement | string | null;
}

/**
 * A simple component that displays a string or a numeric value.
 */
export const VarImage: FC<IVarImageProps> = ({
  label,
  disabled,
  path,
  value,
  onChange,
  className,
}) => {
  const [currentValue, setCurrentValue] = useVarUIValue(path, value, onChange);

  const deleteAction = useCallback(
    () => setCurrentValue(null),
    [setCurrentValue]
  );

  const onFileChange = useCallback(
    event => {
      const files = (event?.target as HTMLInputElement).files;
      if (!files || !files.length) return;
      const file = files[0];
      const url = URL.createObjectURL(file);
      setCurrentValue(url);
    },
    [setCurrentValue]
  );

  return (
    <VarBase label={label} disabled={disabled} className={className}>
      <div className="react-var-ui-image">
        <div className="react-var-ui-image-wrapper">
          {currentValue == null ? (
            <IconImageSelect></IconImageSelect>
          ) : (
            <img
              className="react-var-ui-image-wrapper-preview"
              src={
                currentValue instanceof HTMLImageElement
                  ? currentValue.src
                  : currentValue
              }
              alt="preview"
            />
          )}
          <input type="file" onChange={onFileChange}/>
        </div>
        {currentValue != null ? (
          <span className="react-var-ui-image-delete" onClick={deleteAction}>
            删除
          </span>
        ) : null}
      </div>
    </VarBase>
  );
};
