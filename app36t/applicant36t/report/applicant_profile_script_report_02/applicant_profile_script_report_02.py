# Copyright (c) 2024, innovation36T and contributors
# For license information, please see license.txt
import json
import frappe
from frappe import _, msgprint

def execute(filters=None):
	# frappe.msgprint(str(filters))
	if not filters:{}
	columns, data = [], []
	data=get_data(filters)
	columns=get_columns()
	return columns, data

def get_data(filters):
	# conditions=get_conditions(filters)
	# frappe.msgprint(str(conditions))
	# data = frappe.get_all(
    #     doctype="Applicant Profile",
    #     fields=["first_name","full_name", "date_of_birth","name"],
	# 	filters=conditions,
    # )

	conditions=get_conditions_containing(filters)
	# frappe.msgprint(str(conditions))

	# data = frappe.db.sql("""SELECT first_name,full_name, date_of_birth,name FROM `tabApplicant Profile` WHERE full_name like %s""","kh%",as_dict=True)
	# data = frappe.db.sql("""SELECT first_name,full_name,date_of_birth,name FROM `tabApplicant Profile` WHERE full_name LIKE %(full_name)s""",values={"full_name": "kh%"},as_dict=True)
	# data = frappe.db.sql("""SELECT first_name,full_name,date_of_birth,name FROM `tabApplicant Profile` WHERE full_name LIKE %(full_name)s""",values={"full_name":"a%"},as_dict=True)
	# data = frappe.db.sql("""SELECT first_name,full_name,date_of_birth,name,custom_approval_status FROM `tabApplicant Profile` WHERE full_name LIKE %s""",conditions,as_dict=True)
	# data = frappe.db.sql("""SELECT first_name,full_name,date_of_birth,name,custom_approval_status FROM `tabApplicant Profile` WHERE full_name LIKE %(full_name)s""","%(full_name:kh%)s",as_dict=True)
	# data = frappe.db.sql(sql,conditions,as_dict=True)
	# return data
	

	a="'%a%'"
	b="'Pending'"
	conditions = "" #'{%s,%s}'%(a,b)
	# sql=("""SELECT first_name,full_name,date_of_birth,name,custom_approval_status FROM `tabApplicant Profile` WHERE full_name LIKE {0} AND custom_approval_status={1}""").format(a,b)
	
	whereCondition=get_where_statement(filters)
	sql=("""SELECT first_name,full_name,date_of_birth,name,custom_approval_status,
	  		CASE WHEN docstatus = 0 THEN 'Draft'
        		WHEN docstatus = 1 THEN 'Submitted'
        		WHEN docstatus = 2 THEN 'Cancelled' 
        		ELSE 'Unknown'
    		END AS docstatus,custom_age_string,custom_about_applicant
	  	FROM `tabApplicant Profile` {0}""").format(whereCondition)
	frappe.log(sql)
	data = frappe.db.sql(sql)
	return data
	
def get_conditions(filters):
	conditions={}
	for key, value in filters.items():
		if filters.get(key):
			conditions[key] = value
	return conditions

def get_conditions_containing(filters):
	conditions = ""
	for key, value in filters.items():
		# conditions += "%"+value+"%"
		# if filters.get("first_name"): conditions += "{\"full_name\":\""+value+"%\"}"
		# if filters.get("first_name"): conditions += "%"+value+"%"
		# if filters.get("first_name"): conditions += "(\"%"+value+"%\""+", \"Approved\")"		
		# if filters.get("first_name"): conditions += "{\"full_name\":\""+value+"%\"}"
		if key==("first_name"): conditions += "%"+value+"%"
	# frappe.msgprint(conditions)
	return conditions

def get_where_statement(params):
    """
    Generate a WHERE clause for MariaDB based on provided parameters.

    Args:
        params (dict): A dictionary of column names and their corresponding values.
                       Date range values should be in a list: {"date_of_birth": ["start_date", "end_date"]}
                       Textual docstatus values are converted to numeric equivalents.

    Returns:
        str: The WHERE clause as a string (empty if no conditions).
    """
    conditions = []

    # Mapping of docstatus text to numbers
    docstatus_mapping = {
        "Draft": 0,
        "Submitted": 1,
        "Cancelled": 2
    }

    for key, value in params.items():
        # Handle docstatus conversion
        if key == "docstatus":
            # Convert text-based docstatus to its numeric equivalent
            if isinstance(value, str) and value in docstatus_mapping:
                conditions.append(f"{key} = {docstatus_mapping[value]}")
            elif isinstance(value, int) and value in docstatus_mapping.values():
                conditions.append(f"{key} = {value}")
        # Handle date range
        elif isinstance(value, list) and len(value) == 2:
            conditions.append(f"{key} BETWEEN '{value[0]}' AND '{value[1]}'")
        # Handle LIKE operator if value contains '%'
        elif isinstance(value, str) and "%" in value:
            conditions.append(f"{key} LIKE '{value}'")
        # Handle equality for other values
        elif value:
            conditions.append(f"{key} = '{value}'")

    # Join conditions with ' AND ' or return an empty string if no conditions
    return f"WHERE {' AND '.join(conditions)}" if conditions else ""

def convert_docstatus_to_number(status_text):
    """
    Convert docstatus text to its corresponding numeric value.

    Args:
        status_text (str): The textual representation of the docstatus
                           (e.g., 'Draft', 'Submitted', 'Cancelled').

    Returns:
        int: The corresponding numeric value of the docstatus.
             0 for 'Draft', 1 for 'Submitted', 2 for 'Cancelled'.
    """
    status_mapping = {
        "Draft": 0,
        "Submitted": 1,
        "Cancelled": 2
    }
    
    # Use .get() to handle invalid inputs gracefully
    return status_mapping.get(status_text, None)


def get_columns():
    return [
        {
            "fieldname": "first_name",
            "label": "First Name",
            "fieldtype": "Data",
            "width": "200",
        },
        {
            "fieldname": "full_name",
            "label": "Full Name",
            "fieldtype": "Data",
            "width": "300",
        },
        {
            "fieldname": "date_of_birth",
            "label": "Date of Birth",
            "fieldtype": "Date",
            "width": "130",
        },
        {
            "fieldname": "name",
            "label": "Name",
            "fieldtype": "data",
            "width": "170",
        },
        {
            "fieldname": "custom_approval_status",
            "label": "Approval",
            "fieldtype": "data",
            "width": "100",
        },
        {
            "fieldname": "docstatus",
            "label": "State",
            "fieldtype": "data",
            "width": "100",
        },
        {
            "fieldname": "custom_age_string",
            "label": "Age String",
            "fieldtype": "Data",
            "width": "350",
        },
        {
            "fieldname": "custom_about_applicant",
            "label": "About",
            "fieldtype": "Small Text",
            "width": "300",
        },
		
		
    ]
	