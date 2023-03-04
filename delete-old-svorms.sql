-- This function runs on supabase after every insert operation
create or replace function delete_old_svorms() returns trigger
language plpgsql
as $$
  declare
    s_id int;
    q_id int;
    m_id int;
  begin
    for s_id in select id from svorms where created_at < now() - interval '30 days' loop
      for q_id in select id from simple_questions where svorm_id = s_id loop
        delete from simple_questions_answers where question_id = q_id;
        delete from simple_questions where id = q_id;
      end loop;
      for m_id in select id from multiple_choices where svorm_id = s_id loop
        delete from multiple_choices_answers where question_id = m_id;
        delete from multiple_choices where id = m_id;
      end loop; 
      delete from svorms where id = s_id;
    end loop;
    return new;
  end
$$;