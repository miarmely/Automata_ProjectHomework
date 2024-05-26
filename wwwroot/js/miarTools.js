export function getTotalColumnCount(row) {
    return row
        .children()
        .length;
}
export function getTotalRowCount() {
    return $("tbody")
        .children()
        .length;
}