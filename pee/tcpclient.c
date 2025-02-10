#include <stdio.h>
#include <stdlib.h>

#include <sys/types.h>
#ifdef _WIN32
#include <winsock2.h>
#include <ws2tcpip.h>
#else
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#endif

#ifdef _WIN32
#include <winsock2.h>
#else
#include <netinet/in.h>
#endif

int main(){
    // create a socket
    int network_socket=socket(AF_INET,SOCK_STREAM,0);
    struct sockaddr_in server_address;
    server_address.sin_family=AF_INET;
    //sets family of adress, 
    //AF_INET is the address family for IPv4
    server_address.sin_port=htons(9001);
    server_address.sin_addr.s_addr= INADDR_ANY;//connect to local host

int connection_status=connect(network_socket, (struct sockaddr *) &server_address, sizeof(server_address));
if (connection_status==-1){
    printf("There was an error making a connection to the remote socket\n\n");

}
else{
    printf("Connection established\n\n");
    char server_response[256];
    //a buffer to store the response data from the server
    recv(network_socket, server_response, sizeof(server_response), 0);
    printf("The server sent the data: %s\n",server_response);
    close(network_socket);
}
    return 0;
}