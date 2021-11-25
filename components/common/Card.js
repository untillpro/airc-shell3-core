/*
 * Copyright (c) 2020-present unTill Pro, Ltd.
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

class Card extends PureComponent {
    getAlign() {
        const { align } = this.props;

        if (align) {
            switch (align) {
                case 'left': return 'align-left';
                case 'right': return 'align-right';
                case 'center': return 'align-center';

                default: return '';
            }
        }

        return '';
    }

    getValign() {
        const { valign } = this.props;

        if (valign) {
            switch (valign) {
                case 'top': return 'align-top';
                case 'bottom': return 'align-bottom';
                case 'center': return 'align-center';

                default: return '';
            }
        }

        return '';
    }

    getType() {
        const { type } = this.props;

        if (type) {
            switch (type.toLowerCase()) {
                case 'small': return 'small';
                default: return '';
            }
        }

        return '';
    }

    renderIcon() {
        const { ico, title } = this.props;

        if (ico) {
            return (
                <div className='card-icon'>
                    <img
                        src={ico}
                        alt={title || ''}
                    />
                </div>
            );
        }

        return null;
    }

    renderTitle() {
        const { title } = this.props;

        if (title) {
            return (
                <div className='card-title'>
                    {title}
                </div>
            );
        }

        return null;
    }

    renderText() {
        const { text } = this.props;

        if (text) {
            return (
                <div className='card-text'>
                    {text}
                </div>
            );
        }

        return null;
    }

    renderLoading() {
        const { loading } = this.props;

        if (loading !== true) return null;

        return (
            <div className="card-loader">
                <Spin indicator={antIcon} />
            </div>
        );
    }
    render() {
        const { loading, selected, onClick } = this.props;

        return (
            <div
                className={cn(
                    "card",
                    this.getAlign(),
                    this.getAlign(),
                    this.getValign(),
                    this.getType(),
                    {
                        'hoverable': !!onClick,
                        'loading': loading,
                        'selected': selected
                    }
                )}
                onClick={onClick}
            >
                {this.renderIcon()}
                {this.renderTitle()}
                {this.renderText()}
                {this.renderLoading()}
            </div>
        );
    }
}

Card.propTypes = {
    align: PropTypes.string,
    valign: PropTypes.string,
    text: PropTypes.string,
    title: PropTypes.string,
    type: PropTypes.string,
    onClick: PropTypes.func,
    ico: PropTypes.string,
    loading: PropTypes.bool,
    selected: PropTypes.bool,

};

export default Card;
