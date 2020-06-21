
const state={
  item_questions:{},
}

const mutations={
  'SET_ITEM_QUESTIONS'(state,params){    
    state.item_questions=params;
  }
}

const actions={
  
}


export default {
  namespaced:true,
  state,
  mutations,
  actions,
}