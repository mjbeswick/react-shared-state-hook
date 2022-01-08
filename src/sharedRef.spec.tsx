import { renderHook, act } from '@testing-library/react-hooks';
import { createSharedRef } from './sharedRef';
import { SharedRef } from '.';

const initialValue = 'INITIAL_VALUE';
const newValue = 'NEW_VALUE';

let useSharedRef: SharedRef<string>;

describe('staredRef', () => {
  beforeEach(() => {
    useSharedRef = createSharedRef(initialValue);
  });

  it('should bet set to the initial value', () => {
    const { result } = renderHook(() => useSharedRef());
    const { current } = result;

    expect(current.current).toBe(initialValue);
  });

  it('should bet set to the new value', () => {
    const { result } = renderHook(() => useSharedRef());

    act(() => {
      result.current.current = newValue;
    });

    expect(result.current.current).toBe(newValue);
  });
});
