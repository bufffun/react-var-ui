import React, {
  FC,
  useMemo,
  useCallback,
  useState,
  useRef,
  useEffect,
} from 'react';

import { useVarUIValue } from './common/VarUIContext';
import { roundValue } from './common/roundValue';
import { IVarBaseInputProps, VarBase } from './VarBase';

export type IVarVector3Value = [number, number, number];
export interface IVarVector3Props extends IVarBaseInputProps<IVarVector3Value> {
  /**
   * Minimum value.
   */
  min?: IVarVector3Value;

  /**
   * Maximum value.
   */
  max?: IVarVector3Value;

  /**
   * Step.
   */
  step?: IVarVector3Value;

  /**
   * Should the end result be rounded to an integer value.
   */
  integer?: boolean;
}

/**
 * Integer/float number component. Accepts and provides numbers.
 */
export const VarVector3: FC<IVarVector3Props> = ({
  label,
  path,
  value,
  onChange,
  min,
  max,
  step = [1, 1, 1],
  integer,
  disabled,
  className,
}) => {
  const inputRefX = useRef<HTMLInputElement>(null);
  const inputRefY = useRef<HTMLInputElement>(null);
  const inputRefZ = useRef<HTMLInputElement>(null);
  const [display, setDisplay] = useState([0, 0, 0]);
  const [currentValue, setCurrentValue] = useVarUIValue(path, value, onChange);
  const stateRef = React.useRef(currentValue);

  const handleInputChange = useCallback(
    (e, index) => {
      const newValue = [...currentValue] as IVarVector3Value;
      newValue[index] = roundValue(
        parseFloat(e.target.value),
        min ? min[index] : min,
        max ? max[index] : max,
        step[index],
        !!integer
      );
      stateRef.current = newValue;
      setCurrentValue(newValue);
    },
    [setCurrentValue, currentValue, stateRef]
  );

  const handleInputBlur = useCallback(
    (e, index) => {
      const newValue = JSON.parse(
        JSON.stringify(stateRef.current)
      ) as IVarVector3Value;
      newValue[index] = roundValue(
        parseFloat(e.target.value),
        min ? min[index] : min,
        max ? max[index] : max,
        step[index],
        !!integer
      );
      stateRef.current = newValue;
      setCurrentValue(newValue);
      setDisplay(newValue);
    },
    [setCurrentValue, setDisplay, currentValue]
  );

  const handleInputBlurX = useCallback(
    e => {
      handleInputBlur(e, 0);
    },
    [handleInputBlur]
  );

  const handleInputBlurY = useCallback(
    e => {
      handleInputBlur(e, 1);
    },
    [handleInputBlur]
  );

  const handleInputBlurZ = useCallback(
    e => {
      handleInputBlur(e, 2);
    },
    [handleInputBlur]
  );

  useEffect(() => {
    inputRefX.current?.addEventListener('blur', handleInputBlurX);
    inputRefY.current?.addEventListener('blur', handleInputBlurY);
    inputRefZ.current?.addEventListener('blur', handleInputBlurZ);
    return () => {
      inputRefX.current?.removeEventListener('blur', handleInputBlurX);
      inputRefY.current?.removeEventListener('blur', handleInputBlurY);
      inputRefZ.current?.removeEventListener('blur', handleInputBlurZ);
    };
  }, [currentValue]);

  useEffect(() => {
    if (inputRefX.current) {
      inputRefX.current.value = roundedX.toString();
    }
    if (inputRefY.current) {
      inputRefY.current.value = roundedY.toString();
    }
    if (inputRefZ.current) {
      inputRefZ.current.value = roundedZ.toString();
    }
  }, [display]);

  const roundedX = useMemo(
    () =>
      roundValue(
        currentValue[0],
        min ? min[0] : min,
        max ? max[0] : max,
        step[0],
        !!integer
      ),
    [currentValue, min, max, step, integer]
  );

  const roundedY = useMemo(
    () =>
      roundValue(
        currentValue[1],
        min ? min[1] : min,
        max ? max[1] : max,
        step[1],
        !!integer
      ),
    [currentValue, min, max, step, integer]
  );

  const roundedZ = useMemo(
    () =>
      roundValue(
        currentValue[2],
        min ? min[2] : min,
        max ? max[2] : max,
        step[2],
        !!integer
      ),
    [currentValue, min, max, step, integer]
  );

  return (
    <VarBase label={label} disabled={disabled} className={className}>
      <div className="react-var-ui-vector">
        <div className="react-var-ui-vector-wrapper">
          <span>X</span>
          <input
            className="react-var-ui-vector-input"
            type="number"
            ref={inputRefX}
            min={min ? min[0] : min}
            max={max ? max[0] : max}
            step={step[0]}
            onChange={e => handleInputChange(e, 0)}
          />
        </div>

        <div className="react-var-ui-vector-wrapper">
          <span>Y</span>
          <input
            className="react-var-ui-vector-input"
            type="number"
            ref={inputRefY}
            min={min ? min[1] : min}
            max={max ? max[1] : max}
            step={step[1]}
            onChange={e => handleInputChange(e, 1)}
          />
        </div>

        <div className="react-var-ui-vector-wrapper">
          <span>Z</span>
          <input
            className="react-var-ui-vector-input"
            type="number"
            ref={inputRefZ}
            min={min ? min[2] : min}
            max={max ? max[2] : max}
            step={step[2]}
            onChange={e => handleInputChange(e, 2)}
          />
        </div>
      </div>
    </VarBase>
  );
};
