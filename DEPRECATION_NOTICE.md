# Media-Careers-India — Deprecated

This repository (phildass/Media-Careers-India) is deprecated.

Summary:
- The original project implemented a Next.js/TypeScript site for MediaCareers.in (job listings, admin panel, membership/payment flows).
- Rather than deleting history, this commit replaces the default branch contents with this deprecation notice so the repository root no longer exposes the application code by default.

Why:
- The owner requested the repository be replaced with a deprecation notice to avoid exposing the current codebase as the active default content while keeping full git history intact.

What changed:
- The default branch will show this DEPRECATION_NOTICE.md instead of the application files.
- Full git history is preserved and all prior files remain accessible in the repository history and other branches.

How to recover or inspect previous code:
- To view the prior source tree, use git to checkout an earlier commit or the previous branch:
  - git fetch origin
  - git checkout origin/main@{1}   # or use the commit SHA you want to inspect
- If you want to restore the previous default contents, simply open a PR to revert this change or reset the branch to the desired commit.

If you want a clean new repo for a replacement implementation:
- I can scaffold a fresh repository for the new MediaCareers.in architecture and migrate only the desired pieces.
- I can also archive this repository (read-only) after the PR is merged to mark it as deprecated.

Contact:
- Repository owner: @phildass
- For migration or re-implementation, please reply with whether you want me to prepare a new scaffold repo or proceed with the PR to deprecate.
