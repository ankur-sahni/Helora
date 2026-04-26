Check the health of the full agency stack and report a clear status summary.

Run these checks in parallel:
1. Next.js dashboard — curl http://localhost:3000, expect 200 or 307
2. n8n — curl http://localhost:5678, expect 200 or 404
3. Supabase — curl https://jzumhspttptpadarlmre.supabase.co/rest/v1/clients with apikey header, expect 200
4. COO remote trigger — fetch trigger trig_01WTWbWtBenzECs7hTENqxsC and show last run time and enabled status
5. Pending owner tasks — query Supabase tasks table where assignedAgent=owner and status=pending, count them

Report as a clean table: service | status | detail. Flag anything red.
