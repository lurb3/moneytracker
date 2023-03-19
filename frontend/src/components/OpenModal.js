import React, { useState } from 'react';
import { Button, Modal } from 'semantic-ui-react';

const OpenModal = ({component, isOpen = false, onClose = () => {}, ...props}) => {
  const [ open, setOpen ] = useState(isOpen);

  const handleClose = async () => {
    await onClose();
    setOpen(false);
  }

  return (
    <Modal
      onClose={handleClose}
      onOpen={() => setOpen(true)}
      open={open}
    >
      <Modal.Header>Header</Modal.Header>
      <Modal.Content>
        {component}
        Content
      </Modal.Content>
      <Modal.Actions>
        Actions
      </Modal.Actions>
    </Modal>
  )
}

export default OpenModal;