import React, { Component } from 'react';
import actions from 'services/actions';
import { connect } from "react-redux";
import Subject from 'components/Subject';
import { Draggable } from 'react-beautiful-dnd';


class Subjects extends Component {
  getSubjectById(id) {
    const { subjects } = this.props.data;
    return subjects[id];
  }

  handleSubjectClick(subjectId) {
    const { selected, selectSubject, deselectSubject } = this.props;
    if(selected.subjectId !== subjectId) {
      const prerequisites = this.getSubjectById(subjectId).prerequisites;
      selectSubject(subjectId, prerequisites);
    } else {
      deselectSubject();
    }
  }

  render() {
    const { id, semester, selected, droppableProps, placeholder } = this.props;

    return <div className="subjects" {...droppableProps}>
      {semester.map((subjectId, index) => {
        if(droppableProps) {
          return <Draggable key={`${id}/${subjectId}`} draggableId={`${id}/${subjectId}`} index={index}>
            {provided => <Subject key={subjectId} id={subjectId} provided={provided}
              isSelected={selected && selected.subjectId === subjectId}
              isPrerequisite={selected && selected.prerequisites.indexOf(subjectId) !== -1}
              onClick={() => this.handleSubjectClick(subjectId)}
              onRemove={() => this.props.removeSubjectFromSemester(id, index)} />}
          </Draggable>
        } else {
          return <Subject key={subjectId} id={subjectId} provided={{}}
            isSelected={selected && selected.subjectId === subjectId}
            isPrerequisite={selected && selected.prerequisites.indexOf(subjectId) !== -1}
            onClick={() => this.handleSubjectClick(subjectId)}
            onRemove={() => this.props.removeSubjectFromSemester(id, subjectId)} />
        }
      })}
      {placeholder}
    </div>
  }
}


const mapStateToProps = ({ data, selected }) => { return { data, selected } };
export default connect(mapStateToProps, actions)(Subjects);
