import styled from 'styled-components'
import BookingDataBox from '../../features/bookings/BookingDataBox'

import Row from '../../ui/Row'
import Heading from '../../ui/Heading'
import ButtonGroup from '../../ui/ButtonGroup'
import Button from '../../ui/Button'
import ButtonText from '../../ui/ButtonText'

import { useMoveBack } from '../../hooks/useMoveBack'
import { useBooking } from 'src/features/bookings/useBooking.js'
import Spinner from 'src/ui/Spinner.jsx'
import { useEffect, useState } from 'react'
import Checkbox from 'src/ui/Checkbox.jsx'
import { formatCurrency } from 'src/utils/helpers.js'
import { useCheckin } from 'src/features/check-in-out/useCheckin.js'
import { useSettings } from 'src/features/settings/useSettings.js'

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`
console.log(Box)

function CheckinBooking () {
  const [addBreakfast, setAddBreakfast] = useState(false)
  const [confirmPaid, setConfirmPaid] = useState(false)
  const { booking, isLoading } = useBooking()
  const { settings, isLoading: isLoadingSettings } = useSettings()
  const moveBack = useMoveBack()

  useEffect(() => {
    setConfirmPaid(booking?.isPaid ?? false)
  }, [booking])
  const { checkin, isCheckingIn } = useCheckin()
  const optionalBreakfastPrice = settings?.breakfastPrice
  if (isLoading || isLoadingSettings) return <Spinner/>

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking
  console.log(guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,)

  function handleCheckin () {
    if (!confirmPaid) return
    if (addBreakfast) {
      checkin({
        bookingId, breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice,
        }
      })
    } else {
      checkin({ bookingId, breakfast: {} })
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking}/>
      {!hasBreakfast && <Box>
        <Checkbox disabled={addBreakfast || isCheckingIn} id={'breakfast'} checked={addBreakfast}
                  onChange={() => {
                    setAddBreakfast(add => !add)
                    setConfirmPaid(false)
                  }}>
          Want to add breakfast for {formatCurrency(optionalBreakfastPrice)} per person?
        </Checkbox>
      </Box>}
      <Box>
        <Checkbox disabled={confirmPaid || isCheckingIn} id={bookingId} checked={confirmPaid}
                  onChange={() => setConfirmPaid(confirm => !confirm)}>I confirm
          that {guests.fullName} has paid the total amount
          of {!addBreakfast ? formatCurrency(totalPrice) : `${formatCurrency(totalPrice) + formatCurrency(optionalBreakfastPrice)} `}</Checkbox>
      </Box>

      <ButtonGroup>
        <Button disabled={!confirmPaid || isCheckingIn} onClick={handleCheckin}>Check in booking #{bookingId}</Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  )
}

export default CheckinBooking
