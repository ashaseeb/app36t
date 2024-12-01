// Copyright (c) 2024, innovation36T and contributors
// For license information, please see license.txt

frappe.ui.form.on('frappedb-get_list', {
    refresh : function(frm){
        set_css(frm);
        // frm.fields_dict['p1b1'].$wrapper.find('button').css('width', '180px')
        // frm.fields_dict['p1b2'].$wrapper.find('button').css('width', '180px')

        //SETTINGS THEME HERE
        let targetButtonIds = ['p1h1','p2h1','p3h1','p4h1','p5h1','p6h1','p1b1','p1b2','p2b1','p2b2','p3b1','p3b2','p4b1','p4b2','p5b1','p5b2','p6b1','p6b2']; // Replace with actual button names
        set_button_width(frm,targetButtonIds);

        frm.set_df_property('txtlog', 'read_only', 1);
        generateLog(frm,'System logs begin here...');
        generateLog(frm,'waiting for input and execute...');
    }
});
function set_css(frm){
    try{
        document.querySelectorAll("[data-fieldname='txtlog']")[1].style.color = 'red';
        document.querySelectorAll("[data-fieldname='txtlog']")[1].style.background = 'white';
        // document.querySelectorAll("[data-fieldname='txtinput']")[1].style.fontWeight = 'bold';
        // document.querySelectorAll("[data-fieldname='txtinput']")[1].style.color = 'gray';
        // document.querySelectorAll("[data-fieldname='txtinput']")[1].style.background = 'red';
        // document.querySelectorAll("[data-fieldname='p1h1']")[1].style.background = 'red';
    }
    catch(err) {
        generateLog(frm,`Error in function ${set_css.name}: ${err.message}`);
    }
}

function set_button_width(frm,targetButtonIds) {
    try{
        
        // EXAMPLE-01: Use $(frm) to wrap the form object in jQuery, then find all buttons
        // $(frm.wrapper).find('button').css('width', '180px');

        // EXAMPLE-02: Apply to all buttons in the form
        // let buttons = $(frm.wrapper).find('button');
        // buttons.each(function() {  // Loop through all buttons and set the width
        //     $(this).css('width', '180px');
        // });




        // EXAMPLE-03: Apply to all buttons from the array list only
        // $(frm.wrapper).find('button').each(function() { // Loop through all buttons in the form
        $(frm.wrapper).find('*').each(function() { // Loop through all objects in the form
            let buttonId = $(this).attr('id'); // Get the 'id' attribute
            let buttonName = $(this).attr('name'); // Get the 'name' attribute
            let buttonData = $(this).data('action'); // Get a custom 'data-*' attribute (if any)
            let elementType = $(this).prop('nodeName'); // Or you can use .get(0).tagName in jQuery
            let fieldname = $(this).attr('data-fieldname');
            let parentfieldname = $(this).parent().attr('data-fieldname');

            let rl = Math.floor(Math.random() * 156) + 100; // Light Color 
            let gl = Math.floor(Math.random() * 156) + 100; // Light Color 
            let bl = Math.floor(Math.random() * 156) + 100; // Light Color 
            let r = Math.floor(Math.random() * 100); // Dark Color 
            let g = Math.floor(Math.random() * 100); // Dark Color 
            let b = Math.floor(Math.random() * 100); // Dark Color
                
            $(frm.wrapper).find('*').filter('[data-fieldname="p1"]').css('background', `rgb(${Math.floor(200 + Math.random() * 106)}, ${Math.floor(150 + Math.random() * 106)}, ${Math.floor(150 + Math.random() * 106)})`);
            $(frm.wrapper).find('*').filter('[data-fieldname="p2"]').css('background', `rgb(${Math.floor(200 + Math.random() * 106)}, ${Math.floor(150 + Math.random() * 106)}, ${Math.floor(150 + Math.random() * 106)})`);
            $(frm.wrapper).find('*').filter('[data-fieldname="p3"]').css('background', `rgb(${Math.floor(200 + Math.random() * 106)}, ${Math.floor(150 + Math.random() * 106)}, ${Math.floor(150 + Math.random() * 106)})`);
            $(frm.wrapper).find('*').filter('[data-fieldname="p4"]').css('background', `rgb(${Math.floor(200 + Math.random() * 106)}, ${Math.floor(150 + Math.random() * 106)}, ${Math.floor(150 + Math.random() * 106)})`);
            $(frm.wrapper).find('*').filter('[data-fieldname="p5"]').css('background', `rgb(${Math.floor(200 + Math.random() * 106)}, ${Math.floor(150 + Math.random() * 106)}, ${Math.floor(150 + Math.random() * 106)})`);
            $(frm.wrapper).find('*').filter('[data-fieldname="p6"]').css('background', `rgb(${Math.floor(200 + Math.random() * 106)}, ${Math.floor(150 + Math.random() * 106)}, ${Math.floor(150 + Math.random() * 106)})`);

            // Check if the button's id or name is in the array
            // if (targetButtonIdsOrNames.includes(buttonId) || targetButtonIdsOrNames.includes(buttonName)) {
            if (targetButtonIds.includes(fieldname)) {
                if (elementType.toLowerCase().includes('button')){
                    $(this).css('font-weight', 'bold');
                    $(this).css('width', '200px');
                    $(this).css('background', 'black');
                    $(this).css('color', `rgb(${rl}, ${gl}, ${bl})`);
                }
            }
            if (elementType.toLowerCase().includes('h4') && targetButtonIds.includes(parentfieldname)){
                $(this).css('width', '200px');
                $(this).css('text-align', 'center');
                $(this).css('color', `rgb(${r}, ${g}, ${b})`);
            }
});

    }
    catch(err) {
        generateLog(frm,`Error in function ${set_button_width.name}: ${err.message}`);
    }
}

function generateLog(frm, text) {
    let currentLog = frm.doc.txtlog || ""; // Default to an empty string if txtlog is undefined or null
    let updatedLog = currentLog + (text || "") + "<br>"; // Handle undefined text gracefully
    frm.set_value('txtlog', updatedLog);
    // alert("Updated Log:\n" + updatedLog);
}

