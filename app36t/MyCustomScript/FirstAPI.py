import frappe
@frappe.whitelist(allow_guest=True)
def func_API(val1,val2):
    return int(val1)+int(val2)

@frappe.whitelist(allow_guest=True)
def func_AllCustomer():
    custlist=frappe.get_all("Customer")
    return custlist

@frappe.whitelist(allow_guest=True)
def func_CustomerDetail(customerId):
    cust=frappe.get_doc("Customer",customerId)
    return cust

@frappe.whitelist(allow_guest=True)
def func_AddATask(subject,status):
    #subject = func_SQL().name
    cust=frappe.get_doc({
        'doctype':'Task',
        'subject':subject,
        'status':status
    })
    cust.insert()
    return cust

@frappe.whitelist(allow_guest=True)
def func_DeleteTask(Id):
    task=frappe.delete_doc("Task",Id)
    return task

@frappe.whitelist(allow_guest=True)
def func_UserSession(Id):
    return frappe.session.user


@frappe.whitelist(allow_guest=True)
def func_SQL(Id):
    dbObj =frappe.db.sql("""select * from tabTask where name='TASK-2024-00001'""")
    return dbObj; 
    