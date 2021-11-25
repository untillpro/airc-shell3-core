/*
 * Copyright (c) 2020-present unTill Pro, Ltd.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { 
    InfoCircleFilled,
    CheckCircleFilled,
    WarningFilled,
    CloseCircleFilled
} from '@ant-design/icons';

class Message extends Component {
    renderHeader() {
        if (!this.props.header) return null;

        return (
            <div className="message-header">
                {this.props.header}
            </div>
        );
    }

    renderFooter() {
        if (!this.props.footer) return null;

        return (
            <div className="message-footer">
                {this.props.footer}
            </div>
        );
    }

    renderContent() {
        return (
            <div className="message-content">
                {this.props.children}
            </div>
        );
    }

    renderIcon() {
        let { type } = this.props;
        let icon = <InfoCircleFilled />;

        switch (type) {
            case 'success': 
                icon = <CheckCircleFilled />;
                //icon = 'check-circle'; 
                break;

            case 'warning': 
                icon = <WarningFilled />; 
                break;

            case 'error': 
                icon = <CloseCircleFilled />; 
                break;

            default: 
                icon = <InfoCircleFilled />; 
                type = 'info';
        }

        return (
            <div className={`message-icon ${type}`}>
                {icon}
            </div>
        );
    }

    render() {
        const { type } = this.props;

        return (
            <div className={`message paper ${type || ''}`}>
                {this.renderIcon()}

                <div className="message-body">
                    {this.renderHeader()}
                    {this.renderContent()}
                    {this.renderFooter()}
                </div>
            </div>
        );
    }
}

Message.propTypes = {
    header: PropTypes.node,
    footer: PropTypes.node,
    children: PropTypes.node.isRequired,
    type: PropTypes.string,
};

export default Message;
