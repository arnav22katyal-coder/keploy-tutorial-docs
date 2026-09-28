# Keploy Go Tutorial

This is my tutorial for Keploy's Go `gin-redis` quickstart. It is a single-page, static, beginner-friendly walkthrough built with Next.js, MDX, and Tailwind CSS. The tutorial focuses on my actual experience running Keploy using its Docker setup, explaining the real-world friction points and "a-ha" moments like dynamic token noise handling.

**Live demo:** [Live Demo Placeholder]

## Run locally

```bash
npm install
npm run dev
```

To build for production:

```bash
npm run build
npm start
```

## Notes from running the quickstart

- **Go 1.23 Docker Toolchain Mismatch:** The upstream `go.mod` required Go 1.23, so I updated the `Dockerfile` base image from `golang:1.20-alpine` to `1.23-alpine` to fix build failures.
- **Docker Image Version Pinning:** Using `ghcr.io/keploy/keploy:latest` pulls `v3`, which has a different entrypoint and breaks the `-c` flag from the tutorial. Pinning to `:v2.4.0` fixed it.
- **Apple Silicon eBPF limitations:** Capturing `curl` traffic directly from the host to the Docker container via eBPF on Mac didn't work natively. Moving everything to a custom Docker network (`keploy-net`) solved the issue.
- **Dynamic Token Noise:** The `test-2` verification step initially failed because the JWT `token` changed on every run. Adding `body.token` to `assertions.noise` in `test-2.yaml` made it pass perfectly.

## Tech stack

Next.js 14 App Router, @next/mdx, Tailwind CSS, TypeScript, shiki, rehype-pretty-code.
