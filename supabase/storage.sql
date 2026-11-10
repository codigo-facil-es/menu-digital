-- Fotos de los platos: cualquiera puede verlas, solo el dueño de un restaurante puede subirlas.
insert into storage.buckets (id, name, public) values ('platos', 'platos', true);

create policy "subir fotos" on storage.objects for insert to authenticated
  with check (bucket_id = 'platos' and exists (select 1 from restaurants where owner_id = auth.uid()));

create policy "cambiar fotos" on storage.objects for update to authenticated
  using (bucket_id = 'platos' and owner_id = auth.uid()::text);

create policy "borrar fotos" on storage.objects for delete to authenticated
  using (bucket_id = 'platos' and owner_id = auth.uid()::text);
