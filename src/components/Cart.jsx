import React from 'react'
import ItemRemove from './ItemRemove'
import { useContext } from 'react'
import { CartContext } from '../contexts/CartContext'
import { Card, CardBody, Stack, Heading, Text, Divider, CardFooter, Button, Image } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const Cart = () => {

    const {cart, setCart, totalAmountOfProducts, finalAmount} = useContext(CartContext)

    console.log(cart);

    const removeFromCart =()=>{
        setCart ( (cart) =>{
            const updatedCart = [...cart];
            const cartUbication = updatedCart.findIndex ((selection) => selection.id === id);//findIndex devuelve la posicion del producto en el array
            console.log(cartUbication);
            console.log(updatedCart);
            if (cartUbication != -1){                                                  //devuelve -1 si no encuentra la posicion (no esta el producto)
                console.log(updatedCart);
                return updatedCart
            } else {                                             //si encuentra el producto, me trae la posicion y actualizo la cantidad en el carrito
                updatedCart.splice(cartUbication,1);
                console.log(updatedCart);
                return updatedCart;    //uso los return para que se devuelva al hook "setCart" el nuevo carrito (updatedCart) y este tome el lugar
            }                         //del viejo cart. Esto es diferente a modificar el cart original directamente, porque puede tener problemas
        })                           //con los cambios de estado del hook
    }

    return (
        <div /* id='cartAndFormContainer' */>
            <h1 className='welcome'>
                Cart
            </h1>
            {cart.map( (product) => {
                return (    
                    <div className='productInCart' key = {product.id} id='productDetail'>
                        <Card direction={{ base: 'column', sm: 'row' }} overflow='hidden' variant='outline'>
                            <div className='detailInCart'>
                            <div className='imageInCartContainer'>
                                <img src={`${product.image}`} />
                            </div>
                            <Stack>
                            <CardBody>
                                <Heading size='sm'>{product.name}</Heading>
                                <Divider className='dividerCart'/>
                                <Text>
                                    Quantity: {product.quantityInCart}
                                </Text>
                                <Text>
                                    Unit price: US$ {product.price}
                                </Text>
                                <Text>
                                    Total Price: US$ {product.totalPrice}
                                </Text>
                            </CardBody>
                            <CardFooter>
                                <ItemRemove id={product.id} /> {/* le paso por props el id, para remover el producto del cart */}
                            </CardFooter>
                            </Stack>
                            </div>
                        </Card>
                    </div>
                )
            }
        )}
            <div id='formContainer'>
                <Card direction={{ base: 'column', sm: 'row' }} overflow='hidden' variant='outline'>
                            <div className='formInCart'>
                            <Stack>
                            <CardBody>
                                <Heading size='sm'>{"Purchase Summary"}</Heading>
                                <Divider className='dividerCart'/>
                                <Text>
                                    Quantity of products: {totalAmountOfProducts}
                                </Text>
                                <Text>
                                    Subtotal: US$ {finalAmount}
                                </Text>
                            </CardBody>
                            <CardFooter>
                                <Link to={'/form'}>
                                    <Button variant='solid' colorScheme='orange'>
                                        Continue to checkout
                                    </Button>
                                </Link>
                            </CardFooter>
                            </Stack>
                            </div>
                        </Card>
            </div>
            

        </div>
)}


export default Cart