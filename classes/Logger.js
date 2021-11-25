/*
 * Copyright (c) 2020-present unTill Pro, Ltd.
 */
import isProd from 'is-prod';
import moment from 'moment';
//import isProd from 'is-prod';

export default class Logger {
    static log(message, title, source) {
        const df = moment().format();     

        console.log(' ');
        console.log('*************** LOG ***************');
        if (title) {
            console.log(`${df}: `, title);
        }
        
        console.log(`${df}: `, message);

        if (source) {
            console.log(`${df}: `, `Source: ${source}`);
        }
       
        console.log('************ LOG ENDS *************');


    }

    static error(message, title, source) {
        const df = moment().format(); 

        console.log(' ');
        console.error('*************** ERROR ***************');

        if (title) {
            console.log(`${df}: `, title);
        }

        console.error(`${df}: `, message);

        if (source) {
            console.log(`${df}: `, `Source: ${source}`);
        }

        console.error('************ ERROR ENDS *************');
    }

    static debug(message, title, source) {
        //if (!isProd.isDevelopment()) return;
        
        const df = moment().format(); 

        console.log('  ');
        console.info(`############# ${title || 'INFO'} #############`);
        
        if (title) {
            console.info(`${df}: `, title);
        }

        console.info(`${df}: `, message);

        if (source) {
            console.info(`${df}: `, `Source: ${source}`);
        }

        console.info(`########## ${title || 'INFO'} ENDS ##########`);
    }

    static l(...args) {
        if (isProd.isDevelopment()) 
            console.log(...args);
    }
}