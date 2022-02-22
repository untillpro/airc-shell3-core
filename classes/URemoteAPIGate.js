/*
 * Copyright (c) 2020-present unTill Pro, Ltd.
 */

export default class URemoteAPIGate {
    constructor(remoteApi) {
        this.api = remoteApi;
    }

    async selectView(view) {
        return this._callApiMethod('selectView', view);
    }

    async setRights(rights) {
        return this._callApiMethod('setRights', rights);
    }

    async setLanguage(lang) {
        return this._callApiMethod('setLanguage', lang);
    }

    async init(payload) {
        return this._callApiMethod('init', payload);
    }

    async sendEvent(handler, payload, type) {
        //console.log("sendEvent: ", handler, payload, type);
        
        return this._callApiMethod('sendEvent', handler, payload, type);
    }

    async _callApiMethod(method, ...args) {
        console.log('Calling URemoteAPIGate._callApiMethod with arguments', method, args, this.api);

        if (this.api) {
            if (this.api[method] && typeof this.api[method] === 'function') {
                return this.api[method](...args);
            }
        }
    }
}
