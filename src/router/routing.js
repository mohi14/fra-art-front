import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import ReactTooltip from "react-tooltip";
import store from "../admin/redux/store";
import Navbar from "../components/navbar.component";
import Home from "../pages/home.page";
import Crowdpad from "../pages/crowdpad.page";
import CrowdpadDetails from "../pages/crowdpadDetails.page";
import CrowdpadCreate from "../pages/crowdpadCreate.page";
import Marketplace from "../pages/marketplace.page";
import MarketplaceOld from "../pages/marketplace.page-old";
import DetailsFraction from "../pages/DetailsFraction";
import CreateFractionalNFT from "../pages/createFractionalNFT";
import Rockpool from "../pages/rockpool.page";
import RockpoolCreate from "../pages/rockpoolCreate.page";
import RockpoolCreateDetails from "../pages/rockpoolCreateDetails.page";
import RockpoolDetails from "../pages/rockpoolDetails.page";
import Bridge from "../pages/bridge.page";

import Dashboard from "../admin/pages/Dashboard";
import UserBids from "../admin/pages/UserBids";
import UserSaved from "../admin/pages/UserSaved";
import UserCollections from "../admin/pages/UserCollections";
// import Profile from "../admin/pages/profile";
import SettingsProfile from "../admin/pages/settings-profile";
import SettingsPreferences from "../admin/pages/settings-application";
import SettingsSecurity from "../admin/pages/settings-security";
import SettingsActivity from "../admin/pages/settings-activity";
import SettingsPayment from "../admin/pages/settings-payment-method";
import SettingsApi from "../admin/pages/settings-api";
import Balance from "../admin/pages/wallet";

import Footer from "../components/footer.component";
import BackToTop from "../components/backtotop.component";
import RockpoolHome from "../pages/rockpoolHome.page";
import Collections from "../pages/collections.page";
import TrendingCollections from "../pages/collections-trending.page";
import Explore from "../pages/explore.page";
import CreatorProfile from "../pages/creatorProfile.page";
import CreatorProfileEdit from "../pages/creatorProfileEdit.page";
import BecomeCreator from "../pages/becomeCreator.page";
import ItemDetail from "../pages/itemDetail.page";
import Collection from "../pages/Collection";
import HotCollection from "../pages/HotCollection";
import NewlyCollection from "../pages/NewlyCollection";
import TopCollection from "../pages/TopCollection";
import CollectionDetails from "../pages/CollectionDetails";
import User from "../pages/User";
import Login from "../pages/login.page";
import SignUp from '../pages/signUp.page'
import ResetPassword from "../pages/resetPassword.page";
import LockScreen from "../pages/lockScreen.page"
import 'react-toastify/dist/ReactToastify.css';



const Routing = (props) => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [css, setCss] = useState("/css/style.min.css");
  const [nav, setNav] = useState(undefined);

  useEffect(() => {
    setCss(
      location.pathname.includes("admin")
        ? "/admin-css/style.min.css"
        : // ? ""
        "/css/style.min.css"
    );
    setNav(location.pathname);
  }, [location]);

  useEffect(() => {
    if (css) {
      document.getElementById("theme-opt").href = css;
      setInterval(() => {
        setLoading(false);
      }, 200);
    }
  }, [css]);

  useEffect(() => {
    ReactTooltip.rebuild();
  });

  return (
    !loading && (
      <Provider store={store}>
        <ReactTooltip effect="solid" className="tooltip" clickable={true} />
        {!location.pathname.includes("admin") && (
          <Navbar nav={nav} {...props} />
        )}
        <ToastContainer
          position="bottom-left"
          autoClose={6000}
          hideProgressBar
          closeOnClick
          theme="dark"
          toastStyle={{
            bottom: 10,
            border: "1px solid rgba(var(--primary-rgb), 0.75)",
            boxShadow:
              "0 0 60px 5px rgba(var(--primary-rgb), 0.2), 0 0 50px 0px rgba(var(--secondary-rgb), 0.6)",
            backgroundImage:
              "linear-gradient(to right, rgba(var(--secondary-rgb), 0.3), rgba(var(--primary-rgb), 0.6)",
            color: "var(--light)",
            borderRadius: 50,
            textAlign: "center",
            fontSize: 16,
          }}
          rtl={false}
          draggable
          pauseOnHover
        />
        <Routes>
          <Route exact path="*" element={<Navigate to="/" />} />
          <Route exact path="/" element={<Home {...props} />} />

          <Route path="/crowdpad" element={<Crowdpad />} />
          <Route path="/crowdpad/details/:id" element={<CrowdpadDetails />} />
          <Route path="/crowdpad/create" element={<CrowdpadCreate />} />

          <Route path="/marketplace-old" element={<MarketplaceOld />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route
            path="/marketplace/details/:id"
            element={<DetailsFraction />}
          />
          <Route
            path="/marketplace/create"
            element={<CreateFractionalNFT {...props} />}
          />

          <Route path="/rockpool" element={<RockpoolHome />} />
          <Route path="/rockpool/pools" element={<Rockpool />} />
          <Route path="/rockpool/create" element={<RockpoolCreate />} />
          <Route
            path="/rockpool/create/pool-details"
            element={<RockpoolCreateDetails />}
          />
          <Route path="/rockpool/details/:id" element={<RockpoolDetails />} />

          <Route path="/bridge" element={<Bridge />} />

          <Route
            path="/trending-collections"
            element={<TrendingCollections />}
          />
          <Route path="/explore" element={<Explore />} />
          <Route
            exact
            path="/item-details/:collection/:id"
            element={<ItemDetail {...props} />}
          />

          <Route
            exact
            path="/profile/:address"
            element={<CreatorProfile {...props} />}
          />
          <Route
            path="/profile-edit"
            element={<CreatorProfileEdit {...props} />}
          />
          <Route path="/become-creator" element={<BecomeCreator />} />
          <Route path="/login" element={<Login  />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/lock-screen" element={<LockScreen />} />

          <Route exact path="/admin" element={<Dashboard {...props} />} />
          <Route path="/admin/bids" element={<UserBids {...props} />} />
          <Route path="/admin/saved" element={<UserSaved {...props} />} />
          <Route
            path="/admin/collections"
            element={<UserCollections {...props} />}
          />
          <Route path="/admin/wallet" element={<Balance {...props} />} />
          {/* <Route path="/admin/profile" element={<Profile {...props} />} /> */}
          <Route
            path="/admin/settings-profile"
            element={<SettingsProfile {...props} />}
          />
          <Route
            path="/admin/settings-application"
            element={<SettingsPreferences />}
          />
          <Route
            path="/admin/settings-security"
            element={<SettingsSecurity />}
          />
          <Route
            path="/admin/settings-activity"
            element={<SettingsActivity {...props} />}
          />
          <Route
            path="/admin/settings-payment-method"
            element={<SettingsPayment />}
          />
          <Route path="/admin/settings-api" element={<SettingsApi />} />
          {/* <Route path="/admin/signin" element={<Signin />} />
          <Route path="/admin/signup" element={<Signup />} />
          <Route path="/admin/lock" element={<Lock />} />
          <Route path="/admin/otp1" element={<Otp1 />} />
          <Route path="/admin/otp2" element={<Otp2 />} />
          <Route path="/admin/verify-email" element={<VerifyEmail />} />
          <Route path="/admin/reset" element={<Reset />} /> */}
          <Route path="/trending" element={<Collection />} />
          <Route path="/hot" element={<HotCollection />} />
          <Route path="/newly" element={<NewlyCollection />} />
          <Route path="/top" element={<TopCollection />} />
          <Route path="/trending/:id" element={<CollectionDetails />} />
          <Route path="/trendingDetails/:pid/:token" element={<User />} />
        </Routes>
        <BackToTop />
        {!location.pathname.includes("admin") && <Footer />}
      </Provider>
    )
  );
};

export default Routing;
