import React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter as Router } from "react-router-dom";
import App from "./components/App";

async function auth() {
  const ind = window.location.hash.indexOf("credential=");
  if (ind === -1) {
    return;
  }
  const credential = window.location.hash.slice(ind).split("=")[1];
  if (!credential) {
    return;
  }

  window.location.href = window.location.href.split("?")[0];
  await fetch(`/auth/login/${credential}`, {
    method: "GET",
  });
  location.reload();
}

auth().then(() => {
  const container = document.getElementById("root");
  const root = createRoot(container!);
  root.render(
    <Router>
      <App />
    </Router>
  );
});
