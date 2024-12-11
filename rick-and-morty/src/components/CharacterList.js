import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Col, Pagination, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CharacterList = ({ searchQuery }) => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`https://rickandmortyapi.com/api/character?page=${page}`);
        setCharacters(response.data.results);
        setTotalPages(response.data.info.pages);
      } catch (err) {
        setError('Failed to fetch characters');
      } finally {
        setLoading(false);
      }
    };
    fetchCharacters();
  }, [page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  // Filtering characters based on search query
  const filteredCharacters = characters.filter(character => 
    character.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle pagination range, showing 5 pages (2 before and 2 after current page)
  const pageNumbers = [];
  const pageRange = 2;
  let startPage = Math.max(1, page - pageRange);
  let endPage = Math.min(totalPages, page + pageRange);

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  // Handling the 'Previous' and 'Next' buttons
  const prevPage = page > 1 ? page - 1 : 1;
  const nextPage = page < totalPages ? page + 1 : totalPages;

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div className='row'>
            {filteredCharacters.map((character) => (
            <div key={character.id} className='col-sm-12 col-md-6 col-lg-4'>
                <Card className="mb-4">
                <Card.Img variant="top" src={character.image} />
                <Card.Body>
                    <Card.Title>{character.name}</Card.Title>
                    <Card.Text>Species: {character.species}</Card.Text>
                    <Card.Text>Status: {character.status}</Card.Text>
                    <Link to={`/character/${character.id}`}>
                    <Button variant="primary">View Details</Button>
                    </Link>
                </Card.Body>
                </Card>
            </div>
            ))}
      </div>

      {/* Pagination Component */}
      <div className='row justify-content-center'>
        <div className='col-4'>

            <Pagination>
                <Pagination.Prev onClick={() => handlePageChange(prevPage)} />
                
                {page > pageRange + 1 && (
                <Pagination.Item onClick={() => handlePageChange(1)}>
                    1
                </Pagination.Item>
                )}

                {page > pageRange + 2 && <Pagination.Ellipsis />}

                {pageNumbers.map((pageNum) => (
                <Pagination.Item
                    key={pageNum}
                    active={pageNum === page}
                    onClick={() => handlePageChange(pageNum)}
                >
                    {pageNum}
                </Pagination.Item>
                ))}

                {page < totalPages - pageRange - 1 && <Pagination.Ellipsis />}

                {page < totalPages - pageRange && (
                <Pagination.Item onClick={() => handlePageChange(totalPages)}>
                    {totalPages}
                </Pagination.Item>
                )}

                <Pagination.Next onClick={() => handlePageChange(nextPage)} />
            </Pagination>
        </div>
      </div>
    </>
  );
};

export default CharacterList;
