module.exports = {
    convertHTMLtoMultiLineString: function (html) {
        var retValue = '';
        try {
            if (html) {
                retValue = html.replace(/\<br\>/g, "\n");
            }
        } catch (e) {
            console.error(e);
        }
        return retValue;
    },
    removeExtraNewLines: function (string) {
        let retValue = "";
        try {
            retValue = string.replace(/[\r\n]{2,}/g, "\n");
        } catch (e) {
            console.error(e);
        }
        return retValue;
    },
    prependPrefix: function (cred) {
        try {
            if (cred && cred.url) {
                for (let index = 0; index < cred.url.length; index++) {
                    let element = cred.url[index];
                    if (typeof element == "string") {
                        if (!element.match(/^\/?in\/.*?/)) {
                            element = "in/" + element;
                            cred.url[index] = element
                        }
                    }

                }
            }
        } catch (e) {
            console.error(e);
        }
    }
}