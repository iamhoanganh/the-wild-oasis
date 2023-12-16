import Heading from '../ui/Heading'
import Row from '../ui/Row'
import BookingTable from 'src/features/bookings/BookingTable.jsx'
import BookingTableOperations from 'src/features/bookings/BookingTableOperations.jsx'

function Bookings () {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All bookings</Heading>
        <BookingTableOperations/>
      </Row>
      <BookingTable/>
    </>
  )
}

export default Bookings
