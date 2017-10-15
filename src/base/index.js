/* flow */
/* eslint-disable react/no-danger */
import React from 'react';

type PropsType = {
  className?: string,
  playerId: string,
};

const ReactJWPlayerBase = ({ className, playerId }: PropsType) => (
  <div
    className={className}
    dangerouslySetInnerHTML={{
      __html: `<div id="${playerId}"></div>`,
    }}
  />
);

ReactJWPlayerBase.defaultProps = {
  className: null,
};

export default ReactJWPlayerBase;
