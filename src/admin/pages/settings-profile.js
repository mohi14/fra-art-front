import Layout from "../components/layout/Layout";
import PersonalInfo from "../components/form/PersonalInfo";
import SettingsMenu from "../components/layout/SettingsMenu";

function SettingsProfile(props) {
  // console.log(props)
  return (
    <>
      <Layout
        headTitle="Profile"
        pageTitle="Profile"
        pageTitleSub={"Welcome FraArt Settings Profile page"}
        pageClass={"dashboard"}
        {...props}
 
      >
               
        <SettingsMenu />
        <div className="row">
          <div className="col-xxl-12 col-xl-12 col-lg-12">
            <PersonalInfo />
          </div>
        </div>
      </Layout>
    </>
  );
}
export default SettingsProfile;
