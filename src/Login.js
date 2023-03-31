import React from "react";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Login(props) {
    const [details, setDetails] = React.useState({
        username: "",
    });

    const navigate = useNavigate();
    const handleLogin = (e) => {
        e.preventDefault();
        navigate("/message");
    };
    React.useEffect(() => {
        localStorage.setItem("user", JSON.stringify(details?.username));
    }, [details]);

    return (
        <div style={{ marginTop: "5%" }}>
            <Paper
                elavation={3}
                style={{
                    maxWidth: "300px",
                    height: "200px",
                    margin: "auto",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        rowGap: "25px",
                    }}
                >
                    <TextField
                        id="standard-basic"
                        label="Username"
                        variant="standard"
                        onChange={(e) =>
                            setDetails({ ...details, username: e.target.value })
                        }
                    />

                    <Button
                        variant="contained"
                        component={Link}
                        onClick={handleLogin}
                    >
                        Login
                    </Button>
                </Box>
            </Paper>
        </div>
    );
}

export default Login;
