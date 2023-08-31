<script>
    import abms from "$lib/images/abms.png";
    import { db } from "../../../../lib/Firebase/firebase.js";
    import { getDoc, doc } from 'firebase/firestore';
    import Editor from '@tinymce/tinymce-svelte';
    import {PUBLIC_GPT_KEY, PUBLIC_TINY_KEY} from '$env/static/public';
    import Test2 from '$lib/images/test2.png';
    export let data;

    let {slug} = data;
    let text = "";
    let value;

    let conf = {
        menubar: false,
        content_style: "body { margin: 0; padding: 0; }",
        height: '95vh',
        content_style:
        "@import url('https://fonts.googleapis.com/css2?family=Cedarville+Cursive&display=swap');",
    }

    const docRef = doc(db, "notes", slug);
    
    getDoc(docRef).then((doc) => {
        if (doc.exists()) {
            let data = doc.data();
            console.log(data);

            if(data.note){
                value = data.note;
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

</script>



<img src={Test2} class="absolute w-full h-full -z-10 rounded-b-2xl opacity-80" alt="">
    <div class="flex w-screen h-screen flex-wrap overflow-auto">
        <div class="w-screen mainH flex flex-col lg:flex-row">
            <div class="items-center lg:items-start flex flex-col flex-wrap w-full lg:w-1/2 pt-10 lg:pt-40">
                <div class="lg:mx-14">
                    <h1 class="mt-6 mb-4 font-extrabold text-black text-4xl text-center md:text-start md:text-5xl lg:text-7xl">Thank you for purchasing 🙌</h1>
                    <h1 class="text-xl md:mx-0 md:text-2xl text-center md:text-start lg:text-3xl font-semibold leading-none tracking-tight text-gray-600">Download your doctors note below</h1>
                </div>
                <div class="flex md:mt-6 mx-12">    
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
                        <span class="relative flex gap-1.5 items-center justify-center">Purchase for $1.99<img class="w-5 h-5" src="https://img.icons8.com/pastel-glyph/64/FFFFFF/bank-card-front-side--v2.png" alt="download icon"></span>
                    </button>
                </div>
            </div>
    
            <div class="flex justify-center items-center w-full lg:w-1/2 h-screen p-5 mt-8 md:mt-10 lg:mt-0">
                <div class="w-full h-full" id="editorjs">
                    <Editor apiKey={PUBLIC_TINY_KEY} bind:value bind:text {conf}/>
                </div>
            </div>
        </div>
    
       
    </div>
