# Copyright (c) 2024, innovation36T and contributors
# For license information, please see license.txt
import http.client
import json

import frappe
from frappe.model.document import Document

class ApplicantProfile(Document):
    def validate(self):
        frappe.log(f'{self.full_name}')
        self.full_name=f'{self.first_name} {self.last_name or ""}'
        # frappe.msgprint(f'{self.full_name}')
