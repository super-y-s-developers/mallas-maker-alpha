import React, { Component } from 'react';
import actions from 'services/actions';
import { connect } from "react-redux";
import { DragDropContext } from 'react-beautiful-dnd';

// Import components and styles
import Filters from './filters';
import Semester from 'components/Semester';
import './styles.css';


class Plan extends Component {
  state = {
    active: { history: false, plan: true }
  }

  constructor(props) {
    super(props);
    this.toggleActive = this.toggleActive.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  componentWillMount() {
    this.props.fetchData();
  }

  getStudentById(id) {
    const student = this.props.students[id];
    return student ? student : {};
  }

  getStudentSubjects(history, plan) {
    const planSubjects = Object.keys(plan).map(e => { return plan[e] }).join().split(',');
    const historySubjects = Object.keys(history).map(e => { return Object.keys(history[e]) }).join().split(',');

    let subjects = [ ...planSubjects, ...historySubjects ];
    // leave only the unique objects
    subjects = subjects.map((e, i, final) => final.indexOf(e) === i && i)
      .filter(e => subjects[e]).map(e => subjects[e]);

    return subjects;
  }

  toggleActive(id) {
    const oldActive = this.state.active;
    const newActive = Object.assign({}, oldActive, {[id]: !oldActive[id]});
    this.setState(prevState => {
      return { ...prevState, active: newActive }
    });
  }

  onDragEnd(result) {
    const { destination, source, draggableId } = result;

    // Verify successful dragging to a diferent destination
    if(!destination || (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )) {
      return;
    }
    // Take action after dragging
    else {
      const { plan } = this.getStudentById(this.props.currUser.uid);
      const semesterSource = {
        id: source.droppableId,
        data: plan[source.droppableId],
        index: source.index
      };
      const semesterDestination = {
        id: destination.droppableId,
        data: plan[destination.droppableId],
        index: destination.index
      };
      const subjectId = draggableId.split('/')[1];
      this.props.reorderPlanSubject(semesterSource, semesterDestination, subjectId);
    }
  }

  render() {
    const { active } = this.state;
    const { plan, history, career } = this.getStudentById(this.props.currUser.uid);
    const { careers } = this.props.data;

    const studentSubjects = history && plan ? this.getStudentSubjects(history, plan) : [];
    const remainingSubjects = careers && career ? careers[career].subjects.filter(e => studentSubjects.indexOf(e) === -1) : [];

    return (
      <div className="App">
        <button className="button" onClick={this.props.signOut}>Cerrar sesión</button>

        <Filters active={active} toggleActive={this.toggleActive} />
        <div>{careers && career && remainingSubjects.length === 0 ?
          `😄 No te falta incluir ninguna materia de ${careers[career].title} en tu malla!` :
          careers && career && `Te falta incluir las siguientes materias para graduarte de ${careers[career].title}:
            ${remainingSubjects.join()}`
        }</div>

        <DragDropContext
          onDragEnd={this.onDragEnd}
        >
          <div className="semesters">
            {history && active.history && Object.keys(history).map(semesterId =>
              <Semester
                key={semesterId}
                id={semesterId}
                semester={Object.keys(history[semesterId])}
                type="history"
              />
            )}
            {plan && active.plan && Object.keys(plan).map(semesterId =>
              <Semester
                key={semesterId}
                id={semesterId}
                semester={plan[semesterId]}
                type="plan"
              />
            )}
            {/* {active.plan && <div className="add button"
              onClick={() => this.props.addPlanSemester(['0000001'])}
            >
              Añadir semestre
            </div>} */}
          </div>
        </DragDropContext>
      </div>
    );
  }
}


const mapStateToProps = ({ students, data, currUser }) => { return { students, data, currUser } };
export default connect(mapStateToProps, actions)(Plan);
