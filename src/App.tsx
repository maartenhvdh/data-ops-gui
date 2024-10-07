import "@kontent-ai/stylekit";

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./components/Home";
import { SyncDiff } from "./components/sync/SyncDiff";
import { SyncEntities } from "./components/sync/SyncEntities";
import { SyncSource } from "./components/sync/SyncSource";
import { SyncTarget } from "./components/sync/SyncTarget";
import { WizardProvider } from "./WizardContext";

const App: React.FC = () => (
  <WizardProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sync/source" element={<SyncSource />} />
        <Route path="/sync/target" element={<SyncTarget />} />
        <Route path="/sync/entities" element={<SyncEntities />} />
        <Route path="/sync/diff" element={<SyncDiff />} />
        {/* remaining routes */}
      </Routes>
    </Router>
  </WizardProvider>
);

export default App;
