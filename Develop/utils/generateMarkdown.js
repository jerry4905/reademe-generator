// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string

/* function renderLicenseBadge(license) {
  var license;
  if (license.badge  == null){
    license = '';
  }
    else {license = license.badge;}
} */

// TODO: Create a function that returns the license link
// If there is no license, return an empty string

/* function renderLicenseLink(license) { 
  var licenseLink;
  if (license.link  == null){
    licenseLink = '';
  }
    else {licenseLink= license.link;}
} */

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string

/* function renderLicenseSection(license) {
  var licenseSection;
  if (license.section  == null){
    licenseSection = '';
  }
    else {licenseSection = license.section;}
} */

// TODO: Create a function to generate markdown for README
function generateMarkdown(data, install) {
  return `
  # ${data.title} /n
  ## Description \n ${data.description}
  ## Table of Contents \n* [Installation](#Installation)\n* [Usage](#Usage)\n* [License](#License)\n* [Contributing](#Contributing)\n* [Badges](#Badges)\n* [Tests](#Tests)\n* [Questions](#Questions)
  ## Installation ${install}
  ## Usage \n ${data.usage}
  ## License \n ${data.license}
  ## Contributing \n ${contributing}
  ## Badges \n ![languages badge](https://img.shields.io/github/languages/top/${data.userName}/${data.repoName})
  ## Tests \n ${data.tests}
  ## Questions \n For any questions, contact me at [${data.email}](mailto:${data.email}).
  
  `;
}
/* renderLicenseBadge();
renderLicenseLink();
renderLicenseSection(); */

module.exports = generateMarkdown;
