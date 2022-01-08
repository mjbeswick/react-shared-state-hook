import React, { Fragment, FC, ChangeEvent } from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { createSharedState, SharedState } from './sharedState';
import {
  render,
  fireEvent,
  waitFor,
  screen,
  EventType,
} from '@testing-library/react';

const initialValue = 'INITIAL_VALUE';
const newValue = 'NEW_VALUE';

let useSharedState: SharedState<string>;

const DummyComponent: FC<{ id: string }> = ({ id }) => {
  const [state, setState] = useSharedState();

  const change = (event: ChangeEvent<HTMLInputElement>) => {
    setState(event.currentTarget.value);
  };

  return <input type="text" value={state} onChange={change} data-testid={id} />;
};

describe('createSharedState', () => {
  beforeEach(() => {
    useSharedState = createSharedState(React, initialValue);
  });

  it('should bet set to the initial value', () => {
    const { result } = renderHook(() => useSharedState());
    const [value] = result.current;

    expect(value).toBe(initialValue);
  });

  it('should bet set to the new value', () => {
    const { result } = renderHook(() => useSharedState());

    act(() => {
      result.current[1](newValue);
    });

    expect(result.current[0]).toBe(newValue);
  });

  it('loads and displays greeting', async () => {
    render(
      <Fragment>
        <DummyComponent id="comp-a" />
        <DummyComponent id="comp-b" />
      </Fragment>
    );

    const inputA = screen.getByTestId<HTMLInputElement>('comp-a');

    fireEvent.change(inputA, { target: { value: newValue } });

    const elB = screen.getByTestId<HTMLInputElement>('comp-a');
    expect(elB.value).toEqual(newValue);
  });
});
