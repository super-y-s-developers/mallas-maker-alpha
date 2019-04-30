import React, { Component } from 'react';
import * as actions from 'services/actions';
import { connect } from "react-redux";
import './styles.css';


class Subject extends Component {
  state = {
    subject: {}
  };

  componentWillMount() {
    const { id, data } = this.props;
    this.setState({ subject: data.subjects[id] });
  }

  render() {
    const { id, isPrerequisite, isSelected, onRemove, onClick, provided } = this.props;
    const { title, type, credits } = this.state.subject;

    return (
      <div className={`subject ${isPrerequisite && "prerequisite"} ${isSelected && "selected"}`}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
      >
        <div className="data">
          <h5 className="title" onClick={onClick}>{title}</h5>
          <div className="remove button" onClick={(onRemove)}>X</div>
        </div>
        <div className="metadata" onClick={onClick}>
          <div className="code">{id}</div>
          <div
            className="type"
            style={{backgroundColor: colors[type], border: `1.5px solid ${colors[type]}`}}
          >
            {type}
          </div>
          <div className="credits">{credits}</div>
        </div>
      </div>
    );
  }
}

const colors = {'C': "#845EC2", 'P': "#FF6F91", 'B': "#FFC75F", 'L': "#00BCD4", 'M': "#D65DB1"};
// const colors2 = ["#845EC2", "#D65DB1", "#FF6F91", "#FF9671", "#FFC75F", "#00BCD4", "#00818A", "#2FAF91"];

const mapStateToProps = ({ data }) => { return { data } };
export default connect(mapStateToProps, actions)(Subject);
