import React, { Component } from 'react';
import { connect } from "react-redux";
import actions from 'services/actions';
// import './styles.css';

export default class Welcome extends Component {
  constructor() {
    super();

    this.cards = {
      login: {
        title: "Iniciar sesión",
        subtitle: "Ingresa las credenciales para acceder al administrador",
        fields: {
          email: { placeholder: "Correo electrónico", type: "email", required: true, value: "" },
          password: { placeholder: "Contraseña", type: "password", required: true, value: "" }
        },
        links: [{ text: "¿Olvidaste tu contraseña?", cardLink: "sendPasswordLink" }]
      },
      sendPasswordLink: {
        title: "Envíame el link",
        subtitle: "Ingresa el correo de tu cuenta para enviarte el link de recuperación de contraseña",
        fields: {
          email: { placeholder: "Correo electrónico", type: "email", required: true, value: "" }
        },
        links: [{ text: "¿Quieres iniciar sesión?", cardLink: "login" }]
      },
      recoverPassword: {
        title: "Cambiar contraseña",
        subtitle: "Ingresa la nueva contraseña de tu cuenta",
        fields: {
          password: { placeholder: "Nueva contraseña", type: "password", required: true, value: "" },
          confirmPassword: { placeholder: "Confirmar nueva contraseña", type: "password", required: true, value: "" }
        },
        links: [{ text: "¿Quieres iniciar sesión?", cardLink: "login" }]
      },
      linkSent: {
        title: "Enlace enviado",
        subtitle: "Revisa en la bandeja de entrada de tu correo. Puede que el mensaje haya llegado a la carpeta de spam.",
        links: [
          { text: "¿Necesitas que enviemos el link de nuevo?", cardLink: "sendPasswordLink" },
          { text: "¿Quieres iniciar sesión?", cardLink: "login" }
        ]
      }
    }

    this.state = {
      activeAction: undefined,
      card: undefined,
      error: undefined
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.openCardLink = this.openCardLink.bind(this);
    this.doCardAction = this.doCardAction.bind(this);
  }

  componentWillMount() {
    const card = this.cards[this.props.action];
    if(card) {
      this.setState({ activeAction: this.props.action, card: card });
    }
  }

  handleInputChange(event) {
    const { name, value } = event.target;
    let newState = this.state;
    newState.card.fields[name].value = value;
    this.setState(newState);
	}

  openCardLink(cardLink) {
    this.setState({ activeAction: cardLink, card: this.cards[cardLink], error: null });
  }

  doCardAction(action) {
    let params = [];

    this.setState({ error: null, loading: true });
    switch(action) {
      case 'login': {
        const { email, password } = this.state.card.fields;
        params = [email.value, password.value];
        actions[action](...params)
          .then(() => this.setState({ loading: false }))
          .catch(error => this.setState({ error, loading: false }));
        break;
      }
      case 'sendPasswordLink': {
        const { email } = this.state.card.fields;
        params = [email.value];
        actions[action](...params)
          .then(() => this.setState({ activeAction: 'linkSent', card: this.cards['linkSent'], loading: false }))
          .catch(error => this.setState({ error, loading: false }));
        break;
      }
    }
  }

  translateError(errorCode) {
    switch(errorCode) {
      case 'auth/user-not-found': return 'No hay un usuario registrado con este correo.';
      case 'auth/wrong-password': return 'Contraseña incorrecta para este correo.';
      case 'auth/too-many-requests': return 'Parece que has hecho muchos intentos. Espera unos minutos e intenta de nuevo';
      default: return 'Ha ocurrido un error. Por favor espera unos minutos e inténtalo de nuevo.';
    }
  }

	render() {
    const { action } = this.props;
    const { activeAction, error, loading } = this.state;
    const { title, subtitle, fields, links } = this.state.card;

    return(
      <div className="login">
        <div className="center">
          <div className="card">
            {loading && "Cargando ..."}
            <form id="card-form" onSubmit={() => this.doCardAction(activeAction)}>
              <h2 className="title">{title}</h2>
              <p className="subtitle">{subtitle}</p>
              {error && <p className="error">{this.translateError(error.code)}</p>}
              {fields && Object.keys(fields).map(key =>
                <input key={key} name={key} {...fields[key]} onChange={this.handleInputChange} />
              )}
              {links.map((link, i) =>
                <a className="link" key={i} href="#" onClick={() => this.openCardLink(link.cardLink)}>{link.text}</a>
              )}
            </form>
            {fields && <button fluid icon labelPosition='right' color="teal" type="submit" form="card-form">
              {title}
            </button>}
          </div>
        </div>
      </div>
    )
  }
}
