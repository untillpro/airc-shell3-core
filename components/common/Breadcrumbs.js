/*
 * Copyright (c) 2020-present unTill Pro, Ltd.
 */

import _ from 'lodash';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

class Breadcrumbs extends PureComponent {
    renderItem() {
        return null;
    }

    buildItem(item, index, last) {
        const {lastactive, showRoot, itemBuilder, separator, onClick } = this.props;

        if (!showRoot && index === 0 && last) {
            return null;
        }

        let handler = null;
        let text = null;
        let sep = null;

        if (onClick && (lastactive || !last)) {
            handler = () => onClick(item, index, last);
        }

        if (_.isFunction(itemBuilder)) {
            text = itemBuilder(item);
        } else {
            text = String(item);
        }

        if (separator) {
            if (_.isFunction(separator)) {
                sep = separator(item, index, last);
            } else {
                sep = String(separator);
            }
        }

        return (
            <div key={`breadcrumbs_${index}`} className="ushell-breadcrubms-item">
                <span className={cn("text", {"active": !_.isNil(handler), "last": last})} onClick={handler}>
                    {text}
                </span>
                <span className="separator">
                    {sep}
                </span>
            </div>
        );
    }

    render() {
        const { items } = this.props;

        if (!items || !_.isArray(items) || items.length === 0) {
            return null;
        }

        return (
            <div className="ushell-breadcrubms">
                {items.map((item, i) => this.buildItem(item, i, i === (items.length - 1)))}
            </div>
        );
    }
}

Breadcrumbs.propTypes = {
    items: PropTypes.array,
    itemBuilder: PropTypes.func,
    onClick: PropTypes.func,
    separator: PropTypes.oneOfType([PropTypes.func, PropTypes.string, PropTypes.node]),
    lastactive: PropTypes.bool,
    showRoot: PropTypes.bool,
};

export default Breadcrumbs;