<script>
    import abms from "$lib/images/abms.png";
    import Editor from '@tinymce/tinymce-svelte';
    

    let text;
    let value = "";
    let conf = {
        menubar: false,
        content_style: "body { margin: 0; padding: 0; }",
        height: '95vh',
        content_style:
        "@import url('https://fonts.googleapis.com/css2?family=Cedarville+Cursive&display=swap');",
        
    }

    let step = 1;

    const next = () => {
        step += 1
    }

    async function checkout() {
        console.log("checkout")
		await fetch("api/stripeCheckout", { // http://localhost:5173/api/stripeCheckout
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(
				{
                    "noteUid": 123 //the uid of the document
                }
			)
		}).then((data) => {
			return data.json()
            
		}).then((data) => {
			window.location.replace(data.url);
		});
    }
</script>


<div class="flex w-screen h-screen flex-wrap">
    {#if step !== 3 && step !== 4}
    <div class="w-full md:w-3/5 test2 mainH flex flex-col items-center justify-around md:justify-start md:gap-14 md:pt-10 2xl:justify-center lg:items-start">
        {#if step === 1}
                <div class="w-5/6 md:mx-10">
                    <h1 class="text-white text-4xl md:text-6xl 2xl:text-6xl font-semibold">H<span class="text-orange-400">ead</span>er</h1>
                    <h3 class="text-gray-200 text-2xl md:text-3xl 2xl:text-4xl mt-2 w-full">Helper Text</h3>
                </div>
    
                <div class="w-5/6 lg:w-1/2 -mt-4 md:-mt-0 lg:mx-10">
                    
                        <label for="price" class="block text-md font-medium leading-6 text-white">Name</label>
                        <div class="relative mt-2 rounded-md shadow-sm">
                          <input type="text" name="name" id="name" class="block w-full rounded-md border-0 py-3 pl-4 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6 mb-6" placeholder="Kim Jong Un">
                        </div>

                        <label for="daysOff" class="block text-md font-medium leading-6 text-white">Amount Of Days Off</label>
                        <div class="relative mt-2 rounded-md shadow-sm">
                          <input type="date" name="price" id="price" class="block w-full rounded-md border-0 py-3 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6" placeholder="0.00">
                        </div>
                    
                </div>
    
            <button type="submit" class="mx-10 rounded-md bg-blue-600 w-1/2 py-3.5 text-md font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Next</button>
        {:else if step === 2}
            <div class="w-full md:w-full h-full flex flex-col justify-center gap-12 items-center">
                <h3 class="text-white text-3xl md:text-4xl 2xl:text-5xl font-medium">Progress Text</h3>
                
                <div class="md:mx-0 w-full flex justify-center mb-4">
                    <div class="w-3/5 md:w-1/4 bg-gray-200 rounded-full h-3">
                        <div class="bg-blue-400 h-3 rounded-full" style="width: 50%"></div>
                    </div>
                </div>
    
                <div class="w-5/6 lg:w-1/2 -mt-4 md:-mt-0 2xl:mx-10">
                    <div class="flex flex-col gap-2 w-full">
                        <label class="text-white font-medium" for="firstName">First Name</label>
                        <input type="text" name="firstName" class="mb-6 py-3 pl-2 border-2 rounded-md w-full" placeholder="Topper">
                    </div>
    
                    <div class="flex flex-col gap-2 w-full">
                        <label class="text-white font-medium" for="lastName">Last Name</label>
                        <input type="text" name="lastName" class="py-3 pl-2 border-gray-300 border-2 rounded-md w-full" placeholder="Brown">
                    </div>
                </div>
    
            <button on:click={next} class="2xl:mx-10 w-5/6 lg:w-1/2 bg-blue-600 hover:bg-blue-700 transition-all text-white py-3 rounded-lg text-lg font-semibold" >Create</button>
            </div>
        {/if}
    
        </div>

    <div class="mainH w-2/5 test hidden md:flex flex-col justify-center items-center gap-5">
        
            <div id="indicators-carousel" class="relative w-full h-2/3" data-carousel="static">
                <!-- Carousel wrapper -->
                <div class="relative h-56 overflow-hidden rounded-lg md:h-full">
                    <!-- Item 1 -->
                    <div class="duration-700 ease-in-out" data-carousel-item="active">
                        <img src="https://templatelab.com/wp-content/uploads/2015/11/Doctor-notes-01.jpg" class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="...">
                    </div>
                </div>
                <!-- Slider indicators -->
                <div class="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2">
                    <button type="button" class="w-3 h-3 rounded-full" aria-current="true" aria-label="Slide 1" data-carousel-slide-to="0"></button>
                    <button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
                    <button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>
                    <button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 4" data-carousel-slide-to="3"></button>
                    <button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 5" data-carousel-slide-to="4"></button>
                </div>
                <!-- Slider controls -->
                <button type="button" class="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
                    <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                        <svg class="w-4 h-4 text-white dark:text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
                        </svg>
                        <span class="sr-only">Previous</span>
                    </span>
                </button>
                <button type="button" class="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
                    <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                        <svg class="w-4 h-4 text-white dark:text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                        </svg>
                        <span class="sr-only">Next</span>
                    </span>
                </button>
            </div>


            <ul class="grid grid-cols-3 gap-4 text-left text-white">
                <li class="flex items-center space-x-3 col-span-1">
                    <svg class="w-6 h-6 mr-1 text-green-500 dark:text-green-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                     </svg>
                    <span>Verifiable Doctors Note</span>
                </li>
                <li class="flex items-center space-x-3 col-span-1">
                    <svg class="w-6 h-6 mr-1 text-green-500 dark:text-green-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                     </svg>
                    <span>Takes no more than 60 seconds instead of weeks</span>
                </li>
                <li class="flex items-center space-x-3 col-span-1">
                    <svg class="w-6 h-6 mr-1 text-green-500 dark:text-green-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                     </svg>
                    <span>No doctors visit needed</span>
                </li>
                <li class="flex items-center space-x-3 col-span-1">
                    <svg class="w-6 h-6 mr-1 text-green-500 dark:text-green-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                     </svg>
                    <span>Free Preview</span>
                </li>
                <li class="flex items-center space-x-3 col-span-1">
                    <svg class="w-6 h-6 mr-1 text-green-500 dark:text-green-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                     </svg>
                    <span>Download or share directly from website</span>
                </li>
                <li class="flex items-center space-x-3 col-span-1">
                    <svg class="w-6 h-6 mr-1 text-green-500 dark:text-green-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                     </svg>
                    <span>Only $1.99</span>
                </li>
            </ul>


    </div>

    {:else if step === 3}
        <div class="w-screen mainH flex-col flex justify-center items-center">
            <div class="w-fit h-fit bg-white rounded-lg p-6 border border-gray-200 shadow animate-pulse">
                <div role="status" class="max-w-sm p-6 border border-gray-200 rounded shadow animate-pulse">
                    <div class="h-9 bg-gray-200 rounded-md text-gray-200 w-72 mb-8"></div>
                    <div class="h-6 bg-gray-200 mb-2"></div>
                    <div class="h-4 bg-gray-200 mb-2"></div>
                        <div class="h-4 bg-gray-200 mb-2"></div>
                        <div class="h-4 bg-gray-200 mb-2"></div>
                        <div class="h-4 bg-gray-200 mb-2"></div>
                        <div class="h-4 bg-gray-200 mb-2"></div>
                        <div class="h-4 bg-gray-200 mb-6"></div>
                    <div class="mt-8 space-x-4 w-full">
                        <div class="flex flex-col items-end">
                            <div class="h-4 bg-gray-200 rounded-full text-gray-200 w-40 mb-3"></div>
                            <div class="w-72 h-3 bg-gray-200 rounded-full text-gray-200"></div>
                        </div>
                    </div>
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
        
            <p class="text-3xl text-white font-bold mt-7">Loading..</p>
        </div>
    {:else if step === 4}
            <div class="w-screen mainH flex flex-col lg:flex-row overflow-hidden">
                <div class="items-center lg:items-start flex flex-col flex-wrap w-full lg:w-1/2 pt-10 lg:pt-40">
                    <div class="mx-14">
                      <h1 class="mt-6 mb-4 font-extrabold text-white text-4xl text-center md:text-start md:text-5xl lg:text-7xl">Header</h1>
                      <h1 class="text-xl md:mx-0 md:text-2xl text-center md:text-start lg:text-3xl font-semibold leading-none tracking-tight text-gray-300">Helper Text</h1>
                    </div>
                    <div class="flex md:mt-6 mx-12">    
                        <button on:click={checkout} class="mt-8 relative inline-flex items-center justify-center px-3 md:px-5 py-3 max-h-12 md:max-h-14 overflow-hidden font-bold text-white rounded-md shadow-2xl group" >
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
                <div class="w-full lg:w-2/5 h-1/2 lg:h-3/4 p-6 rounded-xl transition-all mt-4 lg:mt-0">
                   <img class="mainh" src="https://data2.unhcr.org/images/documents/big_4cda85d892a5c0b5dd63b510a9c83e9c9d06e739.jpg" alt="preview of a document">
                </div>
            </div>
        
    {/if}


    <div class="w-full footerH bg-gray-200 flex justify-around items-center bg-opacity-20">
        <img src="https://synkwise.com/wp-content/uploads/2020/11/hipaa_blue.png" alt="HIPAA Compliance Logo" class="h-3/5">
        <img src="https://www.pngitem.com/pimgs/m/93-932042_5-star-trustpilot-flag-hd-png-download.png" alt="Trust Pilot Reviews Screen Shot" class="h-3/5 rounded-md">
        <img src={abms} alt="American Board of Medical Specialties Logo" class="h-4/6 hidden md:block">   
    </div>

</div>


<style>
/* Common styles for both small devices */
    .footerH {
        height: 11%;
    }

    .mainH {
        height: 89%;
    }

    /* Media query for devices like iPhone 12 Mini */
    @media (max-width: 375px) {
        .w-full.md\:test2 {
            width: 100%;
            padding: 20px;
            box-sizing: border-box;
        }

        .grid-cols-3 {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .flex-wrap {
            flex-direction: column;
        }

        .mainH {
            padding: 0;
        }

        .test.hidden.md\:flex {
            display: none;
        }

        /* Adjust font sizes for small devices */
        .text-4xl {
            font-size: 2rem;
            line-height: 1.1;
        }

        .text-2xl {
            font-size: 1.4rem;
            line-height: 1.2;
        }

        /* Adjust input and button sizes for small devices */
        input[type="text"],
        button {
            font-size: 0.9rem;
            padding: 0.65rem;
        }
    }
</style>