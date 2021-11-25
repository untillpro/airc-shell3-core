/*
 * Copyright (c) 2020-present unTill Pro, Ltd.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ActiveToggler extends Component {
    render() {
        const { label, active, onClick, right } = this.props;

        return (
            <div
                className={`active-toggler ${active ? 'active' : ''} ${right ? 'right' : ''}`}
                onClick={onClick ? () => onClick() : null}
            >   
                {!right ? (<i className='icon-hide' />) : null}
                
                {label}

                {right ? (<i className='icon-hide' />) : null}
            </div>
        );
    }
}

ActiveToggler.propTypes = {
    label: PropTypes.string,
    active: PropTypes.bool,
    onClick: PropTypes.func,
    right: PropTypes.bool
};

export default ActiveToggler;
