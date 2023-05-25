const Scrapper = require("./scrapper");

class EducationScrapper extends Scrapper {
    constructor() {
        super();
        let educationDivQuery = ".education__list .result-card";
        this.institutions = $(educationDivQuery);
    }

    getModal() {
        return {
            position: "",
            type: "education",
            from: "",
            to: "",
            companyName: "Bachelor of Engineer",
            description: ``
        }
    }

    scrap() {
        let institutionNameQuery = ".result-card__title";
        let typeOfEducationQuery = ".education__item.education__item--degree-info:first-child";
        var retValue = [];
        try {
            for (let index = 0; index < this.institutions.length; index++) {
                const institution = $(this.institutions[index]);
                let educationModal = this.getModal();
                educationModal.description = this.getDescription(institution);
                let dates = this.getDuration(institution);
                if (dates.length) {
                    educationModal.from = dates[0];
                    educationModal.to = dates[1];
                }
                educationModal.companyName = institution.find(institutionNameQuery).text();
                educationModal.position = institution.find(typeOfEducationQuery).text();
                retValue.push(educationModal);
            }
        } catch (e) {
            console.error(e);
        }
        return retValue;
    }
}

module.exports = EducationScrapper;