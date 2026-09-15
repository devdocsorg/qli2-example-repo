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
- [.templates/](.templates/index.html) — Supplies the generated site's entry-point redirect.

## Files

- [Makefile](Makefile): Provides the shared local and CI setup, build, and reproducibility commands.

- [README.md](README.md) — Introduces the guides and supplies the site's homepage.
- [conf.py](conf.py) — Configures Markdown rendering, local navigation, and search.
- [requirements.txt](requirements.txt) — Pins the documentation packages.
