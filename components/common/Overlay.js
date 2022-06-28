/*
 * Copyright (c) 2020-present unTill Pro, Ltd.
 */

import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: 0,
        background: 'none',
        border: 'none',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.5)'
    }
};

const Overlay = ({ visible, children, showClose, onClose }) => {
    const handleClose = () => {
        if (typeof onClose === 'function') {
            onClose();
        }
    };

    return (
        <ReactModal
            isOpen={visible}
            style={customStyles}
            shouldCloseOnOverlayClick={true}
            onRequestClose={handleClose}
            ariaHideApp={false}
        >
            {showClose ? <div className="overlay-close-button" onClick={handleClose}></div> : null}
            {children}
        </ReactModal>
    );
}

Overlay.propTypes = {
    children: PropTypes.object.isRequired,
    visible: PropTypes.bool,
    showClose: PropTypes.bool,
    onClose: PropTypes.func,
};

export default Overlay;
