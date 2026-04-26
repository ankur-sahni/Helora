Show all pending owner tasks from Supabase.

Query: GET https://jzumhspttptpadarlmre.supabase.co/rest/v1/tasks?assignedAgent=eq.owner&status=eq.pending&select=title,priority,description&order=priority.desc

Use the Supabase service role key from .env.

Display as a numbered list grouped by priority (high first). For each task show the title and one-line description. End with a count: "X tasks remaining".
