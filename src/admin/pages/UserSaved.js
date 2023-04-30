import SavedItems from "../components/elements/SavedItems";
import Layout from "../components/layout/Layout";

function UserSaved(props) {
  return (
    <>
      <Layout
        headTitle="Saved"
        pageTitle="Saved Items"
        pageTitleSub={"Welcome FraArt Saved page"}
        pageClass={"dashboard"}
        {...props}
      >
        <div className="col-12">
          <div className="card filter-tab">
            <div className="card-body bs-0 p-0 bg-transparent">
              <div className="row">
                <SavedItems />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
export default UserSaved;
