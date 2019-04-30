import React, { Component } from 'react';
import * as actions from 'services/actions';
import { connect } from "react-redux";
import { Droppable } from 'react-beautiful-dnd';

// Import components and styles
import Subjects from './Subjects';
import './styles.css';


class Semester extends Component {
  render() {
    const { id, type, semester, selected, data } = this.props;

    return (
      <div key={id} className={`${selected.subjectId && "subjectSelected"} semester`}>
        <h3 className="title">{id}</h3>
        <h5 className="subtitle">
          {Object.keys(semester).length} materias -
          {semester.map(id => data.subjects[id].credits).reduce((acc, a) => acc + a)} creditos
          {/* {semester.map(id => !data.subjects[id] ? console.log("LOLLOOO", id) : "")} */}
        </h5>

        {/* Subjects inside plan can be draggable */}
        {type === "plan" && <Droppable droppableId={id} >
          {provided => (
            <Subjects {...{id,semester, selected}}
              droppableProps={{
                ref: provided.innerRef,
                ...provided.droppableProps
              }}
              placeholder={provided.placeholder}
            />
          )}
        </Droppable>}

        {/* Subjects inside other areas (history and current) can't be moved */}
        {type !== "plan" && <Subjects {...{id,semester, selected}} />}

        {/* <div className="add button" onClick={() => this.addSubjectToSemester(id)}>+</div> */}
      </div>
    );
  }
}


const mapStateToProps = ({ data, selected }) => { return { data, selected } };
export default connect(mapStateToProps, actions)(Semester);
