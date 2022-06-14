import React from 'react';
import PropTypes from 'prop-types';

function ContentContainer ({children}) {
    return (
        <div className="content-container">{children}</div>
    );
};

ContentContainer.propTypes = {
    children: PropTypes.node.isRequired,
}


export default ContentContainer;