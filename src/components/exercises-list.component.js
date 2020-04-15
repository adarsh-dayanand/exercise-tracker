import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

const Exercise = props => (
    <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0,10)}</td>
        <td>
            <Link className="btn btn-primary" to={"/edit/"+props.exercise._id}>Edit</Link> &nbsp;| &nbsp;
            <Button className="btn btn-danger" onClick={() => {props.deleteExercise(props.exercise._id)}}>Delete</Button>
                
        </td>
    </tr>
)

export default class ExercisesList extends Component {

    constructor(props) {
        super(props)

        this.deleteExercise = this.deleteExercise.bind(this)

        this.state = {exercises : []}

    }

    componentDidMount() {

        axios.get('http://localhost:3000/exercises/')
        .then((response) => {
            this.setState({exercises : response.data})
        })
        .catch((error) => console.log(error))
    }

    deleteExercise = (id) =>{
        axios.delete('http://localhost:3000/exercises/'+id)
        .then(res => console.log(res.data))
        //To remove the exercise from the UI.
        this.setState({
            exercises : this.state.exercises.filter(el => el._id !== id)
        })
    }

    exerciseList = () =>{
        return this.state.exercises.map(currentExercise => {
            return <Exercise exercise={currentExercise} deleteExercise={this.deleteExercise} key={currentExercise._id} />
        })
    }

    render() {
        return (
            <div>
                <h3>Logged Exercises List</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>User Name</th>
                            <th>Description</th>
                            <th>Duration (in minutes)</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.exerciseList()}
                    </tbody>
                </table>
            </div>
        )
    }
}