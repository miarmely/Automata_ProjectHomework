import { getTotalColumnCount, getTotalRowCount} from "./miarTools.js"


$(function () {
    //#region variables
    const img = {
        newAlphahet: $("#img_newAlphabet"),
        newState: $("#img_newState"),
    };
    const tr = {
        newAlphabet: $("#tr_newAlphabet"),
        newState: $("#tr_newState"),
        columns: $("thead tr:last-child")
    };
    const th = {
        totalAlphabetCount: tr.newAlphabet.find("span:last-child"),
        totalStateCount: tr.newState.find("span:last-child")
    };
    const btn = {
        save: $("#btn_save")
    }
    const model = models.eNFA;
    //#endregion

    //#region events
    img.newAlphahet.click(() => {
        // add new column with <input>
        tr.columns.append(
            `<td> 
                <input class="inpt_alphabet" type="text">
            </td>`);

        increaseTotalAlphabetCount();
    })
    img.newState.click(() => {
        // add new row
        $("tbody").append(`<tr></tr>`);
        const tr_newAdded = $("tbody tr:last-child");

        // add columns to row
        for (let columnNo = 1; columnNo <= getTotalColumnCount(tr.columns); columnNo += 1) {
            // add start and final states symbols as extra when first column
            if (columnNo == 1)
                tr_newAdded.append(
                    `<td> 
                        <input class="chck_startState" type="checkbox">
                        <label>-></label>
                       
                        <input class="chck_finalState" type="checkbox">
                        <label>*</label>

                        <input class="inpt_state" type="text">
                    </td>`);

            else
                tr_newAdded.append(
                    `<td> 
                    <input class="inpt_state" type="text">
                </td>`);
        }

        increaseTotalStateCount();
    })
    btn.save.click(() => {
        //#region get states, alphabets, transitions, start and final states
        let states = [];
        let alphabets = [];
        let transitions = {}
        let startState = "";
        let finalStates = [];

        for (let rowNo = 1; rowNo <= getTotalRowCount(); rowNo += 1) {
            //#region get state
            const row = $(`tbody tr:nth-child(${rowNo})`);
            const state = (row
                .find("td:first-child input[type= text]")
                .val());

            states.push(state);
            transitions[state] = {};
            //#endregion

            //#region check state whether is start or final state
            if (isStartState(row)) startState = state;
            if (isFinalState(row)) finalStates.push(state);
            //#endregion

            //#region populate "transitions" object
            for (let columnNo = 1; columnNo <= getTotalColumnCount(tr.columns); columnNo += 1) {
                // pass first column
                if (columnNo == 1) continue;

                // save transitions
                const alphabet = (tr.columns
                    .find(`td:nth-child(${columnNo}) input`)
                    .val());
                const targetStates = ($(row)
                    .find(`td:nth-child(${columnNo}) input`)
                    .val());
                transitions[state][alphabet] = targetStates;

                // save alphabets when first row
                if (rowNo == 1
                    && (alphabet != "e" && alphabet != "E"))
                    alphabets.push(alphabet);
            }
            //#endregion
        }
        //#endregion

        //#region save formal information to session
        sessionStorage.setItem(
            localKeys.model,
            model);  // model
        sessionStorage.setItem(
            localKeys.states,
            JSON.stringify(states));  // states
        sessionStorage.setItem(
            localKeys.alphabets,
            JSON.stringify(alphabets));  // alphabets
        sessionStorage.setItem(
            localKeys.transitions,
            JSON.stringify(transitions));  // transitions
        sessionStorage.setItem(
            localKeys.startState,
            startState);  // start state
        sessionStorage.setItem(
            localKeys.finalStates,
            JSON.stringify(finalStates));  // final states
        //#endregion
    })
    //#endregion

    //#region functions
    function increaseTotalAlphabetCount() {
        let oldCount = +th.totalAlphabetCount.text(); // convert str to int

        th.totalAlphabetCount.empty();
        th.totalAlphabetCount.text(oldCount += 1);
    }
    function increaseTotalStateCount() {
        let oldCount = +th.totalStateCount.text(); // convert str to int

        th.totalStateCount.empty();
        th.totalStateCount.text(oldCount += 1);
    }
    function isStartState(row) {
        return row
            .find("td:first-child input[class= chck_startState]")
            .prop("checked");
    }
    function isFinalState(row) {
        return row
            .find("td:first-child input[class= chck_finalState]")
            .prop("checked");
    }
    //#endregion
})