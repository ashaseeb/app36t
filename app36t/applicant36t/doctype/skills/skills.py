# Copyright (c) 2024, innovation36T and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class Skills(Document):
    def validate(self):
        frappe.msgprint("Here is a validate event captured to check by Haseeb")
