import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { registerUser } from "../actions/authActions";
import className from "classnames";
import { useHistory } from "react-router-dom";
//import store from "../store";
import { useSelector } from "react-redux"
import { useDispatch } from 'react-redux';


function Register() {
    const auth = useSelector(state => state);
    const { errors } = auth;
    const dispatch = useDispatch();
    //console.log(store);
    const history = useHistory();

    const [detail, setDetail] = useState({
        email: "",
        name: "",
        password1: "",
        password2: "",
        errors: {}
    });

    function componentDidMount() {

        if (auth.isAuthenticated) {
            history.push("/dashboard");
        }
    }

    function componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            setDetail(prev => ({
                ...prev,
                errors: nextProps.errors
            }))
        }
    }
    //const { errors } = detail;

    function onChange(e) {
        const { value, name } = e.target;
        setDetail(prev => ({ ...prev, [name]: value }))
    }
    function onSubmit(e) {
        e.preventDefault();
        // console.log("subit" + detail);

        registerUser(detail, history)(dispatch);
        //console.log(registerUser);
    }



    return <div className="container">
        <div className="row">
            <div className="col s8 offset-s2">
                <Link to="/" className="btn-flat waves-effect">
                    <i className="material-icons left">keyboard_backspace</i> Back to
         home
       </Link>
                <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                    <h4>
                        <b>Register</b> below
         </h4>
                    <p className="grey-text text-darken-1">
                        Already have an account? <Link to="/login">Log in</Link>
                    </p>
                </div>
                <form noValidate onSubmit={onSubmit}>
                    <div className="input-field col s12">
                        <input
                            onChange={onChange}
                            value={detail.name}
                            error={errors.name}
                            id="name"
                            type="text"
                            name="name"
                            className={className("", {
                                invalid: errors.name
                            })}
                        />
                        <label htmlFor="name">Name</label>
                        <span className="red-text">{errors.name}</span>
                    </div>
                    <div className="input-field col s12">
                        <input
                            onChange={onChange}
                            value={detail.email}
                            error={errors.email}
                            id="email"
                            type="email"
                            name="email"
                            className={className("", {
                                invalid: errors.email
                            })}
                        />
                        <label htmlFor="email">Email</label>
                        <span className="red-text">{errors.email}</span>
                    </div>
                    <div className="input-field col s12">
                        <input
                            onChange={onChange}
                            value={detail.password1}
                            error={errors.password1}
                            id="password"
                            type="password"
                            name="password1"
                            className={className("", {
                                invalid: errors.password
                            })}
                        />
                        <label htmlFor="password">Password</label>
                        <span className="red-text">{errors.password}</span>
                    </div>
                    <div className="input-field col s12">
                        <input
                            onChange={onChange}
                            value={detail.password2}
                            error={errors.password2}
                            id="password2"
                            type="password"
                            name="password2"
                            className={className("", {
                                invalid: errors.password2
                            })}
                        />
                        <label htmlFor="password2">Confirm Password</label>
                        <span className="red-text">{errors.password2}</span>
                    </div>
                    <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                        <button
                            style={{
                                width: "150px",
                                borderRadius: "3px",
                                letterSpacing: "1.5px",
                                marginTop: "1rem"
                            }}
                            type="submit"
                            className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                            name="sub"
                        >
                            Sign up
           </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
}


Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};


const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(
    mapStateToProps,
    { registerUser }
)(withRouter(Register));