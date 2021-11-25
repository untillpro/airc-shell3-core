/*
 * Copyright (c) 2020-present unTill Pro, Ltd.
 */

import React from 'react';
import PropTypes from 'prop-types';

const BaseIcon = (props) => {
    if (props.icon) {
        return <i className={props.icon} />
    }

    return null;
};

BaseIcon.propTypes = {
    icon: PropTypes.string.isRequired
};

export default BaseIcon;