function PageHead({ headTitle }) {
  return (
    <>
      <title>{headTitle ? headTitle : "FraArt - Dashboard React App"}</title>
      <link rel="icon" href="/favicon.png" />
    </>
  );
}
export default PageHead;
