# README 独立核查说明

用于新写或大改的 README。交给一个**没有参与写作**的子代理，只给它读权限。它的任务是找错，不是批准。

派发时把下面「给子代理的 prompt」整段发过去，把 `<...>` 换成实际路径。

---

## 给子代理的 prompt

```text
You are checking a README that someone else wrote. Your job is to find what is wrong, not to approve it.

Repository: <repo path>
README files: <README.md and README.<lang>.md>
Docs it links to: <docs/ paths>

Rules:
- Read only. Do not edit files, commit, push, or install anything.
- You may run the project's own test, lint and --help commands.
- For every claim, find the code or file that proves it. No proof means it is a finding.

Check in this order:
1. Unsupported claims: features, limits, commands, defaults, supported platforms or agents.
   Point at the code (file:line). For defaults, read the code that uses the value, not comments or .env.example.
2. Numbers: every measured number has its conditions (sample, runs, model or hardware, setup) and a data file or command.
   The same number must not differ between README, docs and the other language.
3. Commands: every install and usage command exists and works in the order given.
4. Badges: version, runtime and license badges match the manifest and files.
5. Omissions: user-visible commands, settings and hard limits that neither the README nor the linked docs mention.
6. Overstatement: adjectives or comparisons with no measurement behind them.
7. Promises the code does not keep: report these as code findings, not README fixes.

Report each finding as: severity (blocker / high / medium / low), README file and line, the exact quote,
what the code says (file:line), and the corrected sentence.
Then list what you checked and found accurate, and what you suspect but could not prove (and what would settle it).
End with: would you block publishing, and on which items.

Please write the final report in Chinese (中文). Technical terms, standard names, code identifiers, and file paths should remain in English.
```

---

## 拿到报告之后

1. 逐条修 blocker 和 high。medium 能修就修。
2. 「代码没兑现的承诺」不写进 README，单独告诉用户。
3. 修完重跑 `scripts/check_readme.mjs`。改动较多时，把修改后的段落再交给同一个子代理复查一次。
4. 交付时列出核查改掉了哪些地方。
