# Rutas

-   /api/v1/users
-   /api/v1/users/:id
-   /api/v1/users/me

-   /api/v1/auth/login
-   /api/v1/auth/register
-   /api/v1/auth/password-recovery
-   /api/v1/auth/verify-account

-   /api/v1/users  
    [✔] -- GET

-   /api/v1/users/:id  
    [✔] -- GET  
    [✔] -- PUT (ADMIN)  
    [✔] -- DELETE (ADMIN)

-   /api/v1/users/me  
    [✔] -- GET (USER)
    [✔] -- PUT (USER)
    [✔] -- DELETE (USER)

-   /api/v1/auth/login  
    [✔] -- POST

-   /api/v1/auth/register  
    [✔] -- POST

-   /api/v1/auth/password-recovery  
    -- POST  
    -- PATCH

# Paths de mi usuario a través de mi aplicación

[✔] registrar mi usuario  
[✔] loggear mi usuario

### Usuario sin sesión iniciada

1. Ver los lugares [✔]
2. Puede ver la información de un lugar [✔]

### Guest

1. Ver los lugares [✔]
2. Puede ver la información de un lugar [✔]
3. Reservar [✔]
4. Cancelar reservaciones
5. Dar un score una vez finalizada la reservación

### Host

1. Ver los lugares [✔]
2. Puede ver la información de un lugar [✔]
3. Reservar [✔]
4. Dar un score una vez finalizada la reservación
5. Puede crear lugares [✔]
6. Cancelar reservaciones en los lugares donde es host
7. Puede ver perfiles de usuario [✔]
8. Puede ver todos los lugares que le pertenecen [✔]
9. Editar el lugar [✔]
10. Eliminar el lugar [✔]

### Admin

1. Ver los lugares [✔]
2. Puede ver la información de un lugar [✔]
3. Reservar [✔]
4. Dar un score una vez finalizada la reservación
5. Puede ver perfiles de usuario [✔]
6. Editar el lugar [✔]
7. Eliminar el lugar [✔]
8. Modificar roles [✔]
9. Eliminar un usuario [✔]
10. Modificar un usuario [✔]
11. Ver lugares de los hosts

### Accommodations

/api/v1/users/me/accommodations

"/"  
[✔] -GET (HOST)

"/:id"  
[✔] -PUT (HOST)  
[✔] -DELETE (HOST)

/api/v1/accommodations

"/"  
[✔]-GET  
[✔]-POST (HOST)

"/:id"  
[✔] -GET  
[✔] -PUT (ADMIN)  
-PATCH  
[✔] -DELETE (ADMIN)

/:id/available/?arrival=value&departure=value
-GET

### Reservations

/api/v1/reservations  
[✔] -GET

/api/v1/reservations/:id  
[✔] -GET (ADMIN)
[✔] -PUT (ADMIN)

/api/v1/accommodations/:id/make-reservation  
[✔] -POST

# Ejemplo de documentación

https://petstore.swagger.io/v2/swagger.json
