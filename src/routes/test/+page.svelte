
<script>
    import Editor from '@tinymce/tinymce-svelte';
    import OrangeBlueBG from '$lib/images/new.png';
    import blueUnderscore from '$lib/images/blueUnderscore.png';

    let step = 1;

    let next = () =>{
        step += 1;
    }
</script>

<img src={OrangeBlueBG} alt="test" class="absolute w-full h-full -z-10">

<div class="w-screen h-screen flex flex-col justify-center items-center py-16 space-y-14 md:flex-row md:justify-center md:items-center">

    {#if step === 1}
        <div class="w-full md:w-full md:h-full flex flex-col justify-center gap-12 items-center">
            <div>
                <h1 class="text-white font-primary text-4xl md:text-6xl text-center md:ml-12 mb-3 md:mt-32 md:text-left max-w-4xl">Need a <span class="text-orange-400">doctors note</span> but don't want to go to the doctor?</h1>
                <h3 class="text-gray-300 text-2xl md:text-4xl md:font-semibold ml-4 md:ml-12 mr-6 leading-7 w-fit text-center md:text-left">Create a doctors note in minutes for absolutely <br> free</h3>
            </div>

            <div class="flex flex-col w-full justify-center items-center">
                <label class="text-white text-md font-medium mb-2 md:w-2/5" for="firstName">First Name</label>
                <input type="text" name="firstName" class="py-3 pl-2 md:w-2/5 inputBG border-2 silverBorder rounded-md mb-8" placeholder="Topper">

                <label class="text-white text-md font-medium mb-2 md:w-2/5" for="lastName">Last Name</label>
                <input type="text" name="lastName" class="py-3 pl-2 md:w-2/5 inputBG border-2 silverBorder rounded-md border-opacity-10 mb-24" placeholder="Brown">

                <button class="bg-blue-600 hover:bg-blue-700 transition-all text-white py-3 md:max-w-lg rounded-lg text-lg font-semibold md:w-2/5" on:click={next}>Next</button>
            </div>

            <h3 class="flex text-xl gap-2.5 items-center text-white font-medium self-end p-8">4.9 Rating <img class="h-8" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Trustpilot_Logo_%282022%29.svg/2560px-Trustpilot_Logo_%282022%29.svg.png" alt=""></h3>
        </div>

    {:else if step === 2}

        <div class="w-full md:w-full h-full flex flex-col justify-center gap-12 items-center">
            <div>
                <h1 class="text-white text-3xl md:text-5xl font-semibold text-center md:ml-12 md:mt-14 mb-3 md:mb-6 md:text-left">Create a doctors note in minutes for 
                    <span class="relative">absolutely free
                       <img src={blueUnderscore} class="absolute left-0 top-11 w-50" alt="lil blue" />
                    </span>
                </h1>
            </div>

            <div class="mx-10 md:mx-0 w-full flex justify-center mb-4">
                <div class="w-1/4 bg-gray-200 rounded-full h-2.5 mx-10">
                    <div class="babyBlue h-2.5 rounded-full" style="width: 50%"></div>
                </div>
            </div>

            <div class="flex flex-col w-full justify-center items-center">
                <label class="text-white text-md font-medium mb-2 md:w-2/5" for="firstName">First Name</label>
                <input type="text" name="firstName" class="py-3 pl-2 md:w-2/5 inputBG border-2 silverBorder rounded-md mb-8" placeholder="Topper">

                <label class="text-white text-md font-medium mb-2 md:w-2/5" for="lastName">Last Name</label>
                <input type="text" name="lastName" class="py-3 pl-2 md:w-2/5 inputBG border-2 silverBorder rounded-md border-opacity-10 mb-24" placeholder="Brown">

                <button class="bg-blue-600 hover:bg-blue-700 transition-all text-white py-3 md:max-w-lg rounded-lg text-lg font-semibold md:w-2/5" on:click={next}>Create</button>
            </div>

            
        </div>

    {:else if step === 3}
        <div class="w-full md:w-1/2 h-full flex flex-col md:pr-14 justify-center items-center">
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
        <div class="w-full md:w-1/2 h-full flex flex-col md:pr-14 justify-center items-center">
            <h1 class="mb-4  font-extrabold leading-none tracking-tight text-white text-5xl text-center md:text-start md:text-5xl lg:text-7xl">Congratulations 🎉</h1>
                      <h1 class="text-2xl md:mx-0 md:text-2xl text-center md:text-start lg:text-3xl font-semibold leading-none tracking-tight text-gray-300">Your fake doctor's note is ready for use. Have fun</h1>
                      <div class="progress mt-10 md:mt-20 w-full h-1/2">
                        <div class="progress-value"></div>
                      </div>
                    </div>
                    <div class="flex gap-6 -mt-6 mb-6">    
                        <button class="mt-8 relative inline-flex items-center justify-center px-3 md:px-5 py-3 max-h-12 md:max-h-14 overflow-hidden font-bold text-white rounded-md shadow-2xl group" >
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
            
                        <button class="mt-8 relative inline-flex items-center justify-center px-3 md:px-5 py-3 max-h-12 md:max-h-14 overflow-hidden font-bold text-white rounded-md shadow-2xl group">
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

            <div class="w-full lg:w-2/5 h-3/4 p-6 rounded-xl">
                <div class="w-full h-full" id="editorjs">
                    <Editor apiKey="" />
                </div>
            </div>
        </div>    
    {/if} 
</div>


<style>
    .babyBlue{
        background-color: #5297FF;
    }

    .mediumFT{
        font-size: 1.45rem;
    }

    .silverBorder{
        border-color: rgb(184, 184, 184);
    }

    .big{
        font-size: 2.60rem; /* 60px */
        line-height: 1;
    }


    .inputBG{
        background: #E4E4E4;
    }
</style>