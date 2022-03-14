import produce from 'immer'
import createReducer from './reducerUtills'

const intioanalState = {
    user: {},
    userKind: "user",
    job: {},
    isPermanent: undefined,
    isLoading: false,
    error: '',
    success: '',
    anchorEl:null
}
const users = {
    setAnchorEl(state, action) {
        state.anchorEl = action.payload;
    },
    setSuccess(state, action) {
        state.success = action.payload;
    },
    setIsLoading(state, action) {
        state.isLoading = action.payload;
    },
    setError(state, action) {
        state.error = action.payload;
    },
    addNewUser(state, action) {
        state.user = action.payload;
    },
    editUserDetails(state, action) {
        state.user = action.payload
    },
    setUserKind(state, action) {
        state.userKind = action.payload;
    },
    setJob(state, action) {
        state.job = action.payload;
    },
    setIsPermanent(state, action) {
        state.isPermanent = action.payload;
    }

}
export default produce((state, action) => createReducer(state, action, users), intioanalState);
