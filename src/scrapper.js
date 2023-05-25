const utils = require("./utils");

class Scrapper {
    constructor() {

    }
    getDescription(parent) {
        let fullDescriptionQuery = ".show-more-less-text__text--more";
        let shortDescriptionQuery = ".show-more-less-text__text--less";
        let retValue = "";
        try {
            var descriptionDiv = parent.find(fullDescriptionQuery);
            if (descriptionDiv.length == 0) {
                descriptionDiv = parent.find(shortDescriptionQuery);
            }

            if (descriptionDiv.length) {
                var rawDescription = descriptionDiv.html();
                rawDescription = utils.convertHTMLtoMultiLineString(rawDescription);

                retValue = rawDescription;
            }
        } catch (e) {
            console.error(e);
        }
        return retValue;

    }
    getDuration(parent) {
        var dateQuery = ".date-range";
        let retValue = [];
        try {
            var dateDiv = parent.find(dateQuery);
            if (dateDiv.length) {
                dateDiv.find('.date-range__duration').remove();
                //dateDiv = dateDiv.remove('.date-range__duration');
                retValue = dateDiv.text().split("  –  ");


            }
        } catch (e) {
            console.error(e);
        }
        return retValue;
    }

    getTitle(parent) {
        var titleQuery = ".result-card__title";
        var retValue = "";
        try {
            var title = parent.find(titleQuery);
            if (title.length) {
                retValue = title.text().trim();
            }
        } catch (e) {
            console.error(e);
        }
        return retValue;
    }

    getSubtitle(parent) {
        var titleQuery = ".result-card__subtitle";
        var retValue = "";
        try {
            var title = parent.find(titleQuery);
            if (title.length) {
                retValue = title.text().trim();
            }
        } catch (e) {
            console.error(e);
        }
        return retValue;
    }
}

module.exports = Scrapper;