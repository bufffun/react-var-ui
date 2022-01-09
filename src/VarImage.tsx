import React, { FC, useCallback } from 'react';
import { IconImageSelect } from './icons/IconImageSelect';

import { useVarUIValue } from './common/VarUIContext';
import { IVarBaseInputProps, VarBase } from './VarBase';

export interface IVarImageProps
  extends IVarBaseInputProps<{
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
    () => setCurrentValue({ src: null }),
    [setCurrentValue]
  );

  const onFileChange = useCallback(
    event => {
      const files = (event?.target as HTMLInputElement).files;
      if (!files || !files.length) return;
      const file = files[0];
      const url = URL.createObjectURL(file);
      const extension = file.name.split('.')?.pop()?.toLowerCase();
      setCurrentValue({ src: url, type: file.type, extension: extension });
    },
    [setCurrentValue]
  );

  return (
    <VarBase label={label} disabled={disabled} className={className}>
      <div className="react-var-ui-image">
        <div className="react-var-ui-image-wrapper">
          {currentValue == null || currentValue.src == null ? (
            <IconImageSelect></IconImageSelect>
          ) : (
            <img
              className="react-var-ui-image-wrapper-preview"
              src={
                currentValue.src instanceof HTMLImageElement
                  ? currentValue.src.src
                  : currentValue.src
              }
              alt="preview"
            />
          )}
          <input type="file" onChange={onFileChange} />
        </div>
        {currentValue == null || currentValue.src == null ? null : (
          <span className="react-var-ui-image-delete" onClick={deleteAction}>
            删除
          </span>
        )}
      </div>
    </VarBase>
  );
};
