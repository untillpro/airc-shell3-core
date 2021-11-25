/*
 * Copyright (c) 2020-present unTill Pro, Ltd.
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class LoginForm extends PureComponent {
    render() {
        return (
            <div className='ushell-login-block-form'>
                {this.props.children}
            </div>
        );
    }
};

LoginForm.propTypes = {
    children: PropTypes.node
};

export default LoginForm;
