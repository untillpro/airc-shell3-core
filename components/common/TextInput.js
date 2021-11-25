/*
 * Copyright (c) 2020-present unTill Pro, Ltd.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import blacklist from 'blacklist';

import { Input } from './';

class TextInput extends Component {
    constructor() {
        super();

        this.ref = null;
    }

    componentDidMount() {
        const { autoFocus } = this.props;

        if (autoFocus && this.ref) this.ref.focus();
    }

    handleChange(event) {
        const { onChange, maxLength } = this.props;
        const value = event.target.value;
        
        if (value && maxLength && maxLength > 0 && value.length > maxLength) return;

        if (onChange && typeof onChange === 'function') {
            onChange(event);
        }
    }

    render() {
        const { type, error, value } = this.props;

        let InputComponent = Input;
        let t = type || 'text';

        if (t === 'password') {
            InputComponent = Input.Password;
        } else if (t === 'textarea') {
            InputComponent = Input.TextArea;
        }

        return (
            <InputComponent 
                className={cn('form-input', { error })} 
                {...blacklist(this.props, 'error')}
                defaultValue={value}
                ref={(ref) => this.ref = ref}
            />
        );
    }
}

TextInput.propTypes = {
    tip: PropTypes.node,
    error: PropTypes.bool,
    autoFocus: PropTypes.bool,
    type: PropTypes.string,
    input: PropTypes.object,
    maxLength: PropTypes.number,
    onChange: PropTypes.func,
    value: PropTypes.string
};

export default TextInput;
