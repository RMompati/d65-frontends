import {BrowserRouter, Route, Routes} from "react-router-dom";
import {LoginPage} from "./pages/LoginPage";
import {SignUpPage} from "./pages/SignUpPage";
import {HomePage} from "./pages/HomePage";
import {PrivateRoute} from "./auth/PrivateRoute";
import {DashboardPage} from "./pages/DashboardPage";
import {NavigationBar} from "./pages/NavigationBar";
import {ActivateAccountPage} from "./pages/ActivateAccountPage";
import {LogoutPage} from "./pages/LogoutPage";
import {AboutPage} from "./pages/AboutPage";

export const AppRoutes = () => {
  return (
      <BrowserRouter>
        {/*<NavigationBar />*/}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/logout" element={<LogoutPage />} />
          <Route path="/signup" element={<SignUpPage />}/>
          <Route path="/activate-account" element={<ActivateAccountPage />} />
          <Route path="/about" element={<AboutPage />}/>
          <Route path="/dashboard" element={ <PrivateRoute outlet={ <DashboardPage /> } /> } />
        </Routes>
      </BrowserRouter>
  );
}