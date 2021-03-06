import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Note from "../Note/Note";
import CircleButton from "../CircleButton/CircleButton";
import ApiContext from "../ApiContext";
import { getNotesForFolder } from "../notes-helpers";
import "./NoteListMain.css";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

import PropTypes from "prop-types";

export default class NoteListMain extends React.Component {
  static defaultProps = {
    match: {
      params: {},
    },
  };
  static contextType = ApiContext;

  render() {
    const { folderId } = this.props.match.params;
    const { notes = [] } = this.context;
    const notesForFolder = getNotesForFolder(notes, parseInt(folderId));

    return (
      <ErrorBoundary>
        <section className="NoteListMain">
          <ul>
            {notesForFolder.map((note) => (
              <li key={note.id}>
                <Note
                  id={note.id}
                  name={note.title}
                  modified={new Date(note.date_published)}
                />
              </li>
            ))}
          </ul>
          <div className="NoteListMain__button-container">
            <CircleButton
              tag={Link}
              to="/add-note"
              type="button"
              className="NoteListMain__add-note-button"
            >
              <FontAwesomeIcon icon="plus" />
              <br />
              Note
            </CircleButton>
          </div>
        </section>
      </ErrorBoundary>
    );
  }
}

NoteListMain.propTypes = {
  match: PropTypes.object.isRequired,
};
