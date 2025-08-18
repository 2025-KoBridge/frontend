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
    MY_LEARNING: '/main/my-learning',
    CONVERSATION: '/main/conversation',
    MY_PAGE: '/main/my-page',
  },
};
