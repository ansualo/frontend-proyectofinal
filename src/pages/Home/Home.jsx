import React, { useEffect, useState } from "react";
import './Home.css'
import { InputText } from "../../common/InputText/InputText";
import { CustomCard } from "../../common/CustomCard/CustomCard";
import { getAllPlants, getPlantByWatering, getPlantBySunlight, getPlantByName, getMyPlantByPlantId } from "../../services/apiCalls";
import Form from 'react-bootstrap/Form';
import { CustomButton } from "../../common/CustomButton/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { usersData } from "../userSlice";
import { savePlant } from "../plantSlice";


export const Home = () => {

    const [allPlants, setAllPlants] = useState([]);
    const [searchedName, setSearchedName] = useState("");
    const [plantsByName, setPlantsByName] = useState([]);
    const [selectedWatering, setSelectedWatering] = useState("");
    const [plantsByWatering, setPlantsByWatering] = useState([]);
    const [selectedSunlight, setSelectedSunlight] = useState("");
    const [plantsBySunlight, setPlantsBySunlight] = useState([]);
    const user = useSelector(usersData)
    const token = user?.credentials?.token
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const fetchPlants = () => {
        plantsByName.length = 0
        plantsBySunlight.length = 0
        plantsByWatering.length = 0
        getAllPlants()
            .then((res) => {
                setAllPlants(res.data);
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        if (allPlants.length === 0) {
            fetchPlants();
        }
    }, []);

    useEffect(() => {
        plantsBySunlight.length = 0
        plantsByWatering.length = 0
        const bring = setTimeout(() => {
            getPlantByName(searchedName)
                .then((res) => setPlantsByName(res.data))
                .catch((error) => console.log(error))
        }, 500)

        return () => clearTimeout(bring);
    }, [searchedName]);


    const handleWatering = (e) => {
        setSelectedWatering(e.target.value);
    };

    useEffect(() => {
        plantsByName.length = 0
        plantsBySunlight.length = 0
        getPlantByWatering(selectedWatering)
            .then((res) => setPlantsByWatering(res.data))
            .catch((error) => console.log(error))
    }, [selectedWatering]);

    const handleSunlight = (e) => {
        setSelectedSunlight(e.target.value);
    };

    useEffect(() => {
        plantsByName.length = 0
        plantsByWatering.length = 0
        getPlantBySunlight(selectedSunlight)
            .then((res) => setPlantsBySunlight(res.data))
            .catch((error) => console.log(error))
    }, [selectedSunlight]);


    const handleDetail = (plant) => {
        if(token){
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
                    state={setSearchedName}
                    errorState={() => { }}
                >
                </InputText>
            </div>
            <div>
                <Form className="mb-3 plantsMenu">
                    <div className="eachMenu">
                        WATERING
                        <Form.Check
                            label="Frequent"
                            value="Frequent"
                            name="options"
                            type="radio"
                            checked={selectedWatering === 'Frequent'}
                            onChange={handleWatering}
                        />
                        <Form.Check
                            label="Average"
                            value="Average"
                            name="options"
                            type="radio"
                            checked={selectedWatering === 'Average'}
                            onChange={handleWatering}
                        />
                        <Form.Check
                            label="Low"
                            value="Low"
                            name="options"
                            type="radio"
                            checked={selectedWatering === 'Low'}
                            onChange={handleWatering}
                        />
                        <Form.Check
                            label="Minimum"
                            value="Minimum"
                            name="options"
                            type="radio"
                            checked={selectedWatering === 'Minimum'}
                            onChange={handleWatering}
                        />
                    </div>
                    <div className="eachMenu">
                        SUNLIGHT
                        <Form.Check
                            label="Full Sun"
                            value="Full Sun"
                            name="options"
                            type="radio"
                            checked={selectedSunlight === 'Full Sun'}
                            onChange={handleSunlight}
                        />
                        <Form.Check
                            label="Full Sun/Part Sun"
                            value="Full Sun/Part Sun"
                            name="options"
                            type="radio"
                            checked={selectedSunlight === 'Full Sun/Part Sun'}
                            onChange={handleSunlight}
                        />
                        <Form.Check
                            label="Full sun/Part Shade"
                            value="Full sun/Part Shade"
                            name="options"
                            type="radio"
                            checked={selectedSunlight === 'Full sun/Part Shade'}
                            onChange={handleSunlight}
                        />
                        <Form.Check
                            label="Part Sun/Part Shade"
                            value="Part Sun/Part Shade"
                            name="options"
                            type="radio"
                            checked={selectedSunlight === 'Part Sun/Part Shade'}
                            onChange={handleSunlight}
                        />
                        <Form.Check
                            label="Part Shade/Full Shade"
                            value="Part Shade/Full Shade"
                            name="options"
                            type="radio"
                            checked={selectedSunlight === 'Part Shade/Full Shade'}
                            onChange={handleSunlight}
                        />
                    </div>
                </Form>
                <CustomButton
                    name={"All plants"}
                    onClick={() => fetchPlants()}
                ></CustomButton>
            </div>
            <div className="homeCards">

                {plantsByName.length > 0
                    ? (plantsByName.map((plant) => {
                        return (
                            <CustomCard
                                key={plant.id}
                                common_name={plant.common_name}
                                sunlight={plant.sunlight}
                                watering={plant.watering}
                                onClick={() => handleDetail(plant)}
                            ></CustomCard>
                        )
                    }))
                    : (plantsByWatering.length > 0
                        ? (plantsByWatering.map((plant) => {
                            return (
                                <CustomCard
                                    key={plant.id}
                                    common_name={plant.common_name}
                                    sunlight={plant.sunlight}
                                    watering={plant.watering}
                                    onClick={() => handleDetail(plant)}
                                ></CustomCard>
                            )
                        }))
                        : (
                            plantsBySunlight.length > 0
                                ? (
                                    (plantsBySunlight.map((plant) => {
                                        return (
                                            <CustomCard
                                                key={plant.id}
                                                common_name={plant.common_name}
                                                sunlight={plant.sunlight}
                                                watering={plant.watering}
                                                onClick={() => handleDetail(plant)}
                                            ></CustomCard>
                                        )
                                    }))
                                )
                                : (
                                    allPlants.length > 0
                                        ? (
                                            allPlants.map((plant) => {
                                                return (
                                                    <CustomCard
                                                        key={plant.id}
                                                        common_name={plant.common_name}
                                                        sunlight={plant.sunlight}
                                                        watering={plant.watering}
                                                        onClick={() => handleDetail(plant)}
                                                    ></CustomCard>
                                                )
                                            })
                                        )
                                        : (<div>Loading...</div>)
                                ))
                    )
                }
            </div>
        </div >
    )
}
