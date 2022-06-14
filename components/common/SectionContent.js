import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const SectionContent = ({ children, hasErrors, opened }) => {
    return (
        <div
            className={cn("page-section-content", { "has-errors": hasErrors, "hidden": !opened })}>
            {children}
        </div>
    );
}

SectionContent.propTypes = {
    children: PropTypes.node.isRequired,
    hasErrors: PropTypes.bool,
    opened: PropTypes.bool,
}

export default SectionContent;