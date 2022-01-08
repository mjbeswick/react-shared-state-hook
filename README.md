# React Shared State Hook

A simple hook for sharing state efficently between comonents in React.

This is not intended to replaced dedicated state management in complex or large application, but to provide a simpler way to share state betweek componnents that using the context API.

### Example usage:

```tsx
import React, { FC, Fragment } from 'react';
import { createSharedState } from 'react-shared-state-hook';

const initialValue = 0;
const useSharedState = createSharedState(initialValue);

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
```
