import React, { useEffect } from 'react';
import axios from "axios";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { setLogout } from "../redux/authSlice";

function HomePage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state)=> state.user);
    const token = useSelector((state)=> state.token);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/v1/users/verify',
                { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json"} });
                if (response.status !== 200) {
                    dispatch(
                        setLogout()
                    );
                    navigate("/login");
                }
            } catch (err) {
                dispatch(
                    setLogout()
                );
                navigate("/login");
            }
        };
        checkAuth();
    }, [dispatch, navigate, token]);


    return (
        <div>
            {user && (<h2>Hello {user.name}</h2>)}
        </div>
    );
};

export default HomePage;

