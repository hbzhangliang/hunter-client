/**
 * Created by lenovo on 2017/9/19.
 */
export default {
  MT_WORKINCONDATA (state, data) {
    state.workIconType = data
  },
  MT_ENDDICT (state, data) {
    state.endDictGroupData = data
  },
  MT_SELFMODULRDICT (state, data) {
    state.endSelfModuleData = data
  },
  count (state, count) {
    state.count++
  },
  SET_SPID(state,data){
    state.spId = data
  },
  SET_COMPANY_INFO(state, data){
    state.companyInfo = data;
  },
  SET_APPID(state,data){
    state.appId = data.id
  },
  SET_APPSUMMARYINFO(state,data){
    state.appSummaryInfo = data
  },
  SET_COMMONAPP_STATUS(state,data){
    state.commonApp = data.status
  },
  SET_MEMBERID(state,data){
    state.memberId=data
  },
  SET_MEMBERNAME(state,data){
    state.memberName=data
  },
  SET_CONFIGEDITSTATUS(state,data){
      state.configEditStatus=data
  },
  SET_LEFTMENUCOLLASPSE(state,data){
      state.leftMenuCollapse = data
  },
  ADD_OPTIONS(state,option){
    state.options.push(option)
  },
    REMOVE_OPTIONS(state,option){
        var cn=[]
        state.options.forEach(p=>{
          if(p.key!=option){
              cn.push(p)
          }
        })
        state.options=cn
    }


}
