import React, { useEffect, useState } from "react";
import './Home.css'
import { InputText } from "../../common/InputText/InputText";
import { CustomCard } from "../../common/CustomCard/CustomCard";
import { getAllPlants, getPlantByWatering, getPlantBySunlight, getPlantByName, getMyPlantByPlantId, getPlantByPoisonous, getPlantByFlowers } from "../../services/apiCalls";
import Form from 'react-bootstrap/Form';
import { CustomButton } from "../../common/CustomButton/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { usersData } from "../userSlice";
import { savePlant } from "../plantSlice";

export const Home = () => {

    const [allPlants, setAllPlants] = useState([]);
    const [selectedName, setSelectedName] = useState("");
    const [selectedWatering, setSelectedWatering] = useState("");
    const [selectedSunlight, setSelectedSunlight] = useState("");
    const [selectedFlowers, setSelectedFlowers] = useState("");
    const [selectedPoisonous, setSelectedPoisonous] = useState("");
    const [searchedPlants, setSearchedPlants] = useState([]);
    const user = useSelector(usersData)
    const token = user?.credentials?.token
    const dispatch = useDispatch()
    const navigate = useNavigate()

    //ALL PLANTS
    const fetchPlants = () => {
        searchedPlants.length = 0;
        getAllPlants()
            .then((res) => setAllPlants(res.data))
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        fetchPlants();
    }, []);

    //NAME
    useEffect(() => {
        const bring = setTimeout(() => {
            getPlantByName(selectedName)
                .then((res) => setSearchedPlants(res.data))
                .catch((error) => console.log(error))
        }, 500)

        return () => clearTimeout(bring);
    }, [selectedName]);

    //WATERING
    const handleWatering = (e) => {
        setSelectedWatering(e.target.value);
    };

    useEffect(() => {
        getPlantByWatering(selectedWatering)
            .then((res) => setSearchedPlants(res.data))
            .catch((error) => console.log(error))
    }, [selectedWatering]);

    //SUNLIGHT
    const handleSunlight = (e) => {
        setSelectedSunlight(e.target.value);
    };

    useEffect(() => {
        getPlantBySunlight(selectedSunlight)
            .then((res) => setSearchedPlants(res.data))
            .catch((error) => console.log(error))
    }, [selectedSunlight]);

    //FLOWERS
    const handleFlowers = (e) => {
        if (e.target.value === "With flowers") {
            setSelectedFlowers(true);
        } else {
            setSelectedFlowers(false);
        }
    };

    useEffect(() => {
        searchedPlants.length = 0;
        getPlantByFlowers(selectedFlowers)
            .then((res) => setSearchedPlants(res.data))
            .catch((error) => console.log(error))
    }, [selectedFlowers]);

    //POISONOUS
    const handlePoisonous = (e) => {
        if (e.target.value === "Poisonous") {
            setSelectedPoisonous(true);
        } else {
            setSelectedPoisonous(false);
        }
    };

    useEffect(() => {
        searchedPlants.length = 0;
        getPlantByPoisonous(selectedPoisonous)
            .then((res) => setSearchedPlants(res.data))
            .catch((error) => console.log(error))
    }, [selectedPoisonous]);

    //DETAIL VIEW
    const handleDetail = (plant) => {
        if (token) {
            const plant_id = plant.id;

            getMyPlantByPlantId(plant_id, token)
                .then((res) => {
                    if (res.message !== 'Incorrect plant') {
                        dispatch(savePlant({ data: res.data }));
                    } else {
                        dispatch(savePlant({ data: plant }));
                    }
                    navigate('/detail');
                })
                .catch((error) => console.log(error))
        } else {
            dispatch(savePlant({ data: plant }));
            navigate('/detail');
        }
    };

    const wateringOptions = [
        { label: "Frequent", value: "Frequent" },
        { label: "Average", value: "Average" },
        { label: "Low", value: "Low" },
        { label: "Minimum", value: "Minimum" },
    ];

    const sunlightOptions = [
        { label: "Full Sun", value: "Full Sun" },
        { label: "Full Sun/Part Sun", value: "Full Sun/Part Sun" },
        { label: "Full sun/Part Shade", value: "Full sun/Part Shade" },
        { label: "Part Sun/Part Shade", value: "Part Sun/Part Shade" },
        { label: "Part Shade/Full Shade", value: "Part Shade/Full Shade" },
    ];

    const flowersOptions = [
        { label: "With flowers", value: "With flowers" },
        { label: "Without flowers", value: "Without flowers" },
    ];

    const poisonousOptions = [
        { label: "Poisonous", value: "Poisonous" },
        { label: "Not poisonous", value: "Not poisonous" },
    ];

    return (
        <div className="homeDesign">
            <div className="homeGreen">
                <div className="homePhoto"></div>
            </div>
            <div className="homeSearch">
                <h1 className="searchLetters">Search for your favourite plant</h1>
                <InputText
                    name={"name"}
                    placeholder={"Enter plant name"}
                    state={setSelectedName}
                    errorState={() => { }}
                />
            </div>
            <div className="d-md-flex mt-2 mt-md-5">
                <div>
                    <Form className="plantsMenu">
                        <div className="eachMenu">
                            WATERING
                            {wateringOptions.map((option) => (
                                <Form.Check
                                    key={option.value}
                                    label={option.label}
                                    value={option.value}
                                    name="options"
                                    type="radio"
                                    checked={selectedWatering === option.value}
                                    onChange={handleWatering}
                                />
                            ))}
                        </div>
                        <div className="eachMenu">
                            SUNLIGHT
                            {sunlightOptions.map((option) => (
                                <Form.Check
                                    key={option.value}
                                    label={option.label}
                                    value={option.value}
                                    name="options"
                                    type="radio"
                                    checked={selectedSunlight === option.value}
                                    onChange={handleSunlight}
                                />
                            ))}
                        </div>
                        <div className="eachMenu">
                            FLOWERS
                            {flowersOptions.map((option) => (
                                <Form.Check
                                    key={option.value}
                                    label={option.label}
                                    value={option.value}
                                    name="options"
                                    type="radio"
                                    checked={selectedFlowers === option.value}
                                    onChange={handleFlowers}
                                />
                            ))}
                        </div>
                        <div className="eachMenu">
                            POISONOUS
                            {poisonousOptions.map((option) => (
                                <Form.Check
                                    key={option.value}
                                    label={option.label}
                                    value={option.value}
                                    name="options"
                                    type="radio"
                                    checked={selectedPoisonous === option.value}
                                    onChange={handlePoisonous}
                                />
                            ))}
                        </div>
                    </Form>
                    <div className=" m-3 mx-md-5">
                        <CustomButton
                            name={"All plants"}
                            onClick={() => fetchPlants()}
                        ></CustomButton>
                    </div>
                </div>
                <div className="homeCards">

                    {searchedPlants.length > 0
                        ? (searchedPlants.map((plant) => {
                            return (
                                <CustomCard
                                    key={plant.id}
                                    common_name={plant.common_name}
                                    scientific_name={plant.scientific_name}
                                    sunlight={plant.sunlight}
                                    watering={plant.watering}
                                    image={plant.image}
                                    onClick={() => handleDetail(plant)}
                                ></CustomCard>
                            )
                        }))
                        : (allPlants.length > 0
                            ? (allPlants.map((plant) => {
                                return (
                                    <CustomCard
                                        key={plant.id}
                                        common_name={plant.common_name}
                                        scientific_name={plant.scientific_name}
                                        sunlight={plant.sunlight}
                                        watering={plant.watering}
                                        image={plant.image}
                                        onClick={() => handleDetail(plant)}
                                    ></CustomCard>
                                )
                            })
                            )
                            : (<div>Loading...</div>)
                        )
                    }
                </div>
            </div >
        </div>
    )
}
