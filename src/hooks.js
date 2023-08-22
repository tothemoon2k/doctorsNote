export async function handle({ request, resolve }) {
    // get the referer from the headers
    const referer = request.headers.referer;

    // check if the referer includes mouseflow
    if (referer && referer.includes('.mouseflow.')) {
        // get file extension
        const extension = request.path.split('.').pop();

        // check whether the request is for a CSS file
        if (extension === 'css') {
            // Redirect request from Mouseflow to a stable version
            return {
                status: 307, 
                headers: {
                    location: `/stable${request.path}`
                }
            };
        }
    }

    // if not CSS or not from mouseflow, pass request to the next handler
    const response = await resolve(request);

    return {
        ...response,
        headers: {
            ...response.headers,
        }
    };
}