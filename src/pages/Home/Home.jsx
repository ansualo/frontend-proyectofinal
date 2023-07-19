import React, { useEffect, useState } from "react";
import './Home.css'
import { InputText } from "../../common/InputText/InputText";
import { CustomCard } from "../../common/CustomCard/CustomCard";
import { getAllPlants, getPlantByWatering } from "../../services/apiCalls";
import Form from 'react-bootstrap/Form';


export const Home = () => {

    const [allPlants, setAllPlants] = useState([]);
    const [selectedWatering, setSelectedWatering] = useState("");
    const [plantsByWatering, setPlantsByWatering] = useState([])

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
            <div>
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
                    )
                }
            </div>
        </div >
    )
}
