import {useState} from 'react';

import {List} from '../../../component/build/component_index';

function App() {
    const [columns, setColumns] = useState(reactInitData);
    const [sort, setSort] = useState(reactInitSort);
    const [filter, setFilter] = useState(reactInitFilter);

    return <List
        columns={columns}
        sort={(sortType) => {
            fetch(`./data?sort=${sortType}&filter=${filter}`)
                .then(result => {
                    return result.json();
                })
                .then(data => {
                    setSort(sortType);
                    setColumns(data);
                });
        }}
        filter={(filterType) => {
            fetch(`./data?sort=${sort}&filter=${filterType}`)
                .then(result => {
                    return result.json();
                })
                .then(data => {
                    setFilter(filterType);
                    setColumns(data);
                });
        }}
    />
}

export default App;