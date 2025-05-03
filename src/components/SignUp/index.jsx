import {
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";
import { Menu } from "antd";
import { monobankHelpItems } from "../../constants/monobankInfo";
import "./styles.scss";

export default function SignUp({
  onSubmit,
  loading,
  signUpError,
  register,
  handleSubmit,
  errors
}) {
  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} className="form">
      <div className="form-container">
        <div className="form-top">
          <h1 className="form-logo">Balance</h1>
          <Button variant="text" component={Link} to="/sign-in">
            Вхід
          </Button>
        </div>

        <div className="form-content">
          <p className="form-title">Створити аккаунт</p>

          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            required
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
            margin="normal"
          />

          <TextField
            label="Пароль"
            type="password"
            variant="outlined"
            fullWidth
            required
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            margin="normal"
          />

          <TextField
            label="Токен монобанка"
            variant="outlined"
            fullWidth
            required
            {...register("token")}
            error={!!errors.token}
            helperText={errors.token?.message}
            margin="normal"
          />

          <Menu mode="inline" items={monobankHelpItems} className="form-info" />

          {signUpError && (
            <Typography color="error" fontSize="14px" textAlign="center">
              {signUpError}
            </Typography>
          )}

          <Box mt={2}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Зареєструватися"}
            </Button>
          </Box>
        </div>
      </div>

      <Link to="/home" className="form-to-home">
        <GoArrowLeft size="26" />
        <p>На головну сторінку</p>
      </Link>
    </Box>
  );
}
