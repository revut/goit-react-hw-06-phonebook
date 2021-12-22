import { useState, useEffect } from "react";
// import React, { Component } from "react";
// import { useLocalStorage } from "react-use";

import ContactForm from "../ContactForm/ContactForm";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../redux/contacts/contactsAction.js";
import Filter from "../Fliter/Filter";
import ContactList from "./ContactList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as storage from "../../services/localStorage";
import "./Phonebook.css";
import { AiFillPlusSquare } from "react-icons/ai";

const STORAGE_KEY = "contacts";

const Phonebook = () => {
  // // const [contacts, setContacts] = useLocalStorage(STORAGE_KEY, []);
  // const [filter, setFilter] = useState("");
  const contacts = useSelector(
    (state) =>
      // storage.get(STORAGE_KEY) ??
      state.contacts.items
  );
  const filter = useSelector((state) => state.contacts.filter);
  const dispatch = useDispatch();

  //локал сторадж
  // useEffect(() => {
  //   storage.save(STORAGE_KEY, contacts);
  // }, [contacts]);

  // додавання // setContacts([...contacts, newContact]);
  const handleCreate = (newContact) => {
    dispatch(actions.createContacts(newContact));
    // setContacts((prevState) => [...prevState, newContact]);
  };

  // видалення // setContacts(contacts.filter((contact) => contact.id !== ev.target.id));
  const handleDelete = (ev) => {
    dispatch(actions.deleteContacts(contacts.id));
  };
  // пошук по імені
  const handleFilter = (value) => dispatch(actions.changeFilter());
  const getFilter = () => {
    return contacts.filter((el) =>
      el.name.toLowerCase().includes(filter.toLowerCase())
    );
  };
  return (
    <div className="main">
      <h1 className="hero">
        <AiFillPlusSquare color="#f57b0b" className="icon" />
        Телефонна книга
      </h1>
      <ContactForm allContacts={contacts} onSubmit={handleCreate} />
      <h2 className="title">Список контактів</h2>
      <Filter />
      <ContactList lists={getFilter()} onClick={handleDelete} />
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};
// const mapStateToProps = (state) => ({});
// const mapDispatchToPTops = (dispatch) => ({});

// const connectContacts = connect(mapStateToProps, mapDispatchToPTops);
export default Phonebook;

// export default class Phonebook extends React.Component {
//   state = {
//     contacts: [],
//     filter: "",
//   };

//   componentDidMount() {
//     const savedContact = storage.get(STORAGE_KEY);
//     if (savedContact) {
//       this.setState({ contacts: savedContact });
//     }
//   }

//   componentDidUpdate(prevProps, prevState) {
//     const { contacts } = this.state;
//     if (prevState.contacts !== contacts) {
//       storage.save(STORAGE_KEY, contacts);
//     }
//   }

//   //зміни;
//   handleChange = (e) => {
//     const { name, value } = e.currentTarget;
//     this.setState({ [name]: value });
//   };
//   // створення;
//   handleCreate = (newContact) => {
//     this.setState((prevState) => ({
//       contacts: [...prevState.contacts, newContact],
//     }));
//   };
//   //видалення
//   handleDelete = (ev) => {
//     this.setState((prevState) => ({
//       contacts: prevState.contacts.filter(
//         (contact) => contact.id !== ev.target.id
//       ),
//     }));
//   };

//   handleFilter = (value) => this.setState({ filter: value });
//   getFilter = () => {
//     const { contacts, filter } = this.state;
//     return contacts.filter((contact) =>
//       contact.name.toLowerCase().includes(filter.toLowerCase())
//     );
//   };

//   render() {
//     const { handleCreate, handleDelete, handleFilter, getFilter } = this;
//     const { filter, contacts } = this.state;

//     return (
//       <div>
//         <h1>Phonebook</h1>
//         <ContactForm allContacts={contacts} onSubmit={handleCreate} />
//         <h2>Contacts</h2>
//         <Filter value={filter} onChange={handleFilter} />
//         <ContactList lists={getFilter()} onClick={handleDelete} />
//       </div>
//     );
//   }
// }