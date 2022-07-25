import React, { FC } from 'react';

/**
 * Group item component inside group.
 */
export const VarGroupItem: FC = ({
  children,
}) => {
  return (
    <div className="react-var-ui-group-item">
      {children}
    </div>
  );
};
