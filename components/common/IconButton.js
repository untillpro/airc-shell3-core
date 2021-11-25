/*
 * Copyright (c) 2020-present unTill Pro, Ltd.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

class IconButton extends Component {
    handleClick(event) {
        const { onClick, disabled } = this.props;

        if (!onClick || disabled) return false;

        onClick(event);
    }

    type() {
        let c = '';

        if (this.props.primary) c += 'primary ';
        if (this.props.secondary) c += 'secondary ';
        if (this.props.success) c += 'success ';
        if (this.props.warning) c += 'warning ';
        if (this.props.danger) c += 'danger ';
        if (this.props.ghost) c += 'ghost ';
        if (this.props.disabled) c += 'disabled ';

        return c;
    }

    size() {
        switch(String(this.props.size).toLowerCase()) {
            case "s":
            case "small": return "small";

            case "l":
            case "large": return "large";

            default: return "normal";
        }
    }

    icon() {
        const { icon, title } = this.props;

        if (icon) {
            if (React.isValidElement(icon)) {
                return icon;
            } else if (typeof icon === "string") {
                return <img src={icon} alt={title} />;
            }
        }

        return null;
        
    }

    render() {
        const { link } = this.props;

        if (link) {
            return (
                <a 
                    href={link}
                    className={cn("icon-btn", this.type(), this.size(), this.props.className || '')}
                    title={this.props.title || false}
                    onClick={(event) => this.handleClick(event)}
                    tabIndex={this.props.tabIndex || 1}
                >
                    {this.icon()}
                </a>
            );
        }

        return (
            <div
                className={cn("icon-btn", this.type(), this.size(), this.props.className || '')}
                title={this.props.title || ''}
                onClick={(event) => this.handleClick(event)}
                tabIndex={this.props.tabIndex || 1}
            >
                {this.icon()}
            </div>
        );
    }
}

IconButton.propTypes = {
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
    ghost: PropTypes.bool,
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    text:  PropTypes.string,
    children: PropTypes.node,
    link:  PropTypes.string,
    size: PropTypes.string,
};

//export * as Icons from '../../const/IconsVariables';

export default IconButton;
