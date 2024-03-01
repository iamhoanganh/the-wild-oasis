// import React from 'react'
import styled from "styled-components";
import { useRecentBooking } from 'src/features/dashboard/useRecentBooking.js'
import Spinner from 'src/ui/Spinner.jsx'
import { useRecentStay } from 'src/features/dashboard/useRecentStay.js'
import Stats from 'src/features/dashboard/Stats.jsx'
import { useCabins } from 'src/features/cabins/useCabins.js'
import SalesChart from 'src/features/dashboard/SalesChart.jsx'
import DurationChart from 'src/features/dashboard/DurationChart.jsx'
// import PropTypes from 'prop-types'

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

const DashboardLayout = () => {
  const {isLoading : isLoadingBooking, bookings} = useRecentBooking()
  const {isLoading : isLoadingStay, stays, confirmedStays, numDays} = useRecentStay()
  const {cabins, isLoading: isLoadingCabin} = useCabins()
  if (isLoadingBooking || isLoadingStay || isLoadingCabin) {
    return <Spinner />
  }
  console.log("bookings", stays,confirmedStays )
  return (
    <StyledDashboardLayout>
        <Stats confirmedStays={confirmedStays} bookings={bookings} numDays={numDays} cabinCount={cabins.length}/>
        <div>Static</div>
        <div>Today activity</div>
        <DurationChart confirmedStays={confirmedStays} />
        <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  )
}

DashboardLayout.propTypes = {

}

export default DashboardLayout