# Copyright (c) 2024, innovation36T and contributors
# For license information, please see license.txt
import http.client
import json
import frappe
from frappe.model.document import Document

class ApplicantProfile(Document):
    def validate(self):
        try:
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
            
        
