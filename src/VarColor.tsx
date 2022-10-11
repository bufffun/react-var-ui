import React, { FC, useCallback, useState, useEffect } from 'react';
import { RGBColor, SketchPicker } from 'react-color';
import tinycolor from 'tinycolor2';

import { useVarUIValue } from './common/VarUIContext';
import { IVarBaseInputProps, VarBase } from './VarBase';

export interface IVarColorProps extends IVarBaseInputProps<RGBColor> {
  /**
   * Should allow picking alpha values?
   * If true, the result hex code will contain extra two characters representing the alpha value, from 00 to FF.
   */
  alpha?: boolean;
}

/**
 * Color picker component. Returns and accepts values in form of hex color strings.
 */
export const VarColor: FC<IVarColorProps> = ({
  label,
  path,
  value,
  alpha,
  onChange,
  disabled,
  className,
}) => {
  const [currentValue, setCurrentValue] = useVarUIValue(path, value, onChange);

  const [show, setShow] = useState(false);

  const handleCloseClick = useCallback(
    (event: MouseEvent) => {
      const popup = (event.target as Element)?.closest('.sketch-picker');
      const has_picker =
        document.getElementsByClassName('sketch-picker').length != 0;
      if (has_picker && show && popup == null) {
        setShow(false);
      }
    },
    [show, setShow]
  );

  useEffect(() => {
    if (show) {
      window.addEventListener('click', handleCloseClick);
    } else {
      window.removeEventListener('click', handleCloseClick);
    }
    return () => window.removeEventListener('click', handleCloseClick);
  }, [show]);

  const toggle = useCallback(() => {
    setShow(show => !show);
  }, [setShow]);

  // const close = useCallback(() => {
  //   setShow(false);
  // }, [setShow]);

  return (
    <VarBase label={label} disabled={disabled} className={className}>
      <span>
        <span className="react-var-ui-color-value">
          {alpha ? tinycolor(currentValue).toHex8String() : tinycolor(currentValue).toHexString()}
        </span>
        <div className="react-var-ui-color">
          <div className="react-var-ui-color-swatch" onClick={toggle}>
            <div
              className="react-var-ui-color-color"
              title="Color preview"
              style={
                currentValue
                  ? { background:
                        'rgb(' +
                        currentValue.r +
                        ',' +
                        currentValue.g +
                        ',' +
                        currentValue.b +
                        ',' +
                        (currentValue.a != undefined ? currentValue.a : 1) + 
                        ')',
                    }
                  : {}
              }
            />
          </div>
          {show ? (
            <div className="react-var-ui-color-popover">
              <SketchPicker
                color={currentValue}
                onChange={result => {
                  setCurrentValue(result.rgb);
                }}
                disableAlpha={!alpha}
              />
            </div>
          ) : null}
        </div>
      </span>
    </VarBase>
  );
};
