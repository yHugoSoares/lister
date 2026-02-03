CREATE TABLE public.listings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  imageUrl text NOT NULL,
  title text NOT NULL,
  address text NOT NULL,
  price text NOT NULL,
  beds integer NOT NULL,
  baths integer NOT NULL,
  sqft integer NOT NULL
);

ALTER TABLE public.listings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users" ON public.listings
  FOR SELECT USING (true);