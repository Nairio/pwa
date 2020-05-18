import React from "react";
import {Link} from "react-router-dom";

export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {hasError: false};
    }

    componentDidCatch(error, info) {
        this.setState({hasError: true});
    }

    render() {
        if (this.state.hasError) {
            return (
                <React.Fragment>
                    <h1>Что-то пошло не так.</h1>
                    <Link to="/">
                        <button>Вернуться</button>
                    </Link>
                </React.Fragment>
            )
        }
        return this.props.children;
    }
}
