/*
 * Copyright (c) 2020-present unTill Pro, Ltd.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

class FormButton extends Component {
    render() {
        const { text, submit } = this.props;

        return (
            <div className='form-row-button'>
                <button
                    type={submit ? 'submit' : 'button'}
                    {...(this.props.input ? this.props.input : {})}
                    className={cn('btn')}
                >
                    {text}
                </button>
            </div>
        );
    }
}

FormButton.propTypes = {
    text: PropTypes.string,
    submit: PropTypes.bool,
    input: PropTypes.node
};

export default FormButton;
