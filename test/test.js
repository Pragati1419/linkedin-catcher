const scrapper = require("../src/index")

scrapper({
    url:"https://www.linkedin.com/in/pragati1157/",  // ex: Pragati Kumari/
}).then(res=>console.warn(res));




