import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import {useCabins} from "./useCabins";
import Table from "../../ui/Table";
import {useSearchParams} from "react-router-dom";
import Empty from 'src/ui/Empty.jsx'

function CabinTable() {
    const {isLoading, cabins} = useCabins();
    const [searchParams] = useSearchParams();
    if (isLoading) return <Spinner/>;
    if (!cabins.length) return <Empty resourceName={'cabins'}/>;
    // 1) Filter
    const filterValue = searchParams.get('discount') || 'all'
    console.log("filterValue", filterValue)
    let filteredCabins;
    if (filterValue === 'all') {
        filteredCabins = cabins
    }
    if (filterValue === 'no-discount') {
        filteredCabins = cabins.filter((cabin) => cabin.discount === 0)
    }

    if (filterValue === 'with-discount') {
        filteredCabins = cabins.filter((cabin) => cabin.discount > 0)
    }
    // 2) Sort
    const sortBy = searchParams.get('sortBy') || 'startDate-asc';
    const [field, direction] = sortBy.split('-');
    const directionMultiplier = direction === 'asc' ? 1 : -1;
    const sortedCabins = filteredCabins.sort((a, b) => (a[field] - b[field]) * directionMultiplier)


    return (<Table role="table" columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header role="row">
            <div>Image</div>
            <div>Cabin</div>
            <div>Capacity</div>
            <div>Price</div>
            <div>Discount</div>
        </Table.Header>

        <Table.Body
            data={sortedCabins}
            render={(cabin) => <CabinRow key={cabin.id} cabin={cabin}/>}
        />
    </Table>);
}

export default CabinTable;
