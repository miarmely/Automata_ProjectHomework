$(function () {
    //#region variables
    const img = {
        newAlphahet: $("#img_newAlphabet"),
        newState: $("#img_newState"),
    }
    const tr = {
        newAlphabet: $("#tr_newAlphabet"),
        newState: $("#tr_newState"),
        columns: $("thead tr:last-child")
    };
    const th = {
        totalAlphabetCount: tr.newAlphabet.find("span:last-child"),
        totalStateCount: tr.newState.find("span:last-child")
    }
    //#endregion

    //#region events
    img.newAlphahet.click(() => {
        // add new column with <input>
        tr.columns.append(
            `<th> 
                <input class="inpt_alphabet" type="text">
            </th>`);

        increaseTotalAlphabetCount();
    })
    img.newState.click(() => {
        // add new row
        $("tbody").append(`<tr></tr>`);
        increaseTotalStateCount();

        // add columns to row
        for (let repeat = 0; repeat < getTotalColumnCount(); repeat += 1)
            $("tbody tr:last-child").append(
                `<th> 
                    <input class="inpt_state" type="text">
                </th>`);
    })
    //#endregion

    function getTotalColumnCount() {
        return $("thead tr")
            .children()
            .length - 1;  // "-1": ignore column with plus icon
    }
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
})