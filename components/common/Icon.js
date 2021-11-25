/*
 * Copyright (c) 2020-present unTill Pro, Ltd.
 */
import React from 'react';
import PropTypes from 'prop-types';

const Icon = (props) => {
    const { icon } = props;

    return <i className={icon}></i>
};

Icon.propTypes = {
    icon: PropTypes.string
};

export default Icon;