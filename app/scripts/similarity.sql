```
create or replace function match_documents(
  query_embedding vector(1024),
  match_threshold float,
  match_count int
) returns table (
  id uuid,                    
  content text,
  slug text,
  title text,
  similarity float
) language sql stable as $$
select
  documents.id,
  documents.content,
  documents.slug,
  documents.title,
  1 - (documents.embedding <=> query_embedding) as similarity
from
  documents
where
  1 - (documents.embedding <=> query_embedding) > match_threshold
order by
  similarity desc
limit
  match_count;
$$;
```