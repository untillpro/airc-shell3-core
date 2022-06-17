/*
 * Copyright (c) 2020-present unTill Pro, Ltd.
 */

import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SectionItem from './SectionItem';

class Sections extends Component {
    handleClick(data, index, event) {
        const { onClick } = this.props;

        if (onClick && typeof onClick === 'function') {
            onClick(data, index, event);
        }

        return;
    }

    renderItem(data, index) {
        if (!data) return null;
        
        return (
            <SectionItem 
                key={`tab_${index}`}
                active={Boolean(data.active)} 
                text={data.text || ''} 
                onClick={(event) => this.handleClick(data, index, event)}
            />
        );
    }

    renderSections() {
        const { renderItem, data } = this.props;
        let renderFunction = this.renderItem.bind(this); // default render method

        if (renderItem && typeof renderItem === 'function') {
            renderFunction = renderItem;
        } 

        return (
            <ul>
                {_.map(data, (dataItem, index) => renderFunction(dataItem, index))}
            </ul>
        );
    }

    render() {
        const { vertical } = this.props;

        return (
            <div className={`tabs ${vertical ? 'vertical' : 'horizontal'}`}>
                {this.renderSections()}
            </div>
        );
    }
}

Sections.propTypes = {
    onClick: PropTypes.func,
    renderItem: PropTypes.func, 
    data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]), 
    vertical: PropTypes.bool,
};

export default Sections;