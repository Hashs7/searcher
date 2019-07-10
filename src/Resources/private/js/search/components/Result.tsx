import * as React from 'react';
import { Context } from '../store';

interface ResultProps {
    name: string,
    index: number
}

/**
 *
 * @param name
 * @param active
 */
export default ({name, index}: ResultProps) => {
    const { state, updateFocus, selectItem } = React.useContext(Context);

    return (
        <div className={state.focusIndex === index ? "result active" : "result"}
             onClick={selectItem}
             onMouseEnter={() => updateFocus(index)}
             onMouseLeave={() => updateFocus(-1)}>
            <span className="result__name">{name}</span>
        </div>
    );
}
