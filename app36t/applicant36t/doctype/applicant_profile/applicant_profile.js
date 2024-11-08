// Copyright (c) 2024, innovation36T and contributors
// For license information, please see license.txt

//Applicant Profile
frappe.ui.form.on("Applicant Profile", {
    //onload event
    onload: function(frm) {
        const tour_name = "Applicant Profile Tour";
        frm.tour.init({tour_name}).then(() => frm.tour.start());
    },

    //refresh event
    refresh: function(frm) {
        frm.set_df_property('custom_current_location', 'hidden', 1);
        frm.set_df_property('custom_about_applicant', 'reqd', 1);
        if (frm.is_new()){
            frm.set_intro('Please allow location access to this page which will give brief detail.');
        }
        // All Custom Button Examples
        // REFERENCE => https://frappeframework.com/docs/user/en/api/dialog
        frm.add_custom_button(__('Dialog API'), function() {
            let d = new frappe.ui.Dialog({
                title: 'Enter Details',
                fields: [
                    {
                        label: 'First Name',
                        fieldname: 'first_name',
                        fieldtype: 'Data'
                    },
                    {
                        label: 'Last Name',
                        fieldname: 'last_name',
                        fieldtype: 'Data'
                    },
                    {
                        label: 'Age',
                        fieldname: 'age',
                        fieldtype: 'Int'
                    }
                ],
                size: 'large', // small, large, extra-large 
                primary_action_label: 'Submit',
                primary_action(values) {
                    console.log(values);
                    d.hide();
                    frappe.msgprint({titile:values.first_name
                        ,indicator:'green'
                        ,message:__("The Enter Values Are:</br>First Name is "+values.first_name+"</br>Last Name is "+values.last_name)
                    })
                }
            });
            d.show();
        }, __("Dialog Examples"));
        frm.add_custom_button(__('Acknowlage Dialog'), function() {
            // with server and client action
            args={'MyArg01':3};
            frappe.msgprint({
                title: __('Notification'),
                message: __('Are you sure you want to proceed?'),
                primary_action: {
                'label': 'Yes Proceed!',
                // either one of the actions can be passed
                // 'server_action': 'dotted.path.to.method',
                // 'client_action': 'dotted_path.to_method',
                // 'args': args
                }
            });            
        }, __("Dialog Examples"));
        frm.add_custom_button(__('Error Message'), function() {
            frappe.throw(__('This is an Error Message'))
        }, __("Dialog Examples"));
        frm.add_custom_button(__('Prompt Single Field'), function() {
            frappe.prompt('First Name', ({ value }) => console.log(value))
        }, __("Dialog Examples"));
        frm.add_custom_button(__('Prompt With Title & Label'), function() {
            frappe.prompt('First Name', console.log, 'Enter First Name', 'Please Submit');
        }, __("Dialog Examples"));
        frm.add_custom_button(__('Prompt For Data Type'), function() {
            // prompt for single value of any type
            frappe.prompt({
                label: 'Birth Date',
                fieldname: 'date',
                fieldtype: 'Date'
            }, (values) => {
                console.log(values.date);
            },'Enter Data Of Birth','Please Submit')
        }, __("Dialog Examples"));
        frm.add_custom_button(__('Prompt Multi Data Types'), function() {
            frappe.prompt([
                {
                    label: 'First Name',
                    fieldname: 'first_name',
                    fieldtype: 'Data'
                },
                {
                    label: 'Last Name',
                    fieldname: 'last_name',
                    fieldtype: 'Data'
                },
            ], (values) => {
                console.log(values.first_name, values.last_name);
            })
        }, __("Dialog Examples"));
        frm.add_custom_button(__('Yes/No Confirmation Dialog'), function() {
            frappe.confirm('Are you sure you want to proceed?',
                () => {
                    // action to perform if Yes is selected
                    alert("Yes Chosen");
                }, () => {
                    // action to perform if No is selected
                    alert("No Chosen");
                })
        }, __("Dialog Examples"));
        frm.add_custom_button(__('Warn Confirmation Dialog'), function() {
            frappe.warn('Are you sure you want to proceed?',
                'There are unsaved changes on this page',
                () => {
                    // action to perform if Continue is selected
                    alert("Continue clicked")
                },
                'Continue',
                true // Sets dialog as minimizable
            )
        }, __("Dialog Examples"));
        frm.add_custom_button(__('Show Alert Green'), function() {
            //show_alert with indicator
            frappe.show_alert({
                message:__('Hi, you have a new message'),
                indicator:'green'
            }, 5);
        }, __("Dialog Examples"));
        frm.add_custom_button(__('Progress Dialog'), function() {
            for (let i = 1; i <= 100; i++) {
                // if (i % 10 === 0) continue;  // Skip multiples of 10
                // Use a timeout to delay each iteration by 2 seconds (2000 ms)
                setTimeout(function() {
                    console.log(i);
                    frappe.show_progress('Processing...', i, 100, 'Please wait',i>=99);
                }, 10 * i);  // Multiply delay by `i` to achieve a cumulative delay
            }
        }, __("Dialog Examples"));    
        frm.add_custom_button(__('Open DocType as a Dialog'), function() {
            query_args=''
            new frappe.ui.form.MultiSelectDialog({
                doctype: "Task",
                target: this.cur_frm,
                setters: {
                    status: 'Open'
                },
                add_filters_group: 1,
                subject: "%Filter%here%",
                columns: ["name", "subject", "status"],
                get_query() {
                    return query_args;
                },
                action(selections) {
                    console.log(selections);
                    cur_dialog.hide();
                }
            });
            

        }, __("Dialog Examples"));    
        frm.add_custom_button(__('Table Dialog'), function() {
            const dialog = new frappe.ui.Dialog({
                title: __("Create Logs"),
                fields: [
                    {
                        fieldname: "logs",
                        fieldtype: "Table",
                        label: __("Logs"),
                        in_place_edit: true,
                        reqd: 1,
                        fields: [
                            {
                                fieldname: "log_type",
                                label: __("Log Type"),
                                fieldtype: "Select",
                                options: `IN OUT`,
                                in_list_view: 1,
                                reqd: 1,
                            },
                            {
                                fieldname: "time",
                                label: __("Time"),
                                fieldtype: "Time",
                                in_list_view: 1,
                                reqd: 1,
                            }
                        ],
                        on_add_row: (idx) => {
                          // idx = visible idx of the row starting from 1
                          // eg. set `log_type` as alternating IN/OUT in the table on row addition
                            let data_id = idx - 1;
                            let logs = dialog.fields_dict.logs;
                            let log_type = (data_id % 2) == 0 ? "IN" : "OUT";
              
                            logs.df.data[data_id].log_type = log_type;
                            logs.grid.refresh();
                        },
                    },
                ],
                primary_action: (values) => { alert("Clicked!") },
                primary_action_label: __("Create"),
              });

        }, __("Dialog Examples"));        
        frm.add_custom_button(__('Scan Barcode ID'), function() {
            new frappe.ui.Scanner({
                dialog: true, // open camera scanner in a dialog
                multiple: false, // stop after scanning one value
                on_scan(data) {
                console.log(data.decodedText);
                }
               });

        }, __("Scanner"));   

    },

    //I not prefer to tell About show and hide
    custom_not_eligible_for_dependants: function(frm){
        if (frm.fields_dict.custom_not_eligible_for_dependants.value>0){
            frm.set_df_property('custom_about_applicant', 'hidden', 1);
            frm.set_df_property('custom_about_applicant', 'reqd', 0);
        }
        else {frm.set_df_property('custom_about_applicant', 'hidden', 0);
            frm.set_df_property('custom_about_applicant', 'reqd', 1);
        }
        // frm.toggle_reqd('custom_about_applicant', true);
        frm.refresh_field('custom_about_applicant');
    },

    //Auto fill skills 
    custom_auto_fill: function(frm){
        //Code For New Row In Child Table => let row = frm.add_child('applicant_skills',{skill:'Leadership',number_of_experience:2,rating:4})
        frappe.call({
            method:'app36t.apis36t.getSkillList',
            args: {'totalRecordCount':3},
            callback: function(r){
                if (r.message) {
                    // console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
                    // console.log(r.message);
                    // console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
                    const _json = r.message;
                    _json.forEach(data => {
                        frm.add_child('applicant_skills',{
                            skill: data[0],
                            number_of_experience: data[1],
                            rating: data[2]
                        })
                    });
                    frm.refresh_field('applicant_skills');
                    // const _json = r.message;
                    // _json.skills.forEach(skill => {
                    //     frm.add_child('applicant_skills',{
                    //         skill: skill.name,
                    //         number_of_experience: skill.number_of_experience,
                    //         rating: skill.rating
                    //     })
                    // });
                    // frm.refresh_field('applicant_skills');

                    // frm.set_value('custom_age_string',r)
                    // console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
                    // console.log(_json);
                    // alert(_json.age);
                    // _json.skills.forEach(skill => {alert(skill);});
                    // _json.projects.forEach(project => {alert(project.name);});
                    // alert(_json.skills);
                    // alert(r['message']);
                    // const _json=JSON.parse(r['message']);
                    // alert(_json.age);
                    // jsonData = json.loads(r.message)
                    // alert(jsonData);
                    // console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
                    // skills = data.get("skilllist", [])
                    // alert(skills)
                }else {
                    console.error("No record found in response:", r);
                }
                console.log("Response:", r);
            }
        })        
        frm.refresh_field('applicant_skills');
    },

    //Action Table and buttons actions
    custom_disable_till_process_get_finish:function(frm){
        frappe.call({
            method:'app36t.apis36t.getStringValueWithDelay',
            // btn: $('.custom_disable_till_process_get_finish'),
            btn: $('.custom_disable_primary_button_till_process_get_finish'),
            callback: function(r){
                console.log(r)
                frm.set_value('custom_result',r.message)
            }
        })
    },
    custom_disable_primary_button_till_process_get_finish:function(frm){
        frappe.call({
            method:'app36t.apis36t.getStringValueWithDelay',
            btn: $('.primary-action'),
            callback: function(r){
                console.log(r)
                frm.set_value('custom_result',r.message)
            }
        })
    },
    custom_free_screen:function(frm){
        frappe.call({
            method:'app36t.apis36t.getStringValueWithDelay',
            freeze: true,
            callback: function(r){
                console.log(r)
                frm.set_value('custom_result',r.message)
            }
        })
    },

    //Calculating Age in days months and years
    date_of_birth (frm){
        // alert('Date of Birth Event Called here');
        dob=frm.selected_doc.date_of_birth
        frappe.call({
            method:'app36t.apis36t.getAgeString',
            args: {'dob':dob},
            callback: function(r){
                console.log(r)
                //data=json.loads(r)
                // message = data['message']
                frm.set_value('custom_age_string',r.message)
                // console.log(message)
            }
        })
    },

    //Calling AI API for Analysis
    do_profile_analysis(frm){
        // alert("clicked by hsb in JS on do_profile_analysis!!!")
        try{
            //console.log(frm.selected_doc.first_name);
            const first_name=frm.selected_doc.first_name;
            const last_name=frm.selected_doc.last_name;
            const number_of_dependants=frm.selected_doc.number_of_dependants;
            const chose_a_designation_youre_interested_in=(frm.selected_doc.chose_a_designation_youre_interested_in=null?"":frm.selected_doc.chose_a_designation_youre_interested_in);
            const country_of_birth=frm.selected_doc.country_of_birth;
            const date_of_birth=frm.selected_doc.date_of_birth;

            if(typeof first_name === 'undefined' || first_name === null) {throw "No applicant's information found";}

            var skills = "";
            $.each(frm.doc.applicant_skills,  function(i,  d) {
                skills += d.skill+', ';
            });
            // alert(skills);

            var AI_InquryText = 'write details on applicant profile in a very good format such as full name, age calculated from the date of birth, desired position a bold heading and regular text. second add a summaryheading and write detail para on his profile adding  age,cultural,good looking benefits,  and in last add five points how this profile can be beneficial for the company considering his skills. the response must be in html format with tags.here is the applicant profile, first name is \''+first_name+'\' and last name is \''+last_name+'\'. date of birth is '+date_of_birth +'  country of birth \''+country_of_birth+'\' having skills such as '+skills+'.  he/she is interested in '+chose_a_designation_youre_interested_in+' Position.';

            frappe.call({
                // method:"app36t.applicant36t.doctype.applicant_profile.apicaller4ai.myGoogleAPI",
                method:"app36t.apis36t.getContentGeminiAPIhttpReq",
                args:{'AI_InquryText':AI_InquryText},
                callback: function(r){
                    frappe.show_alert({
                        message:__('AI Analysis Report is ready,</br>Please check <b>AI Analysis</b> information...'),
                        indicator:'green'
                    }, 5);
                    console.log("got callback within JS file, response is below");
                    console.log(r);
                    frm.set_value('profile_analysis', r['message']);
                },
                freeze:true,
                freeze_message:__('<span style="display: block;text-align:center;">'
                                 +'<img src="https://cdn.pixabay.com/animation/2023/08/21/13/31/13-31-04-403_512.gif" alt="Processing" style="width:100px; height:100px;"></br>'
                                 +'Please Wait...</br>AI is Reviewing the request</span>'),
            })
        }catch (e) {
            // TODO: handle exception
            alert("Hsb:error in JS file while calling API app36t.APIs36t.getContentGeminiAPIModel "+e.message)
            console.log(e.message);
        }
    },

    //Calling Weather API and location
    custom_capture_now(frm){
        try{
            frappe.call({
                method:"app36t.apis36t.getWeatherInfo",
                callback: function(r){
                    // console.log("got callback within JS file for Weather API, response is below");
                    // console.log(r);
                    // console.log(r['message']);

                    latitude=r['message']["latitude"];
                    longitude=r['message']["longitude"];
                
                    // frm.set_value('custom_latitude', latitude);
                    // frm.set_value('custom_longitude', longitude);
                    frm.set_value('custom_applicant_time_zone', r['message']["timezone"]);
                    frm.set_value('custom_temperature', r['message']['current_weather']["temperature"]);
                    frm.set_value('custom_windspeed', r['message']['current_weather']["windspeed"]);
                    frm.set_value('custom_date_time', r['message']['current_weather']["time"]);
                    
                    //frm.set_value('custom_current_location', {latitude},{longitude});
                    //frm.set_value('custom_current_location', '${latitude},${longitude}');
                    // frm.fields_dict.custom_current_location.map.setView('${latitude}, ${longitude}', 13);
                    // frm.fields_dict.custom_current_location.map.latitude(latitude)
                    // frm.fields_dict.custom_current_location.map.longitude(longitude)

                    
                    // if (!e.latitude) frappe.show_alert({
                    //     message:__('ALERT! Cannot Access Current Location</br> Please allow this website to access your current location'),
                    //     indicator:'red'
                    // }, 5);
                    



                    frm.set_df_property('custom_current_location', 'hidden', 0);
                    frm.fields_dict.custom_current_location.map.on('locationfound', function(e) {
 
                        var radius = e.accuracy;
                        var marker = L.marker(e.latlng).addTo(frm.fields_dict.custom_current_location.map)
                            .bindPopup('I am here!').openPopup();
                        var circle = L.circle(e.latlng, radius).addTo(frm.fields_dict.custom_current_location.map);
                        // frm.set_value("device_id", e.latitude + ' ' + e.longitude);
                        frm.set_value('custom_latitude', e.latitude);
                        frm.set_value('custom_longitude', e.longitude);


                    });
                
                    frm.fields_dict.custom_current_location.map.on('locationerror', function(e) {
                        frappe.show_alert({
                            message:__('Cannot access your location, To get more information please allow locatino access.'),
                            indicator:'red'
                            }, 5);
                            // frm.set_df_property('custom_current_location', 'hidden', 1);
                        });

                    frm.fields_dict.custom_current_location.map.locate({setView:true});
                    frm.fields_dict.custom_current_location.setView=true;
                    frm.refresh_field('custom_current_location');

                    frappe.show_alert({
                    message:__('Geolocation API is called,</br>Please check <b>Weather Analysis</b>...'),
                    indicator:'green'
                    }, 5);
                }
            })            
        }catch (e) {
            // TODO: handle exception
            // alert("Hsb:error in JS file while calling API for weather detail")
            // alert(e.longitude);
            frappe.show_alert({
                message:(e.message),
                indicator:'red'
            }, 5);   
            console.log(e.message);
        }
    },
})

//Child Table Events.
frappe.ui.form.on('Applicant Skills', {
    // cdt is Child DocType name i.e Quotation Item
    // cdn is the row name for e.g bbfcb8da6a

    //Setting absulote count for rating stars
    rating(frm, cdt, cdn) {
        const targets = [0.333, 0.666, 0.999];
        let row = frappe.get_doc(cdt, cdn);
        // frappe.msgprint(row.skill);
        let ratingValue = row.rating;
        let gotAbsCount = targets.reduce((a, b) => 
            Math.abs(ratingValue - a) < Math.abs(ratingValue - b) ? a : b
        );
        row.rating=gotAbsCount
    }
})
     