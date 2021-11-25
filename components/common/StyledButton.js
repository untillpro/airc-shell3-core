/*
 * Copyright (c) 2020-present unTill Pro, Ltd.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class StyledButton extends Component {
    handleClick(event) {
        const { onClick, disabled } = this.props;

        if (!onClick || disabled) return false;

        onClick(event);
    }

    getClass() {
        let c = '';

        if (this.props.full) c += 'full ';
        if (this.props.bordered) c += 'bordered ';
        if (this.props.primary) c += 'primary ';
        if (this.props.secondary) c += 'secondary ';
        if (this.props.success) c += 'success ';
        if (this.props.warning) c += 'warning ';
        if (this.props.danger) c += 'danger ';
        if (this.props.white) c += 'white ';
        if (this.props.icon) c += 'icon ';
        if (this.props.disabled) c += 'disabled ';

        return c;
    }
    
    renderText() {
        let res = null;
        const { text, children } = this.props;

        if (text) res = <span>{this.props.text}</span>;
        else if (children) res = children;

        return res;
    }
    
    render() {
        const { link, icon, iconAlign } = this.props;

        if (link) {
            return (
                <a 
                    href={link}
                    className={`btn ${this.getClass()} ${this.props.className || ''}`}
                    title={this.props.title || false}
                    onClick={(event) => this.handleClick(event)}
                    tabIndex={this.props.tabIndex || 1}
                >
                    { icon && iconAlign !== 'right' ? <i className={`${icon}`} /> : null }

                    {this.renderText()}

                    { icon && iconAlign === 'right' ? <i className={`${icon} right-icon`} /> : null }
                </a>
            );
        }

        return (
            <div
                className={`btn ${this.getClass()} ${this.props.className || ''}`}
                title={this.props.title || ''}
                onClick={(event) => this.handleClick(event)}
                tabIndex={this.props.tabIndex || 1}
            >
                { icon && iconAlign !== 'right' ? <i className={`${icon}`} /> : null }

                {this.renderText()}

                { icon && iconAlign === 'right' ? <i className={`${icon} right-icon`} /> : null }
            </div>
        );
    }

}

StyledButton.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    tabIndex: PropTypes.number,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    full: PropTypes.bool,
    bordered: PropTypes.bool,
    primary: PropTypes.bool,
    secondary: PropTypes.bool,
    success: PropTypes.bool,
    warning: PropTypes.bool,
    danger: PropTypes.bool,
    white: PropTypes.bool,
    icon: PropTypes.string,
    text:  PropTypes.string,
    children: PropTypes.node,
    link:  PropTypes.string,
    iconAlign: PropTypes.string,
};

export default StyledButton;
