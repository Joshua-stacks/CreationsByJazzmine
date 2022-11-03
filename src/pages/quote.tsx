import { TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import styled from "styled-components";
import { useState } from "react";
import Button from "@mui/material/Button";

const theme = createTheme({
  palette: {
    neutral: {
      main: "#C291A4",
      contrastText: "#fff",
    },
  },
});

const Quote = () => {
  const [name, setName] = useState("");
  const [LastName, setLastName] = useState("");
  const [num, setNum] = useState("");
  const [email, setEmail] = useState("");

  return (
    <ThemeProvider theme={theme}>
      <SignForm>
        <AdminSign>Your Information</AdminSign>
        <AdminSign>
          <TextField
            label="First name"
            variant="outlined"
            size="small"
            color="neutral"
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
        </AdminSign>
        <AdminSign>
          <TextField
            label="Last name"
            variant="outlined"
            size="small"
            color="neutral"
            onChange={(event) => {
              setLastName(event.target.value);
            }}
          />
        </AdminSign>
        <AdminSign>
          <TextField
            label="Phone Number"
            variant="outlined"
            size="small"
            color="neutral"
            onChange={(event) => {
              setNum(event.target.value);
            }}
          />
        </AdminSign>
        <AdminSign>
          <TextField
            label="email"
            variant="outlined"
            size="small"
            color="neutral"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </AdminSign>
        <Button
          variant="contained"
          type={"submit"}
          size="small"
          color="neutral"
        >
          Reserve
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
export default Quote;
