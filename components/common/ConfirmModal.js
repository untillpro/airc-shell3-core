/*
 * Copyright (c) 2020-present unTill Pro, Ltd.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

class ConfirmModal extends Component {
    renderHeader() {
        const { header } = this.props;

        if (header && typeof header === 'string') {
            return (
                <div className="confirm-modal-header">
                    {header}
                </div>
            );
        }

        return null;
    }

    renderText() {
        const { text } = this.props;

        if (text && typeof text === 'string') {
            return (
                <div className="confirm-modal-text">
                    {text}
                </div>
            );
        }

        return null;
    }

    renderButtons() {
        const { confirmText, onConfirm, rejectText, onReject } = this.props;

        const buttons = [];

        if (confirmText && onConfirm && typeof onConfirm === 'function') {
            buttons.push(
                <Button onClick={onConfirm} > {confirmText} </Button>
            );
        }

        if (rejectText && onReject && typeof onReject === 'function') {
            buttons.push(
                <Button onClick={onReject} type="primary" > {rejectText} </Button>
            );
        }

        if (buttons.length > 0) {
            return (
                <div className="confirm-modal-buttons">
                    {buttons}
                </div>
            );
        }

        return null;
    }

    renderCloseButton() {
        const { onClose } = this.props;

        if (onClose && typeof onClose === 'function') {
            return (
                <div 
                    className="confirm-modal-close"
                    onClick={onClose} 
                >
                    <i className="icon-cross" />
                </div>
            );
        }

        return null;
    }

    render() {
        return (
            <div className="confirm-modal">
                {this.renderHeader()}
                {this.renderText()}
                {this.renderButtons()}
                {this.renderCloseButton()}
            </div>
        );
    }
}

ConfirmModal.propTypes = {
    header: PropTypes.string,
    text: PropTypes.string,
    confirmText: PropTypes.string,
    rejectText: PropTypes.string,
    onConfirm: PropTypes.func,
    onReject: PropTypes.func,
    onClose: PropTypes.func
};

export default ConfirmModal;