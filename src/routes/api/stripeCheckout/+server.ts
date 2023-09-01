import type { RequestHandler } from "./$types";
import Stripe from "stripe";

const SECRET_STRIPE_KEY = "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";

const stripe = new Stripe(SECRET_STRIPE_KEY, {
    apiVersion: "2023-08-16",
});

export const POST: RequestHandler = async ({request}) => {
    const data = await request.json();
    console.log(data.noteUid); //gets the uid for the note - noteUid

    

    const session = await stripe.checkout.sessions.create({
        line_items: [{price: "price_1NlfdbEe5blDhv50FnJ6Jz4K", quantity: 1}],
        mode: 'payment',
        success_url: `https://www.getadoctorsnote.org/1/${data.noteUid}/s`,
        cancel_url: `https://www.getadoctorsnote.org/1/${data.noteUid}`,
    });


    return new Response(
        JSON.stringify({ url: session.url }),
        {
            status: 200,
            headers: { 'content-type': 'application/json'}
        }
    )
}

