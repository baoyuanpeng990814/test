
const snackbar = {
  namespaced: true,
  state: {
    msg: '',
    color: '',
    visible: false,
    showClose: true,
    timeout: 5000,
    
  }, 
  mutations: {
    OPEN_SNACKBAR(state, options) {
      state.visible = true
      state.msg = options.msg
      state.color = options.color
    },
    CLOSE_SNACKBAR(state) {
      state.visible = false

    },
    setShowClose(state, isShow) {
      state.showClose = isShow
    },
    setTimeout(state, timeout) {
      state.timeout = timeout
    },
  },
  actions :{
    openSnackbar (context,options){
      let timeout = context.state.timeout
      context.commit('OPEN_SNACKBAR',{
        msg:options.msg,
        color:options.color
      })
      setTimeout(()=>{
        context.commit('CLOSE_SNACKBAR')
      },timeout)
    }
  }
}
export default snackbar;