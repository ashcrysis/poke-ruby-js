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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
require("../App.css");
const Login = () => {
    const [email, setEmail] = (0, react_1.useState)("");
    const [password, setPassword] = (0, react_1.useState)("");
    const [username, setUsername] = (0, react_1.useState)("");
    const navigate = (0, react_router_dom_1.useNavigate)();
    const handleLogin = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield fetch(`${process.env.REACT_APP_API_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ user: { email, password } }),
            });
            if (response.ok) {
                const authorizationHeader = response.headers.get("Authorization");
                if (authorizationHeader) {
                    localStorage.setItem("authorizationHeader", authorizationHeader.split(" ")[1]);
                    alert("Login successful!");
                    const data = yield response.json();
                    navigate("/search");
                }
            }
            else {
                alert("Login failed! Please check your credentials and try again.");
            }
        }
        catch (error) {
            console.error("Error:", error);
            alert("Login failed! Please try again.");
        }
    });
    return (react_1.default.createElement("div", { className: "pokedex-container" },
        react_1.default.createElement("div", { className: "pokedex-content" },
            react_1.default.createElement("h2", { className: "pokedex-title" }, "Login"),
            react_1.default.createElement("input", { type: "email", placeholder: "Email", value: email, onChange: (e) => setEmail(e.target.value), className: "pokedex-input" }),
            react_1.default.createElement("input", { type: "password", placeholder: "Password", value: password, onChange: (e) => setPassword(e.target.value), className: "pokedex-input" }),
            react_1.default.createElement("button", { onClick: handleLogin, className: "pokedex-button" }, "Login"),
            username && react_1.default.createElement("p", { className: "pokedex-greeting" },
                "Hello, ",
                username),
            " ",
            react_1.default.createElement("button", { onClick: () => navigate("/register"), className: "pokedex-button" }, "Don't have an account? Register"))));
};
exports.default = Login;
