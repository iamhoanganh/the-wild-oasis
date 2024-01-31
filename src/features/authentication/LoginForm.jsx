import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "src/ui/FormRowVertical.jsx";
import { useLogin } from 'src/features/authentication/useLogin.js'
import SpinnerMini from 'src/ui/SpinnerMini.jsx'

function LoginForm() {
  const [email, setEmail] = useState("iamhoanganh13@gmail.com");
  const [password, setPassword] = useState("123456");
  const { login, isLoading} = useLogin()
  function handleSubmit(e) {
    e.preventDefault()
    if(!email || !password) return
    login({email, password})
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large">{isLoading ? <SpinnerMini /> : "Login"}</Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
