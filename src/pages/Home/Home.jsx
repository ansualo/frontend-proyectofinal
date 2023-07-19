import React, { useEffect, useState } from "react";
import './Home.css'
import { InputText } from "../../common/InputText/InputText";
import { CustomCard } from "../../common/CustomCard/CustomCard";
import { getAllPlants } from "../../services/apiCalls";


export const Home = () => {

    const [allPlants, setAllPlants] = useState([]);

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
            <div className="homeCards">
                {allPlants.length > 0
                    ? (allPlants.map((plant) => {
                        return (
                            <CustomCard
                                key={plant.id}
                                common_name={plant.common_name}
                                sunlight={plant.sunlight}
                                watering={plant.watering}
                            ></CustomCard>
                        )
                    }))
                    : (<div>Loading...</div>)
                }
            </div>
        </div >
    )
}