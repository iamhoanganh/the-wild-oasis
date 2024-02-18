import Button from '../../ui/Button'
import Form from '../../ui/Form'
import FormRow from '../../ui/FormRow'
import Input from '../../ui/Input'
import { useForm } from 'react-hook-form'
import { useSignUp } from 'src/features/authentication/useSignUp.js'

// Email regex: /\S+@\S+\.\S+/

function SignupForm () {
  const {signUp, isLoading} = useSignUp()
  const { register, formState, getValues, handleSubmit, reset } = useForm()
  const { errors } = formState

  function onSubmit ({fullName, email, password}) {
    signUp({fullName, email, password}, {
      onSettled: () => reset()
    })
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input disabled={isLoading} type="text" id="fullName"
               {...register('fullName', { required: 'This field is required' })} />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input disabled={isLoading} type="email" id="email" {...register('email', {
          required: 'This field is required', pattern: {
            value: /\S+@\S+\.\S+/,
            message: 'Invalid email address'
          },
          minLength: {
            value: 8,
            message: 'Email must be at least 8 characters long'
          }
        })}/>
      </FormRow>

      <FormRow label="Password (min 8 characters)" error={errors?.password?.message}>
        <Input disabled={isLoading} type="password" id="password" {...register('password', { required: 'This field is required' })}/>
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input disabled={isLoading} type="password"
               id="passwordConfirm" {...register('passwordConfirm', {
          required: 'This field is required',
          validate: (value) => value === getValues().password || 'The passwords do not match'
        })}/>
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button disabled={isLoading} variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isLoading}>Create new user</Button>
      </FormRow>
    </Form>
  )
}

export default SignupForm
