export const SELECTORS = {
  login: {
    input: {
      email: '#login_username',
      pwd: '#login_password',
      secret: '#login_answer',
    },
    btn: {
      login: '#login_control_continue',
      goToPwd: '#login_password_continue',
    },
  },
  job: {
    el: {
      jobCard: 'article[data-test="JobTile"]',
      jobDescription: 'div[data-test="Description"]',
      jobFeature: 'div[data-test="Features"] div[data-test="UpCIcon"]',
      applicationQuestion: 'section[data-test="Questions"] li',
      skill: 'span[data-test="Skill"]',
      qualification: 'section[data-test="Qualifications"] li',
      clientCountry: 'span[data-qa="client-location"] strong',
      clientCity: 'span[data-qa="client-location"] > div > span:first-child',
      clientLocalTime: 'span[data-test="LocalTime"]',
      clientCompanyDomain: '.client-company-profile-industry',
      clientCompanySize: '.client-company-profile-size',
    },
    btn: {
      apply: 'button[data-cy="submit-proposal-button"]',
    },
  },
  bidding: {
    input: {
      coverLetter: 'textarea[aria-labelledby="cover_letter_label"]',
    },
  },
  common: {
    btn: {
      modalClose: 'div[data-test="close-button"]',
      popupClose: 'button[data-ev-label="nav_popover_close_btn"]',
    },
    other: {
      backdrop: 'div[data-test="backdrop"]',
    },
  },
} as const;
