/*
 * Copyright (c) 2020-present unTill Pro, Ltd.
 */

import React from 'react';
import PropTypes from 'prop-types';

function PageContent ({children}) {
    return (
        <div className="page-content">{children}</div>
    );
};

PageContent.propTypes = {
    children: PropTypes.node.isRequired,
}


export default PageContent;