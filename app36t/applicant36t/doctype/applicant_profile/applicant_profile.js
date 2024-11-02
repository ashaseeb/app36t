// Copyright (c) 2024, innovation36T and contributors
// For license information, please see license.txt
frappe.ui.form.on("Applicant Profile", {
    refresh: function(frm) {
        frm.set_df_property('custom_current_location', 'hidden', 1);
        frm.set_df_property('custom_about_applicant', 'reqd', 1);
        if (frm.is_new()){
            frm.set_intro('Please allow location access to this page which will give brief detail.');
        }
    },

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
});
