import React, { FC, useMemo } from 'react';
// import React, { FC, useCallback, useMemo } from 'react';

import { useVarUIValue } from './common/VarUIContext';
import { roundValue } from './common/roundValue';
import { IVarBaseInputProps, VarBase } from './VarBase';

export type IVarVectorValue = [number, number, number];
export interface IVarVectorProps extends IVarBaseInputProps<IVarVectorValue> {
  /**
   * Minimum value.
   */
  min?: IVarVectorValue;

  /**
   * Maximum value.
   */
  max?: IVarVectorValue;

  /**
   * Step.
   */
  step?: IVarVectorValue;

  /**
   * Should the end result be rounded to an integer value.
   */
  integer?: boolean;
}

/**
 * Integer/float number component. Accepts and provides numbers.
 */
export const VarVector: FC<IVarVectorProps> = ({
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
  const [currentValue, setCurrentValue] = useVarUIValue(path, value, onChange);
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
        <input
          className="react-var-ui-vector-input"
          type="number"
          min={min ? min[0] : min}
          max={max ? max[0] : max}
          step={step[0]}
          value={roundedX.toString()}
          onChange={e =>
            setCurrentValue([
              roundValue(
                parseFloat(e.target.value),
                min ? min[0] : min,
                max ? max[0] : max,
                step[0],
                !!integer
              ),
              currentValue[1],
              currentValue[2],
            ])
          }
        />
        <input
          className="react-var-ui-vector-input"
          type="number"
          min={min ? min[1] : min}
          max={max ? max[1] : max}
          step={step[1]}
          value={roundedY.toString()}
          onChange={e =>
            setCurrentValue([
              currentValue[0],
              roundValue(
                parseFloat(e.target.value),
                min ? min[1] : min,
                max ? max[1] : max,
                step[1],
                !!integer
              ),
              currentValue[2],
            ])
          }
        />
        <input
          className="react-var-ui-vector-input"
          type="number"
          min={min ? min[2] : min}
          max={max ? max[2] : max}
          step={step[2]}
          value={roundedZ.toString()}
          onChange={e =>
            setCurrentValue([
              currentValue[0],
              currentValue[1],
              roundValue(
                parseFloat(e.target.value),
                min ? min[2] : min,
                max ? max[2] : max,
                step[2],
                !!integer
              ),
            ])
          }
        />
      </div>
    </VarBase>
  );
};
