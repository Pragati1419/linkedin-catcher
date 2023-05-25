const Scrapper = require("./scrapper");

class ExperienceScrapper extends Scrapper {
    constructor() {
        super();
        let experienceQuery = "li.experience-item";
        this.companies = $(experienceQuery);
    }

    getModal() {
        return {
            position: "",
            type: "work",
            from: "",
            to: "",
            companyName: "",
            description: ``
        };
    }

    scrap() {
        var retValue = [];
        try {
            var companies = this.companies;
            if (companies.length) {
                for (let index = 0; index < companies.length; index++) {

                    let company = $(companies[index]);


                    if (company.hasClass("experience-group")) {
                        let jobTitleHeadQuery = ".result-card.experience-group-position";
                        let jobTitleQuery = ".result-card__title.experience-group-position__title";
                        let groupCompanyNameQuery = ".experience-group-header .experience-group-header__company";


                        let companyName = company.find(groupCompanyNameQuery).text();
                        let positions = company.find(jobTitleHeadQuery);
                        if (positions && positions.length) {

                            for (let j = 0; j < positions.length; j++) {
                                const jobTitle = $(positions[j]);


                                let experienceModal = this.getModal();


                                let title = jobTitle.find(jobTitleQuery).text();
                                experienceModal.companyName = companyName;
                                experienceModal.position = title;


                                experienceModal.description = this.getDescription(jobTitle);

                                var jobDates = this.getDuration(jobTitle);
                                if (jobDates.length) {
                                    experienceModal.from = jobDates[0];
                                    experienceModal.to = jobDates[1];
                                }

                                retValue.push(experienceModal);
                            }
                        }
                    } else {
                        let jobTitleQuery = ".result-card__title.experience-item__title";
                        let companyNameQuery = ".result-card__subtitle.experience-item__subtitle";

                        let experienceModal = this.getModal();

                        experienceModal.position = company.find(jobTitleQuery).text();
                        experienceModal.companyName = company.find(companyNameQuery).text();

                        var jobDates = this.getDuration(company);
                        if (jobDates.length) {
                            experienceModal.from = jobDates[0];
                            experienceModal.to = jobDates[1];
                        }

                        experienceModal.description = this.getDescription(company);


                        retValue.push(experienceModal);
                    }

                }
            }
        } catch (e) {
            console.error(e);
        }
        return retValue;
    }
}

module.exports = ExperienceScrapper;