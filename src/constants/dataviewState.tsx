export const stateBeer = (defaultTitle, defaultSub, loadingTitle, loadingSub) => {
  return {
    default: {
      title: defaultTitle,
      subtitle: defaultSub,
    },
    loading: {
      title: loadingTitle,
      subtitle: loadingSub,
    },
  }
}
