const rootModule={
  getters:{
    permitRouter:(state)=>state.permit.routes,
    roles:(state)=>state.users.roles,
    key_questions:(state)=>state.questions.item_questions,
  }
}

export default rootModule;