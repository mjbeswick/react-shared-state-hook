import React, { FC, Fragment } from 'react';
import { createSharedState } from '../sharedState';

const initialValue = 0;
const useSharedState = createSharedState(React, initialValue);

const ChildComponent: FC = () => {
  const [state, setState] = useSharedState();

  return (
    <div
      style={{
        outline: '1px solid',
        padding: 10,
        margin: 10,
        display: 'inline-flex',
        columnGap: 10,
        flexBasis: 20,
      }}
    >
      <span>{state}</span>
      <input type="button" onClick={() => setState(state + 1)} value="Up" />
      &nbsp;
      <input type="button" onClick={() => setState(state + 1)} value="Down" />
    </div>
  );
};

const Example: FC = () => {
  return (
    <Fragment>
      <ChildComponent />
      <ChildComponent />
      <ChildComponent />
    </Fragment>
  );
};
