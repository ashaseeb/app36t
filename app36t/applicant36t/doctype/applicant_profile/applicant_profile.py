# Copyright (c) 2024, innovation36T and contributors
# For license information, please see license.txt
import http.client
import json
import frappe
from frappe.model.document import Document


class ApplicantProfile(Document):
    def round_to_nearest(value):
        # Find the target with the smallest difference to the input
        targets = [0.333, 0.666, 0.999]
        nearest = min(targets, key=lambda x: abs(value - x))
        return nearest

    def validate(self):
        frappe.log("MY LOG: Applicant Profile Validate Event Called!!!!")
        try:
            # ###Loop for all rows in skill child table for Absolute Count
            # applicant_skills = self.get("applicant_skills")
            # targets = [0.333, 0.666, 0.999]
            # for row in applicant_skills:
            #     frappe.log(row.skill)
            #     frappe.log(row.rating)
            #     frappe.log(min(targets, key=lambda x: abs(row.rating - x)))
            #     # row.rating=(round_to_nearest(row.rating))
            #     row.rating=(min(targets, key=lambda x: abs(row.rating - x)))


            first_name=str(self.first_name if self.first_name is not None else "")
            last_name=str(self.last_name if not(self.last_name is None) else "")
            # full_name=f'{first_name}, {last_name}'
            full_name=(first_name)+(last_name if (last_name=="") else ", "+last_name)

            # # frappe.log(full_name)
            # # frappe.msgprint(full_name)
            self.full_name=full_name
        except Exception as e:
            errmsg=f"Error while preparing full name </br></br>SYSTEM EXCEPTION:</br>{e}"
            frappe.throw(errmsg)
            
        
