import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

export function ProtectedRoute({ children }) {
  const [auth, setAuth] = useState(false);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    async function fetchStatus() {
      await fetch("http://localhost:3000/auth/verify", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        setAuth(res.ok);
        setLoad(false);
      });
    }
    fetchStatus();
    return () => {};
  }, []);

  if (load) {
    return <></>;
  }

  return auth ? children : <Navigate to="/login" />;
}
