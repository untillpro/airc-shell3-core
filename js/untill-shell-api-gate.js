/*
 * Copyright (c) 2020-present unTill Pro, Ltd.
 */

class UShellAPIGate {
    constructor(pluginApi) {
        this.shellApi = null;
        this.pluginApi = pluginApi || {}; // dispatch function
    }

    init(iframeApi) {
        if (iframeApi && typeof iframeApi === 'function') {
            iframeApi(this.pluginApi)
                .then((api) => {
                    this.api = api;

                    if (api.onModuleLoad) {
                        api.onModuleLoad();
                    }
                }, (err) => {
                    console.error(err, 'UShellAPIGate error', "UShellAPIGate.init()");
                });
        } else {
            throw new Error('Ushell API error: iframeApi is not defined!');
        }
    }

    async do(queueId, path, params, method = 'get') {
        return this._callApiMethod('do', queueId, path, params, method);
    }

    async sendError(text = null, descr = null, lifetime = 10, hideClose = false) {
        return this._callApiMethod('sendError', text, descr, lifetime, hideClose);
    }

    async sendWarning(text = null, descr = null, lifetime = 10, hideClose = false) {
        return this._callApiMethod('sendWarning', text, descr, lifetime, hideClose);
    }

    async sendSuccess(text = null, descr = null, lifetime = 10, hideClose = false) {
        return this._callApiMethod('sendSuccess', text, descr, lifetime, hideClose);
    }

    async sendInfo(text = null, descr = null, lifetime = 10, hideClose = false) {
        return this._callApiMethod('sendInfo', text, descr, lifetime, hideClose);
    }

    async conf(operations, wsids, timestamp, offset) {
        return this._callApiMethod('conf', operations, wsids, timestamp, offset);
    }

    async collection(type, wsids, page, page_size, show_deleted) {
        return this._callApiMethod('sendcollectionInfo', type, wsids, page, page_size, show_deleted);
    }

    async sync(entries) {
        return this._callApiMethod('sync', entries);
    }

    async log(params) {
        return this._callApiMethod('log', params);
    }

    async _callApiMethod(method, ...args) {
        console.log('Calling UShellAPIGate._callApiMethod with arguments', args);

        if (this.shellApi) {
            if (this.shellApi[method] && typeof this.shellApi[method] === 'function') {
                return this.shellApi[method](...args);
            }

            throw new Error(`Remote method api.${method}() not available.`);
        } else {
            throw new Error('Remote api not available.');
        }
    }
}

if (typeof module != "undefined" && module.exports) {
    module.exports = UShellAPIGate;
} else {
    window.UApi = (api) => new UShellAPIGate().init(api);
}
