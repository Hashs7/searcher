import * as React from 'react'
import { ProviderState, ProviderStore } from './types';
import { ApiProduct } from '../api/types';

export const Context = React.createContext({} as ProviderStore);

export class StoreProvider extends React.Component<{}, ProviderState> {
    public readonly state = {
        searchString: '',
        focusIndex: -1,
        results: []
    };

    /**
     *
     * @param value
     */
    private updateSearch = (value: string) => {
        this.setState({ searchString: value });
    };

    /**
     *
     * @param value
     */
    private updateFocus = (value: number) => {
        this.setState({ focusIndex: value });
    };

    /**
     *
     * @param products
     */
    private updateResults = (products: ApiProduct[]) => {
        this.setState({ results: products });
    };

    private selectItem = () => {
        window.dispatchEvent(
            new CustomEvent('selectProduct', {
                detail: this.state.results[this.state.focusIndex]
            })
        );
    };

    public render() {
        const store: ProviderStore = {
            state: this.state,
            selectItem: this.selectItem,
            updateSearch: this.updateSearch,
            updateFocus: this.updateFocus,
            updateResults: this.updateResults
        };

        return <Context.Provider value={store}>{this.props.children}</Context.Provider>;
    }
}

