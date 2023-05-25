const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const utils = require("./utils");
const EducationScrapper = require("./educationScrapper.js")
const ExperienceScrapper = require("./experienceScrapper");
const ProjectScrapper = require("./projectScrapper");
const AwardScrapper = require("./awardScrapper");
const CertificationScrapper = require("./certificationScrapper");


function getProfileModal() {
    return {
        fullName: "", //done
        about: "", //done
        projects: "", //done
        skills: [],
        jobTitle: "", //done
        workExperience: [],//done
        education: [], //done
        awards: [],
        certifications: []
       
        

    }
}


function scrapName() {
    let nameQuery = ".top-card-layout__entity-info-container .top-card-layout__title",
        retValue = "";
    try {
        retValue = $(nameQuery).text();
    } catch (e) {
        console.error(e);
    }
    return retValue;
}

function scraptAbout() {
    var retValue,
        aboutQuery = ".summary.pp-section p",
        urlRegex = /.*?\:.*?(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?.*?\n?/g
    try {
        let rawHTML = $(aboutQuery).html();
        rawHTML = utils.convertHTMLtoMultiLineString(rawHTML);
        rawHTML = rawHTML.replace(urlRegex, "");
        rawHTML = utils.removeExtraNewLines(rawHTML);
        retValue = rawHTML;
    } catch (e) {
        console.error(e);
    }
    return retValue;
}



async function scrapProfile(cred) {
    var retValue = [];
    var singleProfile = false;
    if (cred.url && typeof cred.url === "string") {
        cred.url = [cred.url];
        singleProfile = true;
    }


    const browser = await puppeteer.launch({
        headless: true
    });
    const page = await browser.newPage();
    await page.goto('https://www.linkedin.com/login?fromSignIn=true&trk=guest_homepage-basic_nav-header-signin', { waitUntil: 'load' });

    //await page.screenshot({path: 'example.png'});
    await page.exposeFunction('getCreds', () => {
        return cred;
    })

    utils.prependPrefix(cred);
    
    for (var i = 0; i < cred.url.length; i++) {
        try {
            await page.evaluate(async (index) => {

                const creds = await getCreds();
                //console.warn(creds);
                document.location.pathname = creds.url[index];

            }, i)


            let profile = getProfileModal();
            await page.waitForTimeout(1000);

            const context = await page.content();
            global.$ = cheerio.load(context);

            profile.fullName = scrapName();
            profile.about = scraptAbout();
            profile.projects = new ProjectScrapper().scrap();
            profile.workExperience = new ExperienceScrapper().scrap();
            profile.education = new EducationScrapper().scrap();
            profile.awards = new AwardScrapper().scrap();
            profile.certifications = new CertificationScrapper().scrap();

            retValue.push(profile)
        } catch (e) {
            console.error(e)
        }
    }

    if (singleProfile && retValue.length != 0) {
        retValue = retValue[0];
    }

    browser.close();

    return retValue;

}

module.exports = scrapProfile;