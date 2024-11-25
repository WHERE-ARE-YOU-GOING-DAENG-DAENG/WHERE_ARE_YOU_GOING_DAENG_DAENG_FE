import { useParams } from "react-router-dom";

const PlaceVisitList = () => {
    const { id } = useParams();
    return (
        <>
            <div>{id}</div>
        </>
    )
};

export default PlaceVisitList;