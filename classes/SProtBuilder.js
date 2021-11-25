/*
 * Copyright (c) 2020-present unTill Pro, Ltd.
 */

import _ from 'lodash';

class SProtBuilder {
    constructor() {
        this._currentSection = null;
        this._result = null
        this._isArray = false
        this._counter = 0;
    }

    build(sections) {
        if (!sections || _.isArray(sections)) {
            this._result = {};

            _.forEach(sections, section => this._buildSection(section))
        }

        return this._result;
    }

    _buildSection(chunk) {
        if (chunk) {
            if (_.isObject(chunk)) {
                let { path, elements } = chunk;

                
                if (!path) {
                    path = [ 'result' ];
                } 
                
                if (!_.isArray(path)) {
                    throw new Error('"path" prop should be an array of strings');
                }

                
                if (!elements || (!_.isArray(elements) && !_.isObject(elements))) {
                    return;
                }

                let section = _.get(this._result, path);

                if (!section || _.size(section) <= 0) {
                    this._makeSection(path);
                                        
                    if (_.isArray(elements)) {
                        _.set(this._result, path, []);
                        _.set(this._result, path, ...elements);
                    } else {
                        _.set(this._result, path, {});
                        _.set(this._result, path, elements);
                    }

                   
                } else {
                    section = _.merge(section, elements);

                    _.set(this._result, path, section);
                }
            } else {
                throw new Error('Section chunk must be a plain object');
            }
        }
    }

    _makeSection(path) {
        const cur = [];

        if (path && _.size(path) > 0) {
            _.forEach(path, p => {
                cur.push(p);

                const s = _.get(this._result, cur);

                if (!s) {
                    if (typeof p === 'string') {
                        _.set(this._result, cur, {});
                    } else if (typeof p === 'number') {
                        _.set(this._result, cur, []);
                    } else {
                        throw new Error(`Unsupported path element type ${typeof p}`);
                    }
                }
                
            })
        }
    }

    result(asJson = false) {
        if (asJson === true) {
            return JSON.stringify(this._result)
        }

        return this._result;
    }
}

export default SProtBuilder;