/*
 * Copyright (c) 2020-present unTill Pro, Ltd.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Grid extends Component {
    getGap() {
        switch (this.props.gap) {
            case 32: return 'gap-32';
            case 24: return 'gap-24';
            case 16: return 'gap-16';
            case 8: return 'gap-8';
            default: return 'gap-16';
        }
    }

    render() {
        return (
            <div 
                className={
                    `
                        grid 
                        ${this.props.rows > 0 ? `row-${this.props.rows}` : ''} 
                        ${this.props.cols > 0 ? `col-${this.props.cols}` : 'col-3'}
                        ${this.getGap()}

                    `
                }
            >
                {this.props.children}
            </div>
        );
    }
}

Grid.propTypes = {
    rows: PropTypes.number,
    cols: PropTypes.number,
    gap: PropTypes.number,
    children: PropTypes.node

};

export default Grid;
