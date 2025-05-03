import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchBankInfo } from "../../store/trackingSlice";
import { toggleUserLogged, signUp } from "../../store/authSlice";
import { selectAuth } from "../../store/selectors";
import { yupResolver } from "@hookform/resolvers/yup";
import SignUp from "../../components/SignUp";

const signUpSchema = yup.object().shape({
  email: yup.string().email("Некоректний email").required("Email обов'язковий"),
  password: yup
    .string()
    .min(6, "Мінімум 6 символів")
    .required("Пароль обов'язковий"),
  token: yup
    .string()
    .length(44, "Токен має містити 44 символи")
    .required("Токен обов'язковий"),
});

export default function SignUpContainer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, signUpError } = useSelector(selectAuth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpSchema),
  });

  const onSubmit = async (data) => {
    const { email, password, token } = data;

    try {
      await dispatch(signUp({ email, password, token })).unwrap();
      dispatch(fetchBankInfo(token));
      dispatch(toggleUserLogged(true));
      navigate("/home");
    } catch (err) {
      console.error("Auth error:", err);
    }
  };

  return (
    <SignUp
      onSubmit={onSubmit}
      loading={loading}
      signUpError={signUpError}
      register={register}
      handleSubmit={handleSubmit}
      errors={errors}

    />
  );
}
