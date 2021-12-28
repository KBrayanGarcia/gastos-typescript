import { ReactNode } from 'react';
import Modal from 'react-bootstrap/Modal';

interface Props {
    show: boolean;
    handleClose: () => void;
    title?: ReactNode | string;
    footer?: ReactNode | string;
    children: ReactNode | undefined;
}

const ModalGastos = ({show, title, footer, children, handleClose}: Props) => {
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {children}
                </Modal.Body>
                {footer && (
                    <Modal.Footer>
                        {footer}
                    </Modal.Footer>
                )}
            </Modal>
        </>
    );
};

export default ModalGastos;
