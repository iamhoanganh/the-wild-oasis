import styled from 'styled-components'

import BookingDataBox from './BookingDataBox'
import Row from '../../ui/Row'
import Heading from '../../ui/Heading'
import Tag from '../../ui/Tag'
import ButtonGroup from '../../ui/ButtonGroup'
import Button from '../../ui/Button'
import ButtonText from '../../ui/ButtonText'

import { useMoveBack } from '../../hooks/useMoveBack'
import { useBooking } from 'src/features/bookings/useBooking.js'
import Spinner from 'src/ui/Spinner.jsx'
import { HiArrowDownOnSquare, } from 'react-icons/hi2'
import { useNavigate } from 'react-router-dom'
import { useCheckout } from 'src/features/check-in-out/useCheckout.js'
import ConfirmDelete from 'src/ui/ConfirmDelete.jsx'
import Modal from 'src/ui/Modal.jsx'
import { useDeleteBooking } from 'src/features/bookings/useDeleteBooking.js'

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`

function BookingDetail () {
  const navigate = useNavigate()
  // const booking = {};
  const { isLoading, booking } = useBooking()
  const { checkout, isCheckingOut } = useCheckout()
  const { deleteBooking, isDeleting } = useDeleteBooking()
  // const status = 'checked-in'

  const moveBack = useMoveBack()

  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  }
  if (isLoading) return <Spinner/>
  const { id: bookingId, status } = booking
  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking}/>

      <ButtonGroup>

        <Modal>
          <Modal.Open opens={"detele"}>
            <Button variation="danger" disable={isCheckingOut} >
              Delete
            </Button>
          </Modal.Open>
          <Modal.Window name="detele">
            <ConfirmDelete disabled={isDeleting} onConfirm={() => {deleteBooking(bookingId, {
              onSettled: () => {
                navigate('/bookings')
              }
            })}} resourceName={'booking'}/>
          </Modal.Window>
        </Modal>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
        {status === 'unconfirmed' &&
          <Button icon={<HiArrowDownOnSquare/>} onClick={() => navigate(`/checkin/${bookingId}`)}>
            Check in
          </Button>
        }
        {status === 'checked-in' &&
          <Button disable={isCheckingOut} onClick={() => {checkout(bookingId)}}>
            Check out
          </Button>
        }
      </ButtonGroup>
    </>
  )
}

export default BookingDetail
