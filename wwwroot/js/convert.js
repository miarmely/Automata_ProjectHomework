$(function () {
    const states = JSON.parse(
        sessionStorage.getItem(localKeys.states));
    const alphabets = JSON.parse(
        sessionStorage.getItem(localKeys.alphabets));
    const transitions = JSON.parse(
        sessionStorage.getItem(localKeys.transitions));
    const startState = sessionStorage.getItem(localKeys.startState);
    const finalStates = JSON.parse(
        sessionStorage.getItem(localKeys.finalStates));
    const btn = {
        eNFAtoNFA: $("#btn_eNFAtoNFA"),
        NFAtoDFA: $("#btn_NFAtoDFA")
    };

    btn.eNFAtoNFA.click(() => {
        let newTransitions = transitions;

        for (const sourceState of states)
            for (const targetState of transitions[sourceState]["e"].split(",")) {
                for (const alphabet of alphabets) {
                    const transitionsOfTargetState = transitions[targetState][alphabet].split(",");
                    const transitionsOfSourceState = transitions[sourceState][alphabet].split(",");

                    for (const transitionOfTrg of transitionsOfTargetState)
                        if (transitionOfTrg != ""
                            && transitionsOfSourceState.find(t => t == transitionOfTrg) == null) {
                            let arrayOfSrc = (newTransitions[sourceState][alphabet].length == 1 ?
                                [newTransitions[sourceState][alphabet]]
                                : newTransitions[sourceState][alphabet].split(","));
                            arrayOfSrc.push(transitionOfTrg);

                            newTransitions[sourceState][alphabet] = arrayOfSrc.join(",");
                        }
                }
            }

        // update session
        sessionStorage.setItem(
            localKeys.transitions,
            JSON.stringify(newTransitions));
        sessionStorage.setItem(
            localKeys.model,
            models.NFA);
    })
})