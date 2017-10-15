/* flow */
/* eslint-disable react/no-danger */
import React from 'react';

type PropsType = {
  playerId: string,
};

const ReactJWPlayerBase = ({ playerId }: PropsType) => (
  <div
    dangerouslySetInnerHTML={{
      __html: `<div id={${playerId}}></div>`,
    }}
  />
);

export default ReactJWPlayerBase;
