import React from "react"
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom"
import App from "../components/App"

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route component={App} path="/" />
                <Route render={() => <Redirect to="/" />} />
            </Switch>
        </BrowserRouter>
    )
}

export default AppRouter