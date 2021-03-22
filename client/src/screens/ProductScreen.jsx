import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button } from 'react-bootstrap'
import { Loader, Message, Rating } from '../components'
import { useDispatch, useSelector } from 'react-redux'
import { clearProductDetails, listProductDetails } from '../redux'

export const ProductScreen = ({ match }) => {
  const dispatch = useDispatch()

  const productDetails = useSelector(state => state.productDetails)
  const { loading, error, product } = productDetails

  useEffect(() => {
    dispatch(listProductDetails(match.params.id))
    return () => dispatch(clearProductDetails())
  }, [dispatch, match.params.id])

  return (
    <>
      <Link className='btn btn-dark my-3' to='/'>
        Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          <Col md={7}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={5}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews}${product.numReviews === 1 ? ` review` : ' reviews'}`}
                />
              </ListGroup.Item>
              <ListGroup.Item>{product.description}</ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>£{product.price?.toFixed(2)}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    <strong>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button className='btn-block' type='button' disabled={product.countInStock === 0}>
                  Add to Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      )}
    </>
  )
}

ProductScreen.propTypes = { match: PropTypes.object }
