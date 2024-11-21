import { useParams } from "react-router-dom";

const PlaceDetail = () => {
    const {id} = useParams();
    return(
        <>
            <h1>{id}</h1>
        </>
    )
};

export default PlaceDetail;