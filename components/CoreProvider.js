/*
 * Copyright (c) 2020-present unTill Pro, Ltd.
 */

import { Component } from 'react';
import PropTypes from 'prop-types';

import 'antd/dist/antd.css';
import '../css/untill-base.scss';
import '../css/antd_custom.scss';

export class CoreProvider extends Component {
    shouldComponentUpdate() {
        return false;
    }

    render() {
        return this.props.children;
    }
}

CoreProvider.propTypes = {
    children: PropTypes.node.isRequired
};