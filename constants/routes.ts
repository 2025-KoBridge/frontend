export const ROUTES = {
  SPLASH: '/',
  ONBOARDING: {
    ROOT: '/onboarding',
    LOGIN: '/onboarding/login',
    SIGNIN: {
      ROOT: '/onboarding/signin',
      getStep: (step: number) => `/onboarding/signin/step${step}`,
    },
    VOICE: {
      ROOT: '/onboarding/voice',
      SELECT: '/onboarding/voice/select',
      COMPLETE: '/onboarding/voice/complete',
    },
  },
  MAIN: {
    ROOT: '/main',
    MY_LEARNING: {
      ROOT: '/main/my-learning',
      getLevel: (level: number) => `/main/my-learning/level-${level}`,
      getStep: (
        level: number,
        step: 'intro1' | 'step1' | 'step2' | 'step3' | 'intro2' | 'ending',
      ) => `/main/my-learning/level-${level}/${step}`,
    },
    CONVERSATION: {
      ROOT: '/main/conversation',
      CALLING: '/main/conversation/calling',
    },
    MY_PAGE: '/main/my-page',
  },
};
