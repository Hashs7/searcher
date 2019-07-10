import * as React from 'react';
import Result from './Result';
import {Context} from '../store';

export default () => {
    const { state } = React.useContext(Context);

    return (
        <div className="result-list">
        {state.results.length
            ? state.results.map((result, i) => {
                const name = result._source.name_en_us;

                return <Result name={name} key={i} index={i}/> })
            : null
        }
        </div>
    );
}
