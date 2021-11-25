/*
 * Copyright (c) 2020-present unTill Pro, Ltd.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            opened: false,
            value: ""
        };
    }

    handleClick() {
        const { opened } = this.state;

        if (!opened) this.setState({ opened: true });
    }

    handleBlur() {
        const { opened } = this.state;

        if (opened) this.setState({ opened: false });
    }

    handleChange(event) {
        const { onChange } = this.props;
        const val = event.target.value;

        this.setState({value: val});

        if (onChange && typeof onChange === 'function') {
            onChange(val)
        }
    }

    renderSearch() {
        const { defaultValue } = this.props;
        const { value, opened } = this.state;

        if (opened) {
            return (
                <input 
                    value={value || defaultValue}
                    type='text' 
                    onChange={(event) => this.handleChange(event)}
                    onBlur={(event) => this.handleBlur(event)}
                    autoFocus
                    allowClear
                />
            );
        }

        return (
            <i 
                className='icon-search' 
                onClick={(event) => this.handleClick(event)}
            />
        );
    }

    render() {
        return (
            <div className='inline-search'>
                {this.renderSearch()}
                
            </div>
        );
    }
}

Search.propTypes = {
    onChange: PropTypes.func,
    defaultValue: PropTypes.string
};

export default Search;