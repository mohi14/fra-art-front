function PageTitle({ pageTitle, pageTitleSub }) {
  return (
    <>
      <div className="page-title">
        <div className="row align-items-center justify-content-between">
          <div className="col-6">
            <div className="page-title-content">
              <h3>{pageTitle}</h3>
              <p className="mb-2">{pageTitleSub}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default PageTitle;
