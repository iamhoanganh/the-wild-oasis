import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import AddCabin from "src/features/cabins/AddCabin";
import CabinTableOperation from "src/features/cabins/CabinTableOperation.jsx";

function Cabins() {
    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">All cabins</Heading>
                <CabinTableOperation/>
            </Row>
            <Row>
                <CabinTable/>
                <AddCabin/>
            </Row>
        </>
    );
}

export default Cabins;
