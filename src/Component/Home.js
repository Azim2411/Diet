import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MealPlan from './Meal';

export default function Home() {
    const navigate = useNavigate();
    const [Protien_intake, setProtien_intake] = useState(0);
    const [Carbs_intake, setCarbs_intake] = useState(0);
    const [week, setWeek] = useState(0);
    const [inputData, setData] = useState({});
    const [errors, setErrors] = useState("");
    const [mealType, setMealType] = useState("");

    useEffect(() => {
        const loggedIn = localStorage.getItem("diet_isLoggedIn");
        if (!loggedIn) {
            navigate("/login");
        }
    }, []);

    const logout = () => {
        localStorage.removeItem("diet_isLoggedIn");
        navigate("/login");
    };

    const search = () => {
        axios.post("http://13.201.194.184:8080/diet", { Carbs_intake, Protien_intake, week,mealType })
            .then((res) => {
                setData(res.data.data);
            })
            .catch((error) => {
                setErrors("Error fetching data. Please try again."); // Update error state
            });
    };
    console.log({ Carbs_intake, Protien_intake, week,mealType })
    return (
        <>
            {/* <button className="btn box-shadow" onClick={logout}>logout</button> */}
            <div className="login-wrapper vh-100 vw-100 ">
                <div className="container-fluid border vh-100 vw-100">
                    {/* <button className='btn btn-danger' onClick={()=>logout()}>Logout</button> */}
                    {errors && (
                        <div className="alert text-center alert-danger position-absolute" style={{ top: 0, right: 0, left: 0 }} role="alert">
                            {errors}
                        </div>
                    )}
                    {Object.keys(inputData).length < 1 ? (
                        <div className="row justify-content-center align-items-center vh-100 vw-100">
                            <div className="col-lg-4">
                                <div className="login-form box-shadow p-3">
                                    <input
                                        type="text"
                                        placeholder="Enter Protein"
                                        className="form-control mb-2"
                                        autoComplete={false}
                                        onChange={(e) => setProtien_intake(e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Enter Carbs Intake"
                                        className="form-control mb-2"
                                        autoComplete={false}
                                        onChange={(e) => setCarbs_intake(e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Enter Week"
                                        className="form-control mb-2"
                                        autoComplete={false}
                                        onChange={(e) => setWeek(e.target.value)}
                                    />
                                    <select
                                        type="text"
                                        placeholder="Enter Week"
                                        className="form-control mb-2"
                                        autoComplete={false}
                                        onChange={(e) => setMealType(e.target.value)}
                                    >
                                        <option value="">Select Meal Type</option>
                                        <option value="veg">Veg</option>
                                        <option value="nonveg">Non Veg</option>
                                    </select>

                                    <div className="text-center ">
                                        <button className="btn btn-dark box-shadow" onClick={search}>Get Diet Info</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <MealPlan data={inputData} />
                    )}
                </div>
            </div>
        </>
    );
}
