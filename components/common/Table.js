/*
 * Copyright (c) 2020-present unTill Pro, Ltd.
 */

import ReactTable from 'react-table';

/*
    Original component documentation: https://react-table.tanstack.com/
*/

class Table extends ReactTable {
    componentDidUpdate(newProps, newState) {
        const { onTableDataUpdate } = this.props;

        if (onTableDataUpdate && typeof onTableDataUpdate === 'function') {
            onTableDataUpdate(newState.resolvedData);
        }

        super.componentDidUpdate(newProps, newState);
    }

    render() {
        return super.render()
    }
}

export default Table;
