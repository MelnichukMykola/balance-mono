import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { signIn } from "../../store/authSlice";
import { fetchBankInfo } from "../../store/trackingSlice";
import { selectAuth } from "../../store/selectors";
import SignIn from "../../components/SignIn";

const schema = yup.object({
  email: yup
    .string()
    .email("Невірний формат email")
    .required("Email обов'язковий"),
  password: yup
    .string()
    .min(6, "Мінімум 6 символів")
    .required("Пароль обов'язковий"),
});

export default function SignInContainer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, loginError } = useSelector(selectAuth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async ({ email, password }) => {
    try {
      const result = await dispatch(signIn({ email, password })).unwrap();
      const { token } = result;
      if (token) {
        dispatch(fetchBankInfo(token));
      }
      navigate("/home");
    } catch (error) {
      console.error("Authentication failed", error);
    }
  };

  return (
    <SignIn
      onSubmit={onSubmit}
      register={register}
      handleSubmit={handleSubmit}
      loading={loading}
      loginError={loginError}
      errors={errors}
    />
  );
}
