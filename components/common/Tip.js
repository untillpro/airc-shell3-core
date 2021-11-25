/*
 * Copyright (c) 2020-present unTill Pro, Ltd.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Tip extends Component {
    constructor() {
        super();

        this.state = {
            hover: false,
            width: 300,
            windowWidth: null,
            left: false,
            ref: null
        };
    }

    renderText() {
        const { text, opened } = this.props;
        const { hover, width, left } = this.state;

        if (hover || opened) {
            return (
                <div 
                    className={`tip-text ${left && !opened ? 'align-left': ''}`}
                    style={{
                        maxWidth: !opened ? width : 'auto'
                    }}
                >
                    {text}
                </div>
            );
        }

        return null;
    }

    handleEnter() {
        const { width } = this.state;
        const windowWidth = window.outerWidth;

        let left = false;


        if (this.ref) {
            const rect = this.ref.getBoundingClientRect();
            
            if (rect && rect.left) {
                if ((rect.left + width) > (windowWidth - 50)) {
                    left = true;
                }
            }
        }

        this.setState({
            hover: true,
            left
        })
    } 

    handleLeave() {
        this.setState({hover: false})
    }

    render() {
        const { opened } = this.props;

        return (
            <div 
                className={`tip ${opened ? 'opened' : ''}`}
                onMouseEnter={this.handleEnter.bind(this)}
                onMouseLeave={this.handleLeave.bind(this)}
                ref={(ref) => this.ref = ref}
            >
                <i className="tip-icon">i</i>
                {this.renderText()}
            </div>
        );
    }
}

Tip.propTypes = {
    text: PropTypes.string,
    opened: PropTypes.bool,
};

export default Tip;