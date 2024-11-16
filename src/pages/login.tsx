import React, { useState } from "react";
import {
  Button,
  TextField,
  Box,
  Typography,
  Container,
  Grid,
  Link,
} from "@mui/material";

const server = "http://localhost:3000";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    // Implement login logic here
    function login() {
      const data = fetch(`${server}/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, password: password }),
      });
      data.then((req) => {
        setAuth(req.ok);
        if (!req.ok) {
          const errorElem = document.getElementById("error-msg");
          errorElem.textContent = "Incorrect password or username";
          return;
        }
        document.getElementById("sign-in-btn")?.click();
      });
    }
    login();
  };

  return (
    <div className="flex-row-reverse flex justify-items-end h-full items-center ">
      <div
        className="bg-blue-500 w-3/6 flex items-center justify-center "
        style={{ height: "100vh" }}
      >
        <h1>
          Boost your productivity
          <br /> using speechable's advanced
          <br /> text-to-speech!
        </h1>
      </div>
      <Container component="main" maxWidth="xs" sx={{ marginLeft: "20vw" }}>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "white",
            padding: 4,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Typography component="h1" variant="h5" sx={{ color: "#000" }}>
            Sign In
          </Typography>
          <h2 id="error-msg" className="text-rose-500"></h2>
          <Box
            component="form"
            onSubmit={handleLogin}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              sx={{
                "& .MuiInputBase-root": { color: "#000" }, // Text color
                "& .MuiInputLabel-root": { color: "#000" }, // Label color
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#000", // Border color
                  },
                  "&:hover fieldset": {
                    borderColor: "#000",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#000",
                  },
                },

                "& input:-webkit-autofill": {
                  WebkitBoxShadow: "0 0 0 1000px white inset", // Background for autofill
                  WebkitTextFillColor: "#000", // Autofill text color
                  "&::selection": {
                    backgroundColor: "#b3d4fc", // Highlight background color when selected
                    color: "#000", // Highlighted text color when selected
                  },
                },
                backgroundColor: "#fff",
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                "& .MuiInputBase-root": { color: "#000" }, // Text color
                "& .MuiInputLabel-root": { color: "#000" }, // Label color
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#000", // Border color
                  },
                  "&:hover fieldset": {
                    borderColor: "#000",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#000",
                  },
                },
                "& input:-webkit-autofill": {
                  WebkitBoxShadow: "0 0 0 1000px white inset", // Background for autofill
                  WebkitTextFillColor: "#000", // Autofill text color
                  "&::selection": {
                    backgroundColor: "#b3d4fc", // Highlight background color when selected
                    color: "#000", // Highlighted text color when selected
                  },
                },
                backgroundColor: "#fff",
              }}
            />
            <Button
              type="submit"
              id="sign-in-btn"
              fullWidth
              variant="contained"
              href={auth ? "library" : ""}
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: "#000", // Button color
                color: "#fff", // Text color
                "&:hover": {
                  backgroundColor: "#333", // Darker hover effect
                },
              }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2" sx={{ color: "#000" }}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2" sx={{ color: "#000" }}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default LoginPage;
