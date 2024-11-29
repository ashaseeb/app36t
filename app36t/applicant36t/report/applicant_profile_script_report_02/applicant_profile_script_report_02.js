// Copyright (c) 2024, innovation36T and contributors
// For license information, please see license.txt
dobFrom = new Date()
dobFrom.setFullYear(dobFrom.getFullYear() - 50);
dobTo = new Date()
// alert(dobFrom);
// alert(dobTo);


frappe.query_reports["Applicant Profile Script Report 02"] = {

	"filters": [
		{
			"fieldname":"first_name",
			"label": __("First Name"),
			"fieldtype": "Data",
			// "default": ""
		},
		{
			"fieldname":"date_of_birth",
			"label": __("Birth Range"),
			"fieldtype": "Date Range",
			// "default": [dobFrom,dobTo]
		},	
		{
			"fieldname":"name",
			"label": __("Approved IDs Only"),
			"fieldtype": "Link",
			"options": "Applicant Profile",
			"get_query": function() {
				// var department = frappe.query_report_filters_by_name.department.get_value();
				return {
				"doctype": "Applicant Profile",
				"filters": {"custom_approval_status": "Approved",}
				}
			}
		},
		{
			"fieldname":"custom_approval_status",
			"label": __("Approval"),
			"fieldtype": "Select",
			"options": ["","Pending","Approved","Cancelled"],
		},
		{
			"fieldname":"docstatus",
			"label": __("Status"),
			"fieldtype": "Select",
			"options": ["","Draft","Submitted","Cancelled"],
		},
		// {
		// 	"fieldname":"dobFrom",
		// 	"label": __("Date Of Birth Range"),
		// 	"fieldtype": "Date",
		// 	"default": dobFrom
		// },
		// {
		// 	"fieldname":"dobTo",
		// 	"label": __("To"),
		// 	"fieldtype": "Date",
		// 	"default": dobTo
		// },
	],

	// onload: function (report) {
	// 	frappe.open_dialog = function (po_name) {
	// 	let d = new frappe.ui.Dialog({
	// 		title: 'Enter details',
	// 		fields: [
	// 			{
	// 				label: 'Field name',
	// 				fieldname: 'fieldname',
	// 				fieldtype: 'Data'
	// 			}
	// 		],
	// 		primary_action_label: 'Submit',
	// 		primary_action(values) {
	// 			console.log(values)
	// 			d.hide();
	// 		}
	// 	});
	// 	d.show();
	// 	}
	// }
};
