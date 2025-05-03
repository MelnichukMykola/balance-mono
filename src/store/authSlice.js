import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";

export const signUp = createAsyncThunk(
  "auth/signUp",
  async ({ email, password, token }, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const uid = userCredential.user.uid;

      const createdAt = new Date().toISOString();

      const userData = {
        token,
        email,
        createdAt,
      };

      await setDoc(doc(db, "users", uid), userData);

      return {
        uid,
        ...userData,
      };
    } catch (err) {
      console.error("signUp error:", err);
      return rejectWithValue(err.code || "UNKNOWN_SIGNUP_ERROR");
    }
  }
);

export const signIn = createAsyncThunk(
  "auth/signIn",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const uid = userCredential.user.uid;
      const userDoc = await getDoc(doc(db, "users", uid));

      return {
        uid,
        email: userCredential.user.email,
        createdAt: userDoc.exists() ? userDoc.data().createdAt : null,
        token: userDoc.exists() ? userDoc.data().token : null,
      };
    } catch (err) {
      return rejectWithValue(err.code || "UNKNOWN_SIGNIN_ERROR");
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await signOut(auth);
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    uid: null,
    email: null,
    createdAt: null,
    isUserLogged: false,
    loading: false,
    loginError: null,
    loginErrorCode: null,
    signUpError: null,
    signUpErrorCode: null,
    isInitialized: false,
  },
  reducers: {
    toggleUserLogged: (state, action) => {
      state.isUserLogged = action.payload;
    },
    rewriteUserStore: (state, action) => {
      state.isUserLogged = action.payload.isUserLogged;
    },
    setIsInitialized: (state, action) => {
      state.isInitialized = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // SIGN UP
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.signUpError = null;
        state.signUpErrorCode = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.uid = action.payload.uid;
        state.email = action.payload.email;
        state.createdAt = action.payload.createdAt;
        state.isUserLogged = true;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.signUpErrorCode = action.payload;
        state.signUpError = "Помилка при реєстрації";
      })

      // SIGN IN
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.loginError = null;
        state.loginErrorCode = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        state.uid = action.payload.uid;
        state.email = action.payload.email;
        state.createdAt = action.payload.createdAt;
        state.isUserLogged = true;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.loginErrorCode = action.payload;
        state.loginError = "Невірний email або пароль";
      })

      // LOGOUT
      .addCase(logout.fulfilled, (state) => {
        state.uid = null;
        state.email = null;
        state.createdAt = null;
        state.isUserLogged = false;
        state.loginError = null;
        state.loginErrorCode = null;
        state.signUpError = null;
        state.signUpErrorCode = null;
      });
  },
});

export default authSlice.reducer;

export const { toggleUserLogged, rewriteUserStore, setIsInitialized } =
  authSlice.actions;
