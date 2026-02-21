insert into pages (slug, title, content)
values
('pandu-bangsaku', 'Pandu Bangsaku', ''),
('akhlaq-mulia', 'Akhlaq Mulia', ''),
('ilmu-baru-bilangan-prima', 'Ilmu Baru Bilangan Prima', ''),
('khayalan-kah', 'Khayalan-Kah', ''),
('miscellaneous', 'Miscellaneous', '')
on conflict (slug) do nothing;
