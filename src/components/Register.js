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
const Register = () => {
    const [email, setEmail] = (0, react_1.useState)("");
    const [nome, setNome] = (0, react_1.useState)("");
    const [telefone, setTelefone] = (0, react_1.useState)("");
    const [cep, setCep] = (0, react_1.useState)("");
    const [rua, setRua] = (0, react_1.useState)("");
    const [numero, setNumero] = (0, react_1.useState)("");
    const [complemento, setComplemento] = (0, react_1.useState)("");
    const [password, setPassword] = (0, react_1.useState)("");
    const navigate = (0, react_router_dom_1.useNavigate)();
    const handleRegister = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const requestBody = JSON.stringify({
                user: {
                    email,
                    nome,
                    telefone,
                    cep,
                    rua,
                    numero,
                    complemento,
                    password,
                },
            });
            const response = yield fetch(`${process.env.REACT_APP_API_URL}/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: requestBody,
            });
            const data = yield response.json();
            if (response.ok) {
                alert("Registration successful!");
                navigate("/");
            }
            else {
                alert("Registration failed! Please try again.");
            }
            console.log("Response Data:", data);
        }
        catch (error) {
            console.error("Error:", error);
            alert("Registration failed! Please try again.");
        }
    });
    return (react_1.default.createElement("div", { className: "pokedex-container" },
        react_1.default.createElement("div", { className: "pokedex-content" },
            react_1.default.createElement("h2", { className: "pokedex-title" }, "Register"),
            react_1.default.createElement("input", { type: "email", placeholder: "Email", value: email, onChange: (e) => setEmail(e.target.value), className: "pokedex-input" }),
            react_1.default.createElement("input", { type: "text", placeholder: "Name", value: nome, onChange: (e) => setNome(e.target.value), className: "pokedex-input" }),
            react_1.default.createElement("input", { type: "text", placeholder: "Phone", value: telefone, onChange: (e) => setTelefone(e.target.value), className: "pokedex-input" }),
            react_1.default.createElement("input", { type: "text", placeholder: "Zip/Postal Code", value: cep, onChange: (e) => setCep(e.target.value), className: "pokedex-input" }),
            react_1.default.createElement("input", { type: "text", placeholder: "Street", value: rua, onChange: (e) => setRua(e.target.value), className: "pokedex-input" }),
            react_1.default.createElement("input", { type: "text", placeholder: "Number", value: numero, onChange: (e) => setNumero(e.target.value), className: "pokedex-input" }),
            react_1.default.createElement("input", { type: "text", placeholder: "Add-on address", value: complemento, onChange: (e) => setComplemento(e.target.value), className: "pokedex-input" }),
            react_1.default.createElement("input", { type: "password", placeholder: "Password", value: password, onChange: (e) => setPassword(e.target.value), className: "pokedex-input" }),
            react_1.default.createElement("button", { onClick: handleRegister, className: "pokedex-button" }, "Register"),
            react_1.default.createElement("button", { onClick: () => navigate("/"), className: "pokedex-button" }, "Have an account? Login"))));
};
exports.default = Register;
