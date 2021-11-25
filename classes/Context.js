/*
 * Copyright (c) 2020-present unTill Pro, Ltd.
 */

import _ from 'lodash';

class Context {
    constructor() {
        this.storage = {};
    }

    setValue(key, value) {
        this.storage[key] = value;
    }

    pushValue(key, value) {
        if (key in this.storage) {
            if (!_.isArray(this.storage[key])) {
                throw new Error("Exception: can't push value to a non-array item");
            }
        } else {
            this.storage[key] = [];
        }

        this.storage[key].push(value);
    }

    getValue(key) {
        return this.storage[key];
    }
}

export default Context;