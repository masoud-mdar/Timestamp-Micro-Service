import React from "react"
import { useForm } from "react-hook-form"
import { Form, Button } from "react-bootstrap"
import axios from "axios"
import Swal from "sweetalert2"
const BASE_API_URL = "https://timestamp-masoud.herokuapp.com/"

const App = (props) => {

    const {register, handleSubmit} = useForm()

    const onSubmit = async (data) => {

        try {
            let result = await axios.post(`${BASE_API_URL}/api/timestamp`, {
                data
            })

            if (result.data.utc && result.data.unix) {

                Swal.fire(`${result.data.utc}`, `unix: ${result.data.unix}`, "success").then(
                    (result) => {
                        if (result.isConfirmed || result.isDismissed) {
                            console.log("result confirmed")
                        }
                    }
                )
            } else {
                Swal.fire({
                    icon:"error",
                    title: "Oops!"
                })
            }



        } catch (error) {
            if (error.response) {

                Swal.fire({
                    icon:"error",
                    title: "Oops!",
                    text: error.response.data
                })
            }
        }
        
    }

    return (
        <div className="container">
            <h1>Timestamp Micro Service</h1>
            <Form className="input-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="col-md-6 offset-md-3 div">
                    <Form.Group controlId="date">
                        <Form.Control
                            type="text"
                            name="date"
                            placeholder="enter a date..."
                            autoComplete="off"
                            {...register("date")}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        submit
                    </Button>
                </div>
            </Form>
        </div>

    )
}

export default App