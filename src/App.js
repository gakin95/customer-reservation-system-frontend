import React from "react";
import Routers from "./router";
import { QueryClient, QueryClientProvider } from "react-query";
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactNotification />
      <Routers />
    </QueryClientProvider>
  );
}

export default App;
