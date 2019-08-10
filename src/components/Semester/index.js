import React, { Component } from 'react';
import * as actions from 'services/actions';
import { connect } from "react-redux";
import { Droppable } from 'react-beautiful-dnd';

// Import components and styles
import Subjects from './Subjects';
import './styles.css';


class Semester extends Component {
  state = {
    addSubject: false,
    subjectId: ""
  }

  handleInputChange({ target }) {
    const { value } = target;
    this.setState({ subjectId: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.addSubjectToSemester(this.props.id, this.state.subjectId);
    this.toggleAddSubject();
  }

  toggleAddSubject() {
    const { addSubject } = this.state;
    this.setState({ addSubject: !addSubject, subjectId: "" })
  }

  render() {
    const { id, type, semester, selected, data } = this.props;
    const { addSubject, subjectId } = this.state;

    return (
      <div key={id} className={`${selected.subjectId && "subjectSelected"} semester`}>
        <h3 className="title">{id}</h3>
        <h5 className="subtitle">
          {Object.keys(semester).length} materias -
          {semester.map(id => data.subjects[id].credits).reduce((acc, a) => acc + a)} creditos
        </h5>

        {/* Draggable subjects */}
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

        {/* Static subjects */}
        {type !== "plan" && <Subjects {...{id,semester, selected}} />}

        {addSubject && <form onSubmit={this.handleSubmit.bind(this)}>
          <input
            className="subject"
            autoFocus="autofocus"
            onChange={this.handleInputChange.bind(this)}
            placeholder="Código de la materia"
          />
          <button className="button" type="submit">Añadir</button>
        </form>}

        <div className="add button" onClick={this.toggleAddSubject.bind(this)}>
          {!addSubject ? "Añadir materia" : "Cancelar"}
        </div>
        {/* this.props.addSubjectToSemester(id, subjectId) */}
      </div>
    );
  }
}


const mapStateToProps = ({ data, selected, addSubjectToSemester }) => { return { data, selected } };
export default connect(mapStateToProps, actions)(Semester);
