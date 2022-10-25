import { FC, PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { Store } from "redux";

type Props = {
    store: Store
} & PropsWithChildren

export const FakeStoreProvider: FC<Props> = ({store, children}: Props) => {
    return <Provider store={store}>
        {children}
    </Provider>
}

const getProvidedFakeStore = (fakeStore: Store): FC<PropsWithChildren> => ({children}) => <FakeStoreProvider store={fakeStore}>{children}</FakeStoreProvider>

export const createFakeStoreProvider = (mockState: {} = {}) => {
    const fakeStore: Store = {
        dispatch: jest.fn(),
        getState: jest.fn().mockReturnValue(mockState),
        subscribe: jest.fn(),
        replaceReducer: jest.fn()
    } as any as Store;

    const ProvidedFakeStoreProvider = getProvidedFakeStore(fakeStore);

    return {
        fakeStore,
        ProvidedFakeStoreProvider,
        withFakeStore: <T extends {}>(Child: FC<T>): FC<T> => (props) => <ProvidedFakeStoreProvider><Child {...props}/></ProvidedFakeStoreProvider>
    }
}