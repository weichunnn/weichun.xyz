create or replace function match_documents(
  match_count int,
  query_embedding vector(1024),
  match_threshold float
)
returns table (
  id bigint,
  content text,
  url text,
  title text,
  similarity float
)
language sql stable
as $$
  select
    documents.id,
    documents.content,
    documents.url,
    documents.title,
    1 - (documents.embedding <=> query_embedding) as similarity
  from documents
  where 1 - (documents.embedding <=> query_embedding) > match_threshold
  order by similarity desc
  limit match_count;
$$;