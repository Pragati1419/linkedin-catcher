const Scrapper = require("./scrapper");

class CertificaitonScrapper extends Scrapper {
    constructor() {
        super();

    }

    getModal() {
        return {
            title: "",
            issueDate: "",
            certifiedFrom: "",
            description: "",
            credentialId: "",
            expiryDate: ""
        }
    }
    getCredentials(parent) {
        var credQuery = ".certifications__credential-id"
        var retValue = "";
        try {
            retValue = parent.find(credQuery).text().replace("Credential ID", "").trim();
        } catch (e) {
            console.error(e);
        }
        return retValue;
    }
    getDates(parent) {
        var retValue = ["", ""];
        var startDateQuery = ".certifications__start-date time", endDateQuery = ".certifications__end-date time"
        try {
            retValue[0] = parent.find(startDateQuery).text().trim();
            retValue[1] = parent.find(endDateQuery).text().trim();
        } catch (e) {
            console.error(e);
        }
        return retValue;
    }
    getcertificationLink(parent) {
        var certificationLinkQuery = "a.certifications__button";
        var retValue = "";
        try {
            let certificationLinkButton = parent.find(certificationLinkQuery);

            if (certificationLinkButton && certificationLinkButton.length) {
                var href = certificationLinkButton.attr("href");
                if (href) {
                    var certificationUrl = href.match(/url\=(.*?)\&amp\;/);
                    if (certificationUrl && certificationUrl.length) {
                        certificationUrl = decodeURIComponent(certificationUrl[1]);
                        retValue = certificationUrl;
                    }
                }
            }
        } catch (e) {
            console.error(e);
        }
        return retValue;
    }

    scrap() {
        let certificationsQuery = ".certifications.pp-section .result-card";
        let retValue = [];
        try {
            var certifications = $(certificationsQuery);
            if (certifications.length) {
                for (let index = 0; index < certifications.length; index++) {
                    const certification = $(certifications[index]);
                    let certificationModal = this.getModal();
                    certificationModal.title = this.getTitle(certification);
                    certificationModal.certifiedFrom = this.getSubtitle(certification);
                    certificationModal.credentialId = this.getCredentials(certification);
                    var dates = this.getDates(certification);
                    certificationModal.issueDate = dates[0];
                    certificationModal.expiryDate = dates[1];
                    retValue.push(certificationModal);

                }
            }
        } catch (e) {
            console.error(e);
        }
        return retValue;
    }
}

module.exports = CertificaitonScrapper;