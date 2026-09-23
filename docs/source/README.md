# QLI 2.0 repository skeleton documentation

Start with the [adoption tutorial](user/USAGE.md), or follow
[development environment setup](contributing/DEVELOPMENT.md) to improve the skeleton.

```{toctree}
:hidden:

user/README
contributing/README
```

## Folders

- [user/](user/README.md) — Explains adoption and the skeleton's configuration.
- [contributing/](contributing/README.md) — Owns contribution guidance and development setup.
- [.templates/](https://github.com/devdocsorg/qli2-example-repo/tree/main/docs/source/.templates) — Supplies the generated site's entry-point redirect.

## Files

- [Makefile](https://github.com/devdocsorg/qli2-example-repo/blob/main/docs/source/Makefile) — Provides the shared local and CI setup, build, and reproducibility commands.
- [README.md](README.md) — Introduces the guides and supplies the site's homepage.
- [conf.py](https://github.com/devdocsorg/qli2-example-repo/blob/main/docs/source/conf.py) — Configures Markdown rendering, local navigation, and search.
- [requirements.txt](https://github.com/devdocsorg/qli2-example-repo/blob/main/docs/source/requirements.txt) — Pins the documentation packages.
- [requirements.lock](https://github.com/devdocsorg/qli2-example-repo/blob/main/docs/source/requirements.lock) — Locks direct and transitive documentation dependencies for reproducible builds.
