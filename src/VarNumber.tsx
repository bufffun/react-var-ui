import React, { FC, useCallback, useState, useRef, useEffect } from 'react';

import { useVarUIValue } from './common/VarUIContext';
import { roundValue } from './common/roundValue';
import { IVarBaseInputProps, VarBase } from './VarBase';
import { IconDown } from './icons/IconDown';
import { IconUp } from './icons/IconUp';

export interface IVarNumberProps extends IVarBaseInputProps<number> {
  /**
   * Minimum value.
   */
  min?: number;

  /**
   * Maximum value.
   */
  max?: number;

  /**
   * Step.
   */
  step?: number;

  /**
   * Should the end result be rounded to an integer value.
   */
  integer?: boolean;

  /**
   * If true will display buttons that increase and decrease the value by step.
   * Step must be set.
   */
  showButtons?: boolean;
}

/**
 * Integer/float number component. Accepts and provides numbers.
 */
export const VarNumber: FC<IVarNumberProps> = ({
  label,
  path,
  value,
  onChange,
  min,
  max,
  step = 1,
  integer,
  showButtons,
  disabled,
  className,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [currentValue, setCurrentValue] = useVarUIValue(path, value, onChange);
  const [display, setDisplay] = useState(0);
  const updateFlagRef = useRef<Boolean>(true);

  useEffect(() => {
    inputRef.current?.addEventListener('blur', handleInputBlur);
    return () => inputRef.current?.removeEventListener('blur', handleInputBlur);
  }, [currentValue]);

  useEffect(() => {
    if (inputRef.current && updateFlagRef.current) {
      const value = roundValue(
        currentValue,
        min,
        max,
        step,
        !!integer
      ).toString();
      inputRef.current.value = value;
    }
  }, [currentValue, display]);

  const handleInputChange = useCallback(
    e => {
      updateFlagRef.current = false;
      setCurrentValue(
        roundValue(parseFloat(e.target.value), min, max, step, !!integer)
      );
    },
    [setCurrentValue]
  );

  const handleInputBlur = useCallback(
    e => {
      updateFlagRef.current = true;
      setCurrentValue(roundValue(parseFloat(e.target.value), min, max, step, !!integer));
      setDisplay(parseFloat(e.target.value));
    },
    [setCurrentValue, setDisplay]
  );

  const increaseValue = useCallback(() => {
    updateFlagRef.current = true;
    setCurrentValue(roundValue(currentValue + (step ?? 1), min, max, step, !!integer));
    setDisplay(currentValue + (step ?? 1));
  }, [currentValue, setCurrentValue, integer, min, max, step]);

  const decreaseValue = useCallback(() => {
    updateFlagRef.current = true;
    setCurrentValue(roundValue(currentValue - (step ?? 1), min, max, step, !!integer));
    setDisplay(currentValue - (step ?? 1));
  }, [currentValue, setCurrentValue, integer, min, max, step]);

  return (
    <VarBase label={label} disabled={disabled} className={className}>
      <div className="react-var-ui-number">
        <input
          className="react-var-ui-number-input"
          ref={inputRef}
          type="number"
          min={min}
          max={max}
          step={step}
          onChange={handleInputChange}
        />
        {showButtons && (
          <>
            <button title="Increase" onClick={increaseValue}>
              <IconUp />
            </button>
            <button title="Decrease" onClick={decreaseValue}>
              <IconDown />
            </button>
          </>
        )}
      </div>
    </VarBase>
  );
};
