export const getBearerToken = () => {
  if (typeof sessionStorage !== 'undefined') {
    const token = JSON.parse(sessionStorage.getItem('auth-storage') as string)?.state?.accessToken
    return token ? token : null
  }
  return null
}
