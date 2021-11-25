/*
 * Copyright (c) 2020-present unTill Pro, Ltd.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    BlockPicker,
    ChromePicker, 
    CirclePicker,
    CompactPicker, 
    GithubPicker,
    HuePicker,
    MaterialPicker, 
    PhotoshopPicker, 
    SketchPicker, 
    SliderPicker, 
    SwatchesPicker, 
    TwitterPicker
} from 'react-color';

class ColorPicker extends Component {
    handleChange(value) {
        const { onChange } = this.props;

        if (onChange && typeof onChange === 'function') {
            onChange(value.hex);
        }
    }

    getPickerComponent() {
        const { type } = this.props;
        const t = String(type).toLocaleLowerCase();

        switch (t) {
            case 'block': return BlockPicker;
            case 'chrome': return ChromePicker;
            case 'circle': return CirclePicker;
            case 'compact': return CompactPicker;
            case 'github': return GithubPicker;
            case 'hue': return HuePicker;
            case 'material': return MaterialPicker;
            case 'photoshop': return PhotoshopPicker;
            case 'sketch': return SketchPicker;
            case 'slider': return SliderPicker;
            case 'swatches': return SwatchesPicker;
            case 'twitter': return TwitterPicker;

            default: return BlockPicker;
        }
    }
    
    render() {
        const { input, value } = this.props;
        const PickerComponent = this.getPickerComponent();

        return (
            <div className="color-picker">
                <PickerComponent 
                    {...input}
                    color={value}
                    onChange={(val) => this.handleChange(val)}
                />
            </div>
                
        );
    }
};

ColorPicker.propTypes = {
    onChange: PropTypes.func,
    type: PropTypes.string,
    input: PropTypes.object,
    value: PropTypes.string
};

export default ColorPicker;