/*
 * Copyright (c) 2020-present unTill Pro, Ltd.
 */

import React from 'react';
import PropTypes from 'prop-types';


const FormRow = (props) => {
    return (
        <div className={`form-row ${props.last ? 'last' : ''}`}>
            {props.children}
        </div>
    );
};

FormRow.propTypes = {
    last: PropTypes.bool,
    children: PropTypes.node
};

export default FormRow;
