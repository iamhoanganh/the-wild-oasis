import PropTypes from 'prop-types'
import Stat from 'src/features/dashboard/Stat.jsx'
import { HiOutlineBanknotes, HiOutlineBriefcase, HiOutlineCalendarDays, HiOutlineChartBar } from 'react-icons/hi2'
import { formatCurrency } from 'src/utils/helpers.js'

Stats.propTypes = {
  bookings: PropTypes.array.isRequired,
  confirmedStays: PropTypes.array.isRequired,
  cabinCount: PropTypes.number.isRequired,
  numDays: PropTypes.number.isRequired
}

function Stats({bookings, confirmedStays, cabinCount, numDays}) {

  const numberOfBookings = bookings.length;
  const sales = bookings.reduce((acc, booking) => acc + booking.totalPrice, 0)

  const checkins = confirmedStays.length;
  const occupation = confirmedStays.reduce((acc, stay) => acc + stay.numberNights, 0) / (numDays * cabinCount)
  return (
    <>
      <Stat title={"Bookings"} color={"blue"} icon={<HiOutlineBriefcase />} value={numberOfBookings}/>
      <Stat title={"Sales"} color={"green"} icon={<HiOutlineBanknotes />}  value={formatCurrency(sales)}/>
      <Stat title={"Check ins"} color={"indigo"} icon={<HiOutlineCalendarDays />} value={checkins}/>
      <Stat title={"Occupancy"} color={"yellow"} icon={<HiOutlineChartBar />} value={Math.round(occupation * 100) + "%"}/>
    </>
  )
}

export default Stats