const getters = {
  token: state => state.user.token,
  name: state => state.user.userInfo.name,
  avatar: state => state.user.userInfo.avatar,
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
}
export default getters
