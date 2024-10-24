# Copyright (c) 2024, innovation36T and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class ApplicantProfile(Document):
    def validate(self):
        frappe.msgprint("this is testing.")

