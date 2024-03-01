import Button from "../../ui/Button";
import PropTypes from 'prop-types'
import { useCheckout } from 'src/features/check-in-out/useCheckout.js'

CheckoutButton.propTypes = {
  bookingId: PropTypes.string.isRequired
}
function CheckoutButton({ bookingId }) {
  const {checkout, isLoading} = useCheckout()

  return (
    <Button variation="primary" size="small" onClick={() => checkout(bookingId)} disabled={isLoading}>
      Check out
    </Button>
  );
}

export default CheckoutButton;
