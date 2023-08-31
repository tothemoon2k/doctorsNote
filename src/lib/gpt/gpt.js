import OpenAI from 'openai';
import {PUBLIC_GPT_KEY} from '$env/static/public'

const openai = new OpenAI({
    apiKey: PUBLIC_GPT_KEY,
    dangerouslyAllowBrowser: true
});

    const doctor = `Dr. Emily Patel
        Internal Medicine Specialist
        Evergreen Medical Associates
        789 Oak Avenue
        San Francisco, CA 94102
        Phone: (415) 555-6789
        Email: dr.patelm@example.com
        Date: August 21, 2023`

    export const generate = async (startDate, fullName, amountOfDays) => {

        let prompt = `You are the doctor below and the current date is Date: ${startDate} please write a note for ${fullName}, a patient who needs to take time off for a fever. The patient has been experiencing related syntoms such as Sweating.                 Chills and shivering.                 Headache.                 Muscle aches.                 Loss of appetite.                 Irritability.                 Dehydration.                 General weakness.                                 and requires ${amountOfDays} days off starting from ${startDate} for rest and recovery. Please write a professional doctor's note, explaining the nature of the illness and the recommended time off. Please provide a very big signature in the font "Cedarville Cursive". Please only use "Cedarville Cursive" for the signature.                                  Doctor: Dr. Emily Patel                                 Internal Medicine Specialist                                 Evergreen Medical Associates                                 789 Oak Avenue                                 San Francisco, CA 94102                                 Phone: (415) 555-6789                                 Email: dr.patelm@example.com                  Please format in html, generate div tag, no body or html tag. Please turn the following css into inline styling and add it to the relevant elements:  """"css
        .doctors-note {
            font-family: "Times New Roman";
            font-size: 12pt;
            line-height: 1.5;
            margin: 20px auto;
            max-width: 800px;
            padding: 40px;
            background-color: #f9f9f9;
            border: 1px solid #ccc;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            color: #000;
            box-sizing: border-box;
        }  
        
        .doctors-note h1 {
            font-size: 18pt;
            text-align: center;
            margin-bottom: 20px;
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
        ""`
        
        try{
            const completion = await openai.chat.completions.create({
                messages: [{ role: 'user', content: prompt}],
                model: 'gpt-4',
            });

            return(completion.choices[0].message.content)

        }catch(err){
            return(err)
        }

        

    }