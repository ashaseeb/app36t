// Copyright (c) 2024, innovation36T and contributors
// For license information, please see license.txt

frappe.query_reports["Applicant Profile Script Report 01"] = {
	"filters": [
		{
			"fieldname":"full_name"
			,"label":_("Full Name")
			,"field_type":"Data"
			,"default":"%"
		},
		{
			"status":"status"
			,"label":_("Status")
			,"field_type":"select"
			,"option":"Pending"
		},
	]
};
