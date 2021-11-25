/*
 * Copyright (c) 2020-present unTill Pro, Ltd.
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Modal as AntdModal } from 'antd';
import { withStackEvents } from 'stack-events';

import {
    KEY_ESCAPE
} from 'keycode-js';

/*
    Original component documentation: https://ant.design/components/modal/
*/

class Modal extends PureComponent {
    constructor() {
        super();

        this.handleKey = this.handleKey.bind(this);
    }

    componentDidMount() {
        this.props.pushEvents({
            'keydown': this.handleKey
        })
    }

    componentWillUnmount() {
        this.props.popEvents();
    }


    handleKey(event) {
        const { onCancel } = this.props;
        const { keyCode } = event;

        switch (keyCode) {
            case KEY_ESCAPE:
                if (onCancel && typeof onCancel === 'function') {
                    event.preventDefault();
                    event.stopPropagation();

                    onCancel();
                }
                
                return;

            default: return;
        }
    }

    getClass() {
        const { size, className = '' } = this.props;
        let result = '';

        switch (size) {
            case 'tiny': result = '__tiny'; break;
            case 'small': result = '__small'; break;
            case 'large': result = '__large'; break;
            default: result = '__medium'; break;
        }

        return `${className} ${result}`;
    }

    render() {
        return (
            <AntdModal
                {...this.props}
                keyboard={false}
                className={this.getClass()}
            />
        );
    }
}

Modal.propTypes = {
    size: PropTypes.string,
    className: PropTypes.string,
    pushEvents: PropTypes.func.isRequired,
    popEvents: PropTypes.func.isRequired,
    onCancel: PropTypes.func,
};

export default withStackEvents(Modal);