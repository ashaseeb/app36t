import frappe
# import google.generativeai as genai
import os
import requests
import http.client
import json
from datetime import date, datetime,timedelta
from dateutil.relativedelta import relativedelta
from dateutil import parser

@frappe.whitelist(allow_guest=True)
def getAgeString(dob):
    today = datetime.today()
    dob = parser.parse(dob)
    age = relativedelta(today, dob)
    result = f"Your age is {age.days} days, {age.months} months and {age.years} years"
    return result

@frappe.whitelist(allow_guest=True)
def getSkillList(totalRecordCount):
    result=frappe.db.sql("SELECT" 
                         +"  skill_name as _skillName"
                         +", ABS(ROUND((RAND() * (10-0)+0))) as _number_of_experience"
                         +", ROUND((RAND() * (1-0)+0),1) as _rating"
                         +" FROM tabSkills")
    # result=frappe.get_all("Skills")
    # result = json.loads('''
    # {
    #     "name": "John Doe",
    #     "age": 30,
    #     "city": "New York",
    #     "email": "john.doe@example.com",
    #     "skills": [
    #         {"name": "C#", "number_of_experience": 3,"rating":4},
    #         {"name": "Leadership", "number_of_experience": 4,"rating":2}
    #     ]
    # }
    # ''')
    # result={"skilllist":[{"skillname":"C#"},{"skillname":"Leadership"},{"skillname":"Programming"}]}
    return result

@frappe.whitelist(allow_guest=True)
def getWeatherInfo():
    # API endpoint with parameters
    url = "https://api.open-meteo.com/v1/forecast"
    params = {
        "latitude": 52.52,
        "longitude": 13.41,
        "current_weather": "True",
        "hourly": "temperature_2m,relative_humidity_2m,wind_speed_10m"
    }

    # Send the request
    response = requests.get(url, params=params)
    data = ""
    # Check if the request was successful
    if response.status_code == 200:
        data = response.json()
    else:
        data = f'Error:'+str({response.status_code})

    # frappe.log(data)  # Print or process the data as needed
    return data

@frappe.whitelist(allow_guest=True)
def getContentGeminiAPIhttpReq(**args):
    AI_InquryText=args.get('AI_InquryText')
    conn = http.client.HTTPSConnection("generativelanguage.googleapis.com")
    payload = json.dumps({
        "contents": [
        {"parts": [{"text": AI_InquryText}]} 
        ]
    })
    headers = {
    'Content-Type': 'application/json'
    }
    conn.request("POST", "/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyBH7fT0807PImOtzCDcJL4pVKAWAuJh73g", payload, headers)
    res = conn.getresponse()
    
    result1 = res.read()
    return result1.decode("utf-8")

    # result2 = res.json()
    # result2 = result2["candidates"][0]["content"]["parts"][0]["text"]
    # return result2
    
    # myjson=res.decode("utf-8")
    # result3 = json.loads(myjson)
    # return result3["candidates"][0]["content"]["parts"][0]["text"]

@frappe.whitelist(allow_guest=True)
def getContentGeminiAPIModel(**args):
    # INSTALL genai BEFORE USE=> https://pypi.org/project/google-generativeai/
    # ALSO INSTALL pip install --upgrade google-api-python-client

    AI_InquryText = args.get('AI_InquryText')

    if not AI_InquryText:
        frappe.throw("AI_InquryText is required")

    try:
        # Configure API key securely (consider using environment variables)
        genai.configure(api_key="AIzaSyBH7fT0807PImOtzCDcJL4pVKAWAuJh73g")

        # Initialize and call the model
        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(AI_InquryText)

        # Return the actual response text
        return response.text

    except Exception as e:
        # Log the error and raise a Frappe exception
        frappe.log_error(f"Error in getContentGeminiAPIModel: {str(e)}", "Gemini API Error")
        frappe.throw(f"An error occurred while generating content: {str(e)}")


