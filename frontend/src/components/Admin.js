import { useState } from "react";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import styled from "styled-components";

const theme = createTheme({
  palette: {
    neutral: {
      main: "#C291A4",
      contrastText: "#fff",
    },
  },
});

const Admin = () => {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("/api/admin/login", {
      method: "POST",
      body: JSON.stringify({
        username: user,
        password: pass,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.status === 200) {
          window.location.href = "/AdminPage";
        } else {
          setErr(response.message);
        }
      });
  };
  return (
    <ThemeProvider theme={theme}>
      <SignForm onSubmit={(event) => handleSubmit(event)}>
        <AdminSign>Admin Sign In</AdminSign>
        <AdminSign>
          <TextField
            label="Username"
            variant="outlined"
            size="small"
            color="neutral"
            onChange={(event) => {
              setUser(event.target.value);
            }}
          />
        </AdminSign>
        <AdminSign>
          <TextField
            label="Password"
            varient="outlined"
            type={"password"}
            size="small"
            color="neutral"
            onChange={(event) => {
              setPass(event.target.value);
            }}
          />
        </AdminSign>
        {err !== "" && <div style={{ color: "red" }}>{err}</div>}
        <Button
          variant="contained"
          type={"submit"}
          size="small"
          color="neutral"
        >
          Log In
        </Button>
      </SignForm>
    </ThemeProvider>
  );
};

const SignForm = styled.form`
  margin: 10px;
`;
const AdminSign = styled.div`
  margin: 5px;
`;

export default Admin;
