# Skill: Release Process

How releases are cut, deployed, and rolled back. Follow this sequence every time.

---

## Release Types

| Type | When | Branch strategy |
|------|------|----------------|
| Patch (x.x.N) | Bug fixes, security patches | Hotfix from main |
| Minor (x.N.0) | New features, non-breaking | Feature branch → main |
| Major (N.0.0) | Breaking changes | Release branch |

## Pre-Release Checklist

```
- [ ] All tests passing (pnpm test)
- [ ] Typecheck clean (pnpm typecheck)
- [ ] Lint clean (pnpm lint)
- [ ] Security audit clean (pnpm audit)
- [ ] CHANGELOG.md updated
- [ ] Version bumped (pnpm version [patch|minor|major])
- [ ] Database migrations tested on prod schema copy
- [ ] Rollback procedure documented and tested
- [ ] Feature flags set correctly (if applicable)
- [ ] Monitoring alerts configured for new endpoints
```

## Deploy Sequence

```
1. Deploy database migrations (verify success before app deploy)
2. Deploy application (rolling — not all-at-once)
3. Smoke test: hit critical paths manually
4. Watch error rate for 10 minutes
5. Watch latency P95 for 10 minutes
6. Close release ticket
```

## Rollback Procedure

### Application rollback
```bash
# Redeploy previous version tag
git checkout [previous-tag]
# Or via CI: trigger previous successful deployment
```

### Database rollback
```bash
pnpm db:migrate:rollback
# Then: redeploy previous app version
```

**Rule**: Database rollback before app rollback (new code reads old schema — risky; old code reads new schema — safer).

## Hotfix Process

```
1. Branch from main (not from feature branch)
2. Apply minimal fix only — no opportunistic changes
3. Test + security check
4. PR → 1 reviewer approval minimum
5. Deploy same sequence as above
6. Cherry-pick to develop branch if separate
```

## Post-Release

- Update STATUS page if there was an incident
- Write post-mortem for any P0/P1 incidents within 48 hours
- Archive release notes in `docs/releases/`
