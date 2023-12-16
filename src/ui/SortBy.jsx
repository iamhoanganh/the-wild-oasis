import PropTypes from 'prop-types';
import Select from "src/ui/Select.jsx";
import {useSearchParams} from "react-router-dom";

SortBy.propTypes = {
    options: PropTypes.any,
};

function SortBy({options}) {
    const [searchParams, setSearchParams] = useSearchParams();
    const sortBy = searchParams.get('sortBy') || ''
    const handleChange = (e) => {
        console.log(e.target.value)
        searchParams.set('sortBy', e.target.value)
        setSearchParams(searchParams)
    }
    return (
        <Select options={options} type="white" value={sortBy} onChange={handleChange}/>
    );
}

export default SortBy;