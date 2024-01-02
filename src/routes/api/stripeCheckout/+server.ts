import type { RequestHandler } from "./$types";
import Stripe from "stripe";

const SECRET_STRIPE_KEY = import.meta.env.VITE_STRIPE_SECRET_KEY;

const stripe = new Stripe(SECRET_STRIPE_KEY, {
    apiVersion: "2023-08-16",
});

export const POST: RequestHandler = async ({request}) => {
    const data = await request.json();
    console.log(data.noteUid); //gets the uid for the note - noteUid

    

    const session = await stripe.checkout.sessions.create({
        line_items: [{price: "price_1Nn6ptEe5blDhv50FjRNtaf2", quantity: 1}],
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

