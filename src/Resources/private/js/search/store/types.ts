import { ApiProduct } from '../api/types';

export interface ProviderState {
    searchString: string,
    focusIndex: number,
    results: ApiProduct[]
}

export interface ProviderStore {
    state: ProviderState;
    selectItem: () => void;
    updateSearch: (arg: string) => void;
    updateFocus: (arg: number) => void;
    updateResults: (arg: ApiProduct[]) => void;
}