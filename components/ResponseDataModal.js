"use client"
import React, { useState } from 'react';
import { Modal, Button, Card } from 'react-bootstrap';

const ApplicationDetailsModal = ({ dataObject }) => {
  const renderData = (label, value) => {
    if (value === null || value === undefined || (Array.isArray(value) && value.length === 0)) {
      return null;
    }
    return (
      <p><strong>{label}:</strong> {Array.isArray(value) ? value.join(', ') : value}</p>
    );
  };

  const [show, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Application Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {renderData('Timestamp', new Date(dataObject?.timestamp).toLocaleString())}
          {renderData('Application ID', dataObject?.applicationid)}
          {renderData('Community Guidelines Acceptance', dataObject?.community_guidelines_acceptance)}
          {renderData('Personal Data Policy Acceptance', dataObject?.community_personal_data_policy_acceptance)}
          {renderData('Role', dataObject?.role)}
          <hr/>
          {renderData('Student ID', dataObject?.student_id)}
          {renderData('Full Name', dataObject?.full_name)}
          {renderData('Nickname', dataObject?.nickname)}
          {renderData('Faculty', dataObject?.faculty)}
          {renderData('Major', dataObject?.major)}
          {renderData('Current Year of Study', dataObject?.current_year_of_study)}
          {renderData('Experience Level', dataObject?.experience_level)}
          {renderData('Gender', dataObject?.gender)}
          {renderData('Tech Areas', [dataObject?.tech_areas_1, dataObject?.tech_areas_2, dataObject?.tech_areas_3].filter(Boolean))}
          {renderData('User Email', dataObject?.user_email)}
          {renderData('Personal Email', dataObject?.personal_email)}
          {renderData('Phone', dataObject?.phone)}
          <hr/>
          {renderData('GitHub', dataObject?.github ? <a href={dataObject.github} target="_blank" rel="noopener noreferrer">{dataObject.github}</a> : null)}
          {renderData('Google Developer', dataObject?.google_developer)}
          {renderData('Joining Reason', dataObject?.joining_reason)}
          {renderData('LinkedIn', dataObject?.linkedin)}
          {renderData('Programming Languages', dataObject?.programming_languages)}
          <hr/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Card.Link onClick={handleShow}>Respondent Data</Card.Link>
    </div>
  );
};

export default ApplicationDetailsModal;
