import "./index.css";
import ReactDOM from "react-dom/client";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import App from "./App.jsx";

const client = new ApolloClient({
  link: new HttpLink({ uri: "http://localhost:4000/" }),
  cache: new InMemoryCache()
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
