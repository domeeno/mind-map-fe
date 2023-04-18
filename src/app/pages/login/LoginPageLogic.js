import { useState } from "react";

const LoginPageLogic = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
    error: null,
  });

  const handleEmailChange = (event) => {
    setState({ ...state, email: event.target.value });
  };

  const handlePasswordChange = (event) => {
    setState({ ...state, password: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      //   await AuthService.login(state.email, state.password);
      console.log(state);
      setState({ ...state, error: null });
    } catch (error) {
      setState({ ...state, error: "Invalid email or password" });
    }
  };

  return {
    ...state,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
  };
};

export default LoginPageLogic;
