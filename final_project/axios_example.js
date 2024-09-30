const axios = require('axios').default;

const connectToURL = (URL) => {
    const req = axios.get(URL);
    console.log(req);
    req.then(resp => {
        console.log("fulfilled");
        console.log(resp.data);
    })
    .catch(err => {
        console.log("Rejected for URL: " + URL);
        console.log(err.toString());
    });
}

connectToURL("https://johnwilding-5000.theianext-0-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/");
connectToURL("https://johnwilding-5000.theianext-0-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/isbn/1");
connectToURL("https://johnwilding-5000.theianext-0-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/author/Chinua%20Achebe");
connectToURL("https://johnwilding-5000.theianext-0-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/title/Things%20Fall%20Apart");
