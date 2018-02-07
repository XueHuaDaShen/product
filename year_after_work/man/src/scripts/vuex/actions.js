// export const tabChanger = function({ commit }, tabIndex) {
//     console.log(commit);
//     commit('CHANGETAB', tabIndex);
// }

export const actions = {
    tabChanger({ commit }, tabIndex) {
        console.log(commit);
        commit('CHANGETAB', tabIndex);
    }
}
