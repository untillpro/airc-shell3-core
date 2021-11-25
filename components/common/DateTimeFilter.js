/*
 * Copyright (c) 2020-present unTill Pro, Ltd.
 */

import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs, DatePicker, Button, Empty } from 'antd';
import { DatetimeRangePicker } from 'rc-datetime-picker';
import moment from 'moment';

import "rc-datetime-picker/dist/picker.css";

const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

// onChange

/*
Props: 
- onTabChange
- onChange
- onPeriodSelected

- from
- to
- fromTime
- toTime

- periods
- currentTab

- error 
- errorMessage 

- showCustom
- customTitle
*/

const CUSTOM_DEFAULT_NAME = "Custom";
const CUSTOM_TAB_CODE = "custom";

class DateTimeFilter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tabs: [],
            currentTab: null,

            from: null,
            to: null,
            fromTime: null,
            toTime: null,

            isCustom: false,
        };

        this.handleSelectPeriod = this.handleSelectPeriod.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleTabChange = this.handleTabChange.bind(this);
    }

    componentDidMount() {
        const { from, to, unix, showCustom } = this.props;
        
        const opts = {
            isCustom: !!showCustom,
        };
        
        if (unix) {
            opts.from = from ? moment.unix(from) : null;
            opts.to = to ? moment.unix(to) : null;
        } else {
            opts.from = from ? moment(from) : null;
            opts.to = to ? moment(to) : null;
        }

        let wh = this.initWorginkHours();

        this.setState({ ...opts, ...wh });
    }

    
    initWorginkHours() {
        const { fromTime, toTime } = this.props;
        let from, to = null;

        if (fromTime && (_.isString(fromTime) || _.isNumber(fromTime))) {
            from = moment(fromTime);
        } else if (moment.isMoment(fromTime)) {
            from = fromTime;
        }

        if (toTime && (_.isString(toTime) || _.isNumber(toTime))) {
            to = moment(toTime);
        } else if (moment.isMoment(toTime)) {
            to = toTime;
        }

        return {
            fromTime: from, 
            toTime: to
        };
    }

    handleSelectPeriod(period) {
        const { fromTime, toTime } = this.state;
        const { onPeriodSelected } = this.props;

        let from = null;
        let to = null;

        if (period) {
            if (period.from && typeof period.from === 'function') {
                from = period.from();
                if (fromTime && typeof fromTime === 'object') {
                    from.hour(fromTime.hour()).minute(fromTime.minute()).second(0).millisecond(0);
                }
            }

            if (period.to && typeof period.to === 'function') {
                to = period.to();
                if (toTime && typeof toTime === 'object') {
                    to.hour(fromTime.hour()).minute(toTime.minute()).second(0).millisecond(0);
                    to.add(24, "hours");
                }
            }

            this.handleChange([from, to]);
        }

        if (onPeriodSelected && typeof onPeriodSelected === 'function') {
            onPeriodSelected(period)
        }
    }

    handleChange(dates) {
        const { isCustom } = this.state;
        const { onChange, unix } = this.props;
        let from, to;

        if (isCustom) {
            from = dates.start;
            to = dates.end;
        } else {
            [from, to] = dates;
        }

        this.setState({ from, to });

        if (onChange && typeof onChange === 'function') {
            if (unix) {
                onChange({
                    "from": from ? from.unix() : null,
                    "to": to ? to.unix() : null,
                })
            } else {
                onChange({
                    "from": from ? from.valueOf() : null,
                    "to": to ? to.valueOf() : null,
                })
            }

        }
    }

    handleTabChange(tab) {
        const { isCustom } = this.state;
        const { onTabChange } = this.props;

        if (tab === CUSTOM_TAB_CODE) {
            if (!isCustom) {
                this.setState({ isCustom: true });
            }
        } else {
            if (onTabChange && typeof onTabChange === 'function') {
                onTabChange(tab)
            }

            if (isCustom) {
                this.setState({ isCustom: false });
            }
        }
    }

    getPeriods() {
        const { periods, showCustom, customTitle } = this.props;

        let result = [];

        if (showCustom === true) {
            result.push({
                name: customTitle || CUSTOM_DEFAULT_NAME,
                code: CUSTOM_TAB_CODE
            });
        }

        if (periods && _.isArray(periods) && periods.length > 0) {
            result = _.concat(result, periods)
        }

        return result;
    }

    rederPeriods() {
        const { emptyText } = this.props;
        const periods = this.getPeriods();

        if (_.size(periods) > 0) {
            return (
                <div className="date-time-filter-periods">
                    <Tabs
                        defaultActiveKey={_.first(periods).code}
                        animated={false}
                        onChange={this.handleTabChange}
                    >
                        {periods.map((p) => {
                            const tabName = _.isFunction(p.name) ? p.name() : p.name;

                            if (p.code === CUSTOM_TAB_CODE) {
                                return <TabPane tab={tabName} key={p.code}></TabPane>
                            }

                            return (
                                <TabPane tab={tabName} key={p.code}>
                                    {p.periods && _.isArray(p.periods) && p.periods.length > 0 ?
                                        p.periods.map(period => {
                                            return (
                                                <Button key={`${period.code}`} size={"small"} onClick={() => this.handleSelectPeriod(period)}>
                                                    {_.isFunction(period.name) ? period.name() : period.name}
                                                </Button>
                                            );
                                        })
                                        : <Empty description={emptyText ? emptyText : "No periods"} />}
                                </TabPane>
                            )
                        })}
                    </Tabs>
                </div>
            );
        }

        return null;
    }

    getShortcuts() {
        const { nowLabel } = this.props;

        if (nowLabel && typeof nowLabel === 'string') {
            return {
                [nowLabel]: moment()
            };
        }

        return null;
    }

    renderPicker() {
        const { from, to } = this.state;

        return (
            <div className="date-time-filter-pickers">
                <RangePicker
                    shortcuts={this.getShortcuts()}
                    disabled={true}
                    allowEmpty={[true, true]}
                    value={[from, to]}
                    onChange={this.handleChange}
                    showTime
                    format={"YYYY-MM-DD HH:mm"}
                />
            </div>
        );
    }

    renderCalendars() {
        const { from, to } = this.state;
        const { fromLabel, toLabel } = this.props
        const mom = moment();

        mom.start = from;
        mom.end = to;

        return (
            <div>
                <DatetimeRangePicker 
                    shortcuts={this.getShortcuts()}
                    onChange={this.handleChange}
                    moment={mom} 
                    fromLabel={fromLabel ? fromLabel : "From:"}
                    toLabel={toLabel ? toLabel : "To:"}
                    showTimePicker
                />
            </div>
        );
    }

    renderError() {
        const { error, errorMessage } = this.props;

        if (error && errorMessage) {
            return (
                <div className="date-time-filter-error">
                    {errorMessage}
                </div>
            );
        }

        return null;
    }

    debug() {
        if (this.props.debug) {
            const { from, to } = this.state;

            return <div>{`Selected date: ${from} - ${to}`}</div>;
        }

        return null;
    }

    render() {
        const { isCustom } = this.state;

        return (
            <div className="date-time-filter">
                {this.debug()}
                {this.rederPeriods()}

                {isCustom === true ? this.renderCalendars() : this.renderPicker()}

                {this.renderError()}
            </div>
        );
    }
}

DateTimeFilter.propTypes = {
    from: PropTypes.number,
    to: PropTypes.number,
    unix: PropTypes.bool,
    showCustom: PropTypes.bool,
    fromTime: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.string]),
    toTime: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.string]),
    periods: PropTypes.arrayOf(PropTypes.object),
    customTitle: PropTypes.string,
    emptyText: PropTypes.string,
    nowLabel: PropTypes.string,
    fromLabel: PropTypes.string,
    toLabel: PropTypes.string,
    error: PropTypes.bool,
    errorMessage: PropTypes.string,
    debug: PropTypes.bool,
    onChange: PropTypes.func,
    onTabChange: PropTypes.func,
    onPeriodSelected: PropTypes.func,
};

export default DateTimeFilter;