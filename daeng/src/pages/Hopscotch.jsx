import Footer from "../components/commons/Footer";
import Header from "../components/commons/Header";
import Map from "../components/map/Map";

const Hopscotch = () => {
    return(
        <>
            <Header label="땅따먹기"/>
            <Map removeUi={true}/>
            <Footer />
        </>
    )
};

export default Hopscotch;