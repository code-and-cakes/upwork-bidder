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
