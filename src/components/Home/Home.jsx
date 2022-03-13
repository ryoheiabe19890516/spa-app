import React from 'react';
// import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom'

function Home() {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Homeでっす</h1>
            <button onClick={() =>
                navigate("quiz")}>
                クイズページに移動
            </button>
        </div>
    )
}


export default Home;