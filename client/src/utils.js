export const isLogged = () => !!localStorage.getItem("token")
export const navigateIfLogged = (router) => !!localStorage.getItem("token") ? router.push("/") : null