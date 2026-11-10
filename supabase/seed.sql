-- Carta de ejemplo de «La Taberna de Codi» (restaurante ficticio).
-- Fotos: public/fotos (Unsplash, ver CREDITS.md).
-- Antes: crea el usuario del dueño en Authentication → Users y pon aquí su email.
do $$
declare
  owner uuid := (select id from auth.users where email = 'dev@codigofacil.es');
  r uuid;
  picar uuid; principales uuid; postres uuid; bebidas uuid;
begin
  insert into restaurants (slug, name, owner_id) values ('taberna-de-codi', 'La Taberna de Codi', owner) returning id into r;

  insert into categories (restaurant_id, name, position) values (r, 'Para picar', 1) returning id into picar;
  insert into categories (restaurant_id, name, position) values (r, 'Principales', 2) returning id into principales;
  insert into categories (restaurant_id, name, position) values (r, 'Postres', 3) returning id into postres;
  insert into categories (restaurant_id, name, position) values (r, 'Bebidas', 4) returning id into bebidas;

  insert into dishes (restaurant_id, category_id, name, description, price_cents, allergens, recommended, position, image_url) values
    (r, picar, 'Croquetas de la abuela', 'Seis croquetas caseras de jamón ibérico, cremosas por dentro.', 850, '{gluten,leche,huevos}', true, 1, '/fotos/croquetas.jpg'),
    (r, picar, 'Patatas bravas', 'Con salsa brava de la casa y un toque de alioli.', 600, '{huevos}', false, 2, '/fotos/bravas.jpg'),
    (r, picar, 'Pimientos de Padrón', 'Unos pican y otros no. Con sal en escamas.', 700, '{}', false, 3, null),
    (r, picar, 'Tabla de ibéricos', 'Jamón, lomo y chorizo ibéricos con pan con tomate.', 1600, '{gluten}', false, 4, null),
    (r, principales, 'Tortilla de patatas', 'Jugosa, con cebolla, hecha al momento.', 900, '{huevos}', false, 1, '/fotos/tortilla.jpg'),
    (r, principales, 'Pulpo a la gallega', 'Sobre cachelos, con pimentón de la Vera y aceite de oliva.', 1850, '{moluscos}', true, 2, '/fotos/pulpo.jpg'),
    (r, principales, 'Arroz negro', 'Con sepia y calamar, servido con alioli. Para dos.', 1600, '{moluscos,crustaceos,pescado,huevos}', false, 3, null),
    (r, principales, 'Secreto ibérico', 'A la brasa, con patatas panaderas y pimientos asados.', 1550, '{}', false, 4, '/fotos/secreto.jpg'),
    (r, postres, 'Tarta de queso', 'Al estilo vasco: tostada por fuera, cremosa por dentro.', 650, '{leche,huevos,gluten}', true, 1, '/fotos/tarta-de-queso.jpg'),
    (r, postres, 'Crema catalana', 'Con azúcar quemado al momento.', 550, '{leche,huevos}', false, 2, '/fotos/crema-catalana.jpg'),
    (r, bebidas, 'Caña de cerveza', 'Bien fría.', 250, '{gluten}', false, 1, null),
    (r, bebidas, 'Copa de vino tinto', 'Rioja crianza.', 350, '{sulfitos}', false, 2, null),
    (r, bebidas, 'Agua mineral', 'Botella de 50 cl.', 200, '{}', false, 3, null);
end $$;
