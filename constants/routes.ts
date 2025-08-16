export const ROUTES = {
  SPLASH: '/',
  ONBOARDING: {
    ROOT: '/onboarding',
    LOGIN: '/onboarding/login',
    SIGNIN: {
      ROOT: '/onboarding/signin',
      getStep: (step: number) => `/onboarding/signin/step${step}`,
    },
  },
};
