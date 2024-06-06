"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
//@ts-ignore
const user_icon_png_1 = __importDefault(require("../user-icon.png"));
const UserComponent = () => {
    const [userEmail, setUserEmail] = (0, react_1.useState)("");
    (0, react_1.useEffect)(() => {
        const token = localStorage.getItem("authorizationHeader");
        fetch(`${process.env.REACT_APP_API_URL}/v2/users/current`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
            setUserEmail(data.email);
        })
            .catch((error) => {
            console.error("Error fetching user data:", error);
        });
    }, []);
    const onLogout = () => {
        const token = localStorage.getItem("authorizationHeader");
        fetch(`${process.env.REACT_APP_API_URL}/logout`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
            alert("You have logged out.");
            window.location.href = "/";
        })
            .catch((error) => {
            console.error("Error logging out:", error);
        });
    };
    return (react_1.default.createElement("div", { className: "user-component" },
        react_1.default.createElement("div", { className: "user-info" },
            react_1.default.createElement("img", { src: user_icon_png_1.default, alt: "User Icon", className: "user-icon" }),
            react_1.default.createElement("span", { className: "user-email" }, userEmail)),
        react_1.default.createElement("button", { className: "logout-button", onClick: onLogout }, "Log Off")));
};
exports.default = UserComponent;
