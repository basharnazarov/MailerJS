import React from "react";
import { Box, Button, TextField, Typography, MenuItem } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Message() {
    const [user, setUser] = React.useState("");
    const [recipients, setRecipients] = React.useState([]);
    const [data, setData] = React.useState([]);
    const [message, setMessage] = React.useState({
        username: "",
        title: "",
        body: "",
    });

    const [matched, setMatched] = React.useState([]);
    const [open, setOpen] = React.useState(false);

    const handleBox = (event) => {
        setOpen(true);
    };
    const handleClose = (e) => {
        setMessage({ ...message, username: e.target.firstChild?.data });
        setOpen(false);
    };

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
    };

    const handleCreateMessage = () => {
        axios
            .post("https://webapp4-0tik.onrender.com/create", {
                username: message.username,
                title: message.title,
                message: message.body,
                sender: user,
            })
            .then((response) => {
                if (response.data.message) {
                    console.log(response.data.message);
                } else {
                    alert("message sent!");
                    fetchData()
                }
            })
            .catch((err) => console.log(err));
    };

    const handleAutoComplete = (e) => {
        const str = e.target.value;
        const filtered = recipients.filter((user) => user.startsWith(str));
        setMatched(filtered);
    };

    const fetchData = async () => {
     if(user){
        const result = await axios
        .post("https://webapp4-0tik.onrender.com/messages", {
            username: user,
        })
        .then((response) => {
            if (response.data.message) {
                console.log(response.data.message);
            } else {
                return response.data;
            }
        })
        .catch((err) => console.log(err));
    setData(result);
     }
    };

    const fetchRecipients = async () => {
        const result = await axios
            .get("https://webapp4-0tik.onrender.com/recipients")
            .then((response) => {
                if (response.data.message) {
                    console.log(response.data.message);
                } else {
                    return response.data;
                }
            })
            .catch((err) => console.log(err));
        const arr = [];
        result.map((obj) => arr.push(obj.sender));
        const uniqueUsers = arr.filter(
            (value, index, array) => array.indexOf(value) === index
        );

        setRecipients(uniqueUsers);
    };

    React.useEffect(() => {
        const item = JSON.parse(localStorage.getItem("user"));
        if (item) {
            setUser(item);
        } else {
            navigate('/')
        }
    }, []);

    React.useEffect(() => {
        fetchData();
    }, [user]);

    React.useEffect(() => {
        fetchRecipients();
    }, [data]);

    return (
        <Box sx={{ mt: "5%" }} onClick={() => setOpen(false)}>
            <Paper
                style={{
                    width: "30%",
                    margin: "auto",
                    marginBottom: "10px",
                    padding: "10px",
                    boxSizing: "border-box",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    columnGap: "10px",
                }}
            >
                <Typography variant="h5">
                    Current User: <strong>{user}</strong>
                </Typography>
                <Button
                    size="small"
                    variant="contained"
                    color="info"
                    onClick={handleLogout}
                >
                    Logout
                </Button>
            </Paper>
            <Box
                sx={{
                    position: "absolute",
                    width: "200px",
                    background: "#ddd",
                    ml: "35%",
                    mt: "3%",
                    zIndex: 4,
                    display: open ? "block" : "none",
                }}
            >
                {matched.length > 0
                    ? matched.map((item) => {
                          return (
                              <MenuItem key={item} onClick={(e) => handleClose(e)}>
                                  {item}
                              </MenuItem>
                          );
                      })
                    : ""}
            </Box>
            <Box
                sx={{
                    display: "flex",
                    mt: "20px",
                    width: "30%",
                    margin: "auto",
                    columnGap: "25px",
                }}
            >
                <Paper>
                    <TextField
                        autoComplete="off"
                        id="standard-basic"
                        label="Recipient"
                        variant="standard"
                        value={message.username}
                        onChange={(e) => {
                            handleAutoComplete(e);
                            handleBox();
                            setMessage({
                                ...message,
                                username: e.target.value,
                            });
                        }}
                    />
                </Paper>
                <Paper>
                    <TextField
                        autoComplete="off"
                        id="standard-basic"
                        label="Title"
                        variant="standard"
                        value={message.title}
                        onChange={(e) =>
                            setMessage({ ...message, title: e.target.value })
                        }
                    />
                </Paper>
                <Button
                    size="small"
                    variant="contained"
                    color="info"
                    onClick={handleCreateMessage}
                >
                    Send Message
                </Button>
            </Box>
            <Paper
                style={{
                    width: "30%",
                    margin: "auto",
                    marginBottom: "50px",
                    marginTop: "10px",
                    padding: "10px",
                    boxSizing: "border-box",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "start",
                    columnGap: "40px",
                }}
            >
                <TextField
                    sx={{ width: "100%" }}
                    multiline
                    id="standard-basic"
                    rows={5}
                    type="text"
                    label="Message"
                    variant="standard"
                    onChange={(e) =>
                        setMessage({ ...message, body: e.target.value })
                    }
                />
            </Paper>
            <Typography
                style={{
                    width: "70%",
                    margin: "auto",
                    marginBottom: "5px",
                    padding: "10px",
                    boxSizing: "border-box",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    columnGap: "10px",
                    background: "white",
                    borderRadius: "5px",
                }}
            >
                All Received Messages
            </Typography>
            <TableContainer
                component={Paper}
                style={{ width: "70%", margin: "auto" }}
            >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead sx={{ background: "#E8F8FD" }}>
                        <TableRow>
                            <TableCell>id</TableCell>
                            <TableCell>title</TableCell>
                            <TableCell>messages</TableCell>
                            <TableCell>sender</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.length > 0
                            ? data.map((row) => (
                                  <TableRow key={row.ID}>
                                      <TableCell component="th" scope="row">
                                          {row.ID}
                                      </TableCell>
                                      <TableCell>{row.title}</TableCell>
                                      <TableCell>{row.message}</TableCell>
                                      <TableCell>
                                          {" "}
                                          from <strong>{row.sender}</strong>
                                      </TableCell>
                                  </TableRow>
                              ))
                            : ""}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default Message;
