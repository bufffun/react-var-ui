import React, { FC, useCallback, useRef } from 'react';
import { IconImageSelect } from './icons/IconImageSelect';
import { IconDelete } from './icons/IconDelete';

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
  const inputRef = useRef<HTMLInputElement | null>(null);
  const deleteAction = useCallback(() => {
    setCurrentValue({ src: null });
    if (inputRef && inputRef.current) {
      inputRef.current.value = '';
    }
  }, [setCurrentValue, inputRef]);

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
        <div
          className="react-var-ui-image-wrapper"
          style={
            currentValue == null || currentValue.src == null
              ? { border: 'none' }
              : {}
          }
        >
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
          <input ref={inputRef} type="file" id="" onChange={onFileChange} />
        </div>
        {currentValue == null || currentValue.src == null ? null : (
          <div className="react-var-ui-image-delete" onClick={deleteAction}>
            <IconDelete></IconDelete>
          </div>
        )}
      </div>
    </VarBase>
  );
};
