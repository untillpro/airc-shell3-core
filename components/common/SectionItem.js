/*
 * Copyright (c) 2020-present unTill Pro, Ltd.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SectionItem extends Component {
    render() {
        const { active, text, children, onClick, error } = this.props;
        
        return (
            <li 
                className={`sections-bar-item ${active ? 'selected' : ''} ${error ? 'has-error' : ''}`}
                onClick={ onClick ? event => onClick(event) : null }
            >
                {text ? text : children}
            </li>
        );
    }
}

SectionItem.propTypes = {
    active: PropTypes.bool, 
    text: PropTypes.string, 
    children: PropTypes.node, 
    onClick: PropTypes.func, 
    error: PropTypes.bool
};

export default SectionItem;