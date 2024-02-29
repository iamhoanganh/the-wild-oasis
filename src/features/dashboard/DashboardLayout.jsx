// import React from 'react'
import styled from "styled-components";
// import PropTypes from 'prop-types'

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

const DashboardLayout = () => {
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