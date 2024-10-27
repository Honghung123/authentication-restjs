import React, { useState, useEffect } from "react";
import { navbarItems } from "./navbarItems";
import Navbar from "../Navbar";
import { IconButton, InputBase, Paper } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import {
    Search as SearchIcon,
    Notifications as NotificationsIcon,
    AccountCircle as AccountCircleIcon,
    AddShoppingCart,
} from "@mui/icons-material";
import AccountMenu from "../Menu/AccountMenu";
import { Link, useNavigate } from "react-router-dom";
import Notification from "../Notification";
import SearchHintMenu from "../Menu/SearchHintMenu";
import CloseIcon from "@mui/icons-material/Close";

export default function Header() {
    const [searchInput, setSearchInput] = useState("");
    const [user, setUser] = useState(null);
    const handleSearchInput = (value) => {
        setSearchInput(value);
    };

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            console.log(user);
            setUser(JSON.parse(user));
        }
    }, []);

    return (
        <header className="shadow-md bg-slate-300 bg-opacity-20 backdrop-filter backdrop-blur-lg bg-blend-hue">
            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo Section */}
                    <div className="basis-[10rem]">
                        <Link to="/" className="flex justify-left items-center gap-2">
                            <img
                                className="h-8 w-auto"
                                src="https://images.vexels.com/content/142738/preview/colorful-3d-cubes-logo-f91162.png"
                                alt="Logo"
                            />
                            <p className="text-md">21120461</p>
                        </Link>
                    </div>

                    {/* Search Bar */}
                    <div className="basis-[45rem]">
                        <Paper
                            component="form"
                            elevation={0}
                            sx={{
                                borderRadius: "999px",
                                backgroundColor: "#fff",
                                display: "flex",
                                position: "relative",
                                borderWidth: "1px",
                            }}
                        >
                            <InputBase
                                placeholder="Search what you want"
                                value={searchInput}
                                onChange={(e) => handleSearchInput(e.target.value)}
                                inputProps={{ "aria-label": "search" }}
                                sx={{ ml: 2, mr: 2, flex: 1 }}
                            />
                            <span
                                className={
                                    "inline-flex pr-2 items-center cursor-pointer opacity-70" +
                                    (searchInput.length > 0 ? "" : " invisible")
                                }
                                onClick={() => setSearchInput("")}
                            >
                                <CloseIcon />
                            </span>
                            <div className="custom-horizontal-divider left">
                                <IconButton
                                    type="submit"
                                    className="text-gray-400 hover:text-gray-500 flex items-center justify-center"
                                    aria-label="search"
                                    sx={{ p: ".8rem" }}
                                >
                                    <SearchIcon />
                                </IconButton>
                            </div>
                            {searchInput.length > 0 && <SearchHintMenu searchInput={searchInput} />}
                        </Paper>
                    </div>

                    {/* Icons Section */}
                    {user ? (
                        <div className="flex space-x-3 basic[20rem]">
                            <Notification>
                                <NotificationsIcon sx={{ width: 32, height: 32 }} />
                            </Notification>
                            <AccountMenu title="Account setting">
                                <Avatar
                                    sx={{ width: 32, height: 32 }}
                                    src="https://mui.com/static/images/avatar/1.jpg"
                                />
                            </AccountMenu>
                        </div>
                    ) : (
                        <div className="flex space-x-3 basic[20rem]">
                            <Link to="/login">
                                <span className="cursor-pointer block py-2 px-4 rounded-md bg-rose-500 hover:bg-rose-600 text-white">
                                    Login
                                </span>
                            </Link>
                            <Link
                                to="/register"
                                className="cursor-pointer block py-2 px-4 rounded-md outline outline-rose-950 -outline-offset-2 hover:bg-rose-100"
                            >
                                <span>Register</span>
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            <Navbar navItems={navbarItems} />
        </header>
    );
}
