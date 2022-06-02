/*
 * Copyright (c) 2020-present unTill Pro, Ltd.
 */

import React from 'react';
import PropTypes from 'prop-types';

const Overlay = ({ children, showClose, handleClose }) => {
    return (
        <div className="base-overlay">
            {showClose ? <div className="base-overlay_close-button" onClick={handleClose}></div> : null}
            {children}
        </div>
    );
}

Overlay.propTypes = {
    children: PropTypes.object.isRequired,
    showClose: PropTypes.bool,
    handleClose: PropTypes.func,
};

export default Overlay;
