import Heading from '../ui/Heading'
import Row from '../ui/Row'
import DashboardLayout from 'src/features/dashboard/DashboardLayout.jsx'
import DashboardFilter from 'src/features/dashboard/DashboardFilter.jsx'

function Dashboard () {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Dashboard</Heading>
        <DashboardFilter />
      </Row>
      <DashboardLayout/>
    </>
  )
}

export default Dashboard
