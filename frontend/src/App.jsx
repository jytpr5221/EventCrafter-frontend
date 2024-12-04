import React, { useContext } from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserContextProvider from './context/userContextProvider.jsx';
import Layout from './components/layout/Layout.jsx';
import Home from './components/Home/Home.jsx';
import Events from './components/events/Events.jsx';
import Organizations from './components/organizations/Organizations.jsx';
import Welcome from './components/welcome/Welcome.jsx';
import OrganizerSignin from './components/authentication/OrganizerSignin.jsx';
import OrganizerSignup from './components/authentication/OrganizerSignup.jsx';
import CustomerSignin from './components/authentication/CustomerSignin.jsx';
import CustomerSignup from './components/authentication/CusomerSignup.jsx';
import CreateEvent from './components/createevent/CreateEvent.jsx';
import Organizer from './components/organizer/Organizer.jsx';
import NotFoundPage from './components/notfoundpage/NotFoundPage.jsx';


function App() {
  const user = JSON.parse(localStorage.getItem('user')) || null;
 
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Home/>} />
        <Route path="events" element={<Events />} />
        <Route path="organizations" element={<Organizations />} />
        <Route path="organizations/:orgId" element={<Organizer/>} />
        <Route path='/create-event' element={<CreateEvent/>}/>
        <Route path='*' element={<NotFoundPage/>}/>
       </Route>
    )
  );

  const router2 = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route path="" element={<Welcome />} />
        <Route path="organizer">
          <Route path="signup" element={<OrganizerSignup />} />
          <Route path="signin" element={<OrganizerSignin />} />
        </Route>
        <Route path="customer">
          <Route path="signup" element={<CustomerSignup />} />
          <Route path="signin" element={<CustomerSignin />} />
          <Route path='*' element={<NotFoundPage/>}/>
        </Route>
      </Route>
    )
  )

  return (
   <div>
     {user === null ? 
     <UserContextProvider>
     <RouterProvider router={router2}> 
     </RouterProvider>    
   </UserContextProvider>
   :
      <UserContextProvider>
      <RouterProvider router={router}> 
      </RouterProvider>    
    </UserContextProvider>
    }
   </div>
   
  )
}

export default App
