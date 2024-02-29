// import React from 'react'
import styled from "styled-components";
import { useRecentBooking } from 'src/features/dashboard/useRecentBooking.js'
import Spinner from 'src/ui/Spinner.jsx'
import { useRecentStay } from 'src/features/dashboard/useRecentStay.js'
// import PropTypes from 'prop-types'

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

const DashboardLayout = () => {
  const {isLoading : isLoadingBooking, bookings} = useRecentBooking()
  const {isLoading : isLoadingStay, stays, confirmedStays} = useRecentStay()
  if (isLoadingBooking || isLoadingStay) {
    return <Spinner />
  }
  console.log("bookings", bookings, stays, confirmedStays)
  return (
    <StyledDashboardLayout>
        <div>Static</div>
        <div>Today activity</div>
        <div>Chart stay durations</div>
        <div>Chart sales</div>
    </StyledDashboardLayout>
  )
}

DashboardLayout.propTypes = {

}

export default DashboardLayout