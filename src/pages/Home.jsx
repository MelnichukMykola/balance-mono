import ContentContainer from "../containers/ContentContainer";
import FooterContainer from "../containers/FooterContainer";
import HeaderContainer from "../containers/HeaderContainer";

function Home() {
  return (
    <div className="home-page">
      <HeaderContainer page="home" />
      <ContentContainer />
      <FooterContainer />
    </div>
  );
}

export default Home;
