import React, { FC, useCallback, useState, useEffect } from 'react';

import { IVarBaseProps, VarBase } from './VarBase';
import { IconAdd } from './icons/IconAdd';

export interface IVarAddProps extends IVarBaseProps {
  /**
   * Called when the add button is clicked.
   */
  didClick?: () => void;
}

/**
 * Button component. Only provides a onClick property.
 */
export const VarAdd: FC<IVarAddProps> = ({
  label,
  didClick,
  disabled,
  className,
  children,
}) => {
  const [show, setShow] = useState(false);

  const handleCloseClick = useCallback(
    (_: MouseEvent) => {
      // const popup = (event.target as Element)?.closest(
      //   '.react-var-ui-add-popover'
      // );
      // const has_picker =
      //   document.getElementsByClassName('react-var-ui-add-popover').length != 0;
      // if (has_picker && show && popup == null) {
        setShow(false);
      // }
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

  return (
    <VarBase label={label} disabled={disabled} className={className}>
      <div className="react-var-ui-add">
        <div className="react-var-ui-add-wrapper">
          <div
            onClick={() => {
              toggle();
              didClick?.();
            }}
          >
            <IconAdd></IconAdd>
          </div>
          {show ? (
            <div className="react-var-ui-add-popover">{children}</div>
          ) : null}
        </div>
      </div>
    </VarBase>
  );
};
