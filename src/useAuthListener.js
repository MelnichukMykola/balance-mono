import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { setIsInitialized, toggleUserLogged } from "./store/authSlice";
import { fetchBankInfo } from "./store/trackingSlice";

export const useAuthListener = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const uid = user.uid;
          const userDocSnap = await getDoc(doc(db, "users", uid));

          if (userDocSnap.exists()) {
            const { token } = userDocSnap.data();

            dispatch(toggleUserLogged(true));
            dispatch(fetchBankInfo(token));
          }
        } catch (err) {
          console.error("Помилка завантаження користувача:", err);
        }
      }

      dispatch(setIsInitialized(true));
    });

    return () => unsubscribe();
  }, [dispatch]);
};
