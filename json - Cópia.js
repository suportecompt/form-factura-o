const json = {
 "title": "Planeamento Workflow, step 01",
 "description": "É OBRIGATÓRIO este planeamento antes de se sair do escritório.",
 "logo": "./logo.png",
 "logoWidth": "auto",
 "logoHeight": "60",
 "completedHtml": "<div style=\"max-width:688px;text-align:center;margin: 16px auto;\">\n\n<div style=\"padding:0 24px;\">\n<h4>Thank you for choosing us.</h4>\n<br>\n<p>Dear {firstname-for-complete-page}, we're thrilled to have you on board...</p>\n</div>\n\n</div>\n",
 "pages": [
  {
   "name": "login-page",
   "elements": [
    {
     "type": "text",
     "name": "pincode",
     "title": "Enter Pin Code to Unlock",
     "placeholder": "Pin Code",
     "inputType": "password",
     "isRequired": true,
     "width": "100%", 
     "minWidth": "256px"
     // --- VALIDATORS REMOVED (Logic moved to index.js) ---
    }
   ]
  },
  {
   "name": "page1",
   "elements": [
    {
     "type": "text",
     "name": "check-in-date",
     "width": "37%",
     "minWidth": "256px",
     "titleLocation": "hidden",
     "description": "Check-in",
     "descriptionLocation": "underInput",
     "defaultValueExpression": "today()",
     "validators": [
      {
       "type": "expression",
       "text": "Check-in date cannot precede today's date.",
       "expression": "{check-in-date} >= today()"
      }
     ],
     "inputType": "date",
     "placeholder": "Check-in"
    },
    {
     "type": "text",
     "name": "check-out-date",
     "width": "37%",
     "minWidth": "256px",
     "startWithNewLine": false,
     "titleLocation": "hidden",
     "description": "Check-out",
     "descriptionLocation": "underInput",
     "defaultValueExpression": "today(1)",
     "validators": [
      {
       "type": "expression",
       "text": "Invalid date range: check-out date cannot precede check-in date.",
       "expression": "getDate({check-out-date}) >= getDate({check-in-date})"
      }
     ],
     "inputType": "date",
     "placeholder": "Check-out"
    },
    {
     "type": "dropdown",
     "name": "number-of-guests",
     "width": "26%",
     "minWidth": "192px",
     "startWithNewLine": false,
     "titleLocation": "hidden",
     "choices": [ 1, 2, 3, 4, 5, 6, 7, 8, 9,
      { "value": "10", "text": "10+" }
     ],
     "placeholder": "# of guests",
     "allowClear": false
    },
    {
     "type": "dropdown",
     "name": "room-type",
     "useDisplayValuesInDynamicTexts": false,
     "width": "74%",
     "minWidth": "256px",
     "titleLocation": "hidden",
     "choices": [
      { "value": "queen", "text": "Queen Room" },
      { "value": "king", "text": "King Room" },
      { "value": "deluxe-king", "text": "Deluxe King Room" },
      { "value": "superior-king", "text": "Superior King Room" }
     ],
     "placeholder": "Room type",
     "allowClear": false
    },
    {
     "type": "checkbox",
     "name": "non-smoking",
     "width": "26%",
     "minWidth": "192px",
     "startWithNewLine": false,
     "titleLocation": "hidden",
     "choices": [
      { "value": "true", "text": "Non-smoking" }
     ]
    },
    {
     "type": "image",
     "name": "king-room-image",
     "visibleIf": "{room-type} = 'king'",
     "width": "37%",
     "minWidth": "192px",
     "imageLink": "https://api.surveyjs.io/private/Surveys/files?name=31ba1c67-201e-458e-b30b-86b45ba25f40",
     "imageFit": "cover",
     "imageHeight": "224",
     "imageWidth": "1000"
    },
    {
     "type": "html",
     "name": "king-room-description",
     "visibleIf": "{room-type} = 'king'",
     "width": "63%",
     "minWidth": "256px",
     "startWithNewLine": false,
     "html": "<h4 style=\"padding-top:16px\">King Room</h4>\n<p style=\"padding-top:8px;font-size:14px;\">\nOur King Room offers spacious luxury...\n</p>\n\n"
    },
    {
     "type": "image",
     "name": "deluxe-king-room-image",
     "visibleIf": "{room-type} = 'deluxe-king'",
     "width": "37%",
     "minWidth": "192px",
     "imageLink": "https://api.surveyjs.io/private/Surveys/files?name=4fc633b5-0ac3-48f5-9728-284446e72adf",
     "imageFit": "cover",
     "imageHeight": "224",
     "imageWidth": "1000"
    },
    {
     "type": "html",
     "name": "deluxe-king-room-description",
     "visibleIf": "{room-type} = 'deluxe-king'",
     "width": "63%",
     "minWidth": "256px",
     "startWithNewLine": false,
     "html": "<h4 style=\"padding-top:16px\">Deluxe King Room</h4>\n<p style=\"padding-top:8px;font-size:14px;\">\nElevate your stay in our Deluxe King Room...\n</p>\n\n"
    },
    {
     "type": "image",
     "name": "queen-room-image",
     "visibleIf": "{room-type} = 'queen'",
     "width": "37%",
     "minWidth": "192px",
     "imageLink": "https://api.surveyjs.io/private/Surveys/files?name=2e2bc916-6f2e-47ff-b321-74b34118a748",
     "imageFit": "cover",
     "imageHeight": "224",
     "imageWidth": "1000"
    },
    {
     "type": "html",
     "name": "queen-room-description",
     "visibleIf": "{room-type} = 'queen'",
     "width": "63%",
     "minWidth": "256px",
     "startWithNewLine": false,
     "html": "<h4 style=\"padding-top:16px\">Queen Room</h4>\n<p style=\"padding-top:8px;font-size:14px;\">\nExperience comfort and convenience...\n</p>\n\n"
    },
    {
     "type": "image",
     "name": "superior-king-room-image",
     "visibleIf": "{room-type} = 'superior-king'",
     "width": "37%",
     "minWidth": "192px",
     "imageLink": "https://api.surveyjs.io/private/Surveys/files?name=e16770dd-818c-4847-8b7f-19ee527420c1",
     "imageFit": "cover",
     "imageHeight": "224",
     "imageWidth": "1000"
    },
    {
     "type": "html",
     "name": "superior-king-room-description",
     "visibleIf": "{room-type} = 'superior-king'",
     "width": "63%",
     "minWidth": "256px",
     "startWithNewLine": false,
     "html": "<h4 style=\"padding-top:16px\">Superior King Room</h4>\n<p style=\"padding-top:8px;font-size:14px;\">\nIndulge in the epitome of luxury...\n</p>\n\n"
    },
    {
     "type": "dropdown",
     "name": "number-of-rooms",
     "width": "37%",
     "minWidth": "192px",
     "titleLocation": "hidden",
     "choices": [ 1, 2, 3, 4, 5 ],
     "placeholder": "# of rooms",
     "allowClear": false
    },
    {
     "type": "checkbox",
     "name": "with-pets",
     "width": "63%",
     "minWidth": "256px",
     "startWithNewLine": false,
     "titleLocation": "hidden",
     "choices": [
      { "value": "true", "text": "I am traveling with pets" }
     ]
    },
    {
     "type": "tagbox",
     "name": "extras",
     "width": "100%",
     "minWidth": "256px",
     "titleLocation": "hidden",
     "choices": [
        "Breakfast", "Fitness", "Parking", "Swimming pool", "Restaurant", "Spa"
     ],
     "placeholder": "Extras"
    },
    {
     "type": "comment",
     "name": "notes",
     "width": "100%",
     "minWidth": "256px",
     "titleLocation": "hidden",
     "placeholder": "Notes...",
     "autoGrow": true,
     "allowResize": false
    }
   ]
  },
  {
   "name": "page2",
   "elements": [
    {
     "type": "text",
     "name": "last-name",
     "width": "64%",
     "minWidth": "192px",
     "titleLocation": "hidden",
     "description": "Must match the passport exactly",
     "descriptionLocation": "underInput",
     "placeholder": "Last name"
    },
    {
     "type": "text",
     "name": "first-name",
     "width": "36%",
     "minWidth": "256px",
     "startWithNewLine": false,
     "titleLocation": "hidden",
     "placeholder": "First name"
    },
    {
     "type": "text",
     "name": "address-line-1",
     "width": "100%",
     "minWidth": "256px",
     "titleLocation": "hidden",
     "descriptionLocation": "underInput",
     "placeholder": "Address line 1"
    },
    {
     "type": "text",
     "name": "address-line-2",
     "width": "100%",
     "minWidth": "256px",
     "titleLocation": "hidden",
     "placeholder": "Address line 2"
    },
    {
     "type": "text",
     "name": "city",
     "width": "36%",
     "minWidth": "256px",
     "titleLocation": "hidden",
     "placeholder": "City"
    },
    {
     "type": "text",
     "name": "zip",
     "width": "28%",
     "minWidth": "192px",
     "startWithNewLine": false,
     "titleLocation": "hidden",
     "placeholder": "Zip code"
    },
    {
     "type": "text",
     "name": "state",
     "width": "36%",
     "minWidth": "256px",
     "startWithNewLine": false,
     "titleLocation": "hidden",
     "placeholder": "State"
    },
    {
     "type": "dropdown",
     "name": "country",
     "width": "36%",
     "minWidth": "256px",
     "titleLocation": "hidden",
     "choicesByUrl": {
      "url": "https://surveyjs.io/api/CountriesExample"
     },
     "placeholder": "Country",
     "allowClear": false
    },
    {
     "type": "text",
     "name": "phone",
     "width": "64%",
     "minWidth": "192px",
     "startWithNewLine": false,
     "titleLocation": "hidden",
     "description": "Example: +1 (555) 777-55-22",
     "descriptionLocation": "underInput",
     "placeholder": "Phone"
    }
   ]
  }
 ],
 "calculatedValues": [{
    "name": "firstname-for-complete-page",
    "expression": "iif({first-name} notempty, {first-name}, guests)"
 }],
 "showPrevButton": false,
 "questionErrorLocation": "bottom",
 "pagePrevText": "Back",
 "pageNextText": "Next", 
 "completeText": "Book Now",
 "widthMode": "static",
 "width": "904"
};