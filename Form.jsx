import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Form = (props) => {
    const [form, setFrom] = useState({
        title: "",
        price: 0, //clearly we set in 0
        description: "" 
    })

    const [productS, setProducts] = useState([]);

    // useEffect(() => {
    //     axios.get("http://localhost:8000/findall")
    //         .then(res => {
    //             console.log(res.data.results)
    //             setProducts(res.data.results)
    //         })
    //         .catch(err => console.log("Error!!", err))
    // }, [])

    const oneChangeHandler = (event) => {
        setFrom({
            ...form,
            [event.target.name]: event.target.value,
        })
    }

    const OneSubmithandler = (event) => {
        event.preventDefault();
        console.log(form);
        // sending the info to our backend with axios post request and the form
        axios.post("http://localhost:8000/create", form)
            .then(res => {
                console.log(res);
                setProducts([...productS, form]); //why like this?
            })
            .catch(err => console.log("oh no :(", err))
    }

    return (
        <div>
            <form onSubmit={OneSubmithandler}>
                <div className="wrap">
                    <h2>Product Manager</h2>
                    <div className="line">
                        <label htmlFor="title">titulo:</label>
                        <input id="title" name="title" onChange={oneChangeHandler}></input>
                    </div>
                    <div className="line">
                        <label htmlFor="price">price:</label>
                        <input type="number" id="price" name="price" onChange={oneChangeHandler}></input>
                    </div>
                    <div className="line">
                        <label htmlFor="description">description:</label>
                        <textarea placeholder="comment" id="description" name="description" style={{ width: 145 }} onChange={oneChangeHandler}></textarea>
                    </div>
                </div>
                <button type="submit">create</button>
            </form>
            <div>
                <h4>all of them?</h4>
                <ul>
                    {
                        productS.map((product, i) => {
                            return <li key={i}>{product.title}</li>
                        })
                    }
                </ul>
            </div>
        </div>
    )
}
export default Form