import { useState } from "react";
import Footer from "../components/commons/Footer";
import Header from "../components/commons/Header";
import HopscotchMap from "../components/map/HopscotchMap";

const Hopscotch = () => {
    const [isMapLoaded, setIsMapLoaded] = useState(false);

    return(
        <>
            <Header label="땅따먹기"/>
            <HopscotchMap removeUi={true} />
            <Footer />
        </>
    )
};

export default Hopscotch;