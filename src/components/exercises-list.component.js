import React,{Component} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import Exercise from '../../backend/models/exercise.model';

export default class ExercisesList extends Component{

    constructor(props) {
        super(props);

        this.deleteExercise = this.deleteExercise.bind(this);

        this.state = {exercise: []};
    }

    componentDidMount() {
        axios.get('http://localhost:4000/exercise')
        then(response => {
            this.setState({ exercise: response.data})
        })

        .catch((error) => {
            console.log(error);
        })
    }

    deleteExercise(id) {
        axios.delete('http://localhost:4000/exercise/'+id)
        .then(res => console.log(res.data));

        this.setState({
            exercise: this.state.exercise.filter(el => el._id !== id)  //in mongo Db automatic id is created _id, that why used as this//
        })
    }

    exerciseList() {
        return this.state.exercise.map(currentexercise => {
            return <Exercise exercise = {currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id} />;
        })
    }

    render() {
        return(
            <div>
               <h3>Logged Exercises</h3>
               <table className="table">
                <thead className='thead-light'>
                    <tr>
                        <th>Username</th>
                        <th>Description</th>
                        <th>Duration</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {this.ExercisesList()}
                </tbody>
               </table>
            </div>
        )
    }
}