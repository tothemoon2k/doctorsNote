<script>
    import { onMount } from 'svelte';
    import Test2 from '$lib/images/test2.png';
    import { generate } from '$lib/gpt/gpt';
    import { setDoc, doc, addDoc, collection, updateDoc } from 'firebase/firestore';
    import { serverTimestamp } from 'firebase/firestore';
    import {db} from '$lib/Firebase/firebase';

    let step = 2;


    let next = () => {
        if(fullName && amountOfDays){
            step++;
        } else{
            alert('Please fill out all the fields')
        }
    }

    let fullName;
    let amountOfDays;
    let startDate;
    let reason;
    let additionalDetails;
    let agreements = false;

    let create = async () => {
        if(agreements){
            step++;
            addDoc(collection(db, "notes"), {
                fullName: fullName,
                amountOfDays: amountOfDays || 1,
                startDate: startDate || "no start date",
                reason: reason || "no reason",
                additionalDetails: additionalDetails || "no additional details",
                createdAt: serverTimestamp(),
                note: await generate(startDate, fullName, amountOfDays)
            }).then((docRef)=>{
                window.location.href = `/1/${docRef.id}`
            }).catch((err)=>{
                console.log(err)
            })

        }else{
            alert('Please agree to the terms and conditions')
            return;
        }
        
    }   

    let now = new Date();
    
    $: startDate = new Date(now.getTime() - (now.getTimezoneOffset() * 60000 )).toISOString().split("T")[0];

    
</script>


<div class="w-screen h-screen relative overflow-auto">
    {#if step === 1}
    <div class="absolute w-screen h-screen -z-50 seasalt"></div>
        <div class="w-screen h-4/5 rounded-b-3xl absolute flex justify-center">
            <img src={Test2} class="absolute w-full h-full -z-10 rounded-b-2xl opacity-80" alt="">
            <div class="flex flex-col mt-20 h md:mt-0 w-5/6 md:w-1/2 h-full">
                
                    <div class="hidden sm:mb-8 sm:flex sm:justify-center">
                    <div class="mt-20 relative rounded-full px-3 py-1 text-sm leading-6 text-white ring-1 ring-gray-300 hover:ring-gray-900/20">
                        Just Updated <a href="#" class="font-semibold text-indigo-600"><span class="absolute inset-0" aria-hidden="true"></span> Read more <span aria-hidden="true">&rarr;</span></a>
                    </div>
                    </div>
                    
                <h1 class="md:ml-10 text-4xl font-bold tracking-tight text-gray-900 md:text-6xl">Need a doctors note but don’t want to go to the doctor?</h1>
                <p class="md:ml-10 helper mt-6 text-lg leading-8 text-gray-600">Create a verifiable doctor's note in under 60 seconds for only $2.99. No doctor’s visit required</p>

                
            </div>

            <div class="hidden md:flex flex-col w-1/2 h-full justify-center items-center">
                
                <div id="indicators-carousel" class="relative w-5/6 h-3/4" data-carousel="static">
                    <!-- Carousel wrapper -->
                    <div class="relative overflow-hidden rounded-lg h-full">
                        <!-- Item 1 -->
                        <div class="duration-700 ease-in-out flex bg-green-200 w-full h-full" data-carousel-item="active">
                            
                        </div>
                        <!-- Item 2 -->
                        <div class="hidden duration-700 ease-in-out" data-carousel-item>
                            <img src="/docs/images/carousel/carousel-2.svg" class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="...">
                        </div>
                        <!-- Item 3 -->
                        <div class="hidden duration-700 ease-in-out" data-carousel-item>
                            <img src="/docs/images/carousel/carousel-3.svg" class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="...">
                        </div>
                        <!-- Item 4 -->
                        <div class="hidden duration-700 ease-in-out" data-carousel-item>
                            <img src="/docs/images/carousel/carousel-4.svg" class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="...">
                        </div>
                        <!-- Item 5 -->
                        <div class="hidden duration-700 ease-in-out" data-carousel-item>
                            <img src="/docs/images/carousel/carousel-5.svg" class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="...">
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

            </div>
            
            <div class="shadow-2xl bg-white w-5/6 max-w-6xl h-fit rounded-2xl absolute transform bottom-0 translate-y-1/3 md:translate-y-1/2 flex flex-col pt-4 pb-14 px-4">
                <h1 class="text-3xl font-bold tracking-tight text-gray-900 mb-3">Create your doctor's note in seconds</h1>
                <div class="mb-3">
                    <label for="fullName" class="block text-sm font-medium leading-6 text-gray-900">Full Name</label>
                    <div class="relative mt-2 rounded-md shadow-sm">
                        <input type="text" name="fullName" id="fullName" class="block w-full rounded-md border-0 py-1.5 pl-4 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Ferris Bueller" bind:value={fullName}>
                    </div>
                </div>

                <label for="amountOfDays" class="block text-sm font-medium leading-6 text-gray-900">Amount of Days</label>
                <div class="relative mt-2 rounded-md shadow-sm">
                    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <span><img class="w-5 h-5" src="https://img.icons8.com/pastel-glyph/64/overtime--v3.png" alt="overtime--v3" ></span>
                    </div>
                    <input type="number" name="amountOfDays" id="amountOfDays" class="block w-full rounded-md border-0 py-1.5 pl-10 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="4" bind:value={amountOfDays}>
                </div>


                <button class="absolute bottom-0 bg-black text-white transform translate-y-1/2 p-4 rounded-xl mr-20 self-end font-semibold" on:click={next}>Next</button>
            </div>

            
        </div>

    {:else if step === 2}
        <div class="w-full h-full flex items-center justify-center content-center flex-col">
            <img src={Test2} class="absolute w-full h-full -z-10 rounded-b-2xl opacity-80" alt="">
            <ol class="ol md:mb-24 md:w-1/2 text-sm font-medium text-center text-black sm:text-base mx-auto flex mb-10">
                <li class="flex md:w-full items-center text-green-600 dark:text-green-500 sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
                    <span class="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                        <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                        </svg>
                        Basic <span class="hidden sm:inline-flex sm:ml-2">Info</span>
                    </span>
                </li>
                <li class="flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
                    <span class="text-white flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                        <span class="mr-2">2</span>
                        <span class="hidden sm:inline-flex sm:ml-2">Details</span>
                    </span>
                </li>
                <li class="flex items-center">
                    <span class="mr-2">3</span>
                    Done
                </li>
            </ol>
            <h1 class="text-center mb-6 md:mb-16 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Create Your Doctors Note</h1>
            <div class="w-5/6 md:w-3/4 lg:w-1/2 flex flex-col justify-end">
                <div class="mb-3">
                    <label for="startDate" class="block text-sm font-medium leading-6 text-gray-900">Start Date</label>
                    <div class="relative mt-2 rounded-md shadow-sm">
                    <input type="date" name="startDate" id="startDate" class="block w-full rounded-md border-0 py-3 pl-4 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6" placeholder="" bind:value={startDate}>
                    </div>
                </div>

                <div class="mb-3">
                    <label for="reason" class="block text-sm font-medium leading-6 text-gray-900">Reason</label>
                    <div class="relative mt-2 rounded-md shadow-sm">
                        <div class="relative">
                            <select class="block w-full rounded-md border-0 py-3 pl-4 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6" id="reason" bind:value={reason}>
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
                        </div>
                    </div>
                </div>

                <div class="mb-6">
                    <label for="additionalDetails" class="block text-sm font-medium leading-6 text-gray-900">Additional Details (Optional)</label>
                    <div class="relative mt-2 rounded-md shadow-sm">
                        <input type="text" name="additionalDetails" id="additionalDetails" class="block w-full rounded-md border-0 pt-3 pb-16 pl-4 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6" placeholder="My dog died" bind:value={additionalDetails}>
                    </div>
                </div>

                <div class="flex items-center gap-2 mb-6">
                    <input type="checkbox" class="rounded-full" id="hs-default-checkbox" bind:checked={agreements}>
                    <label for="hs-default-checkbox" class="text-sm  text-black">I have read and accept the Terms and Conditions, Disclaimer and Acceptable Use Policy</label>
                  </div>
                <button class="bg-black text-white transform p-4 rounded-xl self-end font-semibold" on:click={create}>Create</button>
                
            </div>
        </div>
    {:else if step === 3}
        <div class="w-full h-full flex items-center justify-center flex-col">
            <img src={Test2} class="absolute w-full h-full -z-10 rounded-b-2xl opacity-80" alt="">
            <div class="w-screen flex-col flex justify-center items-center">
                <div class="scale-90 md:scale-100 w-fit h-fit bg-white rounded-lg p-6 border border-gray-200 shadow animate-pulse">
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
        </div>
    {/if}
</div>


<style>
    .seasalt{
        background: rgb(242, 242, 242);
    }

    

    @media (max-width: 375px) {
        .h{
            margin-top: 0;
        }

        .ol{
            margin-bottom: 0.5rem;
        }
        
    }
</style>