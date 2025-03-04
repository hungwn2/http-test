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
    char server_message[256]="You have reached the server!";    
    int server_socket;
    server_socket=socket(AF_INET,SOCK_STREAM,0);
    struct sockaddr_in server_address;
    server_address.sin_family=AF_INET;
    server_address.sin_port=htons(9001);
    server_address.sin_addr.s_addr=INADDR_ANY;

    bind(server_socket, (struct sockaddr *) &server_address, sizeof(server_address));
    listen(server_socket, 50);
    int client_socket;
    client_socket=accept(server_socket,NULL,NULL);
    send(client_socket, server_message, sizeof(server_message),0);
    close(server_socket);

    return 0;
}