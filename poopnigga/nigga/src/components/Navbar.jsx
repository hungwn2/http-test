import { Box, HStack, Badge, Text, Image, Flex } from "@chakra-ui/react";
import LinkWrapper from "./LinkWrapper";
import { FaHome, FaShoppingCart } from "react-icons/fa";
import PropTypes from "prop-types";

const NavBar = ({ totalItems, totalPrice }) => {
  return (
    <Box bg="gray.800" p={4} color="white">
    <Flex justify="space-between" align="center">
      <HStack spacing={8}>
        <Link to="/">
          <HStack>
            <FaHome />
            <Text>Home</Text>
          </HStack>
        </Link>
        <Link to="/cart">
          <HStack>
            <FaShoppingCart />
            <Text>Cart</Text>
            <Badge colorScheme="teal">{totalItems}</Badge>
          </HStack>
        </Link>
      </HStack>
      <Text>Total Price: ${totalPrice.toFixed(2)}</Text>
    </Flex>
  </Box>
  );
};
NavBar.prop





    NavBar.propTypes = {
        totalItems: PropTypes.number.isRequired,
        totalPrice: PropTypes.number,
      };
      
      export default NavBar;