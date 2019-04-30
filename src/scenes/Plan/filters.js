import React, { Component } from 'react';


class Filters extends Component {
  render() {
    const { toggleActive, active } = this.props;

    return (
      <React.Fragment>
        <h3>Filtrar semestres:</h3>

        <div className={`checkbox button ${active.history && "active"}`} onClick={() => toggleActive("history")}>
          Pasados
        </div>
        <div className={`checkbox button ${active.plan && "active"}`} onClick={() => toggleActive("plan")}>
          Futuros
        </div>
      </React.Fragment>
    )
  }
}

export default Filters;
