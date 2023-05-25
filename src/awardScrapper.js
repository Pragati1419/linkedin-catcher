const Scrapper = require("./scrapper");

class AwardScrapper extends Scrapper {
    constructor() {
        super();

    }

    getModal() {
        return {
            title: "",
            date: "",
            organization: "",
            description: ""
        }
    }

    scrap() {
        let awardsQuery = ".awards.pp-section .awards__list > .result-card";
        let retValue = [];
        try {
            var awards = $(awardsQuery);
            if (awards.length) {
                for (let index = 0; index < awards.length; index++) {
                    const award = $(awards[index]);
                    let awardModal = this.getModal();
                    awardModal.description = this.getDescription(award);
                    awardModal.title = this.getTitle(award);
                    awardModal.organization = this.getSubtitle(award);
                    var dates = this.getDuration(award);
                    if (dates && dates.length) {
                        awardModal.date = dates[0];
                    }
                    retValue.push(awardModal);
                }
            }
        } catch (e) {
            console.error(e);
        }
        return retValue;
    }
}

module.exports = AwardScrapper;