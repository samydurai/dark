import { createGlobalStyle } from "styled-components";
import { backgroundColor } from "./theme";
const image = require("../static/appbackground.jpg");

const GlobalStyles = createGlobalStyle`
    body, input {
        font-family: 'Roboto Slab', sans-serif;
        font-size: 14px;
    }
    body {
        height: 100vh;
        width: 100vw;
        display:flex;
        align-items: center;
        justify-content: center;
        margin: 0px;
        background-image: url(${image.default});
        background-repeat: repeat;
        background-size: contain;
    }
    
    #app {
        height: 100vh;
        width: 70vw;
        background-color: ${backgroundColor};
        color: whitesmoke;
    }
`;

export default GlobalStyles;
