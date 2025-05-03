import {
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";
import "./styles.scss";

export default function SignIn({
  onSubmit,
  loading,
  loginError,
  register,
  handleSubmit,
  errors,
}) {
  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} className="form">
      <div className="form-container">
        <div className="form-top">
          <h1 className="form-logo">Balance</h1>
          <Button variant="text" component={Link} to="/sign-up">
            Реєстрація
          </Button>
        </div>

        <div className="form-content form-content_signin">
          <p className="form-title">Увійти в обліковий запис</p>

          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            {...register("email")}
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
          />

          <TextField
            label="Пароль"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            {...register("password")}
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
          />

          {loginError && (
            <Typography color="error" fontSize="14px" textAlign="center">
              {loginError}
            </Typography>
          )}

          <Box mt={2}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Увійти"}
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
