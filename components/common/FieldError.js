/*
 * Copyright (c) 2020-present unTill Pro, Ltd.
 */

import React from 'react';
import PropTypes from 'prop-types';

const FieldError = (props) => {
    const { text } = props;

    return (
        <div className="form-row-error">
            {text}
        </div>
    );
};

FieldError.propTypes = {
    text: PropTypes.string
};

export default FieldError;