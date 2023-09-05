import OpenAI from 'openai';
import {PUBLIC_GPT_KEY} from '$env/static/public'

const openai = new OpenAI({
    apiKey: PUBLIC_GPT_KEY,
    dangerouslyAllowBrowser: true
});

    

    export const generate = async (startDate, fullName, amountOfDays, additionalDetails, gptModel) => {

        const doctor = `
        Clinic Logo: https://imagizer.imageshack.com/img924/4138/lXOe6m.png
        Name: Dr. Emily Patel
        Position: General Practitioner
        Evergreen Medical Clinic
        100 E Lancaster Ave, Wynnewood, PA 19096
        Phone: (304) 967-2601
        Email: dr.patel@evergreenmedical.org`

        let prompt;

        if(additionalDetails){
            prompt = `You are the doctor below and the current date is Date: ${startDate} please write a doctors note for ${fullName}, a patient who needs to take time off for a fever. The patient has been experiencing symptoms such as Sweating.                 Chills and shivering.                 Headache.                 Muscle aches.                 Loss of appetite.                 Irritability.                 Dehydration.                 General weakness.                                 and requires ${amountOfDays} days off starting from ${startDate} for rest and recovery. Please write a typical doctor's note for the patients superior (2 Paragraphs), briefly explaining the nature of the illness and the recommended time off. Please include the following details: ${additionalDetails} Please provide a very big signature in the font "Cedarville Cursive". Please only use the font "Cedarville Cursive" for the signature. Please include the clinic logo with the styling of .clinical-logo from the css below.


        Please format in html, generate div tag, no body or html tag. Please turn the following css into inline styling and add it to the relevant elements:  """"css
        /* CSS */
        .doctors-note {
            font-family: "Circular";
            font-size: 12pt;
            line-height: 1.5;
            margin: 20px auto;
            max-width: 612px;
            padding: 40px;
            background-color: #f9f9f9;
            border: 1px solid #ccc;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            color: #000;
            box-sizing: border-box;
            position: relative;
        }
        
        .clinical-logo {
            top: 40px; 
            left: 40px; 
            width: 110px; 
            height: 110px; 
            margin-bottom: 25px;
        }
        
        .doctors-note h1 {
            font-size: 18pt;
            text-align: center;
            margin-bottom: 60px;
        }
        
        .doctors-note p {
            margin-bottom: 10px;
        }
        
        .doctors-note ul {
            list-style-type: disc;
            margin-left: 20px;
        }
        
        .doctors-note ol {
            list-style-type: decimal;
            margin-left: 20px;
        }
        
        .doctors-note .section-heading {
            font-weight: bold;
            margin-top: 20px;
            margin-bottom: 10px;
        }
        
        .doctors-note .signature {
            text-align: right;
            margin-top: 40px;
        }
 ""
        
        
        Doctor Info: ${doctor}

        `
        } else{
            prompt = `You are the doctor below and the current date is Date: ${startDate} please write a doctors note for ${fullName}, a patient who needs to take time off for a fever. The patient has been experiencing symptoms such as Sweating.                 Chills and shivering.                 Headache.                 Muscle aches.                 Loss of appetite.                 Irritability.                 Dehydration.                 General weakness.                                 and requires ${amountOfDays} days off starting from ${startDate} for rest and recovery. Please write a typical doctor's note for the patients superior (2 Paragraphs), briefly explaining the nature of the illness and the recommended time off. Please provide a very big signature in the font "Cedarville Cursive". Please only use the font "Cedarville Cursive" for the signature. Please include the clinic logo with the styling of .clinical-logo.


        Please format in html, generate div tag, no body or html tag. Please turn the following css into inline styling and add it to the relevant elements:  """"css
        /* CSS */
        .doctors-note {
            font-family: "Circular";
            font-size: 12pt;
            line-height: 1.5;
            margin: 20px auto;
            max-width: 612px;
            padding: 40px;
            background-color: #f9f9f9;
            border: 1px solid #ccc;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            color: #000;
            box-sizing: border-box;
            position: relative;
        }
        
        .clinical-logo {
            top: 40px; 
            left: 40px; 
            width: 110px; 
            height: 110px; 
            margin-bottom: 25px;
        }
        
        .doctors-note h1 {
            font-size: 18pt;
            text-align: center;
            margin-bottom: 60px;
        }
        
        .doctors-note p {
            margin-bottom: 10px;
        }
        
        .doctors-note ul {
            list-style-type: disc;
            margin-left: 20px;
        }
        
        .doctors-note ol {
            list-style-type: decimal;
            margin-left: 20px;
        }
        
        .doctors-note .section-heading {
            font-weight: bold;
            margin-top: 20px;
            margin-bottom: 10px;
        }
        
        .doctors-note .signature {
            text-align: right;
            margin-top: 40px;
        }
 ""
        
        
        Doctor Info: ${doctor}

        `
        }

        
        
        try{
            const completion = await openai.chat.completions.create({
                messages: [{ role: 'user', content: prompt}],
                model: gptModel,
            });

            return(completion.choices[0].message.content)

        }catch(err){
            return(err)
        }

        

    }