/*
 * Copyright (c) 2020-present unTill Pro, Ltd.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { conv } from 'color-shorthand-hex-to-six-digit';

const ColorPreview = (props) => {
    return (
        <div 
            className={`
                color-preview
                ${props.showValue ? 'value-preview' : ''}
                ${props.square ? 'square' : ''}
            `}
        >
            {props.showValue ? ( 
                <div className="color-preview-value">
                    {conv(`#${props.color}`)}
                </div>
            ) : null}

            <div 
                className="color-preview-color"

                style={{
                    backgroundColor: `#${String(props.color).toUpperCase() || 'FFFFFF'}`
                }}
            />
        </div>
            
    );
};

ColorPreview.propTypes = {
    showValue: PropTypes.bool,
    square: PropTypes.bool,
    color: PropTypes.string,
};

export default ColorPreview