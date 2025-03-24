import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { propertiesByLocation } from "../../services/propertyService";
import { Box, CircularProgress } from "@mui/material";
import SearchResultProperty from "./SearchResultProperty";

const Search = () => {
    const [searchParams] = useSearchParams();
    const [properties, setProperties] = useState([]);
    
    useEffect(() => {   
        const propertyLocation = searchParams.get("propertyLocation");
        const fetchProperties = async () => {
            const data = await propertiesByLocation(propertyLocation);
            setProperties(data.propertiesByLocation);
        };
        fetchProperties();
    }, [searchParams.get("propertyLocation")]);

    return (
        !properties ? (
            <Box sx={{ display: "flex", padding: "50px", justifyContent: "center" }}>
                <CircularProgress />
            </Box>
        ) : (
            <>
                {properties.map((property) => (
                    <SearchResultProperty key={property._id} property={property} />
                ))}
            </>
        )
    );
};

export default Search;
