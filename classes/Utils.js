/*
 * Copyright (c) 2020-present unTill Pro, Ltd.
 */
import _ from 'lodash';
import i18next from 'i18next';
import html2canvas from 'html2canvas';

export const getFileSize = (sizeInBytes) => {
    let bytes = parseInt(sizeInBytes, 10);
    let kbytes = 0;
    let mbytes = 0;

    let unit = '';
    let unitFull = '';
    let value = '';

    if (bytes && bytes > 0) {
        kbytes = bytes / 1024 | 0;
        mbytes = kbytes / 1024 | 0;
    } else {
        return {};
    }

    if (mbytes > 0) {
        unit = 'MB';
        unitFull = "megabytes";
        value = `${mbytes}`;
    } else if (kbytes > 0) {
        unit = 'KB';
        unitFull = "kilobytes";
        value = `${kbytes}`;
    } else {
        unit = 'B';
        unitFull = "bytes";
        value = `${bytes}`;
    }

    return {
        bytes,
        kbytes,
        mbytes,
        unit,
        unitFull,
        formated: `${value} ${unit}`,
        formatedFull: `${value} ${unitFull}`
    }
}

export const translate = (text, section, options) => {
    let path = "";

    if (section) path += section + '.';
    path += text;

    if (i18next.exists(path)) {
        return i18next.t(path, options);
    } else if (_.isObject(options) && _.size(options) > 0) {
        return i18next.t(text, options);
    }

    return text;
};

export const toRadians = (angle) => {
    return angle * (Math.PI / 180);
}


export const getRotatedSizes = (width, height, angle) => {
    let am = angle > 180 ? angle - 360 : angle;

    let a = toRadians(am);
    let bh, bw;

    if (am >= 0) {
        bh = Math.ceil(Math.abs((width) * Math.sin(a) + (height) * Math.cos(a)));
        bw = Math.ceil(Math.abs((width) * Math.cos(a) + (height) * Math.sin(a)));
    } else {
        bw = Math.ceil(Math.abs(width * Math.cos(a) - height * Math.sin(a)));
        bh = Math.ceil(Math.abs(width * Math.sin(a) + height * Math.cos(a)));
    }

    return [bw, bh];
}

export const getBoundPosition = (x, y, width, height, angle, bounds) => {
    if (!bounds) return [x, y]; // Clone new bounds

    if (isNum(bounds.right)) x = Math.min(x, bounds.right - width);
    if (isNum(bounds.bottom)) y = Math.min(y, bounds.bottom - height); // But above left and top limits.

    if (isNum(bounds.left)) x = Math.max(x, bounds.left);
    if (isNum(bounds.top)) y = Math.max(y, bounds.top);

    return [x, y];
}

export const isNum = (num) => {
    return typeof num === 'number' && !isNaN(num);
}


export const mround = (num) => {
    let f = num % 1;

    if (f <= 0.2) {
        return Math.floor(num);
    } else if (f >= 0.8) {
        return Math.ceil(num);
    }

    return num;
}

export const getBlobPath = (num) => {
    return `https://badrequest.ru/tests/uploader/read.php?fileId=${num}`;
}

export const randomString = (length = 10) => {
    return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, length);
}

/**
 * Return: picture blob
 * Throws: Error if something go wrong or server returns error
 * 
 */

export const nodeToPicture = async (node, maxWidth, maxheight) => {
    return new Promise((resolve, reject) => {
        return html2canvas(node, {
            letterRendering: 1,
            useCORS: true,
            scrollX: 0,
            scrollY: -window.scrollY
        })
            .then((canvas) => {
                const { width, height } = canvas;
                let d, tWidth, tHeight = 0;

                if (width >= height) {
                    d = maxWidth / width;
                } else {
                    d = maxheight / height;
                }

                tWidth = width * d;
                tHeight = height * d;

                var resizedCanvas = document.createElement("canvas");
                var resizedContext = resizedCanvas.getContext("2d");

                resizedCanvas.height = tHeight;
                resizedCanvas.width = tWidth;

                resizedContext.drawImage(canvas, 0, 0, tWidth, tHeight);

                return resizedCanvas.toBlob((blob) => {
                    resolve(blob);
                }, 'image/png');
            }).catch((error) => {
                reject(error);
            });
    });
};

export const registerProjectionHandler = (key, handler) => {
    if (window) {
        if (!window["air_projection_handlers"]) {
            window["air_projection_handlers"] = {}
        }

        window["air_projection_handlers"][key] = handler;
    }
}

export const unregisterProjectionHandler = (key) => {
    if (window["air_projection_handlers"]) {
        delete window["air_projection_handlers"][key];
    }
}

export const getProjectionHandler = (key) => {
    if (window["air_projection_handlers"]) {
        return window["air_projection_handlers"][key];
    }

    return null;
}