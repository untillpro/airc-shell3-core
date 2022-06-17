/*
 * Copyright (c) 2020-present unTill Pro, Ltd.
 */

import PropTypes from 'prop-types';

import 'antd/dist/antd.css';
import '../css/untill-base.scss';
import '../css/antd_custom.scss';

export const CoreProvider = ({children}) => {
    return children;
}

CoreProvider.propTypes = {
    children: PropTypes.node.isRequired
};
