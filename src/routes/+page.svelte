<script>
    import OpenAI from 'openai';
    import { onDestroy, onMount } from 'svelte';
    import Editor from '@tinymce/tinymce-svelte';
    import html2canvas from 'html2canvas';
    import jsPDF from 'jspdf';

    let startDate;
    let firstName;
    let lastName;
    let daysOff;
    let excuse;
    let now = new Date(), month, day, year;

    let value = '<div style="font-family: Times New Roman, sans-serif; font-size: 12pt; line-height: 1.5; margin: 20px auto; max-width: 800px; padding: 40px; background-color: #f9f9f9; border: 1px solid #ccc; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);" data-mce-style="font-family: Times New Roman, sans-serif; font-size: 12pt; line-height: 1.5; margin: 20px auto; max-width: 800px; padding: 40px; background-color: #f9f9f9; border: 1px solid #ccc; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);"><h1 style="font-size: 18pt; text-align: center; margin-bottom: 20px;" data-mce-style="font-size: 18pt; text-align: center; margin-bottom: 20px;">Medical Certificate</h1><p style="margin-bottom: 10px;" data-mce-style="margin-bottom: 10px;">To whom it may concern,</p><p style="margin-bottom: 10px;" data-mce-style="margin-bottom: 10px;">This is to certify that my patient, undefined, has been diagnosed with a fever that has manifested in multiple symptoms requiring extensive rest and recovery. The symptoms include sweating, chills, shivering, recurring headaches, muscle aches, loss of appetite, increased irritability, dehydration, and generalized weakness.</p><p style="margin-bottom: 10px;" data-mce-style="margin-bottom: 10px;">The nature of this condition necessitates an absence from daily responsibilities for undefined days beginning from undefined, to ensure optimal recovery in the shortest possible timeframe.</p><p style="margin-bottom: 10px;" data-mce-style="margin-bottom: 10px;">I trust you understand the seriousness of this health condition and grant undefined the necessary time off to rest, recover and return to their responsibilities in good health. Thank you for your understanding and cooperation in this matter.</p><p class="signature" style="text-align: right; margin-top: 40px;" data-mce-style="text-align: right; margin-top: 40px;"><span style="font-family: Cedarville Cursive; font-size: 24pt;" data-mce-style="font-family: Cedarville Cursive; font-size: 24pt;"> Dr. Emily Patel </span></p><p style="margin-bottom: 10px; margin-top: 10px;" data-mce-style="margin-bottom: 10px; margin-top: 10px;">Dr. Emily Patel</p><p style="margin-bottom: 10px;" data-mce-style="margin-bottom: 10px;">Internal Medicine Specialist</p><p style="margin-bottom: 10px;" data-mce-style="margin-bottom: 10px;">Evergreen Medical Associates</p><p style="margin-bottom: 10px;" data-mce-style="margin-bottom: 10px;">789 Oak Avenue</p><p style="margin-bottom: 10px;" data-mce-style="margin-bottom: 10px;">San Francisco, CA 94102</p><p style="margin-bottom: 10px;" data-mce-style="margin-bottom: 10px;">Phone: (415) 555-6789</p><p style="margin-bottom: 10px;" data-mce-style="margin-bottom: 10px;">Email: dr.patelm@example.com</p></div>';
 
    let doc = `<div style="font-family: Times New Roman, sans-serif; font-size: 12pt; line-height: 1.5; margin: 20px auto; max-width: 800px; padding: 40px; background-color: #f9f9f9; border: 1px solid #ccc; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);" data-mce-style="font-family: Times New Roman, sans-serif; font-size: 12pt; line-height: 1.5; margin: 20px auto; max-width: 800px; padding: 40px; background-color: #f9f9f9; border: 1px solid #ccc; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);"><h1 style="font-size: 18pt; text-align: center; margin-bottom: 20px;" data-mce-style="font-size: 18pt; text-align: center; margin-bottom: 20px;">Medical Certificate</h1><p style="margin-bottom: 10px;" data-mce-style="margin-bottom: 10px;">To whom it may concern,</p><p style="margin-bottom: 10px;" data-mce-style="margin-bottom: 10px;">This is to certify that my patient, undefined, has been diagnosed with a fever that has manifested in multiple symptoms requiring extensive rest and recovery. The symptoms include sweating, chills, shivering, recurring headaches, muscle aches, loss of appetite, increased irritability, dehydration, and generalized weakness.</p><p style="margin-bottom: 10px;" data-mce-style="margin-bottom: 10px;">The nature of this condition necessitates an absence from daily responsibilities for undefined days beginning from undefined, to ensure optimal recovery in the shortest possible timeframe.</p><p style="margin-bottom: 10px;" data-mce-style="margin-bottom: 10px;">I trust you understand the seriousness of this health condition and grant undefined the necessary time off to rest, recover and return to their responsibilities in good health. Thank you for your understanding and cooperation in this matter.</p><p class="signature" style="text-align: right; margin-top: 40px;" data-mce-style="text-align: right; margin-top: 40px;"><span style="font-family: Cedarville Cursive; font-size: 24pt;" data-mce-style="font-family: Cedarville Cursive; font-size: 24pt;"> Dr. Emily Patel </span></p><p style="margin-bottom: 10px; margin-top: 10px;" data-mce-style="margin-bottom: 10px; margin-top: 10px;">Dr. Emily Patel</p><p style="margin-bottom: 10px;" data-mce-style="margin-bottom: 10px;">Internal Medicine Specialist</p><p style="margin-bottom: 10px;" data-mce-style="margin-bottom: 10px;">Evergreen Medical Associates</p><p style="margin-bottom: 10px;" data-mce-style="margin-bottom: 10px;">789 Oak Avenue</p><p style="margin-bottom: 10px;" data-mce-style="margin-bottom: 10px;">San Francisco, CA 94102</p><p style="margin-bottom: 10px;" data-mce-style="margin-bottom: 10px;">Phone: (415) 555-6789</p><p style="margin-bottom: 10px;" data-mce-style="margin-bottom: 10px;">Email: dr.patelm@example.com</p></div>`

    let text;
    let conf = {
        menubar: false,
        content_style: "body { margin: 0; padding: 0; }",
        height: '95vh',
        content_style:
        "@import url('https://fonts.googleapis.com/css2?family=Cedarville+Cursive&display=swap');",
        
    }
    
    let stage = 1;

    const openai = new OpenAI({
    apiKey: "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",
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

    const generate = async () => {
        console.log("starting")

        const completion = await openai.chat.completions.create({
            messages: [{ role: 'user', content: `You are the doctor below and the current date is Date: ${startDate} please write a note for ${firstName} ${lastName}, a patient who needs to take time off for a fever. The patient has been experiencing related syntoms such as Sweating.
                Chills and shivering.
                Headache.
                Muscle aches.
                Loss of appetite.
                Irritability.
                Dehydration.
                General weakness.
                                and requires ${daysOff} days off starting from ${startDate} for rest and recovery. Please write a detailed(20 Sentences) professional doctor's note, explaining the nature of the illness and the recommended time off. Please provide a very big signature in the font "Cedarville Cursive". Please only use "Cedarville Cursive" for the signature.

                                Doctor: Dr. Emily Patel
                                Internal Medicine Specialist
                                Evergreen Medical Associates
                                789 Oak Avenue
                                San Francisco, CA 94102
                                Phone: (415) 555-6789
                                Email: dr.patelm@example.com


                Please format in html, generate div tag, no body or html tag. Please turn the following css into inline styling and add it to the relevant elements:

                """css
                .legal-document {
                font-family: Times New Roman, sans-serif;
                font-size: 12pt;
                line-height: 1.5;
                margin: 20px auto;
                max-width: 800px;
                padding: 40px;
                background-color: #f9f9f9;
                border: 1px solid #ccc;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }

                .legal-document h1 {
                font-size: 18pt;
                text-align: center;
                margin-bottom: 20px;
                }

                .legal-document p {
                margin-bottom: 10px;
                }

                .legal-document ul {
                list-style-type: disc;
                margin-left: 20px;
                }

                .legal-document ol {
                list-style-type: decimal;
                margin-left: 20px;
                }

                .legal-document .section-heading {
                font-weight: bold;
                margin-top: 20p
                x;
                margin-bottom: 10px;
                }

                .legal-document .signature {
                text-align: right;
                margin-top: 40px;
                }""""
                ` }],
            model: 'gpt-4',
        });

        value = completion.choices[0].message.content;

        stage = 3;
    }

    let dots = '.';
    let interval;

    function updateDots() {
        dots += '.';
        if (dots.length > 3) {
        dots = '.';
        }
    }

    onMount(() => {
        window._mfq = window._mfq || [];
			(function() {
			  var mf = document.createElement("script");
			  mf.type = "text/javascript"; mf.defer = true;
			  mf.src = "//cdn.mouseflow.com/projects/73b9d7b7-cbb3-4754-a949-c62de86a5274.js";
			  document.getElementsByTagName("head")[0].appendChild(mf);
			})();

        interval = setInterval(updateDots, 500);
        
        month = '' + (now.getMonth() + 1),
        day = '' + now.getDate(),
        year = now.getFullYear();

        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;

        startDate = [year, month, day].join('-');
    });

    onDestroy(() => {
        clearInterval(interval);
    });

    const next = () => {
        if(firstName && lastName && daysOff && startDate) {
            generate();
            stage+=1
        }else{
            alert("Please fill out all fields")
        }
    }

    let  a4 = [595.28, 841.89];

    const download = async () => {
    const div = document.createElement('div');
    div.innerHTML = value;
    document.body.appendChild(div);
    
    // Define a fixed width (e.g., the width of a standard laptop)
    const fixedWidth = 1366;
    // Calculate scale ratio according to this fixed width
    const scaleRatio = fixedWidth / div.offsetWidth;
    
    html2canvas(div, {scale: scaleRatio}).then(canvas => {
        var imgData = canvas.toDataURL('image/png');
        var imgAspectRatio = canvas.width / canvas.height;
        var doc = new jsPDF('p', 'mm', [210, 297]);  // A4 size page
        var docWidth = doc.internal.pageSize.getWidth();
        var docHeight = doc.internal.pageSize.getHeight();
        var docAspectRatio = docWidth / docHeight;

        var width, height;
        // calculate dimensions maintaining aspect ratio
        if (imgAspectRatio > docAspectRatio) {
            width = docWidth;
            height = width / imgAspectRatio;
        } else {
            height = docHeight;
            width = height * imgAspectRatio;
        }
    
        doc.addImage(imgData, 'PNG', 0, 0, width, height); 
        doc.save('doctorsNote.pdf');
    });
}
	
    
    const generateAgain = ()=>{
        location.reload()
    }


</script>

{#if stage == 1}
    <div class="bg-gradient-to-bl from-indigo-900 via-indigo-400 to-indigo-900 w-screen h-screen flex flex-col justify-center items-center overflow-hidden">

        <h1 class="px-6 text-3xl mb-4 font-extrabold md:text-center text-gray-900 md:mb-28 md:px-20 md:text-5xl lg:text-6xl dark:text-white">Generate a fake doctors note <span class="text-black dark:text-black">in seconds</span> for FREE</h1>

        <form class="w-full max-w-lg px-6">
            <div class="flex flex-wrap -mx-3 mb-5">
                <div class="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                    First Name
                    </label>
                    <input class="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-2.5 md:py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane" bind:value={firstName}>
                </div>
                <div class="w-full md:w-1/2 px-3">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                    Last Name
                    </label>
                    <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2.5 md:py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Doe" bind:value={lastName}>
                </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                Start Date
                </label>
                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2.5 md:py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="date" bind:value={startDate}>
            </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-2">
            <div class="w-full md:w-1/3 px-3 mb-5 md:mb-0">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                Amount of Days Off
                </label>
                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2.5 md:py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="number" placeholder="4" bind:value={daysOff}>
            </div>
            <div class="w-full md:w-2/3 px-3 mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                Excuse
                </label>
                <div class="relative">
                <select class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2.5 md:py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state" bind:value={excuse}>
                    <option value="Fever" selected>Random</option>
                    <option value="Flu">Flu</option>
                    <option value="Fever">Fever</option>
                    <option value="Food Poisoning">Food Poisoning</option>
                    <option value="Pink Eye">Pink Eye</option>
                    <option value="Strep Throat">Strep Throat</option>
                    <option value="Seasonal Allergies">Seasonal Allergies</option>
                    <option value="Migraine">Migraine</option>
                    <option value="Upset Stomach">Upset Stomach</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
                </div>
            </div>
            
        </form>

        <button on:click={next} class="mb-2 md:mt-20 relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-bold text-white rounded-md shadow-2xl group">
            <span class="absolute inset-0 w-full h-full transition duration-300 ease-out opacity-0 bg-gradient-to-br from-pink-600 via-purple-700 to-blue-400 group-hover:opacity-100"></span>
            <!-- Top glass gradient -->
            <span class="absolute top-0 left-0 w-full bg-gradient-to-b from-white to-transparent opacity-5 h-1/3"></span>
            <!-- Bottom gradient -->
            <span class="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white to-transparent opacity-5"></span>
            <!-- Left gradient -->
            <span class="absolute bottom-0 left-0 w-4 h-full bg-gradient-to-r from-white to-transparent opacity-5"></span>
            <!-- Right gradient -->
            <span class="absolute bottom-0 right-0 w-4 h-full bg-gradient-to-l from-white to-transparent opacity-5"></span>
            <span class="absolute inset-0 w-full h-full border border-white rounded-md opacity-10"></span>
            <span class="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-5"></span>
            <span class="relative">Generate</span>
        </button>
    </div>
  
{:else if stage == 2}
<div class="bg-gradient-to-bl from-indigo-900 via-indigo-400 to-indigo-900 w-screen h-screen flex flex-col justify-center items-center">
  <div class="h-full w-full flex flex-col justify-center items-center">
    <img src="https://media.tenor.com/38hNOaWIFl4AAAAd/kai-cenat.gif" class="h-1/2 w-auto rounded-xl" alt="">
    <p class="text-3xl text-white font-bold pt-4">Loading{dots}</p>
    <p class="text-gray-300 mt-1">This should only take a few mins</p>
  </div>
</div>
{:else if stage == 3}
<div class="bg-gradient-to-bl from-indigo-900 via-indigo-400 to-indigo-900 w-full lg:w-screen h-full lg:h-screen flex flex-col lg:flex-row justify-between overflow-hidden">
    <div class="flex flex-col flex-wrap w-full lg:w-1/2 items-center pt-10 lg:pt-40">
        <div class="mx-14">
          <h1 class="mt-6 mb-4  font-extrabold leading-none tracking-tight text-white text-4xl text-center md:text-start md:text-5xl lg:text-7xl">Congratulations 🎉</h1>
          <h1 class="text-xl md:mx-0 md:text-2xl text-center md:text-start lg:text-3xl font-semibold leading-none tracking-tight text-gray-300">Your fake doctor's note is ready for use. Have fun</h1>
          <div class="progress mt-10 md:mt-20 w-full h-1/2">
            <div class="progress-value"></div>
          </div>
        </div>
        <div class="flex gap-6 -mt-6 mb-6">    
            <button class="mt-8 relative inline-flex items-center justify-center px-3 md:px-5 py-3 max-h-12 md:max-h-14 overflow-hidden font-bold text-white rounded-md shadow-2xl group" on:click={download}>
                <span class="absolute inset-0 w-full h-full transition duration-300 ease-out opacity-0 bg-gradient-to-br from-pink-600 via-purple-700 to-blue-400 group-hover:opacity-100"></span>
                <!-- Top glass gradient -->
                <span class="absolute top-0 left-0 w-full bg-gradient-to-b from-white to-transparent opacity-5 h-1/3"></span>
                <!-- Bottom gradient -->
                <span class="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white to-transparent opacity-5"></span>
                <!-- Left gradient -->
                <span class="absolute bottom-0 left-0 w-4 h-full bg-gradient-to-r from-white to-transparent opacity-5"></span>
                <!-- Right gradient -->
                <span class="absolute bottom-0 right-0 w-4 h-full bg-gradient-to-l from-white to-transparent opacity-5"></span>
                <span class="absolute inset-0 w-full h-full border border-white rounded-md opacity-10"></span>
                <span class="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-5"></span>
                <span class="relative flex gap-1.5 items-center justify-center">Download <img class="w-5 h-5" src="https://img.icons8.com/sf-black-filled/64/FFFFFF/downloading-updates.png" alt="download icon"></span>
            </button>

            <button on:click={generateAgain} class="mt-8 relative inline-flex items-center justify-center px-3 md:px-5 py-3 max-h-12 md:max-h-14 overflow-hidden font-bold text-white rounded-md shadow-2xl group">
                <span class="absolute inset-0 w-full h-full transition duration-300 ease-out opacity-0 bg-gradient-to-br from-pink-600 via-purple-700 to-blue-400 group-hover:opacity-100"></span>
                <!-- Top glass gradient -->
                <span class="absolute top-0 left-0 w-full bg-gradient-to-b from-white to-transparent opacity-5 h-1/3"></span>
                <!-- Bottom gradient -->
                <span class="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white to-transparent opacity-5"></span>
                <!-- Left gradient -->
                <span class="absolute bottom-0 left-0 w-4 h-full bg-gradient-to-r from-white to-transparent opacity-5"></span>
                <!-- Right gradient -->
                <span class="absolute bottom-0 right-0 w-4 h-full bg-gradient-to-l from-white to-transparent opacity-5"></span>
                <span class="absolute inset-0 w-full h-full border border-white rounded-md opacity-10"></span>
                <span class="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-5"></span>
                <span class="relative flex gap-1.5 items-center justify-center">Generate Again <img class="w-5 h-5" src="https://img.icons8.com/ios-filled/50/FFFFFF/synchronize.png" alt="download icon"></span>
            </button>

        </div>
    </div>
    <div class="w-full lg:w-2/5 h-1/2 lg:h-3/4 p-6 rounded-xl transition-all">
        <div class="w-full h-full" id="editorjs">
            <Editor
            apiKey="6bonds4k9gcv6r9duxe2mgtgf6zovqhix4qglxzkkppws98h" bind:value bind:text {conf}
        />
    </div>
    </div>
</div>
{/if}

<style></style>

<!--
<select name="excuse" id="excuse">
    <option value="Fever" selected>Random</option>
    <option value="Flu">Flu</option>
    <option value="Fever">Fever</option>
    <option value="Food Poisoning">Food Poisoning</option>
    <option value="Pink Eye">Pink Eye</option>
    <option value="Strep Throat">Strep Throat</option>
    <option value="Seasonal Allergies">Seasonal Allergies</option>
    <option value="Migraine">Migraine</option>
    <option value="Upset Stomach">Upset Stomach</option>
</select>
-->