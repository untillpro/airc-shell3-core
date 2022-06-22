import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const Details = ({ children, lineHeight, align }) => {
    return (
        <div className={cn("details-info-container", align, { [`lh-${lineHeight}`]: lineHeight })}>
            {children}
        </div>
    )
}

Details.propTypes = {
    children: PropTypes.node.isRequired,
    lineHeight: PropTypes.number,
    align: PropTypes.string
}

const DetailsRow = ({ label, value, valueType, valueStyle, labelType, labelStyle }) => {
    return (
        <div className={cn("details-info-container__row")}>
            <div className={cn("details-info-container__row-label", labelType, labelStyle)}>{label}:</div>
            <div className={cn("details-info-container__row-value", valueType, valueStyle)}>{value || '–'}</div>
        </div>
    );
}

DetailsRow.propTypes = {
    label: PropTypes.any,
    labelType: PropTypes.string,
    labelStyle: PropTypes.string,
    value: PropTypes.any,
    valueType: PropTypes.string,
    valueStyle: PropTypes.string,
}

export { Details, DetailsRow };