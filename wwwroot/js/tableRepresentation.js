import { getTotalColumnCount } from "./miarTools.js";


$(function () {
    //#region variables
    const tr = {
        columns: $("thead tr")
    };
    const model = sessionStorage.getItem(localKeys.model)
    const transitions = JSON.parse(
        sessionStorage.getItem(localKeys.transitions));
    const states = JSON.parse(
        sessionStorage.getItem(localKeys.states));
    const alphabets = JSON.parse(
        sessionStorage.getItem(localKeys.alphabets));
    const startState = sessionStorage.getItem(localKeys.startState);
    const finalStates = JSON.parse(
        sessionStorage.getItem(localKeys.finalStates));
    //#endregion

    //#region function
    function setupPage() {
        setupColumns();
        setupRows();
    }
    function setupColumns() {
        //#region add alphabets to columns
        for (const alphabet of alphabets)
            tr.columns.append(`<td>${alphabet}</td>`);

        // add "empty" column when model is eNFA
        if (model == models.eNFA)
            tr.columns.append("<td>e</td>");
        //#endregion
    }
    function setupRows() {
        for (const state of states) {
            // add new row
            $("tbody").append(`<tr> </tr>`);
            const tr_newAdded = $("tbody tr:last-child");

            for (let columnNo = 1; columnNo <= getTotalColumnCount(tr.columns); columnNo += 1) {
                // add source state to first column
                if (columnNo == 1) {
                    // set start or final state symbol
                    let prefix = state == startState ? "-> " : "";
                    prefix += finalStates.find(f => f === state) != null ? "* " : "";

                    // add column
                    tr_newAdded.append(`<td>${prefix}${state}</td>`);
                    continue;
                }

                // add target states to columns
                const alphabet = (tr.columns
                    .children(`td:nth-child(${columnNo})`)
                    .text());
                tr_newAdded.append(`<td>{${transitions[state][alphabet]}}</td>`);
            }
        }
    }
    //#endregion

    setupPage();
})