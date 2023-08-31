<script>
    import abms from "$lib/images/abms.png";
    import { db } from "../../../lib/Firebase/firebase.js";
    import { getDoc, doc } from 'firebase/firestore';
    import html2canvas from 'html2canvas';
    import { scale } from 'svelte/transition';
    import Test2 from '$lib/images/test2.png';
    export let data;
    

    let test;
    

    let {slug} = data;
    let value;

    

    const docRef = doc(db, "notes", slug);
    
    getDoc(docRef).then((doc) => {
        if (doc.exists()) {
            let data = doc.data();

            if(data.note){
                value = data.note;

                // Create a div to hold the doctor's note
                const div = document.createElement('div');
                div.innerHTML = value + `<h1 class="absolute z-10 rotate-45 opacity-50 text-6xl md:text-8xl lg:text-9xl preview">Preview</h1>`;
                

                // Set up styles for the div
                div.style.transform = 'scale(0.8)';


                // Get the screen width
                const screenWidth = window.innerWidth;

                // Define breakpoints and corresponding styles
                const breakpoints = [
                { maxWidth: 768, width: '100%', height: '105%' },
                { maxWidth: 1024, width: '90%', height: 'auto' },
                { maxWidth: 1440, width: '100%', height: 'auto' },
                { maxWidth: Infinity, width: '60%', height: 'auto' } // Default styles
                ];

                // Iterate through breakpoints and find the appropriate styles
                let styles = { width: '60%', height: 'auto' }; // Default styles
                for (const breakpoint of breakpoints) {
                if (screenWidth <= breakpoint.maxWidth) {
                    styles = { width: breakpoint.width, height: breakpoint.height };
                    break;
                }
                }

                // Apply calculated styles
                div.style.width = styles.width;
                div.style.height = styles.height;

                // Find the container element where you want to append the doctor's note
                const container = document.querySelector('.con');

                // Append the doctor's note to the container
                container.appendChild(div);

                const previewElement = div.querySelector('.preview');

                

                previewElement.style.left = `20%`;
                previewElement.style.top = `30%`;

            }else{
                console.log("no document generated")
            }
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });

    async function checkout() {
		await fetch("../api/stripeCheckout", { // http://localhost:5173/api/stripeCheckout
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(
				{
                    "noteUid": slug
                }
			)
		}).then((data) => {
			return data.json()
            
		}).then((data) => {
			window.location.replace(data.url);
		});
    }
</script>


<img src={Test2} class="absolute w-full h-full -z-10 rounded-b-2xl opacity-80" alt="">
<div class="flex w-screen h-screen flex-wrap overflow-auto">
    <div class="w-screen mainH flex flex-col lg:flex-row">
        <div class="items-center lg:items-start flex flex-col flex-wrap w-full lg:w-1/2 pt-10 lg:pt-40">
            <div class="lg:mx-14">
                <h1 class="mt-6 mb-4 font-extrabold text-white text-4xl text-center md:text-start md:text-5xl lg:text-7xl">Congrats 🎉</h1>
                <h1 class="text-xl md:mx-0 md:text-2xl text-center md:text-start lg:text-3xl font-semibold leading-none tracking-tight text-gray-300">Your note ready to be purchased</h1>
            </div>
            <div class="flex md:mt-6 mx-12">    
                <button class="mt-8 relative inline-flex items-center justify-center px-3 md:px-5 py-3 max-h-12 md:max-h-14 overflow-hidden font-bold text-white rounded-md shadow-2xl group"  on:click={checkout}>
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
                    <span class="relative flex gap-1.5 items-center justify-center">Purchase for $1.99<img class="w-5 h-5" src="https://img.icons8.com/pastel-glyph/64/FFFFFF/bank-card-front-side--v2.png" alt="download icon"></span>
                </button>
            </div>
        </div>

        <div class="flex justify-center items-center w-full lg:w-1/2 h-screen con">
            
            <!--Where doctors note goes-->
        </div>
    </div>

   
</div>

<style>
    


    .footerH {
        height: 12.5%;
    }

    .mainH {
        height: 87.5%;
    }
</style>