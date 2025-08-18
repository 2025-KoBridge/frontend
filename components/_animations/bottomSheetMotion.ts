export const bottomSheetVariants = {
  hidden: {
    y: '100%',
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
      damping: 25,
    },
  },
  exit: {
    y: '100%',
    opacity: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
      damping: 25,
    },
  },
};
