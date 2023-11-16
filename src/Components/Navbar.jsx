import React from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

const Navbar = () => {
    return (
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                <Link class="navbar-brand" href="#">
                    Navbar
                </Link>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <form class="d-flex">
                        <Link to="/registration" classname="">
                            Registration
                        </Link>
                    </form>
                </div>
            </div>
        </nav>
    )
}

export default Navbar