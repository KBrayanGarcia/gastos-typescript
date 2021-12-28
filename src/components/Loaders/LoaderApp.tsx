import Spinner from 'react-bootstrap/Spinner'
import styled from 'styled-components';

const LoaderApp = () => {
    return (
        <ContainerLoaderApp className='d-flex justify-content-center align-items-center'>
            <Spinner animation="border" role="status"/>
        </ContainerLoaderApp>
    )
}

const ContainerLoaderApp = styled.div`
    background: linear-gradient(
        90deg,
        #1b2f33 0%,
        rgba(40, 80, 46, 0.7) 66.9%,
        rgba(71, 104, 44, 0.5) 100%
    );
    height: 100vh;
`;


export default LoaderApp
