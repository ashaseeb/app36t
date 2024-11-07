# Copyright (c) 2024, innovation36T and contributors
# For license information, please see license.txt

import frappe 
from frappe.model.document import Document


class ApplicantSkills(Document):
	def refresh(self):
		# frappe.throw("Your Error message")
		frappe.msgprint(f"////////////////////////////////")	
		# if((self.rating * 10)  % 2) != 0:
		# 	frappe.throw("Your Error message")
