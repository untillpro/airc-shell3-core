/*
 * Copyright (c) 2020-present unTill Pro, Ltd.
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Modal, Button, DateTimeFilter } from './';

const DEFAULT_BUTON_TEXT = "Change date";

class DateTimeFilterModal extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            from: null,
            to: null
        };

        this.handleButtonPress = this.handleButtonPress.bind(this);
        this.handleDateTimeChanged = this.handleDateTimeChanged.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        const { from, to } = this.props;

        this.setState({ from, to });
    }

    componentDidUpdate(oldProps) {
        const { from, to } = this.props;

        if (oldProps.from !== from || oldProps.to !== to) {
            this.setState({ from, to });
        }
    }

    handleChange(values) {
        if (values && typeof values === 'object') {
            this.setState({
                from: values.from,
                to: values.to
            });
        }
    }

    handleButtonPress() {
        this.setState({
            open: true
        });
    }

    handleOk() {
        const { from, to } = this.state;
        const { onChange } = this.props;
        
        /*
        const { from: fromOld, to: toOld, onChange } = this.props;

        if ((fromOld && !fromOld.isSame(from)) || (toOld && toOld.isSame(to))) {
            if (onChange && typeof onChange === 'function') {
                onChange([from, to]);
            }
        } 
        */

        if (onChange && typeof onChange === 'function') {
            onChange([from, to]);
        }

        this.setState({ open: false });
    }

    handleCancel() {
        this.setState({ open: false });
    }

    handleDateTimeChanged() {
        return null;
    }

    renderDate() {
        const { from, to, format } = this.props;

        return (
            <div className="datetime-filter-modal-date">
                {moment(from).format(format) + ' - ' + moment(to).format(format)}
            </div>
        );
    }

    render() {
        const { changeButonText } = this.props;
        const { open } = this.state;

        return (
            <div className="datetime-filter-modal">
                {this.renderDate()}

                <Button
                    onClick={this.handleButtonPress}
                >
                    {changeButonText || DEFAULT_BUTON_TEXT}
                </Button>

                <Modal
                    title="Select date"
                    visible={open}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    width={660}
                >
                    <div className="datetime-filter-modal-content">
                        <DateTimeFilter
                            {...this.props}
                            showCustom
                            onChange={this.handleChange}
                        />
                    </div>
                </Modal>
            </div>
        );
    }
}

DateTimeFilterModal.propTypes = {
    from: PropTypes.object, 
    to: PropTypes.object, 
    format: PropTypes.string,
    changeButonText: PropTypes.string,
    onChange: PropTypes.func
};

export default DateTimeFilterModal;
