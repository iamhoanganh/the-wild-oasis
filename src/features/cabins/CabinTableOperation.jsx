import TableOperations from "src/ui/TableOperations.jsx";
import Filter from "src/ui/Filter.jsx";
import SortBy from "src/ui/SortBy.jsx";

function CabinTableOperation() {
    return (<TableOperations>
        <Filter filterField={"discount"} options={[{label: "All", value: "all"}, {
            label: "With discount", value: "with-discount"
        }, {label: "No discount", value: "no-discount"},]}/>
        <SortBy options={[{
            label: "Sort by price (low to high)", value: "price-asc"
        }, {
            label: "Sort by price (high to low)", value: "price-desc"
        }, {
            label: "Sort by name (A to Z)", value: "name-asc"
        }, {
            label: "Sort by name (Z to A)", value: "name-desc"
        }, {
            label: "Sort by capacity (low to high)", value: "maxCapacity-asc"
        }, {
            label: "Sort by capacity (high to low)", value: "maxCapacity-desc"
        }]}/>
    </TableOperations>);
}

export default CabinTableOperation;