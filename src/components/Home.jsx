import React from "react";
import axios from "axios";
import { Box } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { Heading } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import ClearImg from "../assets/clear.png"
import CloudsImg from "../assets/clouds.png"
import RainImg from "../assets/rain.png"
import Drizzle from "../assets/drizzle.png"
import Humidity from "../assets/humidity.png"
import Snow from "../assets/snow.png"
import Wind from "../assets/wind.png"


export default function Home(){

    const weatherStatus = {
        clear: ClearImg,
        cloud: CloudsImg,
        rain: RainImg,
        drizzle: Drizzle,
        snow: Snow
    }
    const key = import.meta.env.VITE_SOME_KEY
    const [data,setData] = React.useState({
        celcius:"20",
        city:"Kathmandu",
        country:"NP",
        humidity:"30",
        wind:"3",
        image: CloudsImg
    })

    const [name,setName] = React.useState("");
    const [error,setError] = React.useState("");

    function handleClick(){
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${key}&units=metric`
        axios.get(url)
        .then(res => {
            setData(prevData => {
                return{
                    ...prevData,
                    celcius: res.data.main.temp,
                    city:res.data.name,
                    country:res.data.sys.country,
                    humidity:res.data.main.humidity,
                    wind:res.data.wind.speed,
                    image: weatherStatus[res.data.weather[0].main.toLowerCase()]
                }
            })
            setError("");
        })
        .catch(err => {
            if(err.response.status === 404){
                setError("CITY NOT FOUND!")
            }
            else if(err.response.status === 400){
                setError("ENTER SOMETHING!")
            }
        })
    }
    return(
        <Box w="100%" maxW="500px" h="629px" m=".5rem auto auto auto" borderRadius="12px" bg="linear-gradient(to top, #8e44ad, #3498db);" className="container">
            <Box className="weather">
                <Box paddingTop="1rem" display="flex" gap=".5rem"  justifyContent="center" alignItems="center" className="search">
                    <Input
                     borderRadius="20px"
                     name="name"
                     size="md"
                     onChange={(event) => setName(event.target.value)}
                     bg="white"
                     width="auto"
                     placeholder="Search" 
                    />
                    <IconButton onClick={handleClick} borderRadius="25px" aria-label="search" icon={<SearchIcon />} />
                </Box>
                <Text textAlign="center" color="yellow" className="error">{error}</Text>
                <Box h="224px" display="flex" alignItems="center" justifyContent="center" className="weather-img">
                    <img
                     src={data.image} 
                     alt="ESKO LAGI TA PHOTO NAI PAYENA" 
                    />
                </Box>
                <Heading fontWeight="400" className="weather-temp" color="white" textAlign="center" as="h1" fontSize="7rem">
                    {Math.round(data.celcius) + '°c'}
                </Heading>
                <Text className="weather-location" color="white" textAlign="center" fontSize="2xl">
                    {data.city + "," + data.country}
                </Text>
                <Box paddingTop="auto 2rem auto 2rem" display="flex" alignItems="center" justifyContent="space-between" className="data-container">
                    <Box flexDir="column" display="flex" alignItems="center" padding="50px" className="element">
                        <img src={Humidity} alt="humidity-icon" />
                        <Text color="white">Humidity</Text>
                        <Text color="white">{Math.round(data.humidity) + "%"}</Text>
                    </Box>
                    <Box flexDir="column" display="flex" alignItems="center" padding="50px" className="element">
                        <img src={Wind} alt="wind-icon" />
                        <Text color="white">Wind</Text>
                        <Text color="white">{Math.round(data.wind) + "km/h"}</Text>

                    </Box>
                </Box>
            </Box> 
        </Box>
    )
}