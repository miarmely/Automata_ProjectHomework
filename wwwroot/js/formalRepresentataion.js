$(function () {
    const model = sessionStorage.getItem(localKeys.model);
    const states = JSON.parse(
        sessionStorage.getItem(localKeys.states));
    const alphabets = JSON.parse(
        sessionStorage.getItem(localKeys.alphabets));
    const transitions = JSON.parse(
        sessionStorage.getItem(localKeys.transitions));
    const startState = sessionStorage.getItem(localKeys.startState);
    const finalStates = JSON.parse(
        sessionStorage.getItem(localKeys.finalStates));

    function setupPage() {
        $("tbody tr:nth-child(1) td").append("{" + states + "}");
        $("tbody tr:nth-child(2) td").append("{" + alphabets + "}");
        $("tbody tr:nth-child(4) td").append(startState);
        $("tbody tr:nth-child(5) td").append("{" + finalStates + "}");

        // add transitions
        let modifiedTransitions = "";
        for (const state in transitions)
            for (const alphabet in transitions[state]) {
                // skip empty alphabet when model is NFA
                if (model == models.NFA
                    && alphabet == "e") continue;

                modifiedTransitions += `δ(${state}, ${alphabet}) = {${transitions[state][alphabet]}}, `;
            }
                

        $("tbody tr:nth-child(3) td").append(modifiedTransitions);
    }

    setupPage();
})