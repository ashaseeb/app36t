import frappe
import http.client
import json


import google.generativeai as genai
import os

@frappe.whitelist()
def myGoogleAPI(**args):
    AI_InquryText=args.get('AI_InquryText')
    genai.configure(api_key="AIzaSyBH7fT0807PImOtzCDcJL4pVKAWAuJh73g")
    model = genai.GenerativeModel("gemini-1.5-flash")
    response = model.generate_content(AI_InquryText)
    print(response.text)
    return response.text


@frappe.whitelist()
def myGoogleAPI4httpReq(**args):
    frappe.log(".py function Called!!!")

    conn = http.client.HTTPSConnection("generativelanguage.googleapis.com")
    payload = json.dumps({
        "contents": [
        {
            "parts": [
            {
                "text": "list down all the cities in texas USA"
            }
            ]
        }
        ]
    })
    headers = {
    'Content-Type': 'application/json'
    }
    conn.request("POST", "/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyBH7fT0807PImOtzCDcJL4pVKAWAuJh73g", payload, headers)
    res = conn.getresponse()
    data = res.read()
    
    #frappe.msgprint(data.decode("utf-8"))
    # frappe.log("API RESPONSE BELOW")
    # frappe.log(data.decode("utf-8"))
    return data.decode("utf-8")
