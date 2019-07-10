import * as React from 'react';
import { render } from 'react-dom';
import { StoreProvider } from './search/store';
import { Search } from './search/components/Search';

const run = () => {
    render(
        <StoreProvider>
            <Search />
        </StoreProvider>,
        document.getElementById('search-root')
    );
};

document.addEventListener('DOMContentLoaded', () => {
    run()
});

// Listen product selection
window.addEventListener('selectProduct', (e: CustomEvent) => {
    console.log('Selected product : ', e.detail);
});
