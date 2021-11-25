/*
 * Copyright (c) 2020-present unTill Pro, Ltd.
 */

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Tip from './Tip';

class Label extends Component {
    renderError() {
        const { showError, errorText } = this.props;

        if (showError && errorText) {
            return (
                <span className='form-input-label-error' title={errorText}>
                    {errorText}
                </span>
            );
        }

        return null;
    }

    renderTip() {
        const { tip } = this.props;

        if (tip && typeof tip === 'string') {
            return <Tip text={tip} />
        }

        return null;
    }

    renderText() {
        const { text, error } = this.props;

        return (
            <Fragment>
                <span className="form-input-label-text" title={text}>
                    {text}
                    {this.renderTip()}
                </span>

                {error ? this.renderError() : null}
            </Fragment>
        );
    }

    render() {
        const { text, right, error } = this.props;

        if (!text && !right) return null;

        return (
            <div className={cn('form-row-label', { error })}>
                <div className={`grid row-1 ${right ? 'col-2' : 'col-1'}`}>
                    <div className='cell align-left'>
                        <label className='form-input-label'>
                            {this.renderText()}
                        </label>
                    </div>

                    {right ? (
                        <div className='cell align-right'>
                            {right}
                        </div>
                    ) : null}
                </div>
            </div>
        );
    }
    
};

Label.propTypes = {
    text: PropTypes.string, 
    tip: PropTypes.node, 
    error: PropTypes.bool,
    showError: PropTypes.bool,
    errorText: PropTypes.string,
    right: PropTypes.bool
};

export default Label;
