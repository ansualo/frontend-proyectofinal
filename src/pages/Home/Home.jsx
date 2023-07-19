import React, { useEffect, useState } from "react";
import './Home.css'
import { InputText } from "../../common/InputText/InputText";
import { CustomCard } from "../../common/CustomCard/CustomCard";
import { getAllPlants, getPlantByWatering, getPlantBySunlight } from "../../services/apiCalls";
import Form from 'react-bootstrap/Form';


export const Home = () => {

    const [allPlants, setAllPlants] = useState([]);
    const [selectedWatering, setSelectedWatering] = useState("");
    const [plantsByWatering, setPlantsByWatering] = useState([])
    const [selectedSunlight, setSelectedSunlight] = useState("");
    const [plantsBySunlight, setPlantsBySunlight] = useState([])

    useEffect(() => {
        if (allPlants.length === 0) {
            getAllPlants()
                .then((res) => {
                    console.log(res.data)
                    setAllPlants(res.data)
                })
                .catch((error) => console.log(error))
        }
    }, [])

    const handleWatering = (e) => {
        setSelectedWatering(e.target.value);
    };

    useEffect(() => {
        console.log(selectedWatering);
        getPlantByWatering(selectedWatering)
            .then((res) => setPlantsByWatering(res.data))
    }, [selectedWatering]);

    const handleSunlight = (e) => {
        setSelectedSunlight(e.target.value);
    };

    useEffect(() => {
        console.log(selectedSunlight);
        getPlantBySunlight(selectedSunlight)
            .then((res) => setPlantsBySunlight(res.data))
    }, [selectedSunlight]);


    return (
        <div className="homeDesign">
            <div className="homeGreen">
                <div className="homePhoto"></div>
            </div>
            <div className="homeSearch">
                <h1 className="searchLetters">Search for your favourite plant</h1>
                <InputText
                    name="plant"
                    placeholder="Enter plant name">
                </InputText>
            </div>
            <div className="plantsMenu">
                <div className="eachMenu">
                    <Form className="mb-3">
                        WATERING
                        <Form.Check
                            label="Frequent"
                            value="Frequent"
                            name="watering"
                            type="radio"
                            checked={selectedWatering === 'Frequent'}
                            onChange={handleWatering}
                        />
                        <Form.Check
                            label="Average"
                            value="Average"
                            name="watering"
                            type="radio"
                            checked={selectedWatering === 'Average'}
                            onChange={handleWatering}
                        />
                        <Form.Check
                            label="Low"
                            value="Low"
                            name="watering"
                            type="radio"
                            checked={selectedWatering === 'Low'}
                            onChange={handleWatering}
                        />
                        <Form.Check
                            label="Minimum"
                            value="Minimum"
                            name="watering"
                            type="radio"
                            checked={selectedWatering === 'Minimum'}
                            onChange={handleWatering}
                        />
                    </Form>
                </div>
                <div className="eachMenu">
                    <Form className="mb-3">
                        SUNLIGHT
                        <Form.Check
                            label="Full Sun"
                            value="Full Sun"
                            name="sunlight"
                            type="radio"
                            checked={selectedSunlight === 'Full Sun'}
                            onChange={handleSunlight}
                        />
                        <Form.Check
                            label="Full Sun/Part Sun"
                            value="Full Sun/Part Sun"
                            name="sunlight"
                            type="radio"
                            checked={selectedSunlight === 'Full Sun/Part Sun'}
                            onChange={handleSunlight}
                        />
                        <Form.Check
                            label="Full sun/Part Shade"
                            value="Full sun/Part Shade"
                            name="sunlight"
                            type="radio"
                            checked={selectedSunlight === 'Full sun/Part Shade'}
                            onChange={handleSunlight}
                        />
                        <Form.Check
                            label="Part Sun/Part Shade"
                            value="Part Sun/Part Shade"
                            name="sunlight"
                            type="radio"
                            checked={selectedSunlight === 'Part Sun/Part Shade'}
                            onChange={handleSunlight}
                        />
                        <Form.Check
                            label="Part Shade/Full Shade"
                            value="Part Shade/Full Shade"
                            name="sunlight"
                            type="radio"
                            checked={selectedSunlight === 'Part Shade/Full Shade'}
                            onChange={handleSunlight}
                        />
                    </Form>
                </div>
            </div>
            <div className="homeCards">

                {plantsByWatering.length > 0
                    ? (plantsByWatering.map((plant) => {
                        return (
                            <CustomCard
                                key={plant.id}
                                common_name={plant.common_name}
                                sunlight={plant.sunlight}
                                watering={plant.watering}
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
                                                ></CustomCard>
                                            )
                                        })
                                    )
                                    : (<div>Loading...</div>)
                            ))
                }
            </div>
        </div >
    )
}
