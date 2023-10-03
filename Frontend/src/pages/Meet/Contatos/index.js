import React, { useState, useEffect } from 'react';
import './Contatos.css';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes,faPhone,faInfo,faPlusCircle,faTrashAlt,faEdit} from '@fortawesome/free-solid-svg-icons';
import rest from '../../../api';

function Contatos() {
    const [searchName, setSearchName] = useState('');
    const [contatos, setContatos] = useState([]);
    const { state } = useLocation();
    
    const handleSearchChange = (event) => {
        setSearchName(event.target.value);
    };

    useEffect(() => {
        const token = state?.token;

        const PegarOToken = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        rest.get('http://localhost:3001/contatos', PegarOToken)
            .then((response) => {
                setContatos(response.data);
            })
            .catch((error) => {
                console.error('Erro ao buscar contatos:', error);
            });
    }, [state]);

    const filteredContacts = contatos.filter((contato) =>
        contato.nome.toLowerCase().includes(searchName.toLowerCase())
    );
    const [modal, setModal] = useState(false);
    const [contatoModal, setContatoModal] = useState(null);
    const [modalAdd, setModalAdd] = useState(false);
    const [addContatoModal, setAddContatoModal] = useState(null);

    const handleOpenModal = (contato) => {
        setContatoModal(contato);
        setModal(true);
    };

    const handleCloseModal = () => {
        setContatoModal(null);
        setModal(false);
    };

    const handleOpenAddModal = () => {
        setModalAdd(true);
    };

    const handleCloseAddModal = () => {
        setAddContatoModal(null);
        setModalAdd(false);
    };

    const handleDelete = (contato) => {
        console.log(contato);
    };

    return(
        <>
            <h1>Buscar Contatos</h1>
            <div className='search-bar'>
                <input
                    type="text"
                    className='search-input'
                    placeholder='Pesquisar Contato'
                    value={searchName}
                    onChange={handleSearchChange}
                />
            </div>
            <div className="contacts-container">
                <button className='addContato' onClick={() => handleOpenAddModal()}><FontAwesomeIcon icon={faPlusCircle} /> Adicionar Contato</button>
                <ul>
                    {filteredContacts.map((contato) => (
                        <> 
                            <li key={contato.id} className="contact-item">
                                <div className='button-container'>
                                    <button onClick={() => handleOpenModal(contato)} id='openContato'>
                                        <strong>{contato.nome}</strong>
                                    </button>
                                    <button onClick={() => handleDelete(contato)} id='deletarContato'>
                                        <FontAwesomeIcon icon={faTrashAlt} />
                                    </button>
                                </div>
                            </li>
                        </>
                    ))}
                </ul>
            </div>
            {modal &&(
                <>
                    <div className="modal-backdrop"></div>
                    <div className="modal">
                        <FontAwesomeIcon
                            icon={faTimes}
                            className="close-icon"
                            onClick={handleCloseModal}
                        />
                        <div className="modal-content">
                            <div className='editar'>
                                <h2>{contatoModal.nome}</h2>
                                <FontAwesomeIcon icon={faEdit} className='editaContato'/>
                            </div>
                            <p>{contatoModal.email}</p>
                            <button id='addChamada'><FontAwesomeIcon icon={faPhone} /> Iniciar Chamada</button>
                            <button id='detalhes'><FontAwesomeIcon icon={faInfo} /> Ver Perfil</button>
                        </div>
                    </div>
                </>
            )}
            {modalAdd &&(
                <>
                    <div className="modal-backdrop"></div>
                    <div className="modal">
                        <FontAwesomeIcon
                            icon={faTimes}
                            className="close-icon"
                            onClick={handleCloseAddModal}
                        />
                        <div className="modal-content">
                            <h2>{addContatoModal.nome}</h2>
                            <p>{addContatoModal.email}</p>
                            <button className='addContato'><FontAwesomeIcon icon={faPlusCircle} /> Adicionar Contato</button>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default Contatos;
