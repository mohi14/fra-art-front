import CollectionItems from "../components/elements/CollectionItems";
import Layout from "../components/layout/Layout";

function UserCollections(props) {
  return (
    <>
      <Layout
        headTitle="Collections"
        pageTitle="Collections"
        pageTitleSub={"Welcome FraArt Collections page"}
        pageClass={"dashboard"}
        {...props}
      >
        <div className="col-12">
          <div className="card filter-tab">
            <div className="card-body bs-0 p-0 bg-transparent">
              <div className="row">
                <CollectionItems />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
export default UserCollections;
