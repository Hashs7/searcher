import * as React from 'react'
import ResultList from './ResultList';
import useDebounce from './useDebounce';
import {Context} from '../store';
import { fetchProducts } from '../api';
import { ApiProduct } from '../api/types';
import { trans } from '../../common/generator';

export const Search: React.FC = () => {
    const {state, updateSearch, updateResults, updateFocus, selectItem} = React.useContext(Context);
    const wrapperRef            = React.useRef<HTMLDivElement>(null);
    const debouncedSearchTerm   = useDebounce(state.searchString, 500);
    const [isFocus, setIsFocus] = React.useState(false);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        switch (e.keyCode) {
        case 38:
            e.preventDefault();
            if(state.focusIndex <= 0) return;
            updateFocus(state.focusIndex - 1);
            break;
        case 40:
            e.preventDefault();
            if(state.focusIndex === state.results.length - 1) return;
            updateFocus(state.focusIndex + 1);
            break;
        case 13:
            selectItem();
            break;
        case 27:
            setIsFocus(false);
            updateFocus(-1);
            break;
        }
    };

    // Handle blur event outside of component
    React.useEffect(() => {
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    const handleClick = (event: MouseEvent) => {
        if (wrapperRef.current !== null && wrapperRef.current.contains(event.target as Element)) return;
        setIsFocus(false)
    };

    // Fetch product on search field
    React.useEffect(() => {
        if (!debouncedSearchTerm) {
            updateResults([]);
            return;
        }

        fetchProducts(debouncedSearchTerm)
            .then(res => {
                const products: ApiProduct[] = res.data.products;
                updateResults(products);
            });
    },
    [debouncedSearchTerm]);

    return (
        <div className={isFocus ? 'search-app focus' : 'search-app'}
             ref={wrapperRef}
             onKeyDown={ handleKeyDown }
             onClick={ () => setIsFocus(true) }>

            <div className="search-container">
                <div className="search-container__icon">
                    <span aria-hidden="true"></span>
                </div>
                <input
                    value={state.searchString}
                    onChange={(e: React.SyntheticEvent) => updateSearch((e.target as HTMLInputElement).value)}
                    className="search-container__input"
                    placeholder={trans("sylius.ui.search")}
                />
            </div>

            {isFocus
                ? <ResultList/>
                : null}
        </div>
    )
};