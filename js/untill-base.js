/*
 * Copyright (c) 2020-present unTill Pro, Ltd.
 */

const initPassViewToggler = () => {
    $(".form-row-field-pass-tgl").on("click", function() {
        const passInput = $(this).prev('input');

        if (passInput) {
            $(this).toggleClass('active');
            const type = $(passInput).attr('type');
            $(passInput).attr('type', type === 'password' ? 'text' : 'password');
        }
    })
};

$(() => {
    
    initPassViewToggler(); //init form password input toggler
});