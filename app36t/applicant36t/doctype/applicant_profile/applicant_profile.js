// Copyright (c) 2024, innovation36T and contributors
// For license information, please see license.txt

 frappe.ui.form.on("Applicant Profile", {
 	refresh(frm) {
        frm.add_custom_button(__('AI Summary'),function(){
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
                    }
                })
            }catch (e) {
                // TODO: handle exception
                alert("Hsb:error in JS file while calling API app36t.APIs36t.getContentGeminiAPIModel")
                console.log(e.message);
            }
        })
  	},

    date_of_birth(frm){
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
    }
 });
