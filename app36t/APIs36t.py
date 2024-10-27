from datetime import date, datetime,timedelta
from dateutil.relativedelta import relativedelta
from dateutil import parser
import frappe

@frappe.whitelist(allow_guest=True)
def getAgeString(dob):
    today = datetime.today()
    dob = parser.parse(dob)
    age = relativedelta(today, dob)
    result = f"Your age is {age.days} days, {age.months} months and {age.years} years"
    return result


