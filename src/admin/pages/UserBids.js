import { Link } from "react-router-dom";
import RecentBid from "../components/elements/RecentBid";
import Layout from "../components/layout/Layout";
import { useWeb3React } from '@web3-react/core';
function UserBids(props) {
  
  const { account } = useWeb3React();

  return (
    <>
      <Layout
        headTitle="Bids"
        pageTitle="Bids"
        pageTitleSub={"Welcome FraArt Bids page"}
        pageClass={"dashboard"}
        parent={"Home"}
        child={"Bids"}
        {...props}
      >
        <RecentBid />
      </Layout>
    </>
  );
}
export default UserBids;
