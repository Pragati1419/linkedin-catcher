const Scrapper = require("./scrapper");

class ProjectScrapper extends Scrapper {
    constructor() {
        super();
        let educationDivQuery = ".education__list .result-card";
        this.institutions = $(educationDivQuery);
    }

    getModal() {
        return {
            imageUrl: "",
            projectName: "",
            projectCategory: "",
            projectLink: "",
            liveLink: "",
            projectDescription: ""
        };
    }

    getDescription(parent) {
        var retValue = {
            description: "",
            category: ""
        };

        var projectDescriptionRegex = /Project\s?Category\s?\:\s?(.*)/i;
        try {
            var genericDescription = super.getDescription(parent);
            if (genericDescription.match(projectDescriptionRegex)) {
                retValue.category = genericDescription.match(projectDescriptionRegex)[1];
                genericDescription = genericDescription.replace(projectDescriptionRegex, "");

            }

            retValue.description = genericDescription;

        } catch (e) {

        }
        return retValue;

    }

    getProjectLink(parent) {
        var projectLinkQuery = "a.personal-project__button";
        var retValue = "";
        try {
            let projectLinkButton = parent.find(projectLinkQuery);

            if (projectLinkButton && projectLinkButton.length) {
                var href = projectLinkButton.attr("href");
                if (href) {
                    var projectUrl = href.match(/url\=(.*?)\&amp\;/);
                    if (projectUrl && projectUrl.length) {
                        projectUrl = decodeURIComponent(projectUrl[1]);
                        retValue = projectUrl;
                    }
                }
            }
        } catch (e) {
            console.error(e);
        }
        return retValue;
    }

    scrap() {
        var retValue = [];
        var titleQuery = ".result-card__title.personal-project__title";
        var projectsQuery = ".projects.pp-section .result-card__contents.personal-project__contents";
        try {
            var projects = $(projectsQuery);
            if (projects.length) {
                for (var i = 0; i < projects.length; i++) {
                    let projectModal = this.getModal();

                    var project = $(projects[i]);
                    projectModal.projectName = project.find(titleQuery).text();

                    var { description, category } = this.getDescription(project);
                    projectModal.projectDescription = description;
                    projectModal.projectCategory = category;


                    projectModal.projectLink = this.getProjectLink(project);


                    retValue.push(projectModal);
                }
            }

        } catch (e) {
            console.error(e);
        }
        return retValue;
    }
}

module.exports = ProjectScrapper;