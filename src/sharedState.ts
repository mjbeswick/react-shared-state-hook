type EffectCallback = () => void | Destructor;
declare const UNDEFINED_VOID_ONLY: unique symbol;
type Destructor = () => void | { [UNDEFINED_VOID_ONLY]: never };
type DependencyList = ReadonlyArray<any>;
type SetStateAction<S> = S | ((prevState: S) => S);
type Dispatch<A> = (value: A) => void;

export type IReact = {
  useState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>];

  useState<S = undefined>(): [
    S | undefined,
    Dispatch<SetStateAction<S | undefined>>
  ];

  useEffect(effect: EffectCallback, deps?: DependencyList): void;
};

interface Store<T> {
  state: T;
  listeners: Dispatch<SetStateAction<T>>[];
  setState: (value: T) => void;
}

const setCustomHookState = <T>(store: Store<T>) => {
  return (value: T) => {
    if (value !== store.state) {
      store.state = value;

      store.listeners.forEach((listener: any) => {
        listener(store.state);
      });
    }
  };
};

const useCustomHook = <T>(react: IReact, store: Store<T>) => {
  return (): [T, (value: T) => void] => {
    const newListener = react.useState<T>()[1] as Dispatch<SetStateAction<T>>;

    react.useEffect(() => {
      store.listeners.push(newListener);

      return () => {
        store.listeners = store.listeners.filter(
          (listener: any) => listener !== newListener
        );
      };
    }, []);

    return [store.state, store.setState];
  };
};

const initializeStore = <T>(initialValue: unknown) => {
  const store: any = {};

  if (typeof initialValue === 'function') {
    store.state = initialValue() as T;
  } else {
    store.state = initialValue as T;
  }

  store.listeners = [];
  store.setState = setCustomHookState<T>(store);

  return store as Store<T>;
};

export type SharedState<T> = () => [T, (value: T) => void];

export const createSharedState = <T>(
  react: unknown,
  initialValue?: T | (() => T)
) => {
  const store: Store<T> = initializeStore(initialValue);

  return useCustomHook(react as IReact, store as Store<T>);
};
